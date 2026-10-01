import type { Experience } from '../../data/types';
import { motion } from 'framer-motion';

export default function WorkExperience({ experience }: { experience: Experience[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-24"
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-xs font-bold tracking-widest text-[var(--color-ink-muted)] uppercase">In Production</h2>
        <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
      </div>
      
      <div className="space-y-12">
        {experience.map(job => (
          <div key={job.company} className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* Meta */}
            <div className="md:col-span-3 text-sm text-[var(--color-ink-muted)]">
              <p className="font-medium text-[var(--color-ink)] mb-1">{job.period}</p>
              <p>{job.location}</p>
            </div>
            
            {/* Details */}
            <div className="md:col-span-9">
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-1">
                {job.role}
              </h3>
              <p className="text-lg text-[var(--color-ink-muted)] mb-6">
                {job.company}
              </p>
              
              <ul className="space-y-3 mb-6">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx} className="relative pl-5 text-[var(--color-ink-muted)] leading-relaxed">
                    <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-[var(--color-border-subtle)] rounded-full"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {job.technologies.map(tech => (
                  <span key={tech} className="text-xs font-medium text-[var(--color-ink-muted)] bg-white px-2.5 py-1 rounded border border-[var(--color-border-subtle)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
