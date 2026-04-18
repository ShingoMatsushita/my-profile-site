'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Send, ExternalLink, Clock } from 'lucide-react';
import { FaXTwitter, FaYoutube, FaTiktok, FaInstagram, FaLinkedin, FaGithub, FaLine, FaFacebook } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';

/* ─── NOTE ICON (公式SVGなし・カスタム) ──────────────────────────── */
const IconNote = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.84 0A3.84 3.84 0 0 0 0 3.84v16.32A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0zm.392 5.8h15.537v1.96H4.232zm0 4.077h15.537v1.96H4.232zm0 4.076h9.842v1.96H4.232z"/>
  </svg>
);
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { forwardRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/* ─── SOCIAL LINKS ───────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { label: 'X',         icon: FaXTwitter,  href: 'https://x.com/matsu_ai_user?s=21&t=IAVf4M8dh9u9UWgrv4KUlA', val: '@matsu_ai_user', color: '#000000', bg: '#000000' },
  { label: 'note',      icon: IconNote,    href: 'https://note.com/dapper_ivy8264',      val: 'dapper_ivy8264',      color: '#41C9B4', bg: '#41C9B4' },
  { label: 'YouTube',   icon: FaYoutube,   href: 'https://youtube.com',                  val: '@yourchannel',        color: '#FF0000', bg: '#FF0000' },
  { label: 'TikTok',    icon: FaTiktok,    href: 'https://tiktok.com',                   val: '@yourusername',       color: '#010101', bg: '#010101' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/matsu__405?igsh=cDVob3VwNDdvdGh0&utm_source=qr', val: '@matsu__405', color: '#E1306C', bg: '#E1306C' },
  { label: 'LinkedIn',  icon: FaLinkedin,  href: 'https://www.linkedin.com/in/%E6%85%8E%E5%90%BE-%E6%9D%BE%E4%B8%8B-57929b330?utm_source=share_via&utm_content=profile&utm_medium=member_ios', val: 'Shingo Matsushita', color: '#0A66C2', bg: '#0A66C2' },
  { label: 'GitHub',    icon: FaGithub,    href: 'https://github.com/ShingoMatsushita', val: 'ShingoMatsushita',   color: '#181717', bg: '#181717' },
  { label: 'Gmail',     icon: SiGmail,     href: 'mailto:hello@example.com',             val: 'hello@example.com',  color: '#EA4335', bg: '#EA4335', external: false },
  { label: 'LINE',      icon: FaLine,      href: 'https://line.me/ti/p/iAxEToZ8Qp',     val: 'LINE',                color: '#06C755', bg: '#06C755' },
  { label: 'Facebook',  icon: FaFacebook,  href: 'https://www.facebook.com/share/17Wg5hg1XG/?mibextid=wwXIfr', val: 'Facebook', color: '#1877F2', bg: '#1877F2' },
] as const;

/* ─── STATIC DATA ──────────────────────────────────────────────── */
const skills = [
  'TypeScript', 'React / Next.js', 'Node.js', 'Tailwind CSS',
  'GSAP', 'PostgreSQL', 'Docker', 'Git / GitHub',
];

/* ─── SECTION LABEL ──────────────────────────────────────────────── */
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

/* ─── MAGNETIC LINK ──────────────────────────────────────────────── */
function MagneticLink({ href, external, label, brandColor, children }: { href: string; external?: boolean; label?: string; brandColor?: string; children: React.ReactNode }) {
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
    <a ref={ref} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={() => setHovered(true)} title={label}
      className="relative w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
      style={{
        background: hovered ? hoverBg : 'var(--card)',
        borderColor: hovered ? hoverBg : 'var(--border)',
      }}>
      <span style={{ color: hovered ? '#fff' : 'var(--muted)', transition: 'color 0.15s' }}>{children}</span>
      {label && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap pointer-events-none"
          style={{ color: 'var(--foreground)', opacity: hovered ? 0.5 : 0, transition: 'opacity 0.15s' }}>
          {label}
        </span>
      )}
    </a>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────── */
function Hero() {
  const t = useTranslations('Hero');
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      const head = headRef.current;
      if (head) {
        const words = head.innerText.split('\n');
        head.innerHTML = words.map(w => `<span class="block overflow-hidden"><span class="block">${w}</span></span>`).join('');
        tl.fromTo(head.querySelectorAll('span > span'), { y: '100%', rotateX: -15 }, { y: '0%', rotateX: 0, duration: 1.1, stagger: 0.12 });
      }
      tl.fromTo(subRef.current,  { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(metaRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(imgRef.current,   { opacity: 0, scale: 0.92, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.8')
        .fromTo(scrollRef.current,{ opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2');
      const bounceEl = scrollRef.current?.querySelector('.bounce');
      if (bounceEl) gsap.to(bounceEl, { y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center pt-16 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="absolute top-28 right-6 lg:right-12 text-xs font-mono opacity-40 tracking-widest uppercase">{t('copyright')}</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
        <div>
          <p className="text-xs font-mono tracking-[0.2em] uppercase mb-8 opacity-50">{t('basedIn')}</p>
          <h1 ref={headRef} className="text-[clamp(3.2rem,8vw,7.5rem)] font-black leading-[0.95] tracking-tight mb-8"
            style={{ color: 'var(--foreground)', perspective: '800px' }}>
            {`Shingo\nMatsushita`}
          </h1>
          <p ref={subRef} className="text-lg leading-relaxed max-w-md opacity-0" style={{ color: 'var(--muted)' }}>
            {t('sub1')}<br />{t('sub2')}
          </p>
          <div ref={metaRef} className="mt-10 opacity-0">
            <div className="flex flex-wrap gap-2 mb-6">
              {SOCIAL_LINKS.map(({ label, icon: Icon, href, color, external: ext }) => (
                <MagneticLink key={label} href={href} external={ext !== false} label={label} brandColor={color}>
                  <Icon size={15} />
                </MagneticLink>
              ))}
            </div>
            <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex text-sm font-semibold items-center gap-2 group" style={{ color: 'var(--foreground)' }}>
              {t('cta')} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div ref={imgRef} className="flex justify-center lg:justify-end opacity-0">
          <div className="relative">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden relative bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-600">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/avatar.jpg" alt="Shingo Matsushita"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div className="absolute -inset-4 rounded-3xl border border-current opacity-10 pointer-events-none" />
            <div className="absolute -inset-8 rounded-3xl border border-current opacity-5 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 bg-card border border-[var(--border)] rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t('availableForWork')}
            </div>
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-3 opacity-0">
        <div className="bounce w-5 h-8 rounded-full border border-current opacity-30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-current opacity-60" />
        </div>
        <span className="text-xs font-mono tracking-widest uppercase opacity-30">{t('scroll')}</span>
      </div>
    </section>
  );
}

/* ─── MARQUEE ────────────────────────────────────────────────────── */
function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    gsap.to(track, { x: '-50%', duration: 20, repeat: -1, ease: 'none' });
  }, []);
  const items = ['TypeScript','·','React','·','Next.js','·','GSAP','·','Node.js','·','PostgreSQL','·','Design','·','Animation','·'];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[var(--border)] py-4 my-8">
      <div ref={trackRef} className="flex gap-8 whitespace-nowrap w-max">
        {doubled.map((item, i) => <span key={i} className="text-sm font-mono tracking-widest opacity-30 uppercase">{item}</span>)}
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────── */
function About() {
  const t         = useTranslations('About');
  const tTimeline = useTranslations('Timeline');
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef   = useRef<HTMLDivElement>(null);
  const timeline = tTimeline.raw('items') as Array<{ year: string; role: string; place: string; desc: string }>;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const base = { opacity: 0, y: 40 }; const to = { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' };
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, base, to);
          gsap.fromTo(textRef.current?.children ?? [], base, { ...to, stagger: 0.12, delay: 0.1 });
          gsap.fromTo(timelineRef.current?.children ?? [], { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
          gsap.fromTo(skillsRef.current?.children ?? [], { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', delay: 0.3 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <SectionLabel ref={labelRef} number="01" label="About" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
        <div ref={textRef}>
          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-8" style={{ color: 'var(--foreground)' }}>{t('heading')}</h2>
          <p className="text-base leading-[1.9]" style={{ color: 'var(--muted)' }}>{t('bio1')}</p>
          <p className="text-base leading-[1.9] mt-4" style={{ color: 'var(--muted)' }}>{t('bio2')}</p>
          <div ref={skillsRef} className="mt-10 flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="px-3 py-1.5 text-xs font-mono rounded-full border border-[var(--border)] opacity-0" style={{ color: 'var(--muted)' }}>{s}</span>)}
          </div>
        </div>
        <div ref={timelineRef} className="space-y-8">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 opacity-0">
              <div className="flex-shrink-0 text-xs font-mono pt-1 opacity-40 w-16">{item.year}</div>
              <div className="flex-1 border-t border-[var(--border)] pt-4">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>{item.role}</h3>
                  <span className="text-xs opacity-40 font-mono">{item.place}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMMUNITY ──────────────────────────────────────────────────── */
function Community() {
  const t = useTranslations('Community');
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 });
          gsap.fromTo(contentRef.current?.children ?? [], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="community" ref={sectionRef} className="px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <SectionLabel ref={labelRef} number="04" label={t('sectionLabel')} />
      <div ref={contentRef} className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: info */}
        <div className="opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] mb-6"
            style={{ color: 'var(--muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {t('badge')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6"
            style={{ color: 'var(--foreground)' }}>{t('heading')}</h2>
          <p className="text-base leading-[1.9] mb-4" style={{ color: 'var(--muted)' }}>{t('desc1')}</p>
          <p className="text-base leading-[1.9]" style={{ color: 'var(--muted)' }}>{t('desc2')}</p>
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-80"
            style={{ background: 'var(--foreground)', color: 'var(--background)' }}>
            {t('joinButton')} <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Right: cards */}
        <div className="space-y-4 opacity-0">
          {/* Notion card */}
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-5 p-5 rounded-2xl border border-[var(--border)] transition-shadow hover:shadow-lg"
            style={{ background: 'var(--card)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xl font-bold"
              style={{ background: '#000' }}>N</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--foreground)' }}>{t('notionLabel')}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{t('notionSub')}</p>
            </div>
            <ExternalLink size={14} className="opacity-30 group-hover:opacity-70 transition-opacity flex-shrink-0" />
          </a>

          {/* Community site (coming soon) card */}
          <div className="flex items-center gap-5 p-5 rounded-2xl border border-dashed border-[var(--border)]"
            style={{ background: 'var(--card)', opacity: 0.6 }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--border)]">
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

/* ─── CONTACT SOCIAL ROW ─────────────────────────────────────────── */
function ContactSocialRow({ Icon, label, val, href, color, external }: {
  Icon: React.ComponentType<{ size?: number }>;
  label: string; val: string; href: string; color: string; external: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-4"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150"
        style={{
          background: hovered ? color : 'var(--card)',
          borderColor: hovered ? color : 'var(--border)',
          color: hovered ? '#fff' : 'var(--muted)',
        }}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-mono opacity-40">{label}</p>
        <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{val}</p>
      </div>
    </a>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────── */
function Contact() {
  const t = useTranslations('Contact');
  const sectionRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'done'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(bigTextRef.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'expo.out' });
          gsap.fromTo(formRef.current?.children ?? [], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.4, ease: 'power3.out' });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setStatus('sending'); setTimeout(() => setStatus('done'), 1500); };

  return (
    <section id="contact" ref={sectionRef} className="px-6 lg:px-12 max-w-7xl mx-auto py-32">
      <SectionLabel number="05" label={t('sectionLabel')} />
      <h2 ref={bigTextRef} className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight mt-8 mb-20"
        style={{ color: 'var(--foreground)', clipPath: 'inset(0 100% 0 0)' }}>{t('bigText')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>{t('intro1')}<br />{t('intro2')}</p>
          <div className="space-y-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, val, href, color, external: ext }) => (
              <ContactSocialRow key={label} Icon={Icon} label={label} val={val} href={href} color={color} external={ext !== false} />
            ))}
          </div>
        </div>
        {status === 'done' ? (
          <div className="flex items-center justify-center rounded-2xl border border-[var(--border)] p-12" style={{ background: 'var(--card)' }}>
            <div className="text-center">
              <p className="text-4xl mb-4">✓</p>
              <p className="font-bold text-xl mb-2" style={{ color: 'var(--foreground)' }}>{t('successTitle')}</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{t('successBody')}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div ref={formRef} className="space-y-4">
              {[{ field:'name', type:'text', key:'namePlaceholder' }, { field:'email', type:'email', key:'emailPlaceholder' }].map(({ field, type, key }) => (
                <div key={field} className="opacity-0">
                  <input type={type} placeholder={t(key as 'namePlaceholder'|'emailPlaceholder')} required
                    value={form[field as keyof typeof form]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-foreground transition-colors"
                    style={{ background: 'var(--card)', color: 'var(--foreground)' }} />
                </div>
              ))}
              <div className="opacity-0">
                <textarea placeholder={t('messagePlaceholder')} required rows={5}
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border border-[var(--border)] text-sm outline-none focus:border-foreground transition-colors resize-none"
                  style={{ background: 'var(--card)', color: 'var(--foreground)' }} />
              </div>
              <div className="opacity-0">
                <button type="submit" disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-80 disabled:opacity-50"
                  style={{ background: 'var(--foreground)', color: 'var(--background)' }}>
                  {status === 'sending' ? t('sending') : <><Send size={14} />{t('send')}</>}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────── */
function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="border-t border-[var(--border)] px-6 lg:px-12 max-w-7xl mx-auto py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-xs font-mono opacity-30">{t('copyright')}</p>
      <p className="text-xs font-mono opacity-30">{t('builtWith')}</p>
    </footer>
  );
}

/* ─── EXPORT ─────────────────────────────────────────────────────── */
export { Hero, Marquee, About, Community, Contact, Footer };
