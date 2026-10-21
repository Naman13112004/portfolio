import { portfolioData } from './portfolio';
import type {
  ExploreGraph,
  GraphEdge,
  GraphNode,
  LearningInPublic,
  LearningNode,
  PortfolioData,
  Project,
  ProjectNode,
  TechnologyNode,
} from './types';

/**
 * Explore relationship layer.
 *
 * `portfolioData` is the only source of truth. The graph and every lookup below are derived from it,
 * so Overview, Explore and ProjectDeepDive always describe the same projects and technologies.
 *
 * Layout-engine boundary: this graph is `{ nodes, edges }`, deep-frozen, and holds no coordinates.
 * A force-graph renderer expects `{ nodes, links }` and mutates the objects it is given, so the
 * renderer must build its own adapter that maps `edges` to `links` and passes copies of the nodes.
 * Never hand it `exploreGraph` directly.
 */

type ExploreSource = Pick<PortfolioData, 'personalInfo' | 'currentFocus' | 'learningInPublic' | 'projects'>;

// ---------------------------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------------------------

/** Matching key for labels: case-insensitive, whitespace-collapsed. Symbols such as "+" and "/" are kept. */
export const normalizeLabel = (label: string) => label.trim().replace(/\s+/g, ' ').toLowerCase();

/** URL/DOM-safe slug of a label. "C++" -> "cplusplus", "CI/CD" -> "ci-cd". */
const slugify = (label: string) =>
  normalizeLabel(label)
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'node';

// ---------------------------------------------------------------------------------------------
// Derivation
// ---------------------------------------------------------------------------------------------

/**
 * Derives the canonical graph from portfolio data.
 *
 * - identity -> project, for every project.
 * - project -> technology, from each project's real `tech` array. Technologies are matched by
 *   normalized label, so "Next.js" used by three projects is one node. Labels are never merged
 *   unless they are the same text ("Express" and "Express.js" stay separate).
 * - A current-focus item whose label exactly matches a project technology reuses that technology
 *   node and marks it `currentFocus`. Any other focus item becomes a `learning` node with no edges.
 *
 * IDs are `<kind prefix>:<slug of label>`, so they are stable across derivations. If two different
 * labels ever share a slug, the later one gets a numeric suffix (deterministic, order-based).
 */
export function deriveExploreGraph(data: ExploreSource): ExploreGraph {
  const usedIds = new Set<string>();
  const claimId = (prefix: string, label: string) => {
    const base = `${prefix}:${slugify(label)}`;
    let id = base;
    for (let n = 2; usedIds.has(id); n++) id = `${base}-${n}`;
    usedIds.add(id);
    return id;
  };

  const focusKeys = new Set(data.currentFocus.primary.map(normalizeLabel));

  const identity: GraphNode = {
    kind: 'identity',
    id: claimId('identity', data.personalInfo.name),
    label: data.personalInfo.name,
  };

  const projectNodes: ProjectNode[] = [];
  const technologyNodes = new Map<string, TechnologyNode>();
  const edges = new Map<string, GraphEdge>();
  const addEdge = (source: string, target: string, kind: GraphEdge['kind']) => {
    const id = `${source}->${target}`;
    if (!edges.has(id)) edges.set(id, { id, source, target, kind });
  };

  for (const project of data.projects) {
    const projectNode: ProjectNode = {
      kind: 'project',
      id: claimId('project', project.title),
      label: project.shortTitle,
      projectTitle: project.title,
    };
    projectNodes.push(projectNode);
    addEdge(identity.id, projectNode.id, 'identity-project');

    for (const technology of project.tech) {
      const key = normalizeLabel(technology);
      let node = technologyNodes.get(key);
      if (!node) {
        node = { kind: 'technology', id: claimId('tech', technology), label: technology.trim(), currentFocus: focusKeys.has(key) };
        technologyNodes.set(key, node);
      }
      addEdge(projectNode.id, node.id, 'project-technology');
    }
  }

  const learningNodes: LearningNode[] = [];
  const seenFocus = new Set<string>();
  for (const focus of data.currentFocus.primary) {
    const key = normalizeLabel(focus);
    if (seenFocus.has(key) || technologyNodes.has(key)) continue;
    seenFocus.add(key);
    learningNodes.push({ kind: 'learning', id: claimId('learning', focus), label: focus.trim() });
  }

  return {
    nodes: [identity, ...projectNodes, ...technologyNodes.values(), ...learningNodes],
    edges: [...edges.values()],
  };
}

function deepFreezeGraph(graph: ExploreGraph): ExploreGraph {
  graph.nodes.forEach(Object.freeze);
  graph.edges.forEach(Object.freeze);
  Object.freeze(graph.nodes);
  Object.freeze(graph.edges);
  return Object.freeze(graph);
}

/** The production graph, derived once from `portfolioData`. Deep-frozen. */
export const exploreGraph: ExploreGraph = deepFreezeGraph(deriveExploreGraph(portfolioData));

// ---------------------------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------------------------

const nodesById = new Map<string, GraphNode>(exploreGraph.nodes.map((node) => [node.id, node]));
const projectsByTitle = new Map<string, Project>(portfolioData.projects.map((project) => [project.title, project]));
const projectNodeIdsByTitle = new Map<string, string>();
const technologyIdsByKey = new Map<string, string>();
for (const node of exploreGraph.nodes) {
  if (node.kind === 'project') projectNodeIdsByTitle.set(node.projectTitle, node.id);
  if (node.kind === 'technology') technologyIdsByKey.set(normalizeLabel(node.label), node.id);
}

