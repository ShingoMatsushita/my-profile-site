'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { href: '#about',     label: 'About' },
  { href: '#portfolio', label: 'Work' },
  { href: '#blog',      label: 'Blog' },
  { href: '#community', label: 'Community' },
  { href: '#contact',   label: 'Contact' },
];

export function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef   = useRef<HTMLAnchorElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      );
      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.3 }
        );
      }

      ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <a
            ref={logoRef}
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-bold text-lg tracking-tight opacity-0"
            style={{ color: 'var(--foreground)' }}
          >
            S.M
          </a>

          <div className="flex items-center gap-8">
            <ul ref={listRef} className="hidden md:flex gap-8 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.href} className="opacity-0">
                  <a
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="relative group"
                    style={{ color: 'var(--muted)' }}
                  >
                    <span className="transition-colors duration-200 group-hover:text-foreground"
                      style={{ color: 'inherit' }}
                    >
                      {item.label}
                    </span>
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"
                      style={{ background: 'var(--foreground)' }}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
