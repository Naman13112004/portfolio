import type { SkillCategory } from '../../data/types';
import { motion } from 'framer-motion';

export default function TechnicalProfile({ skills }: { skills: SkillCategory[] }) {
  // We'll group them compactly, avoiding progress bars.
  // The instruction: "Create a compact evidence-oriented section. Group skills into a small number of meaningful domains"
  
  const domains = [
    { title: "Frontend & UI", match: "Frontend Engineering" },
    { title: "Backend & Systems", match: ["Backend Engineering", "Databases"] },
    { title: "DevOps & Tooling", match: ["DevOps", "Languages & Tooling"] },
    { title: "Applied AI", match: "AI" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 relative"
    >
      <div className="absolute -left-[41px] top-24 w-4 h-4 rounded-full border-2 border-[var(--color-ink)] bg-white hidden md:block" />
      
      <h2 className="font-display text-2xl font-bold mb-12 text-[var(--color-ink)]">Technical Profile</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {domains.map(domain => {
          // Flatten matching categories
          const matchedSkills = skills.filter(cat => {
            if (Array.isArray(domain.match)) {
              return domain.match.some(m => cat.category.includes(m));
            }
            return cat.category.includes(domain.match);
          }).flatMap(cat => cat.items.map(i => i.name));
          
          if (matchedSkills.length === 0) return null;

          return (
            <div key={domain.title} className="bg-white p-6 rounded-2xl border border-[var(--color-border-subtle)]">
              <h3 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-4">
                {domain.title}
              </h3>
              <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed">
                {matchedSkills.join(' · ')}
              </p>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
