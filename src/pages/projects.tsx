import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const Projects = () => {
  return (
    <section className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Building Digital Experiences
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my journey in Full Stack Development and DevOps.
          </p>
        </motion.div>

        <div className="space-y-12">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-full md:h-100"
            >
              {/* Left: Image */}
              <div className="md:w-1/2 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all z-10" />
                 <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                 />
              </div>

              {/* Right: Content */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between relative bg-white dark:bg-zinc-900/50">
                 <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <Code2 className="text-blue-500 opacity-50" />
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {project.desc || project.longDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 text-xs font-semibold tracking-wide bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800">
                          {t}
                        </span>
                      ))}
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <a href={project.github} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-opacity">
                      <Github size={20} /> View Code
                    </a>
                    <a href={project.live} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <ExternalLink size={20} /> Live Demo
                    </a>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;