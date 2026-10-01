import type { PersonalInfo, CurrentFocus, Content } from '../../data/types';
import { motion } from 'framer-motion';

interface HeroProps {
  data: PersonalInfo;
  focus: CurrentFocus;
  content: Content;
}

export default function HeroIdentity({ data, focus, content }: HeroProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 md:mt-24 mb-24 md:mb-32 grid md:grid-cols-12 gap-12 md:gap-8 items-start"
    >
      {/* LEFT / PRIMARY */}
      <div className="md:col-span-7 lg:col-span-8">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-[var(--color-ink)] mb-6 leading-tight">
          {data.name}
        </h1>
        <div className="space-y-2 mb-8">
          <h2 className="text-xl md:text-2xl text-[var(--color-ink)] font-semibold">
            {data.role}
          </h2>
          <h3 className="text-lg md:text-xl text-[var(--color-ink-muted)]">
            {data.secondaryRole}
          </h3>
        </div>
        <p className="text-base md:text-lg text-[var(--color-ink-muted)] max-w-xl leading-relaxed">
          {data.status}. {data.bio.split('.')[0]}.
        </p>
      </div>

      {/* RIGHT / CURRENT */}
      <div className="md:col-span-5 lg:col-span-4 bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-border-subtle)] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent)] opacity-20"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-[var(--color-accent)] uppercase">Now</span>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-[var(--color-ink-muted)] mb-3">Current direction:</p>
          <ul className="flex flex-wrap gap-2">
            {focus.primary.map(item => (
              <li key={item} className="text-xs font-medium bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] px-2 py-1 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {content.linkedin.active && (
          <div className="pt-5 border-t border-[var(--color-border-subtle)]">
            <p className="text-sm text-[var(--color-ink-muted)] mb-2">Learning in public on LinkedIn:</p>
            <a href={content.linkedin.url} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
              Ongoing {content.linkedin.currentSeries} series ↗
            </a>
          </div>
        )}
      </div>
    </motion.section>
  );
}
