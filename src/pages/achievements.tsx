import { useState } from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../data/achievements';
import AchievementSection from '../components/achievements/achievement-section';
import ImageModal from '../components/achievements/image-modal';

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-4">
            Gallery & Milestones
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            A collection of memories, milestones, and moments from competitions, fests, and my academic journey.
          </p>
        </motion.div>

        <div className="space-y-4">
          {achievementsData.map((section, index) => (
            <AchievementSection 
              key={section.id} 
              section={section} 
              index={index}
              onImageClick={(img) => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Global Image Modal */}
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
        
      </div>
    </section>
  );
};

export default Achievements;