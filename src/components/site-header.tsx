import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import clsx from 'clsx';
import type { Lens } from '../lib/lens-navigation';

const RESUME_URL = '/assets/Naman Jain Resume.pdf';

const LENSES: { id: Lens; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'explore', label: 'Explore' },
];

interface SiteHeaderProps {
  /** The lens to highlight, or null on routes that are not part of the Overview/Explore workspace. */
  activeLens: Lens | null;
  onLensChange: (lens: Lens) => void;
  onBrandClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  onContact: () => void;
}

const action =
  'inline-flex min-h-10 items-center justify-center gap-2 border px-3.5 py-2 text-[13px] font-semibold ' +
  'transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ' +
  'max-[680px]:min-h-9 max-[680px]:px-2.5 max-[680px]:py-[7px]';

export default function SiteHeader({ activeLens, onLensChange, onBrandClick, onContact }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-canvas">
      <div className="shell-width grid h-[var(--header-height)] grid-cols-[1fr_auto_1fr] items-center border-b border-line max-[680px]:grid-cols-[auto_1fr_auto]">
        <Link
          to="/"
          onClick={onBrandClick}
          aria-label="Naman Jain, home"
          className="flex items-center gap-3 justify-self-start"
        >
          <span className="grid aspect-square w-[38px] place-items-center border border-ink font-display text-sm font-semibold tracking-[-0.03em] max-[680px]:w-[34px]">
            NJ
          </span>
          <span className="font-display text-base font-medium max-[680px]:hidden">Naman Jain</span>
        </Link>

        <nav
          aria-label="Portfolio view"
          data-cursor="Switch view"
          className="flex rounded-[3px] border border-line bg-paper p-[3px] transition-[border-color,box-shadow] duration-200 hover:border-ink hover:shadow-[0_2px_0_var(--color-stone)] focus-within:border-ink focus-within:shadow-[0_2px_0_var(--color-stone)] max-[680px]:justify-self-center"
        >
          {LENSES.map(({ id, label }) => {
            const active = activeLens === id;
            return (
              <button
                key={id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => onLensChange(id)}
                className={clsx(
                  'rounded-[2px] px-[18px] py-2 text-[13px] transition-[color,background-color,transform] duration-200 active:scale-[0.96] max-[680px]:px-[11px] max-[680px]:py-[7px]',
                  active ? 'bg-ink text-paper' : 'bg-transparent text-ink',
                )}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume (PDF, opens in a new tab)"
            data-cursor="Resume"
            className={clsx(action, 'border-ink bg-transparent hover:bg-ink hover:text-white max-[680px]:hidden')}
          >
            Resume
            <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onContact}
            data-cursor="Contact"
            className={clsx(action, 'border-accent bg-accent text-white hover:border-ink hover:bg-ink')}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
