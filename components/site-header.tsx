'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links: [string, string, string][] = [
  ['Rolling shutters', '/products', 'COMMERCIAL · RESIDENTIAL · INDUSTRIAL'],
  ['Our story', '/about', 'SINCE THE 1960S'],
  ['Projects', '/projects', 'REFERENCES'],
  ['Notes', '/resources', 'GUIDANCE'],
  ['Contact', '/contact', 'HYDERABAD'],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  // Close the sheet when the route changes. Adjusting state during render is
  // the supported pattern for this; an effect would cause a cascading render.
  const [shownFor, setShownFor] = useState(path);
  if (path !== shownFor) {
    setShownFor(path);
    setOpen(false);
  }

  // The mobile sheet covers the page, so stop the page behind it scrolling.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="hdr">
      <Link className="brand" href="/" aria-label="Ashoka Fabricators — home">
        <img src="/images/logo-mark.svg" width={108} height={37} alt="Ashoka" />
        <span className="brand__txt" aria-hidden="true">Fabricators</span>
      </Link>

      <nav className="nav" aria-label="Main">
        {links.map(([label, href]) => (
          <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>
            {label}
          </Link>
        ))}
      </nav>

      <Link className="btn btn--sm hdr__quote" href="/quote">
        Get a quote <ArrowUpRight size={14} />
      </Link>

      <button
        className="hdr__toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Main">
          {links.map(([label, href, note]) => (
            <Link key={href} href={href}>
              {label} <span aria-hidden="true">{note}</span>
            </Link>
          ))}
          <Link href="/quote">Get a quote <span aria-hidden="true">→</span></Link>
          <p className="meta">Hyderabad, Telangana · Since the late 1960s</p>
        </nav>
      )}
    </header>
  );
}
