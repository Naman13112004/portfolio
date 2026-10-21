import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import { portfolioData } from '../../data/portfolio';
import {
  exploreGraph,
  getCurrentFocusContext,
  getNodeIdForProject,
  getProjectForNode,
  getProjectsForTechnology,
  getTechnologiesForProject,
} from '../../data/explore-data';
import type { CurrentFocusContext, GraphSelection } from '../../data/explore-data';
import type { Project } from '../../data/types';
import { useApp } from '../../lib/AppContext';
import { contextPanel } from '../../lib/motion';

/**
 * Details for the current Explore selection. One implementation serves both layouts:
 * - "desktop": the dark ink panel beside the graph.
 * - "mobile": content for the paper card in ExploreMobile, with touch-sized targets and the
 *   Make-style "stem + Connected ..." relationship list.
 * The graph, helpers and selection are the same either way.
 */

export type ExploreContextVariant = 'desktop' | 'mobile';

interface ExploreContextProps {
  selection: GraphSelection | null;
  onSelect: (nodeId: string | null) => void;
  variant?: ExploreContextVariant;
  /** Mobile only: false when the picker above already shows the selected project/technology as its title. */
  showTitle?: boolean;
  className?: string;
}

interface Style {
  touch: boolean;
  shell: string;
  pad: string;
  type: string;
  body: string;
  faint: string;
  rule: string;
  chip: string;
  hover: string;
  metric: string;
  clear: string;
}

const styles: Record<ExploreContextVariant, Style> = {
  desktop: {
    touch: false,
    shell: 'min-h-[300px] bg-ink text-white',
    pad: 'p-7',
    type: 'text-accent-soft',
    body: 'text-on-ink-soft',
    faint: 'text-on-ink-faint',
    rule: 'border-ink-line',
    chip: 'border-ink-line bg-ink-raised px-[9px] py-1.5 hover:border-accent-soft',
    hover: 'hover:text-accent-soft',
    metric: 'text-accent-soft',
    clear: 'text-on-ink-faint hover:text-paper',
  },
  mobile: {
    touch: true,
    shell: 'text-ink',
    pad: '',
    type: 'text-accent',
    body: 'text-slate',
    faint: 'text-slate',
    rule: 'border-line',
    chip: 'min-h-11 border-line bg-stone px-3 hover:border-accent',
    hover: 'hover:text-accent',
    metric: 'text-forest',
    clear: 'text-slate hover:text-ink',
  },
};

const StyleContext = createContext<Style>(styles.desktop);
const useStyle = () => useContext(StyleContext);

type Select = (nodeId: string | null) => void;

function TypeLabel({ children }: { children: ReactNode }) {
  const s = useStyle();
  return <p className={clsx('font-mono text-[11px] font-semibold uppercase tracking-[0.1em]', s.type)}>{children}</p>;
}

function Heading({ children }: { children: ReactNode }) {
  const s = useStyle();
  return (
    <h3
      className={clsx(
        'font-display font-medium tracking-[-0.03em]',
        s.touch ? 'mb-2 mt-5 text-[2.2rem] leading-[1.05]' : 'my-[17px] text-[1.8rem] leading-[1.1]',
      )}
    >
      {children}
    </h3>
  );
}

function Body({ children, className }: { children: ReactNode; className?: string }) {
  const s = useStyle();
  return <p className={clsx('text-sm', s.body, className)}>{children}</p>;
}

function Caption({ children, className, inline = false }: { children: ReactNode; className?: string; inline?: boolean }) {
  const s = useStyle();
  const classes = clsx('font-mono text-[10px] font-medium uppercase', s.faint, className);
  // Project-row captions are inline spans so they keep the page's line height (as before the mobile variant existed).
  return inline ? <span className={classes}>{children}</span> : <p className={classes}>{children}</p>;
}

/** The Make "stem": a thin accent line from the selected node down to what it connects to. */
function Relations({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-1">
      <div aria-hidden="true" className="ml-2.5 h-[30px] w-px bg-accent" />
      <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">{label}</p>
      {children}
    </div>
  );
}

function OpenCaseStudy({ project }: { project: Project }) {
  const { setActiveProject } = useApp();
  const s = useStyle();
  return (
    <button
      type="button"
      onClick={() => setActiveProject(project.title)}
      aria-label={`Open case study: ${project.shortTitle}`}
      className={clsx(
        'group inline-flex items-center gap-2 text-[13px] font-semibold transition-colors duration-200',
        s.hover,
        s.touch ? 'min-h-11 underline decoration-1 underline-offset-4' : 'border-b border-current py-1',
      )}
    >
      Open case study
      <ArrowRight
        size={14}
        strokeWidth={1.5}
        aria-hidden="true"
        className="transition-transform duration-200 ease-[var(--ease-enter)] group-hover:translate-x-1"
      />
    </button>
  );
}

