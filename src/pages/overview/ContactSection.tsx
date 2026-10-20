import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-16 relative mb-24 scroll-mt-[var(--header-height)]"
    >
      {/* Node indicator */}
      <div className="absolute -left-[41px] top-24 w-4 h-4 rounded-full border-2 border-[var(--color-accent)] bg-white hidden md:block" />
      
      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl border border-[var(--color-border-subtle)] shadow-sm">
        <div>
          <h2 className="font-display text-3xl font-bold mb-4 text-[var(--color-ink)]">Next Steps</h2>
          <p className="text-[var(--color-ink-muted)] mb-8 leading-relaxed max-w-sm">
            I'm currently exploring opportunities in full-stack product development and infrastructure engineering. Let's build something robust together.
          </p>
        </div>
        
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-ink)] mb-2">Name</label>
              <input
                {...register("name")}
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--color-canvas)] border text-[var(--color-ink)] focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? "border-red-300 focus:ring-red-500" : "border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"
                }`}
                placeholder="Naman Jain"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-ink)] mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-3 rounded-lg bg-[var(--color-canvas)] border text-[var(--color-ink)] focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? "border-red-300 focus:ring-red-500" : "border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"
                }`}
                placeholder="naman@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--color-ink)] mb-2">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg bg-[var(--color-canvas)] border text-[var(--color-ink)] focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.message ? "border-red-300 focus:ring-red-500" : "border-[var(--color-border-subtle)] focus:border-[var(--color-accent)] focus:ring-[var(--color-accent)]/20"
                }`}
                placeholder="How can we work together?"
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[var(--color-ink)] text-white rounded-lg font-medium hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-100">
                <CheckCircle size={18} />
                <p className="text-sm font-medium">Message sent! I'll be in touch.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 border border-red-100">
                <AlertCircle size={18} />
                <p className="text-sm font-medium">Something went wrong. Please try again.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.section>
  );
}
