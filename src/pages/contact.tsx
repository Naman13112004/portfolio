import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Define Validation Schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// TypeScript type derived from schema
type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('idle');

    try {
      // 3. Send Email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      reset(); // Clear form on success

      // Reset status after 5 seconds to allow sending another message
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
    }
  };

  return (
    <section className="pt-24 pb-20 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >

          {/* Contact Info (Left Side) */}
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
                  <p className="font-medium">
                    <a href={`mailto:${portfolioData.personalInfo.email}`}>
                      {portfolioData.personalInfo.email}
                    </a>
                  </p>
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

          {/* Contact Form (Right Side) */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                <input
                  {...register("name")}
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 outline-none transition-all ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-blue-500"
                    }`}
                  placeholder="Naman Jain"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 outline-none transition-all ${errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-blue-500"
                    }`}
                  placeholder="naman@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white border placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 outline-none transition-all resize-none ${errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:ring-blue-500"
                    }`}
                  placeholder="Hello, I'd like to talk about..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  <p className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2"
                >
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;