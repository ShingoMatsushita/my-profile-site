'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Send, ExternalLink, Clock } from 'lucide-react';
import { HeroShader } from './HeroShader';
import { FaXTwitter, FaYoutube, FaTiktok, FaInstagram, FaLinkedin, FaLine, FaFacebook, FaDiscord } from 'react-icons/fa6';
import { SiNotion } from 'react-icons/si';

/* ─── NOTE ICON ────────────────────────────────────────────────── */
const IconNote = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.84 0A3.84 3.84 0 0 0 0 3.84v16.32A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0zm.392 5.8h15.537v1.96H4.232zm0 4.077h15.537v1.96H4.232zm0 4.076h9.842v1.96H4.232z"/>
  </svg>
);

import { useTranslations } from 'next-intl';
import { forwardRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ─── SOCIAL LINKS ─────────────────────────────────────────────── */
type SocialLink = { label: string; icon: React.ComponentType<{ size?: number }>; href: string; val: string; color: string; bg: string; external?: boolean };
const SOCIAL_LINKS: SocialLink[] = [
  { label: 'X',         icon: FaXTwitter,  href: 'https://x.com/matsu_ai_user?s=21&t=IAVf4M8dh9u9UWgrv4KUlA', val: '@matsu_ai_user', color: '#000000', bg: '#000000' },
  { label: 'LinkedIn',  icon: FaLinkedin,  href: 'https://www.linkedin.com/in/%E6%85%8E%E5%90%BE-%E6%9D%BE%E4%B8%8B-57929b330', val: 'Shingo Matsushita', color: '#0A66C2', bg: '#0A66C2' },
  { label: 'Facebook',  icon: FaFacebook,  href: 'https://www.facebook.com/share/17Wg5hg1XG/', val: 'Facebook', color: '#1877F2', bg: '#1877F2' },
  { label: 'note',      icon: IconNote,    href: 'https://note.com/dapper_ivy8264', val: 'dapper_ivy8264', color: '#41C9B4', bg: '#41C9B4' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/matsu__405', val: '@matsu__405', color: '#E1306C', bg: '#E1306C' },
  { label: 'TikTok',    icon: FaTiktok,    href: 'https://tiktok.com', val: '@yourusername', color: '#010101', bg: '#010101' },
  { label: 'YouTube',   icon: FaYoutube,   href: 'https://youtube.com', val: '@yourchannel', color: '#FF0000', bg: '#FF0000' },
  { label: 'LINE',      icon: FaLine,      href: 'https://line.me/ti/p/iAxEToZ8Qp', val: 'LINE', color: '#06C755', bg: '#06C755' },
];

const skills = [
  'TypeScript', 'React / Next.js', 'Node.js', 'Tailwind CSS',
  'GSAP', 'PostgreSQL', 'Docker', 'Git / GitHub',
];

/* ─── SECTION LABEL ─────────────────────────────────────────────── */
const SectionLabel = forwardRef<HTMLDivElement, { number: string; label: string }>(
  ({ number, label }, ref) => (
    <div
      ref={ref}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border"
      style={{ borderColor: 'var(--border)', background: 'var(--card)', backdropFilter: 'blur(8px)' }}
    >
      <span className="text-[10px] font-mono opacity-30">{number}</span>
      <span className="w-px h-3 opacity-20" style={{ background: 'var(--foreground)' }} />
      <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">{label}</span>
    </div>
  )
);
SectionLabel.displayName = 'SectionLabel';

/* ─── MAGNETIC LINK ─────────────────────────────────────────────── */
function MagneticLink({ href, external, label, brandColor, children }: {
  href: string; external?: boolean; label?: string; brandColor?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.4, y: (e.clientY - rect.top - rect.height / 2) * 0.4, duration: 0.3, ease: 'power2.out' });
  };
  const onLeave = () => { gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' }); setHovered(false); };
  const hoverBg = brandColor ?? 'var(--foreground)';
  return (
    <a
      ref={ref} href={href}
      target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setHovered(true)} title={label}
      className="relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200"
      style={{
        background: hovered ? hoverBg : 'var(--card)',
        backdropFilter: 'blur(8px)',
        borderColor: hovered ? hoverBg : 'var(--border)',
        boxShadow: hovered ? `0 4px 16px ${hoverBg}40` : 'var(--shadow)',
      }}
    >
      <span style={{ color: hovered ? '#fff' : 'var(--muted)', transition: 'color 0.15s' }}>{children}</span>
    </a>
  );
}

