import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Cloud, Code2, Database, Terminal } from 'lucide-react';

const SkillCard = ({ title, skills, icon, color }: { title: string, skills: string[], icon: any, color: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-white dark:bg-gray-900 p-8 rounded-2xl border-t-4 ${color} shadow-xl flex flex-col h-full`}
  >
    <div className="flex items-center gap-3 mb-8">
      <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-800`}>
        {icon}
      </div>
      <h3 className="font-bold text-xl dark:text-white tracking-tight">{title}</h3>
    </div>

    {/* Using a grid instead of flex-wrap for a cleaner "table" look */}
    <div className="grid grid-cols-1 gap-4">
      {skills.map(skill => {
        // Splitting the skill from its description (the part in parentheses)
        const [main, detail] = skill.split(' (');
        return (
          <div key={skill} className="group">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
                {main}
              </span>
              {detail && (
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {detail.replace(')', '')}
                </span>
              )}
            </div>
            <div className="mt-2 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                {/* Visual indicator of "Expertise" level based on the card type */}
                <div className={`h-full ${
                    title.includes('Expert') ? 'w-full bg-green-500' : 
                    title.includes('Intermediate') ? 'w-2/3 bg-blue-500' : 'w-1/3 bg-purple-500'
                } opacity-60`} />
            </div>
          </div>
        );
      })}
    </div>
  </motion.div>
);

const SkillsAndLearning = () => {
  return (
    <section id="learning" className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Current Learning - DevOps Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-linear-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 opacity-10">
            <Terminal size={300} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Cloud className="text-blue-400" />
              {portfolioData.learning.title}
            </h3>
            <p className="text-blue-200 mb-6 max-w-2xl">{portfolioData.learning.description}</p>
            <div className="flex flex-wrap gap-4">
              {portfolioData.learning.items.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <section id="skills" className='py-20'>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Technical Arsenal</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Advanced */}
            <SkillCard
              title="Expert / Advanced"
              skills={portfolioData.skills.expert}
              icon={<Code2 className="text-green-500" />}
              color="border-green-500/50"
            />
            {/* Intermediate */}
            <SkillCard
              title="Intermediate"
              skills={portfolioData.skills.intermediate}
              icon={<Database className="text-blue-500" />}
              color="border-blue-500/50"
            />
            {/* Learning */}
            <SkillCard
              title="Learning / Basic"
              skills={portfolioData.skills.beginner}
              icon={<Cloud className="text-purple-500" />}
              color="border-purple-500/50"
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default SkillsAndLearning;