import { Outlet, Link } from "react-router-dom";
import { useApp } from "../lib/AppContext";
import Footer from "./footer";
import { AnimatePresence } from "framer-motion";
import ProjectDeepDive from "./project/ProjectDeepDive";
import { portfolioData } from "../data/portfolio";

const Layout = () => {
  const { lensMode, setLensMode, activeProject } = useApp();

  const activeProjectData = activeProject 
    ? portfolioData.projects.find(p => p.title === activeProject) 
    : null;

  return (
    <div className="relative bg-[var(--color-canvas)] min-h-screen text-[var(--color-ink)] font-sans">
      
      {/* Global Navigation Shell */}
      <header className="fixed top-0 inset-x-0 h-20 px-6 md:px-12 flex items-center justify-between z-40 bg-[var(--color-canvas)]/90 backdrop-blur-sm border-b border-[var(--color-border-subtle)]">
        <Link to="/" className="font-display font-bold text-xl tracking-tight cursor-pointer" onClick={() => setLensMode('overview')}>
          {'<Naman />'}
        </Link>

        {/* Lens Toggle (Hidden on mobile for now) */}
        <div className="hidden md:flex items-center bg-white rounded-full p-1 shadow-sm border border-[var(--color-border-subtle)]">
          <button
            onClick={() => setLensMode('overview')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              lensMode === 'overview' ? 'bg-[var(--color-canvas)] shadow-sm text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setLensMode('explore')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              lensMode === 'explore' ? 'bg-[var(--color-canvas)] shadow-sm text-[var(--color-ink)]' : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
            }`}
          >
            Explore
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          {/* Legacy Resume Link */}
          <a href="/assets/Naman Jain Resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">Resume</a>
          <Link to="/contact" className="hover:text-[var(--color-accent)] transition-colors">Contact</Link>
        </div>
      </header>
      
      <main className="relative z-10 min-h-screen pt-20">
        <Outlet />
      </main>

      <Footer />

      <AnimatePresence>
        {activeProjectData && (
          <ProjectDeepDive project={activeProjectData} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;