import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '../../lib/api';

interface ViewModalProps {
  blog: BlogPost | null;
  onClose: () => void;
}

const ViewModal = ({ blog, onClose }: ViewModalProps) => {
  if (!blog) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 20 }} 
          className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold dark:text-white line-clamp-1">{blog.title}</h3>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <X className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="p-8 overflow-y-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
              <Calendar size={16} />
              {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 pb-10">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ViewModal;