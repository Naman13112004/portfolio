import { portfolioData } from '../data/portfolio';

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--color-ink)] text-white py-12 px-6 md:px-12 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="font-display font-bold text-xl tracking-tight mb-2">
            Naman Jain
          </h2>
          <p className="text-white/60 text-sm">
            {portfolioData.personalInfo.tagline}
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-white/60">
          <a href="https://github.com/Naman13112004" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/naman-jain-b65428285/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://x.com/NamanJain1304" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter (X)</a>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10 text-center md:text-left text-sm text-white/40">
        © {new Date().getFullYear()} Naman Jain. Built with React & Tailwind.
      </div>
    </footer>
  );
};

export default Footer;