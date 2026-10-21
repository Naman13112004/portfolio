import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../lib/AppContext';
import { lensNavigation } from '../lib/lens-navigation';
import type { Lens } from '../lib/lens-navigation';
import { viewSwitch, viewSwitchReduced } from '../lib/motion';
import OverviewPage from './overview';
import ExplorePage from './explore/ExplorePage';

/** Reports which view is on screen and restores its scroll position as it mounts. */
function LensEntry({ lens, children }: { lens: Lens; children: ReactNode }) {
  useLayoutEffect(() => {
    lensNavigation.commit(lens);
  }, [lens]);
  return <>{children}</>;
}

/**
 * The Overview/Explore workspace at "/". `lensMode` picks the view; the outgoing view animates out
 * completely before the incoming one mounts, so the two never overlap or compete for clicks.
 */
export default function LensView() {
  const { lensMode, setLensMode } = useApp();
  const reduceMotion = useReducedMotion();

  // Arriving at "/#contact" (including the /contact redirect) lands on the Contact section.
  const [landOnContact] = useState(() => window.location.hash === '#contact');
  const handledLanding = useRef(false);
  useEffect(() => {
    if (!landOnContact || handledLanding.current) return;
    handledLanding.current = true;
    lensNavigation.requestScrollTo('contact');
    if (lensMode === 'explore') setLensMode('overview');
  }, [landOnContact, lensMode, setLensMode]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lensMode}
        variants={reduceMotion ? viewSwitchReduced : viewSwitch}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ transformOrigin: '50% 12vh' }}
        onAnimationComplete={(definition) => {
          if (definition === 'animate') lensNavigation.settle();
        }}
      >
        <LensEntry lens={lensMode}>{lensMode === 'overview' ? <OverviewPage /> : <ExplorePage />}</LensEntry>
      </motion.div>
    </AnimatePresence>
  );
}
