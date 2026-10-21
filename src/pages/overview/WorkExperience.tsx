import type { Experience } from '../../data/types';
import { Reveal } from '../../components/reveal';
import { Eyebrow, SectionLabel, TechChips } from './primitives';

export default function WorkExperience({ experience }: { experience: Experience[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section aria-labelledby="work-title" className="shell-width section-pad border-b border-line">
      <Reveal>
        <SectionLabel number="01">In production</SectionLabel>
      </Reveal>

      {experience.map((job) => (
        <Reveal
          key={job.company}
          className="mt-12 grid grid-cols-[1fr_1.25fr] gap-[10vw] max-[680px]:mt-[38px] max-[680px]:grid-cols-1 max-[680px]:gap-[45px]"
        >
          <div className="min-w-0">
            {job.current && <Eyebrow>Current role</Eyebrow>}
            <h2
              id="work-title"
              className="my-3 max-w-[560px] font-display text-[clamp(2.2rem,4vw,4rem)] font-medium leading-[1.05] tracking-[-0.045em] max-[680px]:text-[2.55rem]"
            >
              {job.role}
            </h2>
            <p className="font-semibold text-accent">{job.company}</p>
          </div>

          <div className="min-w-0 pt-1.5">
            <p className="font-mono text-xs font-medium">{job.period}</p>
            <ul className="mt-4 max-w-[620px] divide-y divide-line text-slate">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="py-3 first:pt-0">
                  {highlight}
                </li>
              ))}
            </ul>
            <TechChips items={job.technologies} className="mt-7" />
          </div>
        </Reveal>
      ))}
    </section>
  );
}
