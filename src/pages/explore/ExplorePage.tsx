import { useEffect, useState } from 'react';
import { exploreGraph, getGraphSelection, getProjectsForTechnology, getTechnologiesForProject } from '../../data/explore-data';
import { useApp } from '../../lib/AppContext';
import { useMediaQuery } from '../../lib/use-media-query';
import { Eyebrow } from '../overview/primitives';
import ExploreContext from './ExploreContext';
import ExploreGraph from './ExploreGraph';
import ExploreMobile from './ExploreMobile';

/**
 * Production Explore view: the relationship graph and its context panel.
 * Selection is local to this page. It never touches AppContext's activeProject, which only the
 * "Open case study" actions set, and only through the shared Deep Dive.
 */
export default function ExplorePage() {
  const { activeProject } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const compact = useMediaQuery('(max-width: 680px)');

  const selection = selectedId ? getGraphSelection(selectedId) : null;

  // Escape clears the selection. It is a window listener because some browsers (Safari) do not focus a
  // button when it is clicked, so the key event would never reach this page. While the Deep Dive is open,
  // Escape belongs to it.
  useEffect(() => {
    if (!selectedId || activeProject) return;
    const clearOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedId(null);
    window.addEventListener('keydown', clearOnEscape);
    return () => window.removeEventListener('keydown', clearOnEscape);
  }, [selectedId, activeProject]);

  return (
    <div className="shell-width min-h-[calc(100vh-var(--header-height))] pb-20 pt-[55px] max-[680px]:pt-[38px]">
      <div className="grid grid-cols-[1.4fr_0.6fr] items-end gap-[10vw] max-[680px]:grid-cols-1 max-[680px]:gap-5">
        <div>
          <Eyebrow>Explore / Relationship map</Eyebrow>
          <h1 className="mt-2.5 font-display text-[clamp(3.2rem,6vw,6rem)] font-medium leading-none tracking-[-0.06em] max-[680px]:text-[3.5rem]">
            How the work connects.
          </h1>
        </div>
        <p className="mb-2.5 text-slate max-[680px]:mb-0">
          Follow a technology to the project where it was applied, or inspect the ideas currently in motion.
        </p>
      </div>

      {compact ? (
        <ExploreMobile selection={selection} onSelect={setSelectedId} />
      ) : (
        // 44 labelled nodes need ~700px of canvas, so the panel drops below the graph at 1100px, earlier than Make's 900px.
        <div className="mt-[45px] grid grid-cols-[minmax(0,1fr)_270px] items-end gap-5 max-[1100px]:grid-cols-1">
          <ExploreGraph
            selection={selection}
            onSelect={setSelectedId}
            className="h-[clamp(600px,calc(100vh-var(--header-height)-3rem),780px)] max-[1100px]:h-[720px]"
          />
          <ExploreContext selection={selection} onSelect={setSelectedId} className="max-[1100px]:max-w-[480px]" />
        </div>
      )}

      {/* The same graph as text, for assistive technology. The visual graph and this list share one data source. */}
      <ul className="sr-only" aria-label="Projects and the technologies they use">
        {exploreGraph.nodes
          .filter((node) => node.kind === 'project')
          .map((node) => (
            <li key={node.id}>
              {node.label}: {getTechnologiesForProject(node.projectTitle).map((t) => t.label).join(', ')}
            </li>
          ))}
        {exploreGraph.nodes
          .filter((node) => node.kind === 'technology' && getProjectsForTechnology(node.label).length > 1)
          .map((node) => (
            <li key={node.id}>
              {node.label} is shared by {getProjectsForTechnology(node.label).map((p) => p.shortTitle).join(', ')}
            </li>
          ))}
      </ul>
    </div>
  );
}
