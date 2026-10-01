import type { Project } from '../../data/types';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../lib/AppContext';

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const { setActiveProject } = useApp();
  
  // We will divide projects into different hierarchy tiers to avoid identical cards.
  const tier1 = projects.slice(0, 2); // Snap Attend, RBAC
  const tier2 = projects.slice(2, 4); // MeetAI, CLIFlow
  const tier3 = projects.slice(4); // Welth, Federated Learning

  const extractMetric = (desc: string) => {
    if (desc.includes('latency from approximately 2s to 600ms')) return '~2s → ~600ms API latency';
    if (desc.includes('15,000 medical images and achieved 98.93% accuracy')) return '98.93% accuracy on ~15K images';
    if (desc.includes('microservice-based architecture')) return 'Microservices · Node.js + FastAPI';
    if (desc.includes('memory-efficient')) return 'C++ memory-efficient processing';
    if (desc.includes('low-latency communication')) return 'WebSockets · Real-time Sync';
    return null;
  };

  return (
    <section className="mb-32">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-xs font-bold tracking-widest text-[var(--color-ink-muted)] uppercase">Selected Builds</h2>
        <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
      </div>
      
      {/* TIER 1: Large Editorial */}
      <div className="space-y-16 mb-16">
        {tier1.map(project => {
          const metric = extractMetric(project.longDesc);
          return (
            <motion.article 
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-12 gap-8 items-start group"
            >
              <div className="md:col-span-5 order-2 md:order-1">
                <h3 className="text-2xl font-display font-bold text-[var(--color-ink)] mb-4">{project.title}</h3>
                <p className="text-[var(--color-ink-muted)] mb-6 leading-relaxed">
                  {project.desc}
                </p>
                {metric && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-ink)] text-white rounded text-xs font-medium mb-6">
                    {metric}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 5).map(t => (
                    <span key={t} className="text-xs text-[var(--color-ink-muted)] font-mono">{t}</span>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveProject(project.title)}
                  className="text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-1"
                >
                  View Case Study <ArrowRight size={14} />
                </button>
              </div>
              <div className="md:col-span-7 order-1 md:order-2 bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] rounded-xl overflow-hidden aspect-video">
                {project.image && (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" loading="lazy" />
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* TIER 2: Medium Side-by-Side */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {tier2.map(project => {
          const metric = extractMetric(project.longDesc);
          return (
            <motion.article 
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white border border-[var(--color-border-subtle)] rounded-xl p-6 md:p-8 hover:shadow-sm transition-shadow"
            >
              <h3 className="text-xl font-bold text-[var(--color-ink)] mb-3">{project.title}</h3>
              <p className="text-sm text-[var(--color-ink-muted)] mb-6 leading-relaxed line-clamp-3">
                {project.desc}
              </p>
              {metric && (
                <div className="text-xs font-medium text-[var(--color-ink)] mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
                  Evidence: {metric}
                </div>
              )}
              <div className="flex justify-between items-center mt-auto pt-2">
                <span className="text-xs text-[var(--color-ink-muted)] font-mono truncate max-w-[200px]">
                  {project.tech.slice(0, 3).join(' · ')}
                </span>
                <button 
                  onClick={() => setActiveProject(project.title)}
                  className="text-xs font-semibold hover:text-[var(--color-accent)] transition-colors"
                >
                  Details →
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* TIER 3: Compact List */}
      <div className="border-t border-[var(--color-border-subtle)] divide-y divide-[var(--color-border-subtle)]">
        {tier3.map(project => {
          const metric = extractMetric(project.longDesc);
          return (
            <motion.article 
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="md:w-1/3">
                <h3 className="text-base font-bold text-[var(--color-ink)]">{project.title}</h3>
                <span className="text-xs text-[var(--color-ink-muted)] font-mono mt-1 block">
                  {project.tech.slice(0, 3).join(', ')}
                </span>
              </div>
              <div className="md:w-1/2">
                <p className="text-sm text-[var(--color-ink-muted)]">
                  {metric || project.desc.substring(0, 100) + '...'}
                </p>
              </div>
              <div className="md:w-auto text-right">
                <button 
                  onClick={() => setActiveProject(project.title)}
                  className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                  View →
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
