import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 bg-gray-50 dark:bg-black relative overflow-hidden">
      {/* Background Decor */}
      {/* <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-4">
            Hello World! I am
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            {portfolioData.personalInfo.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {portfolioData.personalInfo.role}
            <span className="text-purple-600 dark:text-purple-400"> {portfolioData.personalInfo.secondaryRole}</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {portfolioData.personalInfo.bio}
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            {portfolioData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors transform hover:scale-110"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/25 animate-bounce cursor-pointer"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;