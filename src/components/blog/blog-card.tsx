import { motion } from 'framer-motion';
import { Calendar, BookOpen, Edit3, Trash2 } from 'lucide-react'; // Added Trash2
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '../../lib/api';

interface BlogCardProps {
  blog: BlogPost;
  index: number;
  isAdmin: boolean;
  onView: (blog: BlogPost) => void;
  onEdit: (blog: BlogPost) => void;
  onDelete: (id: string) => void; // Added onDelete prop
}

const BlogCard = ({ blog, index, isAdmin, onView, onEdit, onDelete }: BlogCardProps) => {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{blog.title}</h2>
      
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Calendar size={16} />
        {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
      
      <div className="relative flex-1 mb-6">
        <div className="line-clamp-4 prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <button 
          onClick={() => onView(blog)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 transition-colors cursor-pointer"
        >
          <BookOpen size={18} /> Read Post
        </button>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-4 ml-auto">
            <button 
              onClick={() => onEdit(blog)}
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 transition-colors cursor-pointer"
            >
              <Edit3 size={18} /> Edit
            </button>
            <button 
              onClick={() => onDelete(blog._id)}
              className="flex items-center gap-2 text-red-500 font-medium hover:text-red-700 transition-colors cursor-pointer"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default BlogCard;