import type { Education, Achievement } from '../../data/types';
import { motion } from 'framer-motion';

export default function Foundations({ education, achievements }: { education: Education[], achievements: Achievement[] }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-24"
    >
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs font-bold tracking-widest text-[var(--color-ink-muted)] uppercase">Foundations & Milestones</h2>
        <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-6">Education</h3>
          {education.map(edu => (
            <div key={edu.institution} className="mb-6">
              <h4 className="font-semibold text-[var(--color-ink)]">{edu.institution}</h4>
              <p className="text-[var(--color-ink-muted)]">{edu.degree}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-[var(--color-ink-muted)]">{edu.period}</span>
                <span className="px-2 py-1 bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] rounded text-xs font-medium">
                  {edu.grade}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-6">Notable Achievements</h3>
          <ul className="space-y-5">
            {achievements.map((ach, idx) => (
              <li key={idx} className="relative pl-5">
                <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-[var(--color-ink)] rounded-full opacity-40"></span>
                <h4 className="font-semibold text-[var(--color-ink)] text-sm">{ach.title}</h4>
                <p className="text-sm text-[var(--color-ink-muted)] mt-1">{ach.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
}
