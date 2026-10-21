export type Lens = 'overview' | 'explore';
export type ScrollTarget = 'contact';

/**
 * Bookkeeping for switching between the Overview and Explore views.
 * `lensMode` in AppContext says which view is requested; this module tracks the view that is
 * actually on screen (it lags behind during the exit animation) so scroll positions are saved
 * against the right view.
 */

const scrollMemory: Record<Lens, number> = { overview: 0, explore: 0 };
let committed: Lens = 'overview';
let restoreOnMount = false;
let pendingTarget: ScrollTarget | null = null;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    block: 'start',
  });
}

export const lensNavigation = {
  /** The view currently on screen. */
  get committedLens(): Lens {
    return committed;
  },

  /** Save the scroll position of the view on screen. Call before the lens changes. */
  rememberScroll() {
    scrollMemory[committed] = window.scrollY;
  },

  /** Restore the incoming view's saved scroll position when it mounts. */
  requestRestore() {
    restoreOnMount = true;
  },

  /** Scroll to a section once the incoming view has finished animating in. */
  requestScrollTo(target: ScrollTarget) {
    pendingTarget = target;
  },

  /** A lens view has mounted. Restores its scroll position if a lens switch asked for it. */
  commit(lens: Lens) {
    committed = lens;
    if (restoreOnMount) {
      restoreOnMount = false;
      window.scrollTo({ top: scrollMemory[lens], behavior: 'instant' });
    }
  },

  /** The incoming view has finished animating. Runs any pending scroll target. */
  settle() {
    if (pendingTarget === 'contact') {
      pendingTarget = null;
      scrollToContact();
    }
  },
};
