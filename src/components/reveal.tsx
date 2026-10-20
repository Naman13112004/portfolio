import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { heroRule, heroStep, reveal, revealSecondary, revealViewport } from '../lib/motion';

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  footer: motion.footer,
} as const;

type Tag = keyof typeof tags;
type MotionDivProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'whileInView' | 'viewport' | 'custom'>;

/**
 * Fades an element up once as it scrolls into view (18px, 440ms ease-out).
 * Reduced motion renders it in place, so nothing waits on an animation to become visible.
 */
export function Reveal({ as = 'div', delay = 0, ...rest }: MotionDivProps & { as?: Tag; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      variants={reveal}
      custom={delay}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={revealViewport}
      {...rest}
    />
  );
}

/** Secondary column inside a revealed row. Follows its parent Reveal. */
export function RevealSecondary(props: MotionDivProps) {
  return <motion.div variants={revealSecondary} {...props} />;
}

/** One step of the hero entrance sequence. `step` is 0-5, matching the delays in motion.ts. */
export function HeroStep({ as = 'div', step, ...rest }: MotionDivProps & { as?: Tag; step: number }) {
  const reduceMotion = useReducedMotion();
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      variants={heroStep}
      custom={step}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      {...rest}
    />
  );
}

/** The accent rule that draws across the top of the hero "Now" note. */
export function HeroRule() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      variants={heroRule}
      initial={reduceMotion ? false : 'hidden'}
      animate="visible"
      className="absolute -left-px -top-px h-1 w-[52px] origin-left bg-accent"
    />
  );
}
