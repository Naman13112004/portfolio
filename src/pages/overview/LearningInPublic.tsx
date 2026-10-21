import { ArrowRight } from 'lucide-react';
import type { CurrentFocus, LearningInPublic as LearningType } from '../../data/types';
import { Reveal } from '../../components/reveal';
import { Eyebrow, ExternalLink, SectionTitle } from './primitives';

export default function LearningInPublic({ data, focus }: { data: LearningType; focus: CurrentFocus }) {
  if (!data.active) return null;

  const steps = ['Learn', 'Build', 'Share'];

  return (
    <section
      aria-labelledby="learning-title"
      className="shell-width section-pad grid grid-cols-2 gap-[10vw] border-b border-line max-[680px]:grid-cols-1 max-[680px]:gap-[45px]"
    >
      <Reveal className="min-w-0">
        <Eyebrow>04 / Learning in public</Eyebrow>
        <div
          className="mt-[55px] flex flex-wrap items-center gap-[clamp(10px,2vw,24px)] font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium max-[680px]:mt-[35px]"
          aria-label="Learn, then build, then share"
        >
          {steps.map((step, index) => (
            <span key={step} className="inline-flex items-center gap-[clamp(10px,2vw,24px)]">
              {step}
              {index < steps.length - 1 && (
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
              )}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="min-w-0" delay={0.05}>
        <SectionTitle id="learning-title" className="mb-6">
          {data.series}, one field note at a time.
        </SectionTitle>
        <p className="text-[17px] text-slate">
          Currently learning {focus.primary.join(', ')}, and sharing the experience publicly on {data.primaryPlatform}.
        </p>
        <ExternalLink href={data.profileUrl} className="mt-5">
          Follow the learning series
        </ExternalLink>
      </Reveal>
    </section>
  );
}
