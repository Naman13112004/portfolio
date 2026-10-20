import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { lensNavigation } from './lens-navigation';
import type { Lens, ScrollTarget } from './lens-navigation';

interface SwitchLensOptions {
  /** Scroll to this section after the new view has finished animating in. */
  scrollTo?: ScrollTarget;
}

interface AppState {
  lensMode: Lens;
  activeProject: string | null;
  setLensMode: (mode: Lens) => void;
  setActiveProject: (id: string | null) => void;
  /** Switch views, remembering the outgoing view's scroll position and restoring the incoming one's. */
  switchLens: (mode: Lens, options?: SwitchLensOptions) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lensMode, setLensMode] = useState<Lens>('overview');
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const switchLens = useCallback(
    (mode: Lens, options?: SwitchLensOptions) => {
      if (options?.scrollTo) lensNavigation.requestScrollTo(options.scrollTo);
      if (mode === lensMode) return;
      lensNavigation.rememberScroll();
      lensNavigation.requestRestore();
      setLensMode(mode);
    },
    [lensMode],
  );

  return (
    <AppContext.Provider value={{ lensMode, setLensMode, activeProject, setActiveProject, switchLens }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
