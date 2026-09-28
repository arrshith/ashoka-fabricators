'use client';

/**
 * Site-wide motion, in one place: GSAP ScrollTrigger reveals for content
 * blocks, and a draw-on for the strip cross-sections.
 *
 * Nothing is hidden until GSAP has loaded, and anything already on screen at
 * that moment is left alone, so the page never blinks out and back in. With
 * reduced motion requested, or scripts off, everything is simply shown.
 * Re-runs on every route change and reverts cleanly.
 */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL = [
  '.rise', '.head', '.band', '.mat', '.strip', '.ref', '.logo-grid li',
  '.steps > li', '.cta-band', '.faq details', '.next-card', '.tile',
].join(', ');

export function Motion() {
  const path = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let revert: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      // Start only once the page has hydrated: styling elements React has not
      // claimed yet causes hydration mismatches.
      if (document.readyState !== 'complete') await new Promise((r) => window.addEventListener('load', r, { once: true }));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
        const items = gsap.utils.toArray<HTMLElement>(REVEAL).filter(below);

        gsap.set(items, { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, {
            autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true,
          }),
        });

        // Each strip profile is drawn end to end, like a pen on paper.
        gsap.utils.toArray<SVGPathElement>('.strip .sect').forEach((p) => {
          const len = p.getTotalLength();
          gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
            strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
            clearProps: 'strokeDasharray,strokeDashoffset',
            scrollTrigger: { trigger: p, start: 'top 85%', once: true },
          });
        });
      });
      revert = () => ctx.revert();
    })();

    return () => { cancelled = true; revert?.(); };
  }, [path]);

  return null;
}
