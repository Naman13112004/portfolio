import type { ExploreGraph, GraphNode } from '../../data/types';

/**
 * Layout adapter for the Explore graph.
 *
 * The canonical graph (`exploreGraph`) is `{ nodes, edges }`, deep-frozen, with no geometry. A layout
 * engine wants `{ nodes, links }` and writes positions into the objects it is given, so this module
 * builds fresh mutable copies (`SimNode`, `SimLink`), runs the layout on those, and returns plain
 * coordinates keyed by node id. Nothing here touches, or keeps a reference to, the canonical objects.
 *
 * The engine is a small deterministic spring/repulsion/collision relaxation. Identity, project and
 * learning nodes are pinned to a fixed backbone; only technology nodes move, settling between the
 * projects they belong to. It uses no randomness, so the same graph and canvas size always give the
 * same layout. It can be swapped for a library such as d3-force without changing the callers.
 */

export interface Point {
  x: number;
  y: number;
}

export interface CanvasSize {
  width: number;
  height: number;
}

interface NodeSize {
  width: number;
  height: number;
}

interface SimNode extends Point, NodeSize {
  id: string;
  kind: GraphNode['kind'];
  fixed: boolean;
  vx: number;
  vy: number;
}

interface SimLink {
  source: SimNode;
  target: SimNode;
  distance: number;
}

/** Widest a project label may grow before it wraps (kept in step with the node's CSS max-width). */
export const PROJECT_NODE_MAX_WIDTH = 150;

/** Approximate rendered size of a node, used for collision and bounds. Matches the node styles in ExploreGraph. */
export function estimateNodeSize(node: GraphNode): NodeSize {
  const chars = node.label.length;
  switch (node.kind) {
    case 'identity':
      return { width: chars * 10.5 + 54, height: 58 };
    case 'project': {
      const natural = chars * 7.6 + 36;
      const lines = Math.max(1, Math.ceil(natural / PROJECT_NODE_MAX_WIDTH));
      return { width: Math.min(PROJECT_NODE_MAX_WIDTH, natural), height: lines * 18 + 26 };
    }
    case 'technology':
      return { width: chars * 6.3 + (node.currentFocus ? 36 : 26), height: 30 };
    case 'learning':
      return { width: Math.max(72, chars * 6.5 + 26), height: 44 };
  }
}

const CENTER_Y = 0.42;
const EDGE_PADDING = 14;
const ITERATIONS = 360;
/** Space kept clear along the bottom for the legend, and in the top-right corner for the Reset button. */
const LEGEND_RESERVED = 50;
const RESET_KEEP_OUT = { width: 92, height: 60 };

const polar = (center: Point, angle: number, radius: number): Point => ({
  x: center.x + Math.cos(angle) * radius,
  y: center.y + Math.sin(angle) * radius,
});