function ClearSelection({ onSelect }: { onSelect: Select }) {
  const s = useStyle();
  return (
    <button
      type="button"
      onClick={() => onSelect(null)}
      className={clsx(
        'mt-6 font-mono text-[10px] font-medium uppercase tracking-[0.08em] underline underline-offset-4 transition-colors duration-200',
        s.clear,
        s.touch ? 'inline-flex min-h-11 items-center' : 'block',
      )}
    >
      Clear selection
    </button>
  );
}

function LearningInPublicLink() {
  const { learningInPublic } = portfolioData;
  const s = useStyle();
  return (
    <div className="mt-5">
      <Caption>
        {learningInPublic.series} series · Learning in public on {learningInPublic.primaryPlatform}
      </Caption>
      <a
        href={learningInPublic.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          'group/link inline-flex items-center gap-[7px] text-xs font-semibold underline underline-offset-4 transition-colors duration-200',
          s.hover,
          s.touch ? 'mt-1 min-h-11' : 'mt-3',
        )}
      >
        Open {learningInPublic.primaryPlatform} profile
        <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}

function LearnBuildShare() {
  const s = useStyle();
  return (
    <p
      className={clsx('my-6 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase', s.type)}
      aria-label="Learn, build, share"
    >
      Learn <ArrowRight size={12} aria-hidden="true" /> Build <ArrowRight size={12} aria-hidden="true" /> Share
    </p>
  );
}

/** For a technology that is also a current focus: it keeps its projects and says it is still being learned. */
function FocusBlock({ focus, projectCount }: { focus: CurrentFocusContext; projectCount: number }) {
  const s = useStyle();
  return (
    <div className={clsx('mt-6 border-t pt-[18px]', s.rule)}>
      <TypeLabel>Also currently exploring</TypeLabel>
      <Body className="mt-3">
        Used in the project{projectCount === 1 ? '' : 's'} above, and still part of the current learning direction.
      </Body>
      <Body className="mt-3">{focus.statement}</Body>
      <LearningInPublicLink />
    </div>
  );
}

