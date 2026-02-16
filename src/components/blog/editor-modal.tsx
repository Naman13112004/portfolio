import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, X, Loader2 } from 'lucide-react';
import { createBlog, updateBlog, type BlogPost } from '../../lib/api'; // Add updateBlog

interface EditorModalProps {
  isOpen: boolean;
  password: string;
  initialData: BlogPost | null; // Pass null for new post, or object for editing
  onClose: () => void;
  onSuccess: () => void;
}

const EditorModal = ({ isOpen, password, initialData, onClose, onSuccess }: EditorModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill data if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [initialData, isOpen]);

  const handlePublish = async (e: FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setError('');
    
    try {
      if (initialData) {
        await updateBlog(initialData._id, { title, content, password });
      } else {
        await createBlog({ title, content, password });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to save post");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} 
            className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-3xl h-[80vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold dark:text-white">
                {initialData ? 'Edit Post' : 'Draft New Post'}
              </h3>
              <button onClick={onClose}><X className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" /></button>
            </div>

            <form onSubmit={handlePublish} className="flex flex-col flex-1 p-6 gap-4 overflow-y-auto">
              {error && <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>}
              <input type="text" required placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} className="text-2xl font-bold px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all" />
              <textarea required placeholder="Write your content in Markdown here..." value={content} onChange={(e) => setContent(e.target.value)} className="flex-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:text-white font-mono transition-all" />
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isPublishing} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition-colors cursor-pointer">
                  {isPublishing ? <Loader2 className="animate-spin" /> : <PenTool size={18} />}
                  {isPublishing ? 'Saving...' : (initialData ? 'Update Post' : 'Publish Post')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditorModal;