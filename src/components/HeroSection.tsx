'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Background blob animations
      const blobs = bgRef.current?.children;
      if (blobs) {
        gsap.to(blobs[0], { x: 40, y: -30, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(blobs[1], { x: -30, y: 20, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
      }

      // Split line1 into characters
      const text1 = line1Ref.current;
      const text2 = line2Ref.current;

      if (text1 && text2) {
        const chars1 = text1.textContent!.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          return span;
        });
        text1.textContent = '';
        chars1.forEach((s) => text1.appendChild(s));

        const chars2 = text2.textContent!.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.overflow = 'hidden';
          return span;
        });
        text2.textContent = '';
        chars2.forEach((s) => text2.appendChild(s));

        tl.fromTo(
          chars1,
          { y: '110%', opacity: 0, rotateX: -90 },
          { y: '0%', opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 }
        )
          .fromTo(
            chars2,
            { y: '110%', opacity: 0, rotateX: -90 },
            { y: '0%', opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 },
            '-=0.5'
          )
          .fromTo(
            subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            '-=0.3'
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.4'
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36 overflow-hidden"
    >
      {/* Animated background gradient blobs */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
      >
        <div
          className="absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #e0e7ff 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #fce7f3 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="text-center">
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6 leading-tight"
          style={{ perspective: '600px' }}
        >
          <span ref={line1Ref} className="block overflow-hidden">
            Web上の名刺
          </span>
          <span
            ref={line2Ref}
            className="block overflow-hidden text-zinc-500 dark:text-zinc-400"
          >
            技術的な実験場
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed opacity-0"
        >
          自己紹介、ポートフォリオの提示、そして技術的なアウトプットをまとめる場所です。
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            詳しく見る
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-full font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </section>
  );
}
