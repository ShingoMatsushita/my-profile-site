import type { Metadata } from 'next';
import '../globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { CustomCursor } from '@/components/CustomCursor';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Shingo Matsushita — Developer & Designer',
  description: 'Web Developer & Designer. Building fast, beautiful digital experiences.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <CustomCursor />
            <Navigation />
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
