'use client';

/**
 * 04 — the annotated assembly. Selecting a part isolates it in the drawing.
 * Parts are buttons (aria-pressed), so it works by keyboard and touch, not
 * only on hover. Every label names a part of the object; nothing here makes
 * a claim about capacity, material or rating.
 */

import { useState } from 'react';

type Part = 'barrel' | 'motor' | 'slat' | 'guide' | 'lock';

export const PARTS: [Part, string, string][] = [
  ['barrel', 'Barrel', 'The shaft above the opening the curtain coils onto.'],
  ['motor', 'Motor', 'Drives the barrel, where the shutter moves often enough that doing it by hand becomes the bottleneck.'],
  ['slat', 'Slat', 'One roll-formed steel section. The curtain is many of them, interlocked along their length.'],
  ['guide', 'Guide', 'The channel each side of the opening the curtain runs in — why side clearance is measured.'],
  ['lock', 'Lock', 'Holds the bottom rail to the floor once the shutter is down.'],
];

export function ProductDetail() {
  const [on, setOn] = useState<Part | null>(null);

  return (
    <div className="dt">
      <div className="dt__side">
        <figure className="dt__photo">
          <img
            src="/images/shutter-face.webp" width={484} height={269} loading="lazy"
            alt="Close view of a perforated steel rolling shutter curtain"
          />
          <figcaption className="t-spec">Perforated curtain · company-listed photograph</figcaption>
        </figure>

        <ul className="dt__parts" aria-label="Parts of an automatic rolling shutter">
          {PARTS.map(([key, label, note], i) => (
            <li key={key}>
              <button
                type="button"
                aria-pressed={on === key}
                onClick={() => setOn(on === key ? null : key)}
                onMouseEnter={() => setOn(key)}
                onMouseLeave={() => setOn(null)}
              >
                <span className="dt__n">{String(i + 1).padStart(2, '0')}</span>
                <b>{label}</b>
                <span className="dt__note">{note}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="dt__stage">
        <Assembly on={on} />
      </div>
    </div>
  );
}

function Assembly({ on }: { on: Part | null }) {
  const ns = { vectorEffect: 'non-scaling-stroke' } as const;
  const part = (p: Part) => ({ className: 'pt', 'data-on': on === p ? '' : undefined });

  return (
    <svg
      className="asm"
      viewBox="0 0 640 600"
      data-active={on ?? undefined}
      role="img"
      aria-label="Elevation of an automatic rolling shutter: barrel and motor in a hood above the opening, the slatted curtain running in two side guides, and a lock at the bottom rail."
    >
      {/* opening + floor */}
      <rect className="t" x="96" y="44" width="448" height="498" {...ns} />
      <line className="o" x1="60" y1="542" x2="580" y2="542" {...ns} />
      <line className="t" x1="60" y1="552" x2="580" y2="552" strokeDasharray="4 7" {...ns} />

      <g {...part('barrel')}>
        <rect className="t" x="128" y="62" width="384" height="104" rx="6" {...ns} />
        <circle className="o" cx="320" cy="114" r="44" {...ns} />
        <circle className="o" cx="320" cy="114" r="14" {...ns} />
        <line className="c" x1="150" y1="114" x2="490" y2="114" {...ns} />
        <path className="ld" d="M352 84 L408 30 L470 30" {...ns} />
        <text className="lb" x="476" y="35">BARREL</text>
      </g>

      <g {...part('motor')}>
        <rect className="f" x="146" y="88" width="66" height="52" rx="3" {...ns} />
        <rect className="o" x="212" y="102" width="26" height="24" {...ns} />
        <path className="ld" d="M170 88 L134 30 L78 30" {...ns} />
        <text className="lb" x="72" y="35" textAnchor="end">MOTOR</text>
      </g>

      <g {...part('slat')}>
        {/* 12 × 26 = 312: the curtain ends at 498, clear of the bottom rail at 512 */}
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i} className="o" {...ns}
            d={`M150 ${186 + i * 26} h340 v26 h-340 z M150 ${199 + i * 26} h340`}
          />
        ))}
        <path className="ld" d="M470 290 L586 250 L610 250" {...ns} />
        <text className="lb" x="582" y="240" textAnchor="end">SLAT</text>
      </g>

      <g {...part('guide')}>
        <rect className="f" x="120" y="170" width="30" height="372" {...ns} />
        <rect className="f" x="490" y="170" width="30" height="372" {...ns} />
        <path className="ld" d="M120 380 L64 420 L40 420" {...ns} />
        <text className="lb" x="40" y="410">GUIDE</text>
      </g>

      <g {...part('lock')}>
        <rect className="f" x="150" y="512" width="340" height="28" {...ns} />
        <rect className="f" x="296" y="518" width="48" height="14" rx="2" {...ns} />
        <path className="ld" d="M344 526 L420 580 L470 580" {...ns} />
        <text className="lb" x="476" y="585">LOCK</text>
      </g>
    </svg>
  );
}
