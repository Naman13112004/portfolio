import type { PersonalInfo, CurrentFocus, Content, Experience } from '../../data/types';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../lib/AppContext';
import { HeroRule, HeroStep } from '../../components/reveal';
import { Eyebrow, TechChips } from './primitives';

interface HeroProps {
  data: PersonalInfo;
  focus: CurrentFocus;
  content: Content;
  /** The role held today, shown in the "Now" note. */
  current: Experience;
}

const pathStep = 'font-mono text-[10px] font-semibold uppercase tracking-[0.07em]';
const pathLine =
  'relative h-px bg-line after:absolute after:-top-[2px] after:right-0 after:border-y-[2px] after:border-l-[4px] after:border-y-transparent after:border-l-line after:content-[""]';

export default function HeroIdentity({ data, focus, content, current }: HeroProps) {
  const { switchLens } = useApp();
  const [firstName, ...otherNames] = data.name.split(' ');

  return (
    <section
      aria-labelledby="hero-title"
      className="shell-width grid min-h-[680px] grid-cols-[1.45fr_0.75fr] items-center gap-[clamp(3rem,8vw,8rem)] border-b border-line py-[70px] max-[900px]:min-h-[620px] max-[900px]:gap-[35px] max-[680px]:block max-[680px]:min-h-0 max-[680px]:pb-[70px] max-[680px]:pt-[50px]"
    >
      <div>
        <HeroStep step={0}>
          <Eyebrow>
            {data.role} · {data.location}
          </Eyebrow>
        </HeroStep>

        <HeroStep as="div" step={1}>
          <h1
            id="hero-title"
            className="mb-3 mt-[22px] font-display text-[clamp(5.2rem,9vw,8.4rem)] font-medium leading-[0.77] tracking-[-0.075em] max-[900px]:text-[clamp(4.2rem,10vw,6rem)] max-[680px]:mt-[25px] max-[680px]:text-[clamp(4.5rem,23vw,6.2rem)]"
          >
            <span className="block">{firstName}</span>
            <span className="ml-[0.62em] block text-accent max-[680px]:ml-[0.3em]">{otherNames.join(' ')}.</span>
          </h1>
        </HeroStep>

        <HeroStep step={2}>
          <p className="mb-4 mt-[38px] font-display text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-tight max-[680px]:mt-[34px] max-[680px]:text-[1.35rem]">
            {data.secondaryRole}
          </p>
        </HeroStep>

        <HeroStep step={3}>
          <p className="max-w-[580px] text-lg text-slate max-[680px]:text-base">{data.intro}</p>
        </HeroStep>

        <HeroStep step={5}>
          <button
            type="button"
            onClick={() => switchLens('explore')}
            className="group mt-[18px] inline-flex items-center gap-2 border-b border-current py-1 font-semibold transition-transform duration-150 active:scale-[0.97]"
          >
            Explore the connections
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className="transition-transform duration-200 ease-[var(--ease-enter)] group-hover:translate-x-1"
            />
          </button>
        </HeroStep>
      </div>

      <HeroStep
        as="aside"
        step={4}
        aria-label="Current focus"
        className="relative border border-line bg-paper p-[clamp(1.5rem,3vw,2.5rem)] shadow-paper max-[680px]:mt-[50px] max-[680px]:shadow-[7px_7px_0_var(--color-stone)]"
      >
        <HeroRule />
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
          <span className="h-[7px] w-[7px] rounded-full bg-accent" aria-hidden="true" />
          Now / 2026
        </div>
        <h2 className="mb-[22px] mt-[35px] font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          Building in production. Learning in public.
        </h2>
        <p className="text-slate">
          {current.role} at <strong className="font-semibold">{current.company}</strong>, while documenting a{' '}
          {content.linkedin.currentSeries} learning series.
        </p>
        <TechChips items={focus.primary} className="mt-5" />
        <div
          className="mt-[35px] grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2"
          aria-label="Learn, build, share"
        >
          <span className={pathStep}>Learn</span>
          <i className={pathLine} />
          <span className={pathStep}>Build</span>
          <i className={pathLine} />
          <span className={pathStep}>Share</span>
        </div>
      </HeroStep>
    </section>
  );
}