/** Computes node centres, in canvas pixels, for a canvas of the given size. */
export function computeLayout(graph: ExploreGraph, canvas: CanvasSize): Record<string, Point> {
  const { width: W, height: H } = canvas;
  const center: Point = { x: W / 2, y: H * CENTER_Y };

  // Fresh mutable copies. The canonical graph is never handed to the layout code.
  const nodes: SimNode[] = graph.nodes.map((node) => ({
    id: node.id,
    kind: node.kind,
    ...estimateNodeSize(node),
    x: center.x,
    y: center.y,
    fixed: node.kind !== 'technology',
    vx: 0,
    vy: 0,
  }));
  const byId = new Map(nodes.map((node) => [node.id, node]));

  // edges -> links
  const links: SimLink[] = [];
  for (const edge of graph.edges) {
    const source = byId.get(edge.source);
    const target = byId.get(edge.target);
    if (source && target && edge.kind === 'project-technology') links.push({ source, target, distance: 112 });
  }

  // Backbone: identity at the centre, projects on an ellipse around it, learning topics in a row below.
  const projects = nodes.filter((node) => node.kind === 'project');
  const learning = nodes.filter((node) => node.kind === 'learning');
  const ringAngles = new Map<string, number>();
  projects.forEach((node, index) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / projects.length;
    ringAngles.set(node.id, angle);
    const at = { x: center.x + Math.cos(angle) * W * 0.3, y: center.y + Math.sin(angle) * H * 0.26 };
    node.x = at.x;
    node.y = at.y;
  });
  // Learning topics sit in a centred row above the legend, spaced by their real widths. On a canvas too
  // narrow for one row they wrap onto further rows above it.
  const rowGap = 26;
  const rowLimit = W - 2 * EDGE_PADDING - 20;
  const rows: SimNode[][] = [];
  for (const node of learning) {
    const row = rows[rows.length - 1];
    const rowWidth = row ? row.reduce((sum, n) => sum + n.width, 0) + rowGap * (row.length - 1) : 0;
    if (row && rowWidth + rowGap + node.width <= rowLimit) row.push(node);
    else rows.push([node]);
  }
  rows.forEach((row, rowIndex) => {
    const total = row.reduce((sum, n) => sum + n.width, 0) + rowGap * (row.length - 1);
    let cursor = W / 2 - total / 2;
    const rowHeight = Math.max(...row.map((n) => n.height));
    const fromBottom = rows.length - 1 - rowIndex;
    const y = H - LEGEND_RESERVED - rowHeight / 2 - 8 - fromBottom * (rowHeight + 14);
    for (const node of row) {
      node.x = cursor + node.width / 2;
      node.y = y;
      cursor += node.width + rowGap;
    }
  });

  // Seed technology nodes deterministically: private ones fan out beyond their project, shared ones sit between.
  const projectsOf = new Map<string, SimNode[]>();
  for (const link of links) projectsOf.set(link.target.id, [...(projectsOf.get(link.target.id) ?? []), link.source]);
  const fanIndex = new Map<string, number>();
  for (const node of nodes) {
    if (node.kind !== 'technology') continue;
    const owners = projectsOf.get(node.id) ?? [];
    if (owners.length === 1) {
      const owner = owners[0];
      const k = fanIndex.get(owner.id) ?? 0;
      fanIndex.set(owner.id, k + 1);
      const outward = ringAngles.get(owner.id) ?? -Math.PI / 2;
      const spread = ((k % 7) - 3) * 0.42;
      const at = polar(owner, outward + spread, 118 + (k % 2) * 34);
      node.x = at.x;
      node.y = at.y;
    } else if (owners.length > 1) {
      const mean = {
        x: owners.reduce((sum, o) => sum + o.x, 0) / owners.length,
        y: owners.reduce((sum, o) => sum + o.y, 0) / owners.length,
      };
      const away = Math.atan2(mean.y - center.y, mean.x - center.x);
      const at = polar(mean, away + 0.3, 34);
      node.x = at.x;
      node.y = at.y;
    }
  }

  const free = nodes.filter((node) => !node.fixed);

  // Technologies stay above the learning row (or the legend, when there is no row).
  const floor = learning.length > 0 ? Math.min(...learning.map((node) => node.y - node.height / 2)) - 10 : H - LEGEND_RESERVED;

  const separate = () => {
    for (const a of free) {
      for (const b of nodes) {
        if (a === b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const overlapX = (a.width + b.width) / 2 + 8 - Math.abs(dx);
        const overlapY = (a.height + b.height) / 2 + 8 - Math.abs(dy);
        if (overlapX <= 0 || overlapY <= 0) continue;
        const share = b.fixed ? 1 : 0.5;
        if (overlapX < overlapY) a.x += (dx >= 0 ? 1 : -1) * overlapX * share;
        else a.y += (dy >= 0 ? 1 : -1) * overlapY * share;
      }
    }
  };

  // Keeps every node inside the canvas, above the floor, and clear of the Reset button.
  const clamp = () => {
    for (const node of free) {
      node.x = Math.min(W - node.width / 2 - EDGE_PADDING, Math.max(node.width / 2 + EDGE_PADDING, node.x));
      node.y = Math.min(floor - node.height / 2, Math.max(node.height / 2 + EDGE_PADDING, node.y));
      const underReset = node.x + node.width / 2 > W - RESET_KEEP_OUT.width && node.y - node.height / 2 < RESET_KEEP_OUT.height;
      if (underReset) node.y = RESET_KEEP_OUT.height + node.height / 2;
    }
  };

  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    const alpha = 1 - iteration / ITERATIONS;

    // Springs between a technology and each of its projects.
    for (const { source, target, distance } of links) {
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = ((dist - distance) / dist) * 0.07 * alpha;
      target.vx -= dx * pull;
      target.vy -= dy * pull;
    }

    // Repulsion on technology nodes, from every other node.
    for (const a of free) {
      for (const b of nodes) {
        if (a === b) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist2 = dx * dx + dy * dy || 1;
        if (dist2 > 170 * 170) continue;
        const push = (b.fixed ? 1500 : 900) / dist2;
        const dist = Math.sqrt(dist2);
        a.vx += (dx / dist) * push * alpha;
        a.vy += (dy / dist) * push * alpha;
      }
    }

    for (const node of free) {
      node.vx *= 0.55;
      node.vy *= 0.55;
      node.x += node.vx;
      node.y += node.vy;
    }

    // No overlapping boxes (fixed nodes never move), then back inside the canvas.
    separate();
    separate();
    clamp();
  }

  // Final settle: alternate separation and clamping so neither undoes the other.
  for (let pass = 0; pass < 60; pass++) {
    separate();
    clamp();
  }

  // A node can still end up wedged between fixed neighbours on a narrow canvas. Move any that are to the
  // nearest free spot (a deterministic outward spiral), so no two boxes ever overlap.
  const collides = (node: SimNode, x: number, y: number) =>
    nodes.some(
      (other) =>
        other !== node &&
        Math.abs(x - other.x) < (node.width + other.width) / 2 + 4 &&
        Math.abs(y - other.y) < (node.height + other.height) / 2 + 4,
    );
  const fits = (node: SimNode, x: number, y: number) =>
    x >= node.width / 2 + EDGE_PADDING &&
    x <= W - node.width / 2 - EDGE_PADDING &&
    y >= node.height / 2 + EDGE_PADDING &&
    y <= floor - node.height / 2 &&
    !(x + node.width / 2 > W - RESET_KEEP_OUT.width && y - node.height / 2 < RESET_KEEP_OUT.height);
  for (const node of free) {
    if (!collides(node, node.x, node.y)) continue;
    search: for (let radius = 10; radius <= Math.max(W, H); radius += 10) {
      const steps = Math.max(8, Math.round(radius / 6));
      for (let k = 0; k < steps; k++) {
        const angle = (k / steps) * 2 * Math.PI;
        const x = node.x + Math.cos(angle) * radius;
        const y = node.y + Math.sin(angle) * radius;
        if (fits(node, x, y) && !collides(node, x, y)) {
          node.x = x;
          node.y = y;
          break search;
        }
      }
    }
  }

  const positions: Record<string, Point> = {};
  for (const node of nodes) positions[node.id] = { x: Math.round(node.x), y: Math.round(node.y) };
  return positions;
}
