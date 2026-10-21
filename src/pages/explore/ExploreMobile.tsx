import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { exploreGraph, normalizeLabel } from '../../data/explore-data';
import type { GraphSelection } from '../../data/explore-data';
import type { GraphNode } from '../../data/types';
import { portfolioData } from '../../data/portfolio';
import { prefersReducedMotion } from '../../lib/lens-navigation';
import ExploreContext from './ExploreContext';

/**
 * Touch-first Explore for narrow screens (680px and below).
 *
 * It is a relational browser, not a shrunken graph: pick a project, technology or learning topic, then
 * follow its connections as tappable chips and rows. Everything comes from the same `exploreGraph` and
 * helpers as the desktop graph, and the selection is the one owned by ExplorePage. The tab is only a view
 * choice (which picker to show); it is derived from the selection unless the person picks a tab by hand.
 */

type Tab = 'projects' | 'technologies' | 'now';

const TABS: { id: Tab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'technologies', label: 'Technologies' },
  { id: 'now', label: 'Now' },
];

const tabFor = (selection: GraphSelection | null): Tab => {
  const kind = selection?.node.kind;
  if (kind === 'technology') return 'technologies';
  if (kind === 'learning') return 'now';
  return 'projects';
};

const projectNodes = exploreGraph.nodes.filter((node) => node.kind === 'project');
const technologyNodes = exploreGraph.nodes
  .filter((node) => node.kind === 'technology')
  .sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));

/** The current-focus topics, in the portfolio's order, as graph nodes (a technology such as Docker, or a learning node). */
const focusNodes: GraphNode[] = portfolioData.currentFocus.primary
  .map((label) =>
    exploreGraph.nodes.find(
      (node) => (node.kind === 'technology' || node.kind === 'learning') && normalizeLabel(node.label) === normalizeLabel(label),
    ),
  )
  .filter((node): node is GraphNode => node !== undefined);

/** Mobile header height (see --header-height in index.css). */
const HEADER_OFFSET = 72;

interface NodeSelectProps {
  label: string;
  placeholder: string;
  value: string;
  options: readonly GraphNode[];
  onChange: (nodeId: string) => void;
}

/** A native select: a large, reliable touch target that opens the platform's own picker. */
function NodeSelect({ label, placeholder, value, options, onChange }: NodeSelectProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate">
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 w-full appearance-none rounded-none border-0 border-b border-ink bg-transparent py-2 pr-9 font-display text-[clamp(1.1rem,5vw,1.65rem)] font-medium text-ink transition-[box-shadow] duration-200 focus:shadow-[0_2px_0_-1px_var(--color-accent)]"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" className="pointer-events-none absolute bottom-4 right-1 text-ink" />
      </div>
    </div>
  );
}

interface ExploreMobileProps {
  selection: GraphSelection | null;
  /** Select a node, or pass null to clear. This is ExplorePage's own setter: there is no second selection here. */
  onSelect: (nodeId: string | null) => void;
}

export default function ExploreMobile({ selection, onSelect }: ExploreMobileProps) {
  const baseId = useId();
  const selectedId = selection?.node.id ?? null;
  const kind = selection?.node.kind;

  // View state only. A hand-picked tab applies to the selection it was picked for, so choosing a node
  // elsewhere (for example a technology chip inside a project) follows the node to its own tab.
  const [manual, setManual] = useState<{ tab: Tab; forId: string | null } | null>(null);
  const tab = manual && manual.forId === selectedId ? manual.tab : tabFor(selection);

  const choose = (nodeId: string | null, inTab: Tab) => {
    setManual({ tab: inTab, forId: nodeId });
    onSelect(nodeId);
  };

  const handleTabKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = TABS[(TABS.findIndex((t) => t.id === tab) + step + TABS.length) % TABS.length];
    setManual({ tab: next.id, forId: selectedId });
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
    event.preventDefault();
  };

  // When a tap changes the selection, keep the new details in view. Only scroll if they have moved above the
  // header, so tapping something already on screen never makes the page jump.
  const detailRef = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const top = detailRef.current?.getBoundingClientRect().top;
    if (selectedId && top !== undefined && top < HEADER_OFFSET + 8) {
      window.scrollBy({ top: top - HEADER_OFFSET - 12, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
    }
  }, [selectedId]);

  const titleInPicker = (tab === 'projects' && kind === 'project') || (tab === 'technologies' && kind === 'technology');

  return (
    <div className="mt-9">
      <div
        role="tablist"
        aria-label="Browse by"
        onKeyDown={handleTabKeys}
        className="grid grid-cols-3 border border-line p-[3px]"
      >
        {TABS.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setManual({ tab: item.id, forId: selectedId })}
              className={clsx(
                'min-h-11 px-2 text-[13px] transition-[color,background-color,transform] duration-200 active:scale-[0.97]',
                active ? 'bg-ink font-semibold text-white' : 'text-ink hover:bg-stone',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="mt-[18px] min-h-[390px] border border-line bg-paper px-5 pb-[30px] pt-[25px]"
      >
        {tab === 'projects' && (
          <NodeSelect
            label="Selected project"
            placeholder="Choose a project"
            value={kind === 'project' ? selectedId! : ''}
            options={projectNodes}
            onChange={(id) => choose(id, 'projects')}
          />
        )}
        {tab === 'technologies' && (
          <NodeSelect
            label="Selected technology"
            placeholder="Choose a technology"
            value={kind === 'technology' ? selectedId! : ''}
            options={technologyNodes}
            onChange={(id) => choose(id, 'technologies')}
          />
        )}
        {tab === 'now' && (
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-slate">Currently exploring</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {focusNodes.map((node) => {
                const pressed = node.id === selectedId;
                return (
                  <li key={node.id}>
                    <button
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => choose(node.id, 'now')}
                      className={clsx(
                        'inline-flex min-h-11 items-center gap-1.5 border px-3.5 font-mono text-[11px] transition-colors duration-200',
                        node.kind === 'learning' || !pressed ? 'border-dashed' : 'border-solid',
                        pressed
                          ? 'border-solid border-accent bg-accent font-bold text-white'
                          : 'border-accent bg-clay font-semibold text-on-clay',
                      )}
                    >
                      {pressed && <Check size={12} strokeWidth={2.5} aria-hidden="true" />}
                      {node.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div ref={detailRef} className="scroll-mt-[calc(var(--header-height)+12px)] pt-5">
          <ExploreContext
            variant="mobile"
            selection={selection}
            showTitle={!titleInPicker}
            // Clearing keeps the tab the person was browsing instead of snapping back to Projects.
            onSelect={(nodeId) => (nodeId === null ? choose(null, tab) : onSelect(nodeId))}
          />
        </div>
      </div>
    </div>
  );
}
