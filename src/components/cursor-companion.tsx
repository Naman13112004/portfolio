import { useEffect, useRef, useState } from 'react';
import { cursor } from '../lib/motion';

/**
 * Fine-pointer cursor companion: a small clay dot that follows the pointer exactly and a ring that trails it.
 * The system cursor is never hidden. The companion exists only while a mouse-like pointer with hover is
 * available and reduced motion is off, and it is mounted once, in the application shell.
 */

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const INTERACTIVE =
  '[data-cursor], a[href], button:not(:disabled), select:not(:disabled), summary, [role="button"], [role="tab"]';
/** Text entry keeps the native I-beam: the companion steps aside over it. */
const TEXT_ENTRY =
  'textarea, input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"])';

/** Short label shown beside the ring. An explicit data-cursor on the element (or an ancestor) wins. */
function labelFor(target: HTMLElement): string {
  const explicit = target.closest<HTMLElement>('[data-cursor]');
  if (explicit) return explicit.dataset.cursor ?? '';
  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return '';
  if (link.protocol === 'mailto:') return 'Email';
  if (link.target === '_blank') return 'Open link';
  return '';
}

/** Where the (invisible) elements wait, inside the viewport, until the first pointer movement. */
const PARKED = { transform: 'translate3d(14px, 14px, 0)' };

function useCompanionEnabled() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia(FINE_POINTER);
    const reduced = window.matchMedia(REDUCED_MOTION);
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);
  return enabled;
}

export default function CursorCompanion() {
  const enabled = useCompanionEnabled();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let hasPointer = false;
    let frame = 0;
    let recheckFrame = 0;

    const draw = () => {
      frame = 0;
      ringX += (pointerX - ringX) * cursor.ringLerp;
      ringY += (pointerY - ringY) * cursor.ringLerp;
      const settled = Math.abs(pointerX - ringX) < 0.1 && Math.abs(pointerY - ringY) < 0.1;
      if (settled) {
        ringX = pointerX;
        ringY = pointerY;
      }
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      // The loop runs only while the ring is still catching up.
      if (!settled) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const hide = () => {
      hasPointer = false;
      dot.classList.remove('is-visible');
      ring.classList.remove('is-visible', 'is-active', 'is-graph');
      label.textContent = '';
      label.classList.remove('has-label');
    };

    const classify = (target: Element | null) => {
      const el = target instanceof HTMLElement ? target : null;
      const overText = Boolean(el?.closest(TEXT_ENTRY));
      const interactive = !overText && Boolean(el?.closest(INTERACTIVE));
      const graphNode = Boolean(el?.closest('[data-graph-node]'));
      const text = el && interactive && !graphNode ? labelFor(el) : '';
      dot.classList.toggle('is-hidden', overText);
      ring.classList.toggle('is-hidden', overText);
      ring.classList.toggle('is-active', interactive);
      ring.classList.toggle('is-graph', graphNode && !overText);
      ring.classList.toggle('flip', pointerX > window.innerWidth - 170);
      if (label.textContent !== text) label.textContent = text;
      label.classList.toggle('has-label', Boolean(text));
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        hide();
        return;
      }
      if (!hasPointer) {
        // First sighting: start the ring on the pointer so it does not sweep in from the corner.
        ringX = event.clientX;
        ringY = event.clientY;
        hasPointer = true;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.classList.add('is-visible');
      ring.classList.add('is-visible');
      schedule();
    };
    const onOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      classify(event.target as Element);
    };

    // Content can change or scroll beneath a stationary pointer (view switch, dialog open/close), which
    // fires no pointer event. Re-evaluate what is under the pointer once per frame in those cases.
    const recheck = () => {
      if (recheckFrame) return;
      recheckFrame = requestAnimationFrame(() => {
        recheckFrame = 0;
        if (hasPointer) classify(document.elementFromPoint(pointerX, pointerY));
      });
    };
    const onVisibility = () => {
      if (document.hidden) hide();
    };
    const observer = new MutationObserver(recheck);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('scroll', recheck, { passive: true, capture: true });
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', onVisibility);
    document.documentElement.addEventListener('mouseleave', hide);
    document.documentElement.addEventListener('pointercancel', hide);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(recheckFrame);
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('scroll', recheck, { capture: true });
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', onVisibility);
      document.documentElement.removeEventListener('mouseleave', hide);
      document.documentElement.removeEventListener('pointercancel', hide);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-dot" ref={dotRef} style={PARKED} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} style={PARKED} aria-hidden="true">
        <span ref={labelRef} />
      </div>
    </>
  );
}