/* ─── SPLIT TEXT REVEAL ─────────────────────────────────────────── */
function splitIntoLineSpans(el: HTMLElement, html: string) {
  const lines = html.split('\n');
  el.innerHTML = lines
    .map(line => `<span class="line-wrap"><span class="line-inner" style="display:block">${line}</span></span>`)
    .join('');
  return el.querySelectorAll<HTMLElement>('.line-inner');
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero() {
  const t = useTranslations('Hero');
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const roleRef    = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      /* Role label */
      tl.fromTo(roleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2);

      /* Heading — line by line */
      if (headRef.current) {
        const lines = splitIntoLineSpans(headRef.current, t('name'));
        gsap.set(headRef.current, { opacity: 1 });
        tl.fromTo(lines, { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 1.1, stagger: 0.14 }, 0.3);
      }

      tl.fromTo(subRef.current,   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(metaRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo(imgRef.current,   { opacity: 0, scale: 0.92, y: 32 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=1.0')
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2');

      /* Scroll indicator bounce */
      const bounceEl = scrollRef.current?.querySelector('.bounce');
      if (bounceEl) gsap.to(bounceEl, { y: 10, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      /* Parallax on scroll */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: self => {
          const p = self.progress;
          gsap.set(headRef.current,  { y: p * 60 });
          gsap.set(subRef.current,   { y: p * 40 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <HeroShader />
      </div>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        {/* Copyright tag */}
        <div className="absolute top-28 right-6 lg:right-12 text-[10px] font-mono opacity-30 tracking-widest uppercase">
          {t('copyright')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24 items-center">
          <div>
            {/* Role pill */}
            <p
              ref={roleRef}
              className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase mb-6 opacity-0 px-3 py-1.5 rounded-full"
              style={{ border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--muted)', backdropFilter: 'blur(8px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {t('basedIn')}
            </p>

            {/* Big heading */}
            <h1
              ref={headRef}
              data-text={t('name')}
              className="font-black leading-[0.9] tracking-tight mb-8 opacity-0"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                color: 'var(--foreground)',
                letterSpacing: '-0.03em',
              }}
            >
              {t('name')}
            </h1>

            {/* Sub */}
            <div ref={subRef} className="opacity-0">
              <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--muted)' }}>
                {t('sub1')}<br />{t('sub2')}
              </p>
            </div>

            {/* Social + CTAs */}
            <div ref={metaRef} className="mt-10 opacity-0">
              <div className="flex flex-wrap gap-2 mb-8">
                {SOCIAL_LINKS.map(({ label, icon: Icon, href, color, external: ext }) => (
                  <MagneticLink key={label} href={href} external={ext !== false} label={label} brandColor={color}>
                    <Icon size={15} />
                  </MagneticLink>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Primary CTA */}
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300"
                  style={{ background: 'var(--foreground)', color: 'var(--background)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('cta')} <ArrowUpRight size={14} />
                  </span>
                  <span
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ background: 'var(--highlight)' }}
                  />
                </a>

                {/* Secondary CTA */}
                <a
                  href="#portfolio"
                  onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border text-sm font-medium transition-all duration-200 hover:border-[var(--foreground)]"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)', backdropFilter: 'blur(8px)' }}
                >
                  {t('viewWork')} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div ref={imgRef} className="flex justify-center lg:justify-end opacity-0">
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-3 rounded-[2rem] pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, var(--foreground) 0%, transparent 70%)',
                  opacity: 0.06,
                }}
              />
              <div
                className="w-56 h-56 lg:w-72 lg:h-72 rounded-[2rem] overflow-hidden relative"
                style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/avatar.jpg"
                  alt="Shingo Matsushita"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Available badge */}
              <div
                className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm font-medium"
                style={{
                  background: 'var(--card-solid)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-lg)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span style={{ color: 'var(--foreground)' }}>{t('availableForWork')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-3 opacity-0">
          <div className="bounce w-5 h-8 rounded-full border border-current opacity-30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 rounded-full bg-current opacity-60" />
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase opacity-30">{t('scroll')}</span>
        </div>
      </section>
    </div>
  );
}

/* ─── MARQUEE ─────────────────────────────────────────────────────── */
function Marquee() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const velRef   = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current; if (!track) return;

    /* Base auto-scroll */
    tweenRef.current = gsap.to(track, {
      x: '-50%',
      duration: 24,
      repeat: -1,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (track.scrollWidth / 2)),
      },
    });

    /* Speed up / reverse on scroll */
    const onWheel = (e: WheelEvent) => {
      velRef.current = e.deltaY * 0.04;
      tweenRef.current?.timeScale(1 + velRef.current);
      gsap.to(velRef, { current: 0, duration: 0.8, ease: 'power2.out', onUpdate: () => {
        tweenRef.current?.timeScale(1 + velRef.current);
      }});
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      tweenRef.current?.kill();
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  const items = [
    'TypeScript','·','React','·','Next.js','·','GSAP','·','Node.js','·','PostgreSQL','·',
    'Design','·','Animation','·','Three.js','·','Docker','·','Tailwind','·',
  ];
  const doubled = [...items, ...items];

  return (
    <div
      ref={outerRef}
      className="overflow-hidden border-y py-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <div ref={trackRef} className="flex gap-10 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--muted-2)' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────────── */
const STATS = [
  { num: 3,   suffix: '+', label: '年の\n経験' },
  { num: 20,  suffix: '+', label: 'プロジェクト\n完了' },
  { num: 100, suffix: '%', label: 'コミット\nクオリティ' },
];

function About() {
  const t         = useTranslations('About');
  const tTimeline = useTranslations('Timeline');
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLHeadingElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef   = useRef<HTMLDivElement>(null);
  const notionRef   = useRef<HTMLDivElement>(null);
  const timeline    = tTimeline.raw('items') as Array<{ year: string; role: string; place: string; desc: string; href?: string }>;
  const notionCards = t.raw('notionCards') as Array<{ emoji: string; label: string; sub: string; href: string }>;
  const interests   = t.raw('interests') as string[];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const base = { opacity: 0, y: 50 };
      const to   = { opacity: 1, y: 0, duration: 1, ease: 'power3.out' };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });

          /* Heading line split */
          if (headRef.current) {
            const lines = splitIntoLineSpans(headRef.current, t('heading'));
            gsap.set(headRef.current, { opacity: 1 });
            gsap.fromTo(lines, { y: '105%' }, { y: '0%', duration: 1.0, stagger: 0.12, ease: 'power4.out', delay: 0.1 });
          }

          /* Counter animation */
          if (statsRef.current) {
            statsRef.current.querySelectorAll<HTMLElement>('.stat-num').forEach((el, i) => {
              const target = STATS[i].num;
              gsap.fromTo({ val: 0 }, { val: target }, {
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.2 + i * 0.15,
                onUpdate: function() { el.textContent = Math.round(this.targets()[0].val) + STATS[i].suffix; },
              });
            });
            gsap.fromTo(statsRef.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.1 });
          }

          gsap.fromTo(textRef.current?.children ?? [], base, { ...to, stagger: 0.1, delay: 0.2 });
          gsap.fromTo(timelineRef.current?.children ?? [], { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
          gsap.fromTo(skillsRef.current?.children ?? [], { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.5)', delay: 0.4 });
          gsap.fromTo(notionRef.current?.children ?? [], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: 'power3.out', delay: 0.55 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative px-6 lg:px-12 max-w-7xl mx-auto py-32">
      {/* Decorative section number */}
      <span className="section-num">01</span>

      <SectionLabel ref={labelRef} number="01" label="About" />

      {/* Big heading */}
      <h2
        ref={headRef}
        className="mt-6 mb-16 font-black leading-[0.95] tracking-tight opacity-0"
        style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--foreground)', letterSpacing: '-0.03em' }}
      >
        {t('heading')}
      </h2>

      {/* Stats row */}
      <div ref={statsRef} className="grid grid-cols-3 gap-6 mb-20 pb-16" style={{ borderBottom: '1px solid var(--border)' }}>
        {STATS.map((s, i) => (
          <div key={i} className="opacity-0">
            <div
              className="stat-num font-black tabular-nums"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--foreground)', letterSpacing: '-0.04em', lineHeight: 1 }}
            >
              0{s.suffix}
            </div>
            <p className="mt-2 text-xs font-mono whitespace-pre-line" style={{ color: 'var(--muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div ref={textRef}>
          <p className="text-[15px] leading-[2] opacity-0" style={{ color: 'var(--muted)' }}>{t('bio1')}</p>
          <p className="text-[15px] leading-[2] mt-5 opacity-0" style={{ color: 'var(--muted)' }}>{t('bio2')}</p>

          {/* Skills */}
          <div ref={skillsRef} className="mt-10 flex flex-wrap gap-2">
            {skills.map(s => (
              <span
                key={s}
                className="px-3 py-1.5 text-xs font-mono rounded-full opacity-0 transition-all duration-200 hover:border-[var(--foreground)] cursor-default"
                style={{ border: '1px solid var(--border)', color: 'var(--muted)', background: 'var(--card)' }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Interests */}
          <p className="text-[10px] font-mono tracking-widest uppercase mt-8 mb-3" style={{ color: 'var(--muted-2)' }}>
            {t('interestsLabel')}
          </p>
          <div className="flex flex-wrap gap-2">
            {interests.map(item => (
              <span
                key={item}
                className="px-3 py-1.5 text-xs font-semibold rounded-full cursor-default"
                style={{
                  background: 'var(--foreground)',
                  color: 'var(--background)',
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Notion cards */}
          <div ref={notionRef} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {notionCards.map(card => (
              <a
                key={card.label}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col gap-2 p-4 rounded-2xl opacity-0 transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', backdropFilter: 'blur(8px)' }}
              >
                <div className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity">
                  <SiNotion size={16} style={{ color: 'var(--foreground)' }} />
                </div>
                <span className="text-xl">{card.emoji}</span>
                <p className="text-xs font-semibold leading-snug pr-6" style={{ color: 'var(--foreground)' }}>{card.label}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: 'var(--muted)' }}>{card.sub}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="space-y-1">
          {timeline.map((item, i) => {
            const inner = (
              <div className="flex gap-5 p-4 rounded-2xl transition-all duration-200 group-hover:bg-[var(--card)] group-hover:shadow-[var(--shadow)]">
                <div className="flex-shrink-0 text-[10px] font-mono pt-1 w-14 tabular-nums" style={{ color: 'var(--muted-2)' }}>
                  {item.year}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <h3 className="font-semibold text-sm flex items-center gap-1.5" style={{ color: 'var(--foreground)' }}>
                      {item.role}
                      {item.href && <ArrowUpRight size={12} className="opacity-40 flex-shrink-0 group-hover:opacity-80 transition-opacity" />}
                    </h3>
                    <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'var(--muted-2)' }}>{item.place}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
                </div>
              </div>
            );
            return (
              <div key={i} className="opacity-0 group">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="block group">{inner}</a>
                ) : (
                  <div>{inner}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES ────────────────────────────────────────────────────── */
function Services() {
  const t = useTranslations('Services');
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const items = t.raw('items') as Array<{ icon: string; title: string; desc: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });

          if (headRef.current) {
            const lines = splitIntoLineSpans(headRef.current, t('heading'));
            gsap.set(headRef.current, { opacity: 1 });
            gsap.fromTo(lines, { y: '105%' }, { y: '0%', duration: 1.0, stagger: 0.1, ease: 'power4.out', delay: 0.1 });
          }

          gsap.fromTo(cardsRef.current?.children ?? [], { opacity: 0, y: 50 }, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.25,
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <span className="section-num">03</span>

      <SectionLabel ref={labelRef} number="03" label={t('sectionLabel')} />

      <h2
        ref={headRef}
        className="mt-6 mb-16 font-black leading-[0.95] tracking-tight opacity-0"
        style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--foreground)', letterSpacing: '-0.03em' }}
      >
        {t('heading')}
      </h2>

      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className="opacity-0 flex flex-col gap-6 p-7 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--shadow-lg)] group cursor-default"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', backdropFilter: 'blur(8px)' }}
          >
            <span
              className="text-2xl w-12 h-12 flex items-center justify-center rounded-2xl transition-colors duration-300 group-hover:bg-[var(--foreground)]"
              style={{ background: 'var(--border-strong)', fontSize: '1.3rem' }}
            >
              {item.icon}
            </span>
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>
                {String(idx + 1).padStart(2, '0')}
              </p>
              <h3 className="font-bold text-base mb-3" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
              <p className="text-xs leading-[1.8]" style={{ color: 'var(--muted)' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300"
          style={{ background: 'var(--foreground)', color: 'var(--background)' }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {t('contactCta')} <ArrowUpRight size={14} />
          </span>
          <span
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ background: 'var(--highlight)' }}
          />
        </a>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>{t('note')}</p>
      </div>
    </section>
  );
}

/* ─── COMMUNITY ───────────────────────────────────────────────────── */
function Community() {
  const t = useTranslations('Community');
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });

          if (headRef.current) {
            const lines = splitIntoLineSpans(headRef.current, t('heading'));
            gsap.set(headRef.current, { opacity: 1 });
            gsap.fromTo(lines, { y: '105%' }, { y: '0%', duration: 1.0, stagger: 0.1, ease: 'power4.out', delay: 0.1 });
          }

          gsap.fromTo(contentRef.current?.children ?? [], { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2,
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="community" ref={sectionRef} className="relative px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <span className="section-num">04</span>

      <SectionLabel ref={labelRef} number="04" label={t('sectionLabel')} />

      <h2
        ref={headRef}
        className="mt-6 mb-16 font-black leading-[0.95] tracking-tight opacity-0"
        style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', color: 'var(--foreground)', letterSpacing: '-0.03em' }}
      >
        {t('heading')}
      </h2>

      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div className="opacity-0">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border mb-6"
            style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {t('badge')}
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ml-3 mb-6"
            style={{ borderColor: '#5865F2' + '40', background: '#5865F2' + '18' }}
          >
            <FaDiscord size={16} style={{ color: '#5865F2' }} />
            <span className="text-xs font-semibold" style={{ color: '#5865F2' }}>Discord</span>
          </div>

          <p className="text-base leading-[2] mb-4" style={{ color: 'var(--muted)' }}>{t('desc1')}</p>
          <p className="text-base leading-[2]" style={{ color: 'var(--muted)' }}>{t('desc2')}</p>

          <a
            href="https://notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden inline-flex items-center gap-2 mt-10 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300"
            style={{ background: 'var(--foreground)', color: 'var(--background)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('joinButton')} <ArrowUpRight size={14} />
            </span>
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: 'var(--highlight)' }}
            />
          </a>
        </div>

        {/* Right: cards */}
        <div className="space-y-4 opacity-0">
          <a
            href="https://notion.so"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', backdropFilter: 'blur(8px)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--border-strong)' }}
            >
              <SiNotion size={20} style={{ color: 'var(--foreground)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>{t('notionLabel')}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t('notionSub')}</p>
            </div>
            <ExternalLink size={13} className="opacity-30 group-hover:opacity-70 transition-opacity flex-shrink-0" />
          </a>

          <div
            className="flex items-center gap-4 p-5 rounded-3xl"
            style={{ background: 'var(--card)', border: '1px dashed var(--border)', opacity: 0.5 }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--border)' }}
            >
              <Clock size={18} style={{ color: 'var(--muted)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>{t('siteLabel')}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t('siteSub')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT SOCIAL ROW ──────────────────────────────────────────── */
function ContactSocialRow({ Icon, label, val, href, color, external }: {
  Icon: React.ComponentType<{ size?: number }>;
  label: string; val: string; href: string; color: string; external?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 hover:-translate-x-0.5"
      style={{ background: hovered ? 'var(--card)' : 'transparent', boxShadow: hovered ? 'var(--shadow)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          background: hovered ? color : 'var(--border)',
          color: hovered ? '#fff' : 'var(--muted)',
          boxShadow: hovered ? `0 4px 16px ${color}40` : 'none',
        }}
      >
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-mono" style={{ color: 'var(--muted-2)' }}>{label}</p>
        <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{val}</p>
      </div>
      <ExternalLink
        size={13}
        className="flex-shrink-0 transition-opacity"
        style={{ color: 'var(--muted-2)', opacity: hovered ? 0.8 : 0.3 }}
      />
    </a>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────────── */
function Contact() {
  const t = useTranslations('Contact');
  const sectionRef  = useRef<HTMLElement>(null);
  const bigTextRef  = useRef<HTMLHeadingElement>(null);
  const introRef    = useRef<HTMLParagraphElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          /* Big text — char by char */
          if (bigTextRef.current) {
            const text = t('bigText');
            bigTextRef.current.innerHTML = text.split('').map(ch =>
              ch === ' ' ? ' ' : `<span class="inline-block overflow-hidden"><span class="inline-block">${ch}</span></span>`
            ).join('');
            const chars = bigTextRef.current.querySelectorAll<HTMLElement>('span > span');
            gsap.set(bigTextRef.current, { opacity: 1 });
            gsap.fromTo(chars, { y: '110%' }, { y: '0%', duration: 0.9, stagger: 0.03, ease: 'power4.out' });
          }

          gsap.fromTo(introRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
          gsap.fromTo(formRef.current?.children ?? [], { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.55, ease: 'power3.out',
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('done'), 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <span className="section-num">05</span>
      <SectionLabel number="05" label={t('sectionLabel')} />

      {/* Huge text reveal */}
      <h2
        ref={bigTextRef}
        className="font-black leading-none tracking-tight mt-8 mb-8 opacity-0"
        style={{
          fontSize: 'clamp(3.5rem, 11vw, 10rem)',
          color: 'var(--foreground)',
          letterSpacing: '-0.04em',
        }}
      >
        {t('bigText')}
      </h2>

      <p
        ref={introRef}
        className="text-lg leading-[2] mb-20 max-w-xl opacity-0"
        style={{ color: 'var(--muted)' }}
      >
        {t('intro1')}<br />{t('intro2')}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Social links */}
        <div className="space-y-1">
          {SOCIAL_LINKS.map(({ icon: Icon, label, val, href, color, external: ext }) => (
            <ContactSocialRow key={label} Icon={Icon} label={label} val={val} href={href} color={color} external={ext !== false} />
          ))}
        </div>

        {/* Form */}
        {status === 'done' ? (
          <div
            className="flex items-center justify-center rounded-3xl p-12"
            style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', backdropFilter: 'blur(12px)' }}
          >
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'var(--foreground)' }}
              >
                <span style={{ color: 'var(--background)' }} className="text-2xl font-bold">✓</span>
              </div>
              <p className="font-bold text-xl mb-2" style={{ color: 'var(--foreground)' }}>{t('successTitle')}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{t('successBody')}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div ref={formRef} className="space-y-4">
              {[
                { field: 'name', type: 'text', key: 'namePlaceholder' },
                { field: 'email', type: 'email', key: 'emailPlaceholder' },
              ].map(({ field, type, key }) => (
                <div key={field} className="opacity-0">
                  <input
                    type={type}
                    placeholder={t(key as 'namePlaceholder' | 'emailPlaceholder')}
                    required
                    value={form[field as keyof typeof form]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-0"
                    style={{
                      background: 'var(--card)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                </div>
              ))}
              <div className="opacity-0">
                <textarea
                  placeholder={t('messagePlaceholder')}
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-200 resize-none focus:ring-2 focus:ring-[var(--foreground)] focus:ring-offset-0"
                  style={{
                    background: 'var(--card)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    backdropFilter: 'blur(8px)',
                  }}
                />
              </div>
              <div className="opacity-0">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative overflow-hidden w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  style={{ background: 'var(--foreground)', color: 'var(--background)' }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'sending' ? t('sending') : <><Send size={14} />{t('send')}</>}
                  </span>
                  <span
                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ background: 'var(--highlight)' }}
                  />
                </button>
              </div>
              <div className="opacity-0 text-center">
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {t('orEmail')}{' '}
                  <a
                    href={`mailto:${t('emailAddress')}`}
                    className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {t('emailAddress')}
                  </a>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────── */
function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer
      className="px-6 lg:px-12 max-w-7xl mx-auto py-10 flex flex-col sm:flex-row justify-between items-center gap-4"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <p className="text-[11px] font-mono" style={{ color: 'var(--muted-2)' }}>{t('copyright')}</p>
      <p className="text-[11px] font-mono" style={{ color: 'var(--muted-2)' }}>{t('builtWith')}</p>
    </footer>
  );
}

export { Hero, Marquee, About, Services, Community, Contact, Footer };
