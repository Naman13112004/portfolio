import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

/** Small uppercase mono label used above headings. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={clsx('font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.1em]', className)}>
      {children}
    </p>
  );
}

/** Numbered section label, e.g. "01  In production". */
export function SectionLabel({ number, children, onDark }: { number: string; children: ReactNode; onDark?: boolean }) {
  return (
    <div
      className={clsx(
        'flex gap-4 font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.1em]',
        onDark ? 'text-on-ink-muted' : 'text-slate',
      )}
    >
      <span className="text-accent">{number}</span>
      <p>{children}</p>
    </div>
  );
}

/** Large display heading shared by the Overview sections. */
export function SectionTitle({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2
      id={id}
      className={clsx(
        'font-display text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.055em] max-[680px]:text-[2.75rem]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Row of small mono technology chips. */
export function TechChips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={clsx('flex flex-wrap gap-[7px]', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="border border-line bg-paper/70 px-[9px] py-1.5 font-mono text-[10px] font-medium transition-colors duration-200 group-focus-within:border-[color-mix(in_srgb,var(--color-accent),var(--color-line)_60%)] group-hover:border-[color-mix(in_srgb,var(--color-accent),var(--color-line)_60%)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Underlined text link to an external page, with a nudging arrow. */
export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group/link inline-flex items-center gap-[7px] font-semibold underline decoration-1 underline-offset-[5px] transition-colors duration-200 hover:text-accent',
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={16}
        strokeWidth={1.5}
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 ease-[var(--ease-enter)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  );
}
