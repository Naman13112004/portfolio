import { useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { Project } from '../../data/types';
import { portfolioData } from '../../data/portfolio';
import { useApp } from '../../lib/AppContext';
import { backdrop, caseCopy, reveal, revealViewport, sheet } from '../../lib/motion';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Splits a paragraph into its sentences without changing any wording. */
function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean);
}

function slugOf(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const eyebrow = 'font-mono text-[11px] font-semibold uppercase tracking-[0.08em]';

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold text-ink transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight
        size={16}
        aria-hidden
        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

/** A numbered section label ("01 / Engineering notes") on the left, content on the right. */
function CaseSection({
  number,
  label,
  children,
  className = '',
}: {
  number: number;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      aria-label={label}
      className={`grid gap-5 px-[22px] py-[70px] min-[681px]:grid-cols-[170px_minmax(0,1fr)] min-[681px]:gap-0 min-[681px]:px-[clamp(2rem,9vw,7rem)] min-[681px]:py-[95px] ${className}`}
    >
      <p className={`${eyebrow} text-accent`}>
        {String(number).padStart(2, '0')} / {label}
      </p>
      <div className="min-w-0">{children}</div>
    </motion.section>
  );
}

export default function ProjectDeepDive({ project }: { project: Project }) {
  const { setActiveProject, lensMode } = useApp();
  const dialogRef = useRef<HTMLDivElement>(null);

  const index = portfolioData.projects.findIndex((p) => p.title === project.title) + 1;
  const titleId = 'case-title';

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);

    const slug = slugOf(project.title);
    window.history.pushState(null, '', `#${slug}`);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKeyDown);
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      if (opener && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [project.title, setActiveProject]);

  // Keep Tab inside the dialog while it is open.
  const trapTab = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const notes = sentences(project.longDesc);
  const architecture = project.architecture ?? [];
  const metrics = project.metrics ?? [];
  const isReleases = project.live.includes('/releases');
  let section = 0;

  return (
    <motion.div
      variants={backdrop}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-ink/55 backdrop-blur-[4px] min-[681px]:p-9"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setActiveProject(null);
      }}
    >
      <motion.div
        ref={dialogRef}
        variants={sheet}
        initial="initial"
        animate="animate"
        exit="exit"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapTab}
        style={{ transformOrigin: '50% 8%' }}
        className="mx-auto min-h-full w-full max-w-[1060px] bg-paper shadow-[0_25px_80px_rgba(23,32,51,0.25)] outline-none"
      >
        <header className="sticky top-0 z-10 flex h-[62px] items-center justify-between border-b border-line bg-paper/95 px-[18px] backdrop-blur-md min-[681px]:h-[70px] min-[681px]:px-[34px]">
          <button
            type="button"
            onClick={() => setActiveProject(null)}
            aria-label="Close project case study"
            className="group -ml-2 inline-flex min-h-11 items-center gap-2.5 px-2 text-sm font-semibold text-ink"
          >
            <ArrowLeft
              size={16}
              aria-hidden
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em]">
              Back to {lensMode === 'explore' ? 'Explore' : 'previous view'}
            </span>
          </button>
          <span className={`${eyebrow} font-medium text-slate max-[680px]:hidden`}>
            Case file / {String(index).padStart(2, '0')}
          </span>
        </header>

        <article>
          <div className="px-[22px] pb-[45px] pt-[55px] min-[681px]:px-[clamp(2rem,9vw,7rem)] min-[681px]:pb-[70px] min-[681px]:pt-[clamp(3.5rem,8vw,7rem)]">
            <div className="max-w-[900px]">
              <motion.p variants={caseCopy} custom={0} initial="hidden" animate="visible" className={`${eyebrow} text-ink`}>
                {project.domain}
              </motion.p>
              <motion.h1
                id={titleId}
                variants={caseCopy}
                custom={1}
                initial="hidden"
                animate="visible"
                className="mb-8 mt-5 break-words font-display text-[clamp(3rem,7vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.065em] text-ink"
              >
                {project.title}
              </motion.h1>
              <motion.p
                variants={caseCopy}
                custom={2}
                initial="hidden"
                animate="visible"
                className="max-w-[720px] text-[clamp(1.1rem,2vw,1.4rem)] leading-relaxed text-slate"
              >
                {project.desc}
              </motion.p>
              <motion.div
                variants={caseCopy}
                custom={3}
                initial="hidden"
                animate="visible"
                className="mt-6 flex flex-wrap gap-x-7 gap-y-1"
              >
                {project.github && <ExternalLink href={project.github}>GitHub source</ExternalLink>}
                {project.live && (
                  <ExternalLink href={project.live}>{isReleases ? 'Releases' : 'Live demo'}</ExternalLink>
                )}
              </motion.div>
            </div>
          </div>

          <div className="grid gap-4 bg-stone px-[22px] py-[23px] min-[681px]:grid-cols-[170px_minmax(0,1fr)] min-[681px]:items-start min-[681px]:gap-0 min-[681px]:px-[clamp(2rem,9vw,7rem)] min-[681px]:py-[25px]">
            <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink min-[681px]:pt-[7px]">
              Technical field notes
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="border border-line bg-paper px-3 py-1.5 font-mono text-xs text-ink"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <CaseSection number={++section} label="Engineering notes">
            <ol className="max-w-[680px] divide-y divide-line border-y border-line">
              {notes.map((note, i) => (
                <li key={i} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-2 py-4 text-[17px] leading-relaxed text-slate">
                  <span className="pt-1 font-mono text-[11px] font-medium text-accent" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="break-words">{note}</span>
                </li>
              ))}
            </ol>
          </CaseSection>

          {architecture.length > 0 && (
            <motion.section
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              aria-label="Component flow"
              className="bg-ink px-[22px] py-[55px] text-white min-[681px]:px-[clamp(2rem,6vw,5rem)] min-[681px]:py-[70px]"
            >
              <p className={`${eyebrow} text-accent-soft`}>
                {String(++section).padStart(2, '0')} / Component flow
              </p>
              <ol
                className="mt-9 grid grid-cols-1 min-[901px]:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
                style={{ ['--cols' as string]: architecture.length }}
              >
                {architecture.map((node, i) => (
                  <li
                    key={node.label}
                    className="relative flex min-h-[70px] flex-col justify-between gap-6 border border-ink-line p-3.5 min-[901px]:min-h-[115px] max-[900px]:-mt-px"
                  >
                    <span className="font-mono text-[11px] font-medium text-accent-soft">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <strong className="font-mono text-xs font-medium leading-snug">{node.label}</strong>
                    {i < architecture.length - 1 && (
                      <>
                        <ArrowRight
                          size={16}
                          aria-hidden
                          className="absolute -right-[9px] top-1/2 z-[2] -translate-y-1/2 bg-ink text-accent-soft max-[900px]:hidden"
                        />
                        <ChevronDown
                          size={16}
                          aria-hidden
                          className="absolute -bottom-[9px] left-1/2 z-[2] -translate-x-1/2 bg-ink text-accent-soft min-[901px]:hidden"
                        />
                      </>
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-3.5 text-xs text-on-ink-muted">
                Component order as recorded for this project; not a claim about deployment topology.
              </p>
            </motion.section>
          )}

          {metrics.length > 0 ? (
            <CaseSection number={++section} label="Documented outcome">
              <dl className="grid gap-10">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="whitespace-normal break-words font-display text-[clamp(3rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.06em] text-forest">
                      {m.value}
                    </dd>
                    <dt className={`${eyebrow} mt-4 text-slate`}>{m.label}</dt>
                  </div>
                ))}
              </dl>
              <p className="mt-9 max-w-[560px] text-[17px] leading-relaxed text-slate">{project.evidence}</p>
            </CaseSection>
          ) : (
            <CaseSection number={++section} label="Engineering evidence">
              <p className="max-w-[640px] font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
                {project.evidence}
              </p>
            </CaseSection>
          )}

          {project.image && (
            <CaseSection number={++section} label="Project mark" className="border-t border-line">
              <figure className="max-w-[420px]">
                <div className="overflow-hidden border border-line bg-stone">
                  <img
                    src={project.image}
                    alt={`${project.shortTitle} project mark`}
                    loading="lazy"
                    className="block h-auto max-h-60 w-full object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-xs text-slate">
                  The logo or wordmark used for {project.shortTitle}, not a screenshot of the application.
                </figcaption>
              </figure>
            </CaseSection>
          )}
        </article>
      </motion.div>
    </motion.div>
  );
}
