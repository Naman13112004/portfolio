import { ArrowLeft } from 'lucide-react';
import { useApp } from '../../lib/AppContext';

/**
 * TEMPORARY: stands in for the production Explore view while it is being built.
 * Replace the import in src/pages/lens-view.tsx with the real Explore page, then delete this file.
 */
export default function ExplorePlaceholder() {
  const { switchLens } = useApp();

  return (
    <div className="shell-width flex min-h-[calc(100vh-var(--header-height))] flex-col justify-center py-16">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em]">Explore / Relationship map</p>
      <h1 className="mt-3 max-w-3xl font-display text-[clamp(3.2rem,6vw,6rem)] font-medium leading-none tracking-[-0.06em]">
        How the work connects.
      </h1>
      <p className="mt-6 max-w-xl text-slate">
        The interactive relationship map is not built yet. Everything on the Overview is still available.
      </p>
      <button
        type="button"
        onClick={() => switchLens('overview')}
        className="mt-8 inline-flex items-center gap-2 self-start border-b border-current py-1 text-sm font-semibold transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        Back to Overview
      </button>
    </div>
  );
}
