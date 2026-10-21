import { motion } from 'framer-motion';

// Mock data based on the real portfolio data for the prototype
const projectData = {
  'rbac-backend': {
    title: 'RBAC Backend',
    summary: 'A secure, high-performance role-based access control system.',
    problem: 'Managing complex hierarchical permissions securely while ensuring sub-millisecond response times for authorization checks across a distributed system.',
    architecture: 'Designed a polyglot microservice backend using Node.js and Express. Implemented a robust Redis caching layer for authorization checks to avoid heavy database lookups on every request. Data persistence handled by PostgreSQL.',
    decisions: 'Chose Redis over in-memory caching to allow horizontal scaling of the auth microservice without cache invalidation issues across instances.',
    outcome: 'Reduced average authorization latency from ~2s down to ~600ms, improving overall API responsiveness by over 3x.',
    tech: ['Node.js', 'Redis', 'PostgreSQL', 'Express', 'JWT'],
    github: 'https://github.com/naman/rbac',
  }
};

export default function ProjectDeepDive({ projectId, onClose }: { projectId: string, onClose: () => void }) {
  // @ts-ignore
  const data = projectData[projectId] || projectData['rbac-backend'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"
      />
      
      {/* Modal / Sheet */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="relative w-full max-w-3xl max-h-full bg-white rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden border border-[#0F172A]/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-[#F4F0EB] text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
              {data.title}
            </h1>
            <p className="text-xl text-[#64748B] leading-relaxed">
              {data.summary}
            </p>
          </div>
          
          {/* Action Links */}
          <div className="flex gap-4 mb-12 border-b border-[#0F172A]/10 pb-8">
            <a href={data.github} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#0F172A] text-white rounded-xl font-medium hover:bg-[#4F46E5] transition-colors">
              View Source on GitHub
            </a>
          </div>

          {/* Editorial Content */}
          <article className="prose prose-slate prose-lg max-w-none prose-headings:text-[#0F172A] prose-headings:font-bold prose-p:text-[#64748B] prose-p:leading-relaxed">
            
            <h3>The Problem</h3>
            <p>{data.problem}</p>
            
            <h3>The Architecture</h3>
            <p>{data.architecture}</p>
            
            <h3>Technical Decisions</h3>
            <p>{data.decisions}</p>
            
            <h3>The Outcome</h3>
            <div className="my-6 p-6 bg-[#F4F0EB] rounded-2xl border border-[#0F172A]/5">
              <p className="font-medium text-[#0F172A] m-0 text-xl">
                {data.outcome}
              </p>
            </div>

            <h3>Technologies Used</h3>
            <div className="flex flex-wrap gap-2 not-prose mt-4">
              {data.tech.map((t: string) => (
                <span key={t} className="px-4 py-2 bg-white border border-[#0F172A]/20 text-[#0F172A] text-sm font-mono rounded-xl">
                  {t}
                </span>
              ))}
            </div>

          </article>
        </div>
      </motion.div>
    </div>
  );
}
