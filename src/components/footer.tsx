import { portfolioData } from '../data/portfolio';

const links = portfolioData.socials.filter((social) => ['GitHub', 'LinkedIn', 'Twitter (X)'].includes(social.name));

const Footer = () => {
  return (
    <footer className="shell-width flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-7 font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-slate max-[680px]:grid">
      <span>{portfolioData.personalInfo.tagline}</span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-accent"
          >
            {link.name}
          </a>
        ))}
        <span>{portfolioData.personalInfo.name} · Portfolio field notes</span>
      </div>
    </footer>
  );
};

export default Footer;
