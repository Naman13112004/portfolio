import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AppState {
  lensMode: 'overview' | 'explore';
  activeProject: string | null;
  setLensMode: (mode: 'overview' | 'explore') => void;
  setActiveProject: (id: string | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lensMode, setLensMode] = useState<'overview' | 'explore'>('overview');
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ lensMode, setLensMode, activeProject, setActiveProject }}>
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