/** A connected project, listed under a technology or the identity. */
function ProjectRow({ project, onSelect, compact = false }: { project: Project; onSelect: Select; compact?: boolean }) {
  const s = useStyle();
  const number = String(portfolioData.projects.findIndex((p) => p.title === project.title) + 1).padStart(2, '0');
  const nodeId = getNodeIdForProject(project.title);
  return (
    <li className={clsx('border-t', s.rule, compact ? (s.touch ? 'pt-2' : 'pt-3') : 'pt-[18px]')}>
      <Caption inline>
        {number} / {project.domain}
      </Caption>
      <button
        type="button"
        onClick={() => nodeId && onSelect(nodeId)}
        className={clsx(
          'text-left font-semibold transition-colors duration-200',
          s.hover,
          s.touch ? 'flex min-h-11 w-full items-center justify-between gap-3 text-base' : 'mt-1.5 block',
        )}
      >
        {project.shortTitle}
        {s.touch && <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />}
      </button>
      {!compact && (
        <>
          <p className={clsx('mt-1 text-[13px]', s.body)}>{project.evidence}</p>
          <div className="mt-2">
            <OpenCaseStudy project={project} />
          </div>
        </>
      )}
    </li>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div className={useStyle().pad}>{children}</div>;
}

function DesktopBody({ selection, onSelect }: { selection: GraphSelection | null; onSelect: Select }) {
  const s = useStyle();

  if (!selection) {
    return (
      <div className="min-h-[300px] bg-stone p-7 text-ink">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em]">Reading the map</p>
        <h3 className="my-[17px] font-display text-[1.8rem] font-medium leading-[1.1] tracking-[-0.03em]">
          Select a node to follow its relationships.
        </h3>
        <p className="text-sm text-slate">
          Project links come from the technologies each project lists. Dashed clay nodes are topics currently being
          learned, with no project attached yet. Drag any node to rearrange; Reset restores the layout.
        </p>
      </div>
    );
  }

  const { node } = selection;

  if (node.kind === 'identity') {
    const { personalInfo } = portfolioData;
    const projects = selection.neighbors
      .map((neighbor) => getProjectForNode(neighbor.id))
      .filter((project): project is Project => project !== undefined);
    return (
      <div className={s.shell}>
        <Panel>
          <TypeLabel>Identity</TypeLabel>
          <Heading>{node.label}</Heading>
          <Body>
            {personalInfo.role} · {personalInfo.secondaryRole}
          </Body>
          <Body className="mt-3">{personalInfo.intro}</Body>
          <Caption className="mb-3 mt-6">{projects.length} projects · select one to see its technologies</Caption>
          <ul className="space-y-3">
            {projects.map((project) => (
              <ProjectRow key={project.title} project={project} onSelect={onSelect} compact />
            ))}
          </ul>
          <ClearSelection onSelect={onSelect} />
        </Panel>
      </div>
    );
  }

  if (node.kind === 'project') {
    const project = getProjectForNode(node.id);
    const technologies = getTechnologiesForProject(node.projectTitle);
    return (
      <div className={s.shell}>
        <Panel>
          <TypeLabel>Project{project ? ` · ${project.domain}` : ''}</TypeLabel>
          <Heading>{node.label}</Heading>
          {project?.metric && (
            <p className={clsx('mb-3 font-display text-[2rem] font-medium leading-none tracking-[-0.04em]', s.metric)}>
              {project.metric}
            </p>
          )}
          {project && <Body>{project.evidence}</Body>}
          <Caption className="mb-3 mt-6">
            {technologies.length} technologies · select one to see where else it appears
          </Caption>
          <ul className="flex flex-wrap gap-[7px]">
            {technologies.map((technology) => (
              <li key={technology.id}>
                <button
                  type="button"
                  onClick={() => onSelect(technology.id)}
                  className={clsx('border font-mono text-[10px] font-medium transition-colors duration-200', s.chip)}
                >
                  {technology.label}
                </button>
              </li>
            ))}
          </ul>
          {project && (
            <div className="mt-6">
              <OpenCaseStudy project={project} />
            </div>
          )}
          <ClearSelection onSelect={onSelect} />
        </Panel>
      </div>
    );
  }

  if (node.kind === 'technology') {
    const projects = getProjectsForTechnology(node.label);
    const focus = getCurrentFocusContext(node.id);
    return (
      <div className={s.shell}>
        <Panel>
          <TypeLabel>
            Technology · {projects.length} connected {projects.length === 1 ? 'project' : 'projects'}
          </TypeLabel>
          <Heading>{node.label}</Heading>
          <ul className="space-y-[18px]">
            {projects.map((project) => (
              <ProjectRow key={project.title} project={project} onSelect={onSelect} />
            ))}
          </ul>
          {focus && <FocusBlock focus={focus} projectCount={projects.length} />}
          <ClearSelection onSelect={onSelect} />
        </Panel>
      </div>
    );
  }

  // Learning topic with no project relationships.
  const focus = getCurrentFocusContext(node.id);
  return (
    <div className={s.shell}>
      <Panel>
        <TypeLabel>Currently exploring</TypeLabel>
        <Heading>{node.label}</Heading>
        <Body>{focus?.statement}</Body>
        <Body className="mt-3">
          No project in this portfolio lists {node.label} yet. It is part of the current learning direction, not a
          claim of project experience.
        </Body>
        <LearnBuildShare />
        {focus?.learningInPublic.active && <LearningInPublicLink />}
        <ClearSelection onSelect={onSelect} />
      </Panel>
    </div>
  );
}

