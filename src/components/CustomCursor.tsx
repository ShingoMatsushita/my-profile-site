'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouch) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = 'none';

    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot,  { x: mouseX, y: mouseY, duration: 0.05, ease: 'none', overwrite: true });
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.18, ease: 'power2.out', overwrite: true });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0,   duration: 0.2 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'elastic.out(1, 0.6)' });
      gsap.to(dot,  { scale: 1, duration: 0.3 });
    };
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.1 });
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.3, ease: 'elastic.out(1, 0.6)' });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--foreground)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid var(--foreground)',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          opacity: 0.6,
        }}
      />
    </>
  );
}
