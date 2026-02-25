import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

interface AchievementSectionProps {
  section: {
    title: string;
    description: string;
    images: { src: string; alt: string }[];
  };
  onImageClick: (image: { src: string; alt: string }) => void;
  index: number;
}

const AchievementSection = ({ section, onImageClick, index }: AchievementSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const PREVIEW_COUNT = 3;
  
  const visibleImages = isExpanded ? section.images : section.images.slice(0, PREVIEW_COUNT);
  const hasMore = section.images.length > PREVIEW_COUNT;
  const morePhotosCount = section.images.length - PREVIEW_COUNT;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-16 bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
          <ImageIcon className="text-blue-500" />
          {section.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {section.description}
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {visibleImages.map((img, idx) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={`${img.src}-${idx}`}
            onClick={() => onImageClick(img)}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-gray-100 dark:bg-gray-800"
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.div layout className="mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium transition-colors border border-gray-200 dark:border-gray-700 cursor-pointer"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={18} /></>
            ) : (
              <>View {morePhotosCount} More {morePhotosCount < 2 ? "Photo" : "Photos"} <ChevronDown size={18} /></>
            )}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AchievementSection;