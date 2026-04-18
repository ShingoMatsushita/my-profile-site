'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Twitter, Mail, ArrowUpRight, Send } from 'lucide-react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { forwardRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

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
function MagneticLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - rect.left - rect.width / 2) * 0.4, y: (e.clientY - rect.top - rect.height / 2) * 0.4, duration: 0.3, ease: 'power2.out' });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  return (
    <a ref={ref} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center transition-colors hover:bg-foreground hover:border-foreground group"
      style={{ background: 'var(--card)' }}>
      <span className="transition-colors group-hover:text-background" style={{ color: 'var(--muted)' }}>{children}</span>
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
          <div ref={metaRef} className="mt-10 flex items-center gap-6 opacity-0">
            <MagneticLink href="https://github.com/ShingoMatsushita" external><Github size={18} /></MagneticLink>
            <MagneticLink href="https://note.com/dapper_ivy8264" external><Mail size={18} /></MagneticLink>
            <MagneticLink href="https://twitter.com" external><Twitter size={18} /></MagneticLink>
            <span className="w-px h-8 bg-current opacity-15" />
            <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="text-sm font-semibold flex items-center gap-2 group" style={{ color: 'var(--foreground)' }}>
              {t('cta')} <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
        <div ref={imgRef} className="flex justify-center lg:justify-end opacity-0">
          <div className="relative">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden relative">
              <Image src="/images/avatar.jpg" alt="Shingo Matsushita" fill className="object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-600">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-30 mb-2">
                  <circle cx="32" cy="24" r="14" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 58c0-14.359 11.64-26 26-26s26 11.641 26 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <p className="text-[10px] font-mono opacity-30 tracking-widest uppercase">Your Photo</p>
              </div>
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
      <SectionLabel number="04" label={t('sectionLabel')} />
      <h2 ref={bigTextRef} className="text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-tight mt-8 mb-20"
        style={{ color: 'var(--foreground)', clipPath: 'inset(0 100% 0 0)' }}>{t('bigText')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>{t('intro1')}<br />{t('intro2')}</p>
          <div className="space-y-4">
            {[
              { icon: Mail,    label: 'Email',   val: 'hello@example.com',             href: 'mailto:hello@example.com' },
              { icon: Github,  label: 'GitHub',  val: 'github.com/ShingoMatsushita',   href: 'https://github.com/ShingoMatsushita' },
              { icon: Twitter, label: 'note',    val: 'note.com/dapper_ivy8264',        href: 'https://note.com/dapper_ivy8264' },
            ].map(({ icon: Icon, label, val, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center transition-colors group-hover:bg-foreground group-hover:border-foreground" style={{ background: 'var(--card)' }}>
                  <Icon size={16} className="transition-colors group-hover:text-background" style={{ color: 'var(--muted)' }} />
                </div>
                <div>
                  <p className="text-xs font-mono opacity-40">{label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{val}</p>
                </div>
              </a>
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
export { Hero, Marquee, About, Contact, Footer };
