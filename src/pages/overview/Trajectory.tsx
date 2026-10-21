import type { ReactNode } from 'react';

export default function Trajectory({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* The Spine */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[var(--color-border-subtle)] hidden md:block" />
      
      {/* Content wrapper with left padding for the spine on desktop */}
      <div className="md:pl-[34px]">
        {children}
      </div>
    </div>
  );
}
