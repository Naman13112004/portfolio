import type { Interests, Content } from '../../data/types';
import { motion } from 'framer-motion';
import { FaYoutube, FaInstagram } from 'react-icons/fa';

export default function CreativeIdentity({ interests, content }: { interests: Interests, content: Content }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-24 bg-white border border-[var(--color-border-subtle)] rounded-2xl p-8 md:p-12"
    >
      <h2 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-8">
        Outside Code
      </h2>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-sm font-bold tracking-widest text-[var(--color-ink-muted)] uppercase mb-4">Reading & Exploration</h3>
          <ul className="space-y-2">
            {interests.reading.map(r => (
              <li key={r} className="text-[var(--color-ink)] font-medium text-sm">
                {r}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-bold tracking-widest text-[var(--color-ink-muted)] uppercase mb-4">Content & Creation</h3>
          <ul className="space-y-2 mb-6">
            {interests.creative.map(c => (
              <li key={c} className="text-[var(--color-ink)] font-medium text-sm">
                {c}
              </li>
            ))}
          </ul>
          
          <div className="flex gap-4">
            {content.youtube.url && (
              <a href={content.youtube.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-muted)] hover:text-[#FF0000] transition-colors">
                <FaYoutube size={18} />
                {content.youtube.name}
              </a>
            )}
            {content.instagram.url && (
              <a href={content.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink-muted)] hover:text-[#E1306C] transition-colors">
                <FaInstagram size={18} />
                {content.instagram.handle}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