const incidentEdges = new Map<string, GraphEdge[]>();
for (const edge of exploreGraph.edges) {
  for (const endpoint of [edge.source, edge.target]) {
    const list = incidentEdges.get(endpoint) ?? [];
    list.push(edge);
    incidentEdges.set(endpoint, list);
  }
}

const otherEnd = (edge: GraphEdge, nodeId: string) => (edge.source === nodeId ? edge.target : edge.source);

export const getNode = (nodeId: string): GraphNode | undefined => nodesById.get(nodeId);

/** The portfolio record behind a project node, or undefined for any other or unknown node. */
export function getProjectForNode(nodeId: string): Project | undefined {
  const node = nodesById.get(nodeId);
  return node?.kind === 'project' ? projectsByTitle.get(node.projectTitle) : undefined;
}

/** The project node for a `Project.title` (the value AppContext.activeProject holds). */
export const getNodeIdForProject = (projectTitle: string): string | undefined => projectNodeIdsByTitle.get(projectTitle);

/** Technologies listed in the project's `tech` array, in that order. Unknown project -> []. */
export function getTechnologiesForProject(projectTitle: string): TechnologyNode[] {
  const projectNodeId = projectNodeIdsByTitle.get(projectTitle);
  if (!projectNodeId) return [];
  return (incidentEdges.get(projectNodeId) ?? [])
    .filter((edge) => edge.kind === 'project-technology')
    .map((edge) => nodesById.get(edge.target))
    .filter((node): node is TechnologyNode => node?.kind === 'technology');
}

/**
 * Project records whose `tech` array contains the technology, in portfolio order.
 * Matching is by normalized label. A topic that is only a learning focus, or an unknown name, -> [].
 */
export function getProjectsForTechnology(technologyName: string): Project[] {
  const technologyId = technologyIdsByKey.get(normalizeLabel(technologyName));
  if (!technologyId) return [];
  return (incidentEdges.get(technologyId) ?? [])
    .map((edge) => getProjectForNode(edge.source))
    .filter((project): project is Project => project !== undefined);
}

/** Ids of the nodes directly linked to the node. Unknown node -> []. */
export function getConnectedNodeIds(nodeId: string): string[] {
  return (incidentEdges.get(nodeId) ?? []).map((edge) => otherEnd(edge, nodeId));
}

/** Edges that touch the node. Unknown node -> []. */
export function getConnectedEdges(nodeId: string): GraphEdge[] {
  return [...(incidentEdges.get(nodeId) ?? [])];
}

// ---------------------------------------------------------------------------------------------
// Selection
// ---------------------------------------------------------------------------------------------

export interface GraphSelection {
  node: GraphNode;
  /** Directly connected nodes only. */
  neighbors: GraphNode[];
  /** Edges incident to the selected node. */
  edges: GraphEdge[];
  /** The node plus its direct neighbors: what to draw at full strength. Everything else dims. */
  highlightedNodeIds: ReadonlySet<string>;
  highlightedEdgeIds: ReadonlySet<string>;
}

/** What to highlight when a node is selected: the node and its direct relationships. Unknown id -> null. */
export function getGraphSelection(nodeId: string): GraphSelection | null {
  const node = nodesById.get(nodeId);
  if (!node) return null;
  const edges = getConnectedEdges(nodeId);
  const neighbors = edges.map((edge) => nodesById.get(otherEnd(edge, nodeId))).filter((n): n is GraphNode => n !== undefined);
  return {
    node,
    neighbors,
    edges,
    highlightedNodeIds: new Set([nodeId, ...neighbors.map((n) => n.id)]),
    highlightedEdgeIds: new Set(edges.map((edge) => edge.id)),
  };
}

export interface CurrentFocusContext {
  node: TechnologyNode | LearningNode;
  /** `currentFocus.statement` from the portfolio data. */
  statement: string;
  /** Learning-in-public details (series, platform, profile URL) from the portfolio data. */
  learningInPublic: LearningInPublic;
  /** Projects that already list this as a technology. Empty for topics that are only being learned. */
  demonstratedIn: Project[];
}

/**
 * Context for a current-learning selection. Returns null for nodes that are not part of the current
 * focus (projects, identity, technologies outside it) and for unknown ids.
 * `demonstratedIn` is what keeps "being learned" separate from "already used": Docker has projects,
 * Kubernetes has none.
 */
export function getCurrentFocusContext(nodeId: string): CurrentFocusContext | null {
  const node = nodesById.get(nodeId);
  if (!node) return null;
  if (node.kind === 'technology' && node.currentFocus) {
    return {
      node,
      statement: portfolioData.currentFocus.statement,
      learningInPublic: portfolioData.learningInPublic,
      demonstratedIn: getProjectsForTechnology(node.label),
    };
  }
  if (node.kind === 'learning') {
    return {
      node,
      statement: portfolioData.currentFocus.statement,
      learningInPublic: portfolioData.learningInPublic,
      demonstratedIn: [],
    };
  }
  return null;
}
