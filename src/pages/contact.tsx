import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating an API call. In reality, you would hook this up to EmailJS or Formspree
    // OR use a mailto link constructed from data.
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate delay
    setTimeout(() => {
        // Construct mailto as fallback/demo
        window.location.href = `mailto:${portfolioData.personalInfo.email}?subject=Contact from ${data.name}&body=${data.message}`;
        setIsSubmitting(false);
        setStatus('success');
    }, 1500);
  };

  return (
    <section className="pt-24 pb-20 min-h-screen">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }}
           className="grid md:grid-cols-2 gap-12 items-start"
         >
           
           {/* Contact Info */}
           <div>
             <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Let's Connect</h1>
             <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
               I am currently open to full-time opportunities in Full Stack Development and DevOps. 
               Have a question or want to work together?
             </p>
             
             <div className="space-y-6">
               <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                 <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                    <Mail size={24} />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Email Me</p>
                   <p className="font-medium">{portfolioData.personalInfo.email}</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                 <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
                    <MapPin size={24} />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                   <p className="font-medium">{portfolioData.personalInfo.location}</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Contact Form */}
           <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                   <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                
                <div>
                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                   <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                
                <div>
                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                   <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="Hello, I'd like to talk about..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {status === 'success' && (
                  <p className="text-green-500 text-center text-sm">Message prepared! Opening your email client...</p>
                )}
             </form>
           </div>
         </motion.div>
       </div>
    </section>
  );
};

export default Contact;