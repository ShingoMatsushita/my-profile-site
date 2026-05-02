'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  { href: '#about',     label: 'About' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#services',  label: 'Services' },
  { href: '#blog',      label: 'Blog' },
  { href: '#community', label: 'Community' },
  { href: '#contact',   label: 'Contact' },
];

/* Animated nav link — text duplicates, top slides up on hover */
function NavLink({ href, label, onClick }: { href: string; label: string; onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  return (
    <a
      href={href}
      onClick={e => onClick(e, href)}
      className="relative block overflow-hidden py-1.5 px-3 text-xs font-medium tracking-wide group"
      style={{ color: 'var(--muted)' }}
    >
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        {label}
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-xs font-semibold"
        style={{ color: 'var(--foreground)' }}
      >
        {label}
      </span>
    </a>
  );
}

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef   = useRef<HTMLAnchorElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    if (listRef.current) {
      gsap.fromTo(listRef.current.children,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.3 }
      );
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'var(--card)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.8)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <a
            ref={logoRef}
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="opacity-0 flex items-center gap-2.5 group"
          >
            <img
              src="/images/logo.png"
              alt="Shingo Matsushita"
              className="h-7 w-7 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ boxShadow: '0 0 0 1.5px var(--border)' }}
            />
            <span className="text-xs font-semibold tracking-wider hidden sm:block" style={{ color: 'var(--muted)' }}>
              SM
            </span>
          </a>

          <div className="flex items-center gap-4">
            <ul ref={listRef} className="hidden md:flex items-center">
              {navItems.map(item => (
                <li key={item.href} className="opacity-0">
                  <NavLink href={item.href} label={item.label} onClick={scrollTo} />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
