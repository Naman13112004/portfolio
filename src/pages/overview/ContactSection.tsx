import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Reveal } from '../../components/reveal';
import { portfolioData } from '../../data/portfolio';
import { duration, enterTransition } from '../../lib/motion';
import { Eyebrow, ExternalLink, SectionTitle } from './primitives';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialLinks = portfolioData.socials.filter((social) => ['GitHub', 'LinkedIn', 'Twitter (X)'].includes(social.name));

const input =
  'w-full rounded-none border-0 border-b border-field-line bg-transparent py-2.5 text-ink transition-[border-color,box-shadow] duration-200 ' +
  'placeholder:text-slate/80 focus:border-accent focus:shadow-[0_2px_0_-1px_var(--color-accent)] aria-invalid:border-accent';

/** A labelled field. The label, control and error are linked through `id`. */
function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-mono text-[10px] font-semibold uppercase tracking-[0.09em]">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-start gap-1.5 text-[13px] font-medium text-ink">
          <AlertCircle size={14} aria-hidden="true" className="mt-[3px] shrink-0 text-accent" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const baseId = useId();
  const ids = { name: `${baseId}-name`, email: `${baseId}-email`, message: `${baseId}-message` };
  const successRef = useRef<HTMLDivElement>(null);
  const returningFromSuccess = useRef(false);
  const { email } = portfolioData.personalInfo;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const send = async (data: ContactFormValues) => {
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
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
    }
  };

  // isSubmitting only flips after validation resolves, so two quick clicks could each start a send.
  // Later calls join the send already in flight, which also keeps isSubmitting true until it settles.
  const inFlight = useRef<Promise<void> | null>(null);
  const onSubmit = (data: ContactFormValues) => {
    inFlight.current ??= send(data).finally(() => {
      inFlight.current = null;
    });
    return inFlight.current;
  };

  // The form is replaced by the confirmation, so move focus with it, and back again afterwards.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
    if (status === 'idle' && returningFromSuccess.current) {
      returningFromSuccess.current = false;
      setFocus('name');
    }
  }, [status, setFocus]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-[var(--header-height)] bg-stone">
      <div className="shell-width section-pad grid grid-cols-[1fr_0.8fr] gap-[10vw] max-[680px]:grid-cols-1 max-[680px]:gap-[45px]">
        <Reveal className="min-w-0">
          <Eyebrow>Have a system to build?</Eyebrow>
          <SectionTitle id="contact-title" className="mb-6 mt-3">
            Let’s trace the first line.
          </SectionTitle>
          <p className="max-w-[560px] text-slate">
            Open to conversations about backend engineering, distributed systems, and applied AI.
          </p>
          <a
            href={`mailto:${email}`}
            className="mt-[18px] inline-block font-mono text-[clamp(1rem,2vw,1.4rem)] underline underline-offset-[6px] transition-colors duration-200 [overflow-wrap:anywhere] hover:text-accent max-[680px]:text-sm"
          >
            {email}
          </a>
          <div className="mt-[35px] flex flex-wrap gap-6 text-[13px]">
            {socialLinks.map((social) => (
              <ExternalLink key={social.name} href={social.url}>
                {social.name}
              </ExternalLink>
            ))}
          </div>
        </Reveal>

        <Reveal className="min-w-0" delay={0.05}>
          {status === 'success' ? (
            <motion.div
              ref={successRef}
              tabIndex={-1}
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enterTransition(duration.panel)}
              className="border-t-[3px] border-forest pt-[25px] outline-none"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-forest">Message sent</span>
              <h3 className="mb-2.5 mt-5 font-display text-[2.2rem] font-medium">Thanks for reaching out.</h3>
              <p className="text-slate">I'll be in touch.</p>
              <button
                type="button"
                onClick={() => {
                  returningFromSuccess.current = true;
                  setStatus('idle');
                }}
                className="mt-5 border-b border-current py-1 transition-colors duration-200 hover:text-accent"
              >
                Write another note
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting} className="grid gap-[22px]">
              <Field id={ids.name} label="Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  id={ids.name}
                  type="text"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                  className={input}
                  placeholder="Your name"
                />
              </Field>

              <Field id={ids.email} label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  id={ids.email}
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${ids.email}-error` : undefined}
                  className={input}
                  placeholder="you@example.com"
                />
              </Field>

              <Field id={ids.message} label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  id={ids.message}
                  rows={4}
                  aria-required="true"
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? `${ids.message}-error` : undefined}
                  className={`${input} resize-y`}
                  placeholder="What would you like to discuss?"
                />
              </Field>

              {status === 'error' && (
                <p role="alert" className="flex items-start gap-2 border-l-[3px] border-accent bg-paper/70 px-3 py-2.5 text-sm text-ink">
                  <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    Something went wrong, and your message was not sent. Please try again, or email{' '}
                    <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4 [overflow-wrap:anywhere]">
                      {email}
                    </a>
                    .
                  </span>
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-5 justify-self-start bg-ink px-[18px] py-[13px] text-white transition-[background-color,transform,opacity] duration-200 hover:bg-accent active:scale-[0.97] disabled:cursor-wait disabled:opacity-65 disabled:hover:bg-ink"
              >
                {isSubmitting ? (
                  <>
                    Sending…
                    <Loader2 size={16} strokeWidth={1.5} aria-hidden="true" className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-[var(--ease-enter)] group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
              <p className="-mt-2.5 text-[11px] text-slate">All fields are required.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
