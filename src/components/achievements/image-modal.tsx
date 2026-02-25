import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageModalProps {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}

const ImageModal = ({ image, onClose }: ImageModalProps) => {
  return (
    <AnimatePresence>
      {image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-5xl max-h-[90vh] flex justify-center items-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-0 right-0 md:-right-12 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <img 
              src={image.src} 
              alt={image.alt} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="absolute -bottom-8 text-white/80 text-sm font-medium tracking-wide">
              {image.alt}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;