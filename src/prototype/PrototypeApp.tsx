import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OverviewMode from './OverviewMode';
import ExploreMode from './ExploreMode';
import ProjectDeepDive from './ProjectDeepDive';

export default function PrototypeApp() {
  const [viewMode, setViewMode] = useState<'overview' | 'explore'>('overview');
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Simplified toggle logic for desktop (hidden on mobile via CSS)
  return (
    <div className="min-h-screen bg-[#F4F0EB] text-[#0F172A] font-sans selection:bg-[#4F46E5] selection:text-white">
      {/* Global Navigation */}
      <header className="fixed top-0 inset-x-0 h-20 px-6 md:px-12 flex items-center justify-between z-40 bg-[#F4F0EB]/90 backdrop-blur-sm border-b border-[#0F172A]/5">
        <div className="font-bold text-xl tracking-tight cursor-pointer" onClick={() => setViewMode('overview')}>
          {'<Naman />'}
        </div>

        {/* Lens Toggle (Hidden on mobile) */}
        <div className="hidden md:flex items-center bg-white rounded-full p-1 shadow-sm border border-[#0F172A]/10">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'overview' ? 'bg-[#F4F0EB] shadow-sm text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('explore')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === 'explore' ? 'bg-[#F4F0EB] shadow-sm text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Explore
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-[#4F46E5] transition-colors">Resume</a>
          <a href="#" className="hover:text-[#4F46E5] transition-colors">Contact</a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen pb-24">
        <AnimatePresence mode="wait">
          {viewMode === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <OverviewMode onProjectSelect={setActiveProject} />
            </motion.div>
          ) : (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-[calc(100vh-5rem)]"
            >
              <ExploreMode onProjectSelect={setActiveProject} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Deep Dive Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDeepDive 
            projectId={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
