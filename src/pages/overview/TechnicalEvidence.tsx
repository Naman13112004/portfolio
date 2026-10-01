import type { TechnicalProfileItem, Project } from '../../data/types';
import { motion } from 'framer-motion';

export default function TechnicalEvidence({ profile, projects }: { profile: TechnicalProfileItem[], projects: Project[] }) {
  // We can search the projects to find where a tech was used as "Evidence"
  const getEvidence = (tech: string) => {
    const usedIn = projects.filter(p => p.tech.some(t => t.toLowerCase() === tech.toLowerCase())).map(p => p.title);
    if (usedIn.length > 0) return usedIn.slice(0, 2).join(', ');
    
    // Hardcode known evidence if not in project tech array explicitly but in resume
    if (tech === 'PHP' || tech === 'Laravel' || tech === 'MySQL') return 'Shipturtle (Production)';
    if (tech === 'Data Structures & Algorithms' || tech === 'OOP') return 'LeetCode (205+), HackerRank Badges';
    if (tech === 'GitHub Actions' || tech === 'CI/CD' || tech === 'Linux') return 'CLIFlow, Infrastructure';
    return 'Academic / Personal';
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-24"
    >
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs font-bold tracking-widest text-[var(--color-ink-muted)] uppercase">Technical Profile</h2>
        <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {profile.map(category => (
          <div key={category.category}>
            <h3 className="text-sm font-bold text-[var(--color-ink)] uppercase tracking-wider mb-4 border-b border-[var(--color-border-subtle)] pb-2">
              {category.category}
            </h3>
            <ul className="space-y-3">
              {category.items.map(tech => (
                <li key={tech} className="flex justify-between items-baseline text-sm">
                  <span className="font-medium text-[var(--color-ink)]">{tech}</span>
                  <span className="text-xs text-[var(--color-ink-muted)] text-right max-w-[50%] truncate" title={getEvidence(tech)}>
                    {getEvidence(tech)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
