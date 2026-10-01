import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../../data/types';
import { useApp } from '../../lib/AppContext';

export default function ProjectDeepDive({ project }: { project: Project }) {
  const { setActiveProject, lensMode } = useApp();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActiveProject(null);
  }, [setActiveProject]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    // Manage Hash
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    window.history.pushState(null, '', `#${slug}`);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    };
  }, [project.title, handleKeyDown]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-12"
      role="dialog"
      aria-modal="true"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setActiveProject(null)}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full h-full md:h-auto max-h-full md:max-h-[90vh] max-w-4xl bg-[var(--color-canvas)] md:rounded-2xl shadow-2xl overflow-y-auto border-0 md:border border-[var(--color-border-subtle)] flex flex-col"
      >
        <div className="sticky top-0 z-10 bg-[var(--color-canvas)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)] px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveProject(null)}
              className="p-2 -ml-2 rounded-full hover:bg-[var(--color-ink)]/5 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              aria-label="Close case study"
            >
              <X size={20} />
            </button>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-[var(--color-ink-muted)] uppercase">
              {lensMode === 'explore' ? 'Explore View' : 'Case Study'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-sm font-medium flex items-center gap-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
                <Github size={16} /> <span className="hidden sm:inline">Repository</span>
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-sm font-medium flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 transition-colors">
                <ExternalLink size={16} /> <span className="hidden sm:inline">Live Demo</span>
              </a>
            )}
          </div>
        </div>
        
        <div className="p-6 md:p-10 lg:p-12 space-y-12 md:space-y-16">
          
          <header>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--color-ink)] mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-ink-muted)] leading-relaxed mb-8 max-w-3xl">
              {project.desc}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] md:text-xs font-mono font-medium text-[var(--color-ink-muted)] bg-white px-3 py-1.5 rounded border border-[var(--color-border-subtle)] shadow-sm">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="h-px w-full bg-[var(--color-border-subtle)]" />
          </header>

          <section>
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-[var(--color-ink)] uppercase mb-6 flex items-center gap-4">
              Overview & Engineering
              <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
            </h2>
            <div className="prose prose-base md:prose-lg max-w-none text-[var(--color-ink-muted)]">
              <p className="leading-relaxed">
                {project.longDesc}
              </p>
            </div>
          </section>
          
          {project.metrics && project.metrics.length > 0 && (
            <section>
              <h2 className="text-xs md:text-sm font-bold tracking-widest text-[var(--color-ink)] uppercase mb-6 flex items-center gap-4">
                Outcome & Evidence
                <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-[var(--color-border-subtle)] shadow-sm flex flex-col justify-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-2 tracking-tight">
                      {metric.value}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-[var(--color-ink-muted)] uppercase tracking-wider">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.architecture && project.architecture.length > 0 && (
            <section>
              <h2 className="text-xs md:text-sm font-bold tracking-widest text-[var(--color-ink)] uppercase mb-8 flex items-center gap-4">
                Architecture Flow
                <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
              </h2>
              <div className="bg-white p-6 md:p-12 rounded-xl border border-[var(--color-border-subtle)] shadow-sm flex flex-col gap-4">
                {project.architecture.map((node, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-[var(--color-canvas)] border border-[var(--color-ink)]/20 text-[var(--color-ink)] px-4 md:px-6 py-3 md:py-4 rounded-lg font-mono text-xs md:text-sm w-full md:w-auto md:min-w-[300px] text-center shadow-sm">
                      {node.label}
                    </div>
                    {i < project.architecture!.length - 1 && (
                      <div className="h-6 md:h-8 w-px bg-[var(--color-ink)]/30 my-1 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 border-r border-b border-[var(--color-ink)]/50 rotate-45"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.image && (
            <section>
              <h2 className="text-xs md:text-sm font-bold tracking-widest text-[var(--color-ink)] uppercase mb-6 flex items-center gap-4">
                Visuals
                <div className="h-px bg-[var(--color-border-subtle)] flex-1"></div>
              </h2>
              <div className="bg-[var(--color-border-subtle)]/20 rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] p-2">
                <img src={project.image} alt={`${project.title} Preview`} className="w-full h-auto rounded-xl shadow-sm object-cover" loading="lazy" />
              </div>
            </section>
          )}
          
        </div>
      </motion.div>
    </div>
  );
}
