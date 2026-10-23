'use client';

/**
 * The hero: a rolling shutter, drawn, that actually rolls.
 *
 * Why this is not WebGL — a rolling shutter is an extruded 2D profile moving on
 * a single axis. There is no geometry a camera would reveal, so a GL scene would
 * cost ~150KB and a GPU context to render something flat, and would look worse
 * than a crisp vector line. This is transforms on ~34 divs driven by one scroll
 * listener: sharp at any resolution, no image bytes, and cheap enough that
 * mobile gets the real interaction rather than a fallback.
 *
 * Closed is the server-rendered default, so the shutter is correct with no JS.
 */

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const SLATS = 30;
/** How tightly slats stack once they pass the lintel and start coiling. */
const COIL_PITCH = 0.17;
/** How far a coiling slat foreshortens. */
const COIL_SQUASH = 0.24;

export function ShutterHero() {
  const section = useRef<HTMLElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const barrel = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = section.current;
    const stage = curtain.current?.parentElement;
    const slats = curtain.current
      ? Array.from(curtain.current.querySelectorAll<HTMLElement>('.hero__slat'))
      : [];
    const head = barrel.current;
    const bar = rail.current;
    if (!el || !stage || !slats.length || !head || !bar) return;

    const pinned = stage.parentElement as HTMLElement;

    let pitch = slats[0].offsetHeight || 26;
    let runway = 1;
    let offset = 0;
    let frame = 0;
    let last = -1;

    const measure = () => {
      pitch = slats[0].offsetHeight || pitch;
      // The stage is pinned from the moment its top meets the header until the
      // section runs out underneath it. That distance is the whole travel.
      runway = Math.max(1, el.offsetHeight - pinned.offsetHeight);
      offset = parseFloat(getComputedStyle(pinned).top) || 0;
    };

    /** Hanging below the lintel, or coiled tight above it. */
    const place = (el: HTMLElement, y: number) => {
      if (y >= 0) {
        el.style.transform = `translate3d(0,${y}px,0)`;
        el.style.opacity = '1';
        return false;
      }
      const depth = -y / pitch;
      const squash = Math.max(COIL_SQUASH, 1 - depth * 0.42);
      el.style.transform = `translate3d(0,${y * COIL_PITCH}px,0) scaleY(${squash})`;
      el.style.opacity = String(Math.max(0.35, 1 - depth * 0.1));
      return true;
    };

    const paint = (p: number) => {
      const travel = p * (SLATS * pitch);
      let coiled = 0;

      for (let i = 0; i < slats.length; i++) {
        if (place(slats[i], i * pitch - travel)) coiled++;
      }
      place(bar, SLATS * pitch - travel);

      // The headbox thickens as the curtain accumulates on the barrel.
      head.style.height = `${Math.min(pitch * 3.4, coiled * pitch * COIL_PITCH + (coiled ? pitch * 0.9 : 0))}px`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const p = Math.min(1, Math.max(0, (offset - el.getBoundingClientRect().top) / runway));
        if (Math.abs(p - last) < 0.0008) return;
        last = p;
        paint(p);
      });
    };

    const onResize = () => { measure(); last = -1; onScroll(); };

    measure();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" ref={section} aria-label="Ashoka Fabricators">
      <div className="hero__sticky">
        <div className="hero__stage" aria-hidden="true">
          <div className="hero__grid" />
          {/* A wrapper carries the positioning. Sizing the <svg> itself with
              left/right offsets and `width: auto` makes it fall back to its
              intrinsic viewBox width, which overflowed the stage. */}
          <div className="hero__elevbox">
            <OpeningElevation />
          </div>
          <div className="hero__curtain" ref={curtain}>
            {Array.from({ length: SLATS }, (_, i) => (
              <div className="hero__slat" key={i} style={{ transform: `translate3d(0,${i * 100}%,0)` }} />
            ))}
            {/* The bottom rail. Without it the curtain's lower edge is just
                where the slats stop, which reads as a clipping error rather
                than the bottom of a shutter. */}
            <div className="hero__rail" ref={rail} style={{ transform: `translate3d(0,${SLATS * 100}%,0)` }} />
          </div>
          <div className="hero__scrim" />
          <div className="hero__barrel" ref={barrel} />
        </div>

        <div className="hero__copy">
          <p className="hero__kicker meta">
            <i /> <span>Hyderabad · Since the late 1960s</span>
          </p>
          <h1 className="display d-xl">
            Engineered <br />rolling shutters. <br /><em>Made for your space.</em>
          </h1>
          {/* The kicker above already carries Hyderabad and the heritage; repeating
              them here was the whole of this sentence's second half. It now
              spends that space on what actually distinguishes the work. */}
          <p className="lede" style={{ color: 'var(--ink-inv-2)' }}>
            Commercial, residential and industrial rolling shutters, manual or
            remote-controlled, we fabricate rolling shutters tailored to your
            opening, operating needs and project requirements.
          </p>
          <div className="hero__cta">
            <Link className="btn" href="/quote">
              Get a quote <ArrowUpRight size={16} />
            </Link>
            <Link className="link" href="/products">
              Explore rolling shutters <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="hero__foot">
          <a className="hero__scroll meta" href="#what-we-make">
            <i /> Scroll to open
          </a>
          <span className="meta" aria-hidden="true">FIG. 01 — ROLLING SHUTTER, ELEVATION</span>
        </div>
      </div>
    </section>
  );
}

