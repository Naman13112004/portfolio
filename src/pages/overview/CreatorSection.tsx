import type { SocialLink } from '../../data/types';
import { motion } from 'framer-motion';
import React from 'react';

export default function CreatorSection({ socials }: { socials: SocialLink[] }) {
  const creatorLinks = socials.filter(s => s.name === 'YouTube' || s.name === 'Instagram');
  
  if (creatorLinks.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 relative"
    >
      <div className="absolute -left-[41px] top-24 w-4 h-4 rounded-full border-2 border-[var(--color-ink)] bg-white hidden md:block" />
      
      <div className="bg-[var(--color-ink)] text-white p-8 md:p-12 rounded-2xl">
        <h2 className="font-display text-2xl font-bold mb-4">Beyond the Code</h2>
        <p className="text-white/70 max-w-2xl mb-8 text-lg">
          I am a learnaholic Full Stack Developer with a passion for building scalable web applications. When I'm not coding, you'll find me creating content and exploring tech.
        </p>
        
        <div className="flex flex-wrap gap-4">
          {creatorLinks.map(link => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg font-medium text-sm"
            >
              {React.createElement(link.icon, { size: 18 })}
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
