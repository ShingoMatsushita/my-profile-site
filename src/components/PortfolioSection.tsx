'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Star, GitFork, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';
import type { GithubRepo } from '@/lib/github';

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

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python:     '#3572a5',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Go:         '#00add8',
  Rust:       '#dea584',
  Swift:      '#fa7343',
};

export function PortfolioSection({ repos }: { repos: GithubRepo[] }) {
  const t          = useTranslations('Portfolio');
  const sectionRef    = useRef<HTMLElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const headRef       = useRef<HTMLHeadingElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 });
          gsap.fromTo(headRef.current,  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.1 });
          const targets = [...(gridRef.current?.children ?? []), ...(mobileGridRef.current?.children ?? [])];
          gsap.fromTo(targets,
            { opacity: 0, y: 40, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
          );
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <SectionLabel ref={labelRef} number="02" label={t('sectionLabel')} />
      <div className="flex items-end justify-between mt-6 mb-16">
        <h2 ref={headRef} className="text-4xl lg:text-5xl font-black leading-tight tracking-tight"
          style={{ color: 'var(--foreground)', opacity: 0 }}>
          {t('heading')}
        </h2>
        <a href="https://github.com/ShingoMatsushita" target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-medium opacity-40 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--foreground)' }}>
          GitHub <ExternalLink size={12} />
        </a>
      </div>

      {/* mobile: horizontal scroll */}
      <div className="md:hidden -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none' }}>
          {repos.map(repo => (
            <div key={repo.id} className="snap-start flex-shrink-0 w-[75vw] max-w-[300px]" style={{ opacity: 1 }}>
              <RepoCard repo={repo} viewLabel={t('viewProject')} mobile />
            </div>
          ))}
        </div>
      </div>
      <div ref={gridRef} className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} viewLabel={t('viewProject')} />
        ))}
      </div>
    </section>
  );
}

function RepoCard({ repo, viewLabel, mobile }: { repo: GithubRepo; viewLabel: string; mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: hovered ? -4 : 0, duration: 0.3, ease: 'power2.out' });
  }, [hovered]);

  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#888') : null;
  const ogImage = `https://opengraph.githubassets.com/1/ShingoMatsushita/${repo.name}`;

  return (
    <a ref={cardRef} href={repo.html_url} target="_blank" rel="noopener noreferrer"
      className={`group flex flex-col rounded-2xl border border-[var(--border)] overflow-hidden transition-shadow hover:shadow-xl${mobile ? '' : ' opacity-0'}`}
      style={{ background: 'var(--card)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {/* OGP image */}
      <div className="relative w-full h-36 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
        <Image src={ogImage} alt={repo.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      {/* Header */}
      <div className="flex items-start justify-between mb-3 px-6 pt-5">
        <h3 className="font-bold text-base leading-snug pr-2 group-hover:opacity-70 transition-opacity"
          style={{ color: 'var(--foreground)' }}>
          {repo.name}
        </h3>
        <ArrowUpRight size={14} className="flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: 'var(--muted)' }} />
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 mb-4 px-6"
        style={{ color: 'var(--muted)' }}>
        {repo.description ?? '—'}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4 px-6">
          {repo.topics.slice(0, 3).map(topic => (
            <span key={topic} className="px-2 py-0.5 text-[10px] font-mono rounded-full border border-[var(--border)]"
              style={{ color: 'var(--muted)' }}>
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 text-xs font-mono px-6 pb-6" style={{ color: 'var(--muted)' }}>
        {langColor && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star size={11} /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork size={11} /> {repo.forks_count}
          </span>
        )}
        <span className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--border)] text-[10px]" style={{ color: 'var(--foreground)' }}>
          View <ArrowUpRight size={10} />
        </span>
      </div>
    </a>
  );
}
