import { motion } from 'framer-motion';

const projects = [
  { id: 'snap-attend', name: 'Snap Attend', tech: 'Next.js · FastAPI · Computer Vision', desc: 'An open-source face-recognition attendance system built for scale.' },
  { id: 'rbac-backend', name: 'RBAC Backend', tech: 'Node.js · Redis · PostgreSQL', desc: 'A secure, high-performance role-based access control system.' },
  { id: 'federated-learning', name: 'Federated Learning', tech: 'Python · Deep Learning', desc: 'Privacy-preserving decentralized machine learning pipeline.' },
  { id: 'meetai', name: 'MeetAI', tech: 'Next.js · WebRTC · OpenAI', desc: 'AI-augmented video calling platform.' },
  { id: 'welth', name: 'Welth', tech: 'Next.js · Prisma', desc: 'Personal finance tracking and analytics.' },
  { id: 'cliflow', name: 'cliflow', tech: 'C++', desc: 'Zero-dependency CLI tool for developer workflows.' },
];

export default function OverviewMode({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
      {/* Hero / Identity */}
      <section className="mb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0F172A] mb-4">
          Naman Jain
        </h1>
        <p className="text-xl md:text-2xl text-[#64748B] mb-2 font-medium">
          Software Engineer · Full Stack, Systems & DevOps
        </p>
        <p className="text-[#64748B] max-w-2xl">
          "Bytes and Beyond: Navigating Tech and Life"
        </p>
      </section>

      {/* Trajectory Timeline */}
      <div className="relative border-l-2 border-[#0F172A]/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-24">
        
        {/* Currently Exploring */}
        <section className="relative">
          <div className="absolute -left-[41px] md:-left-[57px] top-1 w-6 h-6 rounded-full border-2 border-[#4F46E5] bg-[#F4F0EB] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
          </div>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#4F46E5]/20 ring-1 ring-[#4F46E5]/5">
            <h2 className="text-sm font-bold text-[#4F46E5] tracking-wider uppercase mb-2 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              Currently Exploring
            </h2>
            <p className="text-lg md:text-xl font-medium text-[#0F172A]">
              Cloud Infrastructure, DevOps, AWS, and CI/CD Pipelines
            </p>
            <p className="text-[#64748B] mt-2">
              Transitioning from building applications to understanding how systems are deployed, scaled, and maintained in production.
            </p>
          </div>
        </section>

        {/* Selected Work */}
        <section className="relative">
          <div className="absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full border-2 border-[#0F172A]/20 bg-[#F4F0EB]" />
          <h2 className="text-2xl font-bold mb-8">Selected Work</h2>
          
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                onClick={() => onProjectSelect(project.id)}
                className={`bg-white p-6 md:p-8 rounded-2xl cursor-pointer border border-[#0F172A]/5 transition-all ${idx === 0 || idx === 1 ? 'ring-1 ring-[#0F172A]/5' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-1">{project.name}</h3>
                    <p className="text-sm font-mono text-[#64748B] mb-4">{project.tech}</p>
                    <p className="text-[#0F172A]/80">{project.desc}</p>
                  </div>
                  <button className="shrink-0 text-sm font-medium text-[#4F46E5] flex items-center gap-1 group">
                    Read Case Study 
                    <span className="transform transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Profile (Evidence-based) */}
        <section className="relative">
          <div className="absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full border-2 border-[#0F172A]/20 bg-[#F4F0EB]" />
          <h2 className="text-2xl font-bold mb-8">Technical Foundations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/50 p-6 rounded-2xl border border-[#0F172A]/5">
              <h3 className="font-bold mb-4">Frontend & Interfaces</h3>
              <p className="text-[#64748B] leading-relaxed">
                <span className="text-[#0F172A] font-medium">React, Next.js, Tailwind</span> — Applied across MeetAI, Welth, and Snap Attend for complex interactive clients.
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-[#0F172A]/5">
              <h3 className="font-bold mb-4">Backend & Data</h3>
              <p className="text-[#64748B] leading-relaxed">
                <span className="text-[#0F172A] font-medium">Node.js, Express, Redis, Prisma, PostgreSQL</span> — Optimized latency and scaled microservices in RBAC and Welth.
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-[#0F172A]/5">
              <h3 className="font-bold mb-4">AI & Machine Learning</h3>
              <p className="text-[#64748B] leading-relaxed">
                <span className="text-[#0F172A] font-medium">Python, FastAPI, TensorFlow</span> — Built federated learning pipelines and integrated vision models for Snap Attend.
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-[#0F172A]/5">
              <h3 className="font-bold mb-4">Systems & Tools</h3>
              <p className="text-[#64748B] leading-relaxed">
                <span className="text-[#0F172A] font-medium">C++, Linux, Docker</span> — Developed zero-dependency CLI tooling (cliflow).
              </p>
            </div>
          </div>
        </section>

        {/* Origins / Creator */}
        <section className="relative pb-12">
          <div className="absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full border-2 border-[#0F172A]/20 bg-[#F4F0EB]" />
          <h2 className="text-2xl font-bold mb-6">Origins & Identity</h2>
          <div className="bg-[#0F172A] text-white p-8 rounded-2xl">
            <p className="text-[#F4F0EB] text-lg font-medium mb-4">
              I share my journey, document my learnings, and create content around software engineering.
            </p>
            <div className="flex gap-4">
              <a href="#" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">TechyUDP (YouTube)</a>
              <a href="#" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">Instagram</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
