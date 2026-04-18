'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale    = useLocale();
  const router    = useRouter();
  const pathname  = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    // pathname: /ja/... → /en/...
    const segments = pathname.split('/');
    segments[1] = next;
    startTransition(() => router.push(segments.join('/') || '/'));
  };

  return (
    <div className="flex items-center gap-0.5 text-xs font-mono">
      {(['ja', 'en'] as const).map((l, i) => (
        <>
          {i > 0 && <span key={`sep-${l}`} className="opacity-20 px-0.5">/</span>}
          <button
            key={l}
            onClick={() => switchLocale(l)}
            disabled={isPending}
            className={`px-2 py-1 rounded transition-all duration-200 ${
              locale === l
                ? 'font-bold opacity-100'
                : 'opacity-30 hover:opacity-70'
            }`}
            style={{ color: 'var(--foreground)' }}
          >
            {l.toUpperCase()}
          </button>
        </>
      ))}
    </div>
  );
}