function MobileBody({ selection, onSelect, showTitle }: { selection: GraphSelection | null; onSelect: Select; showTitle: boolean }) {
  const s = useStyle();
  const identity = exploreGraph.nodes.find((node) => node.kind === 'identity');

  if (!selection) {
    return (
      <div className={s.shell}>
        <TypeLabel>Reading the map</TypeLabel>
        <Heading>Start anywhere, then follow the lines.</Heading>
        <Body>
          Choose a project, a technology, or a topic being learned. Each one shows what it connects to, and every
          connection is a tap away.
        </Body>
        {identity && (
          <button
            type="button"
            onClick={() => onSelect(identity.id)}
            className="group mt-5 inline-flex min-h-11 items-center gap-2 bg-ink px-[18px] text-[13px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.97]"
          >
            Start from {identity.label}
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-200 ease-[var(--ease-enter)] group-hover:translate-x-1"
            />
          </button>
        )}
      </div>
    );
  }

  const { node } = selection;

  if (node.kind === 'identity') {
    const { personalInfo } = portfolioData;
    const projects = selection.neighbors
      .map((neighbor) => getProjectForNode(neighbor.id))
      .filter((project): project is Project => project !== undefined);
    return (
      <div className={s.shell}>
        <TypeLabel>Identity</TypeLabel>
        <Heading>{node.label}</Heading>
        <Body>
          {personalInfo.role} · {personalInfo.secondaryRole}
        </Body>
        <Body className="mt-3">{personalInfo.intro}</Body>
        <Relations label={`Connected projects · ${projects.length}`}>
          <ul>
            {projects.map((project) => (
              <ProjectRow key={project.title} project={project} onSelect={onSelect} compact />
            ))}
          </ul>
        </Relations>
        <ClearSelection onSelect={onSelect} />
      </div>
    );
  }

  if (node.kind === 'project') {
    const project = getProjectForNode(node.id);
    const technologies = getTechnologiesForProject(node.projectTitle);
    return (
      <div className={s.shell}>
        <TypeLabel>Project{project ? ` · ${project.domain}` : ''}</TypeLabel>
        {showTitle && <Heading>{node.label}</Heading>}
        {project?.metric && (
          <p className={clsx('mt-4 font-display text-[2.2rem] font-medium leading-none tracking-[-0.04em]', s.metric)}>
            {project.metric}
          </p>
        )}
        {project && <Body className="mt-3">{project.evidence}</Body>}
        <Relations label={`Connected technologies · ${technologies.length}`}>
          <ul className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li key={technology.id}>
                <button
                  type="button"
                  onClick={() => onSelect(technology.id)}
                  className={clsx('border font-mono text-[11px] font-medium transition-colors duration-200', s.chip)}
                >
                  {technology.label}
                </button>
              </li>
            ))}
          </ul>
        </Relations>
        {project && (
          <div className="mt-4">
            <OpenCaseStudy project={project} />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-x-6">
          {identity && (
            <button
              type="button"
              onClick={() => onSelect(identity.id)}
              className="mt-6 inline-flex min-h-11 items-center font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-slate underline underline-offset-4 transition-colors duration-200 hover:text-ink"
            >
              Back to {identity.label}
            </button>
          )}
          <ClearSelection onSelect={onSelect} />
        </div>
      </div>
    );
  }

  if (node.kind === 'technology') {
    const projects = getProjectsForTechnology(node.label);
    const focus = getCurrentFocusContext(node.id);
    return (
      <div className={s.shell}>
        <TypeLabel>{focus ? 'Technology · also currently exploring' : 'Technology'}</TypeLabel>
        {showTitle && <Heading>{node.label}</Heading>}
        <Relations label={`Connected projects · ${projects.length}`}>
          <ul>
            {projects.map((project) => (
              <ProjectRow key={project.title} project={project} onSelect={onSelect} />
            ))}
          </ul>
        </Relations>
        {focus && <FocusBlock focus={focus} projectCount={projects.length} />}
        <ClearSelection onSelect={onSelect} />
      </div>
    );
  }

  // Learning topic with no project relationships.
  const focus = getCurrentFocusContext(node.id);
  return (
    <div className={s.shell}>
      <TypeLabel>Currently exploring</TypeLabel>
      <Heading>{node.label}</Heading>
      <Body>{focus?.statement}</Body>
      <Relations label="Connected projects · 0">
        <Body>
          No project in this portfolio lists {node.label} yet. It is part of the current learning direction, not a
          claim of project experience.
        </Body>
      </Relations>
      <LearnBuildShare />
      {focus?.learningInPublic.active && <LearningInPublicLink />}
      <ClearSelection onSelect={onSelect} />
    </div>
  );
}

/** Context for the current graph selection. The live region persists so changes are announced. */
export default function ExploreContext({
  selection,
  onSelect,
  variant = 'desktop',
  showTitle = true,
  className,
}: ExploreContextProps) {
  const reduceMotion = useReducedMotion();
  // Fail safe if the selection ever references data that is not in the graph.
  const safeSelection = selection && exploreGraph.nodes.some((n) => n.id === selection.node.id) ? selection : null;

  return (
    <StyleContext.Provider value={styles[variant]}>
      <div aria-live="polite" className={clsx('relative z-[3]', className)}>
        <motion.aside
          key={safeSelection?.node.id ?? 'empty'}
          aria-label="Selection details"
          variants={contextPanel}
          initial={reduceMotion ? false : 'initial'}
          animate="animate"
        >
          {variant === 'mobile' ? (
            <MobileBody selection={safeSelection} onSelect={onSelect} showTitle={showTitle} />
          ) : (
            <DesktopBody selection={safeSelection} onSelect={onSelect} />
          )}
        </motion.aside>
      </div>
    </StyleContext.Provider>
  );
}
