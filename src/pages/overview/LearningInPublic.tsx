import type { LearningInPublic as LearningType } from '../../data/types';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';

export default function LearningInPublic({ data }: { data: LearningType }) {
  if (!data.active) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-24"
    >
      <div className="bg-[var(--color-ink)] text-white p-8 md:p-12 rounded-2xl relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 opacity-70">
              Learning in Public
            </h2>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight">
              I learn <span className="text-[var(--color-accent)] opacity-80">→</span> I build <span className="text-[var(--color-accent)] opacity-80">→</span> I share.
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              {data.description} Currently documenting my journey mastering <strong className="text-white font-semibold">{data.series}</strong>.
            </p>
            <a 
              href={data.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[var(--color-ink)] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
            >
              <FaLinkedin size={18} className="text-[#0A66C2]" />
              Follow the series on {data.primaryPlatform}
            </a>
          </div>
          
          <div className="hidden md:flex justify-end">
            <div className="bg-white/10 border border-white/20 p-6 rounded-xl backdrop-blur-sm max-w-xs rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <div className="h-2 w-24 bg-white/20 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/10 rounded"></div>
                <div className="h-2 w-5/6 bg-white/10 rounded"></div>
                <div className="h-2 w-4/6 bg-white/10 rounded"></div>
              </div>
              <div className="mt-4 text-xs font-mono text-white/50">
                #Docker #Kubernetes #DevOps
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
