import type { Project } from '../../data/types';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useApp } from '../../lib/AppContext';
import { Reveal, RevealSecondary } from '../../components/reveal';
import { Eyebrow, SectionLabel, SectionTitle, TechChips } from './primitives';

/** Text-only project list. Images are reserved for the case study (ProjectDeepDive). */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const { setActiveProject } = useApp();

  return (
    <section aria-labelledby="builds-title" className="shell-width section-pad">
      <Reveal className="mb-20 grid grid-cols-[0.55fr_1.45fr] gap-[5vw] max-[680px]:mb-[45px] max-[680px]:grid-cols-1 max-[680px]:gap-[45px]">
        <SectionLabel number="02">Selected builds</SectionLabel>
        <div>
          <SectionTitle id="builds-title" className="mb-6">
            Systems tell better stories through their decisions.
          </SectionTitle>
          <p className="max-w-[590px] text-slate">Six projects, viewed through the engineering choices that shaped them.</p>
        </div>
      </Reveal>

      <div className="border-t border-line">
        {projects.map((project, index) => (
          <Reveal
            as="article"
            key={project.title}
            className={clsx(
              'group relative grid grid-cols-[70px_1.3fr_1fr] items-start gap-[30px] border-b border-line transition-colors duration-200 focus-within:bg-paper/45 hover:bg-paper/45 max-[900px]:grid-cols-[45px_1.2fr_0.8fr] max-[900px]:gap-[18px] max-[680px]:grid-cols-[35px_1fr] max-[680px]:py-[35px]',
              project.featured ? 'py-[58px]' : 'py-[42px]',
            )}
          >
            <div className="pt-[7px] font-mono text-[11px] font-medium text-accent">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="min-w-0">
              <Eyebrow>{project.domain}</Eyebrow>
              <h3
                className={clsx(
                  'mb-[14px] mt-2 font-display font-medium leading-[1.1] tracking-[-0.035em] transition-[color,transform] duration-200 ease-[var(--ease-enter)] group-focus-within:translate-x-[3px] group-focus-within:text-accent group-hover:translate-x-[3px] group-hover:text-accent max-[680px]:text-[2rem]',
                  project.featured ? 'text-[clamp(2.3rem,4vw,4rem)]' : 'text-[clamp(1.7rem,3vw,2.8rem)]',
                )}
              >
                {project.shortTitle}
              </h3>
              <p className="text-slate">{project.desc}</p>
              <TechChips items={project.tech.slice(0, 5)} className="mt-[18px]" />
            </div>

            <RevealSecondary className="min-w-0 max-[680px]:col-[2]">
              {project.metric && (
                <strong className="mb-4 block whitespace-nowrap font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.05em] text-forest max-[680px]:text-[2.5rem]">
                  {project.metric}
                </strong>
              )}
              <p className="text-slate">{project.evidence}</p>
              <button
                type="button"
                onClick={() => setActiveProject(project.title)}
                aria-label={`Read case study: ${project.shortTitle}`}
                className="group/cta mt-[18px] inline-flex items-center gap-2 border-b border-current py-1 text-[13px] font-semibold transition-transform duration-150 active:scale-[0.97]"
              >
                Read case study
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-200 ease-[var(--ease-enter)] group-hover/cta:translate-x-1"
                />
              </button>
            </RevealSecondary>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-[280ms] ease-[var(--ease-enter)] group-focus-within:scale-x-100 group-hover:scale-x-100"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
