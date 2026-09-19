import type { Metadata } from "next";
import "./globals.css";
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';
import {ContactActions} from '@/components/contact-actions';
import {PageAnalytics} from '@/components/page-analytics';

export const metadata: Metadata = {
  title: {default:"Ashoka Fabricators | Engineered entrances",template:"%s | Ashoka Fabricators"},
  description: "Rolling shutters, gates, automation and custom fabrication in Hyderabad. Established in 1972.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><PageAnalytics/><a href="#main-content" className="skip-link">Skip to content</a><SiteHeader/><main id="main-content">{children}</main><SiteFooter/><ContactActions/><a className="mobile-quote" href="/quote">Discuss your project</a></body>
    </html>
  );
}
