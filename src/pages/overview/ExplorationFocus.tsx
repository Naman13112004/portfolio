import { motion } from 'framer-motion';

export default function ExplorationFocus() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative mb-16"
    >
      {/* Node indicator */}
      <div className="absolute -left-[45px] top-4 w-6 h-6 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-canvas)] flex items-center justify-center z-10 hidden md:flex">
        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
      </div>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[var(--color-accent)]/20">
        <h2 className="text-xs md:text-sm font-bold text-[var(--color-accent)] tracking-widest uppercase mb-6 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          Currently Exploring
        </h2>
        
        <p className="text-[var(--color-ink)] text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-2xl">
          Actively transitioning focus toward backend scale, cloud infrastructure, and operational reliability. Building for resilience and zero-downtime.
        </p>
        
        <div className="flex flex-wrap gap-3">
          {['Cloud Infrastructure', 'DevOps', 'AWS', 'CI/CD'].map((item) => (
            <span key={item} className="px-4 py-2 bg-[var(--color-accent)]/5 text-[var(--color-accent)] rounded-lg text-sm font-medium border border-[var(--color-accent)]/10">
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
