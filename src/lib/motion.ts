import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion tokens and variants, taken from the Figma Make prototype.
 * Durations are in seconds. Keep in sync with the --motion-* / --ease-* variables in index.css.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in main.tsx,
 * which drops transform animations and keeps opacity.
 */

export type Bezier = [number, number, number, number];

export const ease = {
  enter: [0.22, 1, 0.36, 1] as Bezier,
  smooth: [0.65, 0, 0.35, 1] as Bezier,
  exit: 'easeIn' as const,
};

export const duration = {
  fast: 0.15,
  small: 0.2,
  enter: 0.44,
  view: 0.4,
  viewOut: 0.21,
  hero: 0.52,
  sheetIn: 0.4,
  sheetOut: 0.3,
  backdropIn: 0.28,
  panel: 0.28,
  copy: 0.42,
  node: 0.4,
  edge: 0.42,
};

export const delay = {
  /** Hero entrance steps (eyebrow, name, role, copy, note card, CTA), in seconds. */
  hero: [0.04, 0.12, 0.205, 0.285, 0.365, 0.445],
  /** Accent rule drawn along the top of the "Now" card. */
  heroRule: 0.65,
  /** Extra delay for the evidence column inside a project row. */
  rowEvidence: 0.09,
  /** Case-study hero copy children. */
  caseCopy: [0.11, 0.165, 0.22, 0.275],
};

export const stagger = {
  evidenceRow: 0.05,
  graphNode: { base: 0.07, step: 0.038 },
  graphEdge: { base: 0.16, step: 0.035 },
};

export const enterTransition = (seconds: number, delaySeconds = 0): Transition => ({
  duration: seconds,
  delay: delaySeconds,
  ease: ease.enter,
});

/** Accent rule drawn along the top edge of the hero "Now" note. */
export const heroRule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: enterTransition(0.5, delay.heroRule) },
};

/** Scroll reveal: fade up 18px. Use with whileInView and viewport={revealViewport}. */
export const revealViewport = { once: true, amount: 0.12, margin: '0px 0px -8% 0px' } as const;

export const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delaySeconds: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: enterTransition(duration.enter, delaySeconds),
  }),
};

/** Secondary column inside a revealed row (e.g. project evidence). */
export const revealSecondary: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: enterTransition(0.38, delay.rowEvidence),
  },
};

/** Hero entrance. Pass the step index (0-5) as `custom`. */
export const heroStep: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: enterTransition(duration.hero, delay.hero[index] ?? 0),
  }),
};

/** Overview <-> Explore. Use with AnimatePresence mode="wait" so the exit finishes before the swap. */
export const viewSwitch: Variants = {
  initial: { opacity: 0, y: 12, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1, transition: enterTransition(duration.view) },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.985,
    pointerEvents: 'none',
    transition: { duration: duration.viewOut, ease: ease.smooth },
  },
};

/** Same contract as viewSwitch with no waiting, for users who prefer reduced motion. */
export const viewSwitchReduced: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, pointerEvents: 'none', transition: { duration: 0 } },
};

/** Explore context panel. Remount it by key on selection change. */
export const contextPanel: Variants = {
  initial: { opacity: 0, x: 10, scale: 0.985 },
  animate: { opacity: 1, x: 0, scale: 1, transition: enterTransition(duration.panel) },
};

/** Graph nodes (`custom` is the node index) settling into place. */
export const graphNode: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: enterTransition(duration.node, stagger.graphNode.base + stagger.graphNode.step * index),
  }),
};

/** Project Deep Dive: backdrop and sheet, both with an animated exit. */
export const backdrop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.backdropIn, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: duration.sheetOut, ease: ease.exit } },
};

export const sheet: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.975 },
  animate: { opacity: 1, y: 0, scale: 1, transition: enterTransition(duration.sheetIn) },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.985,
    transition: { duration: duration.sheetOut, ease: ease.smooth },
  },
};

/** Case-study hero copy. Pass the child index (0-3) as `custom`. */
export const caseCopy: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: enterTransition(duration.copy, delay.caseCopy[index] ?? 0),
  }),
};

/** Custom cursor constants (applied in the cursor phase). */
export const cursor = {
  ringLerp: 0.18,
  ringSize: 24,
  ringSizeActive: 34,
  ringSizeGraph: 29,
};
