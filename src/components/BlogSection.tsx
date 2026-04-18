'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { forwardRef } from 'react';
import type { NotePost } from '@/lib/note';

gsap.registerPlugin(ScrollTrigger);

const SectionLabel = forwardRef<HTMLDivElement, { number: string; label: string }>(
  ({ number, label }, ref) => (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-xs font-mono opacity-30">{number}</span>
      <span className="w-8 h-px bg-current opacity-20" />
      <span className="text-xs font-mono tracking-widest uppercase opacity-40">{label}</span>
    </div>
  )
);
SectionLabel.displayName = 'SectionLabel';

export function BlogSection({ posts }: { posts: NotePost[] }) {
  const t          = useTranslations('Blog');
  const sectionRef    = useRef<HTMLElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const cardsRef      = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 });
          const targets = [...(cardsRef.current?.children ?? []), ...(mobileCardsRef.current?.children ?? [])];
          gsap.fromTo(targets,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
          );
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <div className="flex items-end justify-between mb-16">
        <div>
          <SectionLabel ref={labelRef} number="03" label={t('sectionLabel')} />
          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mt-6"
            style={{ color: 'var(--foreground)' }}>
            {t('heading')}
          </h2>
        </div>
        <a href="https://note.com/dapper_ivy8264" target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-medium opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--foreground)' }}>
          note <ExternalLink size={12} />
        </a>
      </div>

      {/* mobile: horizontal scroll */}
      <div className="md:hidden -mx-6 px-6">
        <div ref={mobileCardsRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none' }}>
          {posts.map((post, i) => (
            <div key={post.link} className="snap-start flex-shrink-0 w-[75vw] max-w-[300px]">
              <NoteCard post={post} readMore={t('readMore')} index={i} />
            </div>
          ))}
        </div>
      </div>
      {/* md+: grid */}
      <div ref={cardsRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <NoteCard key={post.link} post={post} readMore={t('readMore')} index={i} />
        ))}
      </div>
    </section>
  );
}

function NoteCard({ post, readMore, index }: { post: NotePost; readMore: string; index: number }) {
  const THUMB_BG = ['#fde68a', '#a5f3fc', '#bbf7d0', '#fecaca', '#e9d5ff', '#fed7aa'];

  return (
    <a href={post.link} target="_blank" rel="noopener noreferrer"
      className="group block rounded-2xl border border-[var(--border)] overflow-hidden opacity-0 transition-shadow hover:shadow-xl"
      style={{ background: 'var(--card)' }}>
      {/* Cover */}
      <div className="relative w-full h-44 overflow-hidden"
        style={{ background: THUMB_BG[index % THUMB_BG.length] }}>
        {post.thumbnail ? (
          <Image src={post.thumbnail} alt={post.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 8h24v24H8z" stroke="currentColor" strokeWidth="2" />
              <path d="M8 16h24M16 8v24" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
        {/* note badge */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide"
          style={{ color: '#249f80' }}>
          note
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs font-mono opacity-30 mb-3">{post.pubDate}</p>
        <h3 className="font-bold text-base leading-snug mb-3 group-hover:opacity-70 transition-opacity line-clamp-2"
          style={{ color: 'var(--foreground)' }}>
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
            {post.description}
          </p>
        )}
        <div className="mt-5 flex items-center gap-1 text-xs font-semibold transition-all group-hover:gap-2"
          style={{ color: 'var(--foreground)' }}>
          {readMore} <ArrowUpRight size={12} />
        </div>
      </div>
    </a>
  );
}