/**
 * The dimensioned opening sitting behind the curtain. The dimensions are
 * labelled W and H rather than given numbers, because the numbers are the
 * customer's — which is also the argument the whole site is making.
 */
function OpeningElevation() {
  const ns = { vectorEffect: 'non-scaling-stroke' } as const;
  return (
    <svg className="hero__elev dwg dwg--inv" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet">
      {/* reveal / structural opening */}
      <rect className="thin" x="180" y="60" width="640" height="470" {...ns} />
      <rect className="obj" x="220" y="96" width="560" height="398" {...ns} />

      {/* guides */}
      <rect className="obj" x="220" y="96" width="26" height="398" {...ns} />
      <rect className="obj" x="754" y="96" width="26" height="398" {...ns} />

      {/* barrel, hidden behind the headbox */}
      <line className="centre" x1="150" y1="96" x2="850" y2="96" {...ns} />
      <circle className="hidden-edge" cx="500" cy="96" r="44" {...ns} />

      {/* floor */}
      <line className="obj" x1="120" y1="494" x2="880" y2="494" {...ns} />
      <line className="thin" x1="120" y1="502" x2="880" y2="502" strokeDasharray="4 7" {...ns} />

      {/* dimensions — the only red on the stage */}
      <g>
        <line className="dim" x1="220" y1="546" x2="780" y2="546" {...ns} />
        <line className="dim" x1="220" y1="536" x2="220" y2="556" {...ns} />
        <line className="dim" x1="780" y1="536" x2="780" y2="556" {...ns} />
        <path className="dim" d="M234 540l-14 6 14 6M766 540l14 6-14 6" {...ns} />
        <text className="dim-t" x="500" y="538" textAnchor="middle" style={{ fontSize: 26 }}>W</text>
      </g>
      <g>
        <line className="dim" x1="130" y1="96" x2="130" y2="494" {...ns} />
        <line className="dim" x1="120" y1="96" x2="140" y2="96" {...ns} />
        <line className="dim" x1="120" y1="494" x2="140" y2="494" {...ns} />
        <path className="dim" d="M124 110l6-14 6 14M124 480l6 14 6-14" {...ns} />
        <text className="dim-t" x="114" y="295" textAnchor="middle" transform="rotate(-90 114 295)" style={{ fontSize: 26 }}>H</text>
      </g>

      <text className="dim-t" x="860" y="586" textAnchor="end" style={{ fontSize: 22 }}>
        DIMENSIONS: YOURS
      </text>
    </svg>
  );
}
