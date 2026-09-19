import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ContactActions } from '@/components/contact-actions';
import { PageAnalytics } from '@/components/page-analytics';

export const metadata: Metadata = {
  title: {
    default: 'Ashoka Fabricators | Engineered entrances, Hyderabad since 1972',
    template: '%s | Ashoka Fabricators',
  },
  description:
    'Rolling shutters, security gates, entrance automation and steel fabrication, made to measure in Hyderabad since 1972.',
  other: { 'codex-preview': 'development' },
  icons: { icon: '/images/logo-mark.webp', shortcut: '/images/logo-mark.webp' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        {/* The display and mono faces are used above the fold on every page. */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/plex-cond-700.woff2" crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/plex-mono-400.woff2" crossOrigin="" />
      </head>
      <body>
        <PageAnalytics />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ContactActions />
      </body>
    </html>
  );
}
