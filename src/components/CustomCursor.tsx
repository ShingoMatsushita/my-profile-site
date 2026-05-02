'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouch) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.style.cursor = 'none';

    const TRAIL_COUNT = 8;
    const positions: { x: number; y: number }[] = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    let mouseX = -100, mouseY = -100;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      positions[0].x = lerp(positions[0].x, mouseX, 0.35);
      positions[0].y = lerp(positions[0].y, mouseY, 0.35);

      for (let i = 1; i < TRAIL_COUNT; i++) {
        positions[i].x = lerp(positions[i].x, positions[i - 1].x, 0.5 - i * 0.025);
        positions[i].y = lerp(positions[i].y, positions[i - 1].y, 0.5 - i * 0.025);
      }

      const els = cursor.querySelectorAll<HTMLDivElement>('.trail-dot');
      els.forEach((el, i) => {
        const scale = 1 - i * 0.09;
        el.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(1 - i * 0.1);
      });

      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let isLink = false;
    const onEnterLink = () => {
      isLink = true;
      cursor.querySelectorAll<HTMLDivElement>('.trail-dot').forEach((el, i) => {
        gsap.to(el, { width: i === 0 ? 40 : 6, height: i === 0 ? 40 : 6, duration: 0.3, ease: 'power2.out' });
      });
    };
    const onLeaveLink = () => {
      isLink = false;
      cursor.querySelectorAll<HTMLDivElement>('.trail-dot').forEach((el, i) => {
        const base = 8 - i;
        gsap.to(el, { width: Math.max(base, 2), height: Math.max(base, 2), duration: 0.4, ease: 'elastic.out(1, 0.6)' });
      });
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);

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
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[9999]">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="trail-dot fixed top-0 left-0 rounded-full"
          style={{
            width: Math.max(8 - i, 2),
            height: Math.max(8 - i, 2),
            background: i === 0 ? 'var(--foreground)' : 'transparent',
            border: i === 0 ? 'none' : '1.5px solid var(--foreground)',
            willChange: 'transform',
            transition: 'width 0.1s, height 0.1s',
          }}
        />
      ))}
    </div>
  );
}
