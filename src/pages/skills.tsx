import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Cloud, Terminal } from 'lucide-react';

const Skills = () => {
  return (
    <section className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Proficiency</h1>
           <p className="text-gray-600 dark:text-gray-400">My technical arsenal and what I'm currently learning.</p>
        </motion.div>

        {/* Learning Section (DevOps Highlight) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 bg-linear-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 opacity-10"><Terminal size={300} /></div>
          <div className="relative z-10">
             <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
               <Cloud className="text-blue-400" /> Currently Exploring
             </h3>
             <p className="text-blue-200 mb-6 max-w-2xl">
               Actively transitioning from building applications to understanding how systems are deployed, scaled, monitored, and maintained in real-world production environments.
             </p>
             <div className="flex flex-wrap gap-4">
               {["CI/CD Pipelines", "AWS Architecture", "Kubernetes Concepts", "Linux Administration"].map((item) => (
                 <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                   {item}
                 </div>
               ))}
             </div>
          </div>
        </motion.div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {portfolioData.skills.map((category, idx) => (
             <motion.div
               key={category.category}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
             >
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-l-4 border-blue-500 pl-4">
                 {category.category}
               </h3>
               
               <div className="space-y-4">
                 {category.items.map((skill) => (
                   <div key={skill.name}>
                     <div className="flex justify-between mb-1">
                       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">
                         {skill.level > 85 ? 'Expert' : skill.level > 60 ? 'Intermediate' : 'Beginner'}
                       </span>
                     </div>
                     <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${skill.level}%` }}
                         transition={{ duration: 1, ease: "easeOut" }}
                         className={`h-2.5 rounded-full ${
                           skill.level > 85 ? 'bg-green-500' : 
                           skill.level > 60 ? 'bg-blue-500' : 'bg-purple-500'
                         }`}
                       />
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;