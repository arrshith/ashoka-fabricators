'use client';

import { useEffect } from 'react';

/**
 * Scroll reveals for `.rise` elements. Content is never hidden unless this
 * runs: the hiding rule is keyed to `.v2-anim`, which is only added here, so
 * with scripts off the page simply shows everything.
 *
 * Anything already in the viewport is marked revealed *before* the class goes
 * on, so nothing above the fold blinks out and back in on load.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll<HTMLElement>('.rise')];
    const inView = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight * 0.92;
    els.filter(inView).forEach((el) => el.classList.add('in'));
    document.documentElement.classList.add('v2-anim');

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    els.filter((el) => !el.classList.contains('in')).forEach((el) => io.observe(el));

    return () => { io.disconnect(); document.documentElement.classList.remove('v2-anim'); };
  }, []);
  return null;
}
