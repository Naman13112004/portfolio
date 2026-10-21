import { useMemo, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import clsx from 'clsx';
import {
  exploreGraph,
  getProjectsForTechnology,
  getTechnologiesForProject,
} from '../../data/explore-data';
import type { GraphSelection } from '../../data/explore-data';
import type { GraphNode } from '../../data/types';
import { useElementSize } from '../../lib/use-element-size';
import { PROJECT_NODE_MAX_WIDTH, computeLayout, estimateNodeSize } from './graph-layout';
import type { Point } from './graph-layout';

interface ExploreGraphProps {
  selection: GraphSelection | null;
  /** Select a node, or pass null to clear the selection. */
  onSelect: (nodeId: string | null) => void;
  className?: string;
}

const DRAG_THRESHOLD = 4;
const EMPTY_POSITIONS: Record<string, Point> = {};

const ringHover = 'hover:border-accent hover:shadow-[0_0_0_3px_var(--color-paper),0_0_0_4px_var(--color-accent)]';
const ringSelected = 'shadow-[0_0_0_3px_var(--color-paper),0_0_0_5px_var(--color-accent)]';

const nodeStyle: Record<GraphNode['kind'], string> = {
  identity: 'border-0 bg-ink px-[27px] py-[19px] font-display text-lg font-medium text-white shadow-paper-sm',
  project: `border border-ink bg-paper px-[17px] py-3 text-center font-display text-sm font-medium leading-[18px] whitespace-normal`,
  technology: 'whitespace-nowrap border border-line bg-stone px-[11px] py-[7px] font-mono text-[10px] font-medium',
  learning:
    'whitespace-nowrap border border-dashed border-accent bg-clay px-[11px] py-2 font-mono text-[10px] font-semibold text-on-clay',
};

/** Spoken description of a node, built from the same helpers the context panel uses. */
function describeNode(node: GraphNode): string {
  switch (node.kind) {
    case 'identity':
      return `${node.label}, identity. Connected to ${exploreGraph.nodes.filter((n) => n.kind === 'project').length} projects.`;
    case 'project': {
      const count = getTechnologiesForProject(node.projectTitle).length;
      return `${node.label}, project, using ${count} technologies.`;
    }
    case 'technology': {
      const count = getProjectsForTechnology(node.label).length;
      return `${node.label}, technology, used in ${count} ${count === 1 ? 'project' : 'projects'}${node.currentFocus ? ', also part of the current learning direction' : ''}.`;
    }
    case 'learning':
      return `${node.label}, currently exploring, not connected to any project yet.`;
  }
}

interface DragState {
  id: string;
  pointerX: number;
  pointerY: number;
  origin: Point;
  moved: boolean;
}

export default function ExploreGraph({ selection, onSelect, className }: ExploreGraphProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(canvasRef);
  const sizeKey = `${width}x${height}`;

  // Layout runs on copies of the graph; the frozen exploreGraph is never mutated.
  const base = useMemo(
    () => (width > 0 && height > 0 ? computeLayout(exploreGraph, { width, height }) : null),
    [width, height],
  );

  // Positions changed by dragging. Dropped whenever the canvas is resized or the view is reset.
  const [dragged, setDragged] = useState<{ key: string; positions: Record<string, Point> }>({ key: '', positions: {} });
  const overrides = dragged.key === sizeKey ? dragged.positions : EMPTY_POSITIONS;
  const positionOf = (id: string): Point | undefined => overrides[id] ?? base?.[id];

  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (event.button !== 0) return;
    const origin = positionOf(id);
    if (!origin) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id, pointerX: event.clientX, pointerY: event.clientY, origin, moved: false };
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>, node: GraphNode) => {
    const state = drag.current;
    if (!state || state.id !== node.id) return;
    const dx = event.clientX - state.pointerX;
    const dy = event.clientY - state.pointerY;
    if (!state.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    state.moved = true;
    const size = estimateNodeSize(node);
    const x = Math.min(width - size.width / 2, Math.max(size.width / 2, state.origin.x + dx));
    const y = Math.min(height - size.height / 2, Math.max(size.height / 2, state.origin.y + dy));
    setDragged((previous) => ({
      key: sizeKey,
      positions: { ...(previous.key === sizeKey ? previous.positions : {}), [node.id]: { x, y } },
    }));
  };

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (drag.current?.moved) suppressClick.current = true;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleClick = (id: string) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    onSelect(id);
  };

  const resetView = () => {
    setDragged({ key: '', positions: {} });
    onSelect(null);
  };

  const nodeCount = exploreGraph.nodes.length;
  const nodeStep = Math.min(38, 650 / nodeCount);
  const edgeStep = Math.min(35, 500 / exploreGraph.edges.length);

  const learningNodes = exploreGraph.nodes.filter((node) => node.kind === 'learning');
  const firstLearning = learningNodes[0];
  const firstLearningPosition = firstLearning ? positionOf(firstLearning.id) : undefined;
  const firstLearningSize = firstLearning ? estimateNodeSize(firstLearning) : undefined;

  return (
    <div
      className={clsx(
        'relative overflow-hidden border border-line bg-paper bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:36px_36px]',
        className,
      )}
    >
      <div
        ref={canvasRef}
        role="group"
        aria-label="Relationship map of projects, technologies and current learning"
        className="absolute inset-0"
        onClick={(event) => event.target === event.currentTarget && onSelect(null)}
      >
        {base && (
          <>
            <svg width={width} height={height} className="pointer-events-none absolute inset-0" aria-hidden="true">
              {exploreGraph.edges.map((edge, index) => {
                const from = positionOf(edge.source);
                const to = positionOf(edge.target);
                if (!from || !to) return null;
                const active = selection?.highlightedEdgeIds.has(edge.id) ?? false;
                const muted = selection !== null && !active;
                return (
                  <line
                    key={edge.id}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    pathLength={1}
                    className="graph-edge-enter"
                    style={{
                      animationDelay: `${160 + edgeStep * index}ms`,
                      stroke: active ? 'var(--color-accent)' : 'var(--color-field-line)',
                      strokeWidth: active ? 1.75 : 1,
                      opacity: muted ? 0.18 : 1,
                      transition: 'opacity 200ms, stroke 200ms, stroke-width 200ms',
                    }}
                  />
                );
              })}
            </svg>

            {exploreGraph.nodes.map((node, index) => {
              const point = positionOf(node.id);
              if (!point) return null;
              const selected = selection?.node.id === node.id;
              const dimmed = selection !== null && !selection.highlightedNodeIds.has(node.id);
              const alsoLearning = node.kind === 'technology' && node.currentFocus;
              return (
                <button
                  key={node.id}
                  type="button"
                  data-graph-node=""
                  aria-pressed={selected}
                  aria-label={describeNode(node)}
                  // Technologies are reached through their projects (and the context panel) to keep the tab order short.
                  tabIndex={node.kind === 'technology' ? -1 : 0}
                  onClick={() => handleClick(node.id)}
                  onPointerDown={(event) => handlePointerDown(event, node.id)}
                  onPointerMove={(event) => handlePointerMove(event, node)}
                  onPointerUp={handlePointerEnd}
                  onPointerCancel={handlePointerEnd}
                  className={clsx(
                    'graph-node-enter absolute z-[2] -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-none select-none transition-[opacity,border-color,box-shadow] duration-200',
                    nodeStyle[node.kind],
                    alsoLearning && 'border-dashed border-accent',
                    !selected && ringHover,
                    selected && `z-[3] ${ringSelected}`,
                    dimmed && 'opacity-30',
                  )}
                  style={{
                    left: point.x,
                    top: point.y,
                    animationDelay: `${70 + nodeStep * index}ms`,
                    maxWidth: node.kind === 'project' ? PROJECT_NODE_MAX_WIDTH : undefined,
                  }}
                >
                  {node.kind === 'learning' && (
                    <small className="block text-[8px] font-semibold uppercase tracking-[0.08em]">Exploring</small>
                  )}
                  {alsoLearning && (
                    <span aria-hidden="true" className="mr-1.5 inline-block h-[6px] w-[6px] rounded-full bg-accent align-middle" />
                  )}
                  {node.label}
                </button>
              );
            })}

            {firstLearningPosition && firstLearningSize && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-accent"
                style={{
                  left: firstLearningPosition.x - firstLearningSize.width / 2,
                  top: firstLearningPosition.y - firstLearningSize.height / 2 - 20,
                }}
              >
                Current direction →
              </div>
            )}
          </>
        )}
      </div>

      <button
        type="button"
        onClick={resetView}
        aria-label="Reset view: clear the selection and restore the layout"
        className="absolute right-3.5 top-3.5 z-[4] h-[34px] border border-line bg-paper px-3 font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-colors duration-200 hover:border-ink"
      >
        Reset
      </button>

      <ul
        aria-label="Legend"
        className="absolute bottom-3.5 left-3.5 z-[4] flex flex-wrap gap-x-[18px] gap-y-1.5 bg-paper/90 p-2 font-mono text-[9px] font-medium uppercase"
      >
        <li className="flex items-center gap-1.5">
          <i className="inline-block h-[9px] w-[9px] bg-ink" /> Identity
        </li>
        <li className="flex items-center gap-1.5">
          <i className="inline-block h-[9px] w-[9px] border border-ink bg-paper" /> Project
        </li>
        <li className="flex items-center gap-1.5">
          <i className="inline-block h-[9px] w-[9px] border border-line bg-stone" /> Technology
        </li>
        <li className="flex items-center gap-1.5">
          <i className="inline-block h-[9px] w-[9px] border border-dashed border-accent bg-stone" /> Also exploring
        </li>
        <li className="flex items-center gap-1.5">
          <i className="inline-block h-[9px] w-[9px] border border-dashed border-accent bg-clay" /> Currently exploring
        </li>
      </ul>
    </div>
  );
}
