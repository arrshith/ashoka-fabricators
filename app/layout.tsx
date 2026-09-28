import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ContactActions } from '@/components/contact-actions';
import { PageAnalytics } from '@/components/page-analytics';
import { Motion } from '@/components/motion';

export const metadata: Metadata = {
  title: {
    default: 'Ashoka Fabricators | Engineered entrances, Hyderabad since the late 1960s',
    template: '%s | Ashoka Fabricators',
  },
  description:
    'Rolling shutters, security gates, entrance automation and steel fabrication, made to measure in Hyderabad since the late 1960s — for Hyderabad and customers across India.',
  other: { 'codex-preview': 'development' },
  // SVG first so the tab icon is sharp at any density; the raster stays as a
  // fallback for clients that do not take an SVG favicon.
  icons: {
    icon: [
      { url: '/images/logo-mark.svg', type: 'image/svg+xml' },
      { url: '/images/logo-mark.webp', type: 'image/webp' },
    ],
    shortcut: '/images/logo-mark.svg',
  },
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
        <Motion />
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ContactActions />
      </body>
    </html>
  );
}
