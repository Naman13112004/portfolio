import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Loader2 } from 'lucide-react';
import { deleteBlog, fetchBlogs, type BlogPost } from '../lib/api';

import BlogCard from '../components/blog/blog-card';
import AuthModal from '../components/blog/auth-modal';
import EditorModal from '../components/blog/editor-modal';
import ViewModal from '../components/blog/view-modal'; 

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modals & Auth State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Selection States
  const [selectedViewBlog, setSelectedViewBlog] = useState<BlogPost | null>(null);
  const [selectedEditBlog, setSelectedEditBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyK') {
        e.preventDefault();
        if (!isAuthenticated) {
          setShowAuthModal(true);
        } else {
          setSelectedEditBlog(null); // Clear selected to open fresh create modal
          setShowEditor(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  // Add the handleDelete function
  const handleDelete = async (id: string) => {
    // Standard browser confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.");
    
    if (isConfirmed) {
      try {
        await deleteBlog(id, adminPassword);
        // Refresh the list after successful deletion
        loadBlogs(); 
      } catch (error: any) {
        console.error("Failed to delete blog:", error);
        alert(error.message || "Failed to delete the post.");
      }
    }
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  return (
    <section className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Engineering Blog</h1>
          <p className="text-gray-600 dark:text-gray-400">Thoughts, learnings, and deep dives into Full Stack Development and DevOps.</p>
        </motion.div>

        {/* Blog Feed Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          // Changed to a grid to make cards look better when truncated
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, idx) => (
              <BlogCard 
                key={blog._id} 
                blog={blog} 
                index={idx} 
                isAdmin={isAuthenticated}
                onView={(b) => setSelectedViewBlog(b)}
                onEdit={(b) => {
                  setSelectedEditBlog(b);
                  setShowEditor(true);
                }}
                onDelete={handleDelete}
              />
            ))}
            {blogs.length === 0 && <p className="text-gray-500 text-center py-10 col-span-full">No blogs published yet.</p>}
          </div>
        )}

        {/* Floating Admin Button */}
        {isAuthenticated && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            onClick={() => {
              setSelectedEditBlog(null); // Null means Create New
              setShowEditor(true);
            }}
            className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors z-40 cursor-pointer"
          >
            <PenTool size={24} />
          </motion.button>
        )}

        {/* View Modal for Users */}
        <ViewModal 
          blog={selectedViewBlog} 
          onClose={() => setSelectedViewBlog(null)} 
        />

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          passwordValue={adminPassword}
          onPasswordChange={setAdminPassword}
        />

        {/* Editor Modal for Create/Edit */}
        <EditorModal 
          isOpen={showEditor}
          password={adminPassword}
          initialData={selectedEditBlog} // Passes existing blog data if editing
          onClose={() => {
            setShowEditor(false);
            setSelectedEditBlog(null);
          }}
          onSuccess={() => {
            setShowEditor(false);
            setSelectedEditBlog(null);
            loadBlogs(); // Refresh feed automatically
          }}
        />

      </div>
    </section>
  );
};

export default Blog;