import type { Project } from '../../data/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProjectMilestoneProps {
  project: Project;
  isPrimary: boolean;
}

export default function ProjectMilestone({ project, isPrimary }: ProjectMilestoneProps) {
  // Infer a metric/result if it exists in the long description
  const extractMetric = (desc: string) => {
    if (desc.includes('latency from ~2s to ~600ms')) return 'Reduced API latency from ~2s to ~600ms';
    if (desc.includes('achieving 98.93% accuracy')) return 'Achieved 98.93% accuracy on ~15K images';
    if (desc.includes('zero dependencies')) return 'Zero dependencies & static binary';
    return null;
  };
  
  const metric = extractMetric(project.longDesc);

  return (
    <motion.article 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative group ${isPrimary ? 'mb-16' : 'mb-12'}`}
    >
      {/* Node indicator on the spine */}
      <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full border-2 border-[var(--color-ink)] bg-white hidden md:block group-hover:bg-[var(--color-ink)] transition-colors" />
      
      <div className={`bg-white rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden transition-all hover:shadow-md ${isPrimary ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className={`font-display font-bold text-[var(--color-ink)] ${isPrimary ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                {project.title}
              </h3>
            </div>
            
            <p className="text-[var(--color-ink-muted)] mb-6 leading-relaxed max-w-2xl">
              {project.desc}
            </p>
            
            {metric && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-sm font-medium mb-6 border border-green-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                {metric}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.slice(0, 4).map(t => (
                <span key={t} className="text-xs font-medium text-[var(--color-ink-muted)] bg-[var(--color-canvas)] px-2.5 py-1 rounded-md border border-[var(--color-border-subtle)]">
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="text-xs font-medium text-[var(--color-ink-muted)] px-1 py-1">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
            
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors group/btn">
              View Case Study 
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* We only render an image if it's a primary project to preserve space, or render for all but keep it compact */}
          <div className={`shrink-0 rounded-xl overflow-hidden bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] ${isPrimary ? 'w-full md:w-64 h-48 md:h-auto aspect-video' : 'w-full md:w-48 h-32 md:h-auto aspect-video'}`}>
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
