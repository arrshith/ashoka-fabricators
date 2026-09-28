/**
 * Static figures for the v2 homepage. Pure SVG, no client JavaScript.
 *
 * Process vignettes (06) and measuring diagrams (09). Classes: .o object
 * line, .t thin/secondary, .h hidden/assembly path, .d dimension, .dt
 * dimension text. Colours come from the surface they sit on (v2.css).
 */

const ns = { vectorEffect: 'non-scaling-stroke' } as const;

/** A dimension line with ticks and arrowheads, horizontal or vertical. */
function Dim({ x1, y1, x2, y2, label, lx, ly }: {
  x1: number; y1: number; x2: number; y2: number; label: string; lx: number; ly: number;
}) {
  const h = y1 === y2;
  const a = 7, b = 4;
  const heads = h
    ? `M${x1 + a} ${y1 - b}L${x1} ${y1}L${x1 + a} ${y1 + b}M${x2 - a} ${y2 - b}L${x2} ${y2}L${x2 - a} ${y2 + b}`
    : `M${x1 - b} ${y1 + a}L${x1} ${y1}L${x1 + b} ${y1 + a}M${x2 - b} ${y2 - a}L${x2} ${y2}L${x2 + b} ${y2 - a}`;
  const ticks = h
    ? `M${x1} ${y1 - 8}v16M${x2} ${y2 - 8}v16`
    : `M${x1 - 8} ${y1}h16M${x2 - 8} ${y2}h16`;
  return (
    <g>
      <line className="d" x1={x1} y1={y1} x2={x2} y2={y2} {...ns} />
      <path className="d" d={ticks + heads} {...ns} />
      {label && <text className="dt" x={lx} y={ly} textAnchor="middle">{label}</text>}
    </g>
  );
}

/* --- 06 · the process ------------------------------------------------- */

export function Steel() {
  return (
    <svg className="fig" viewBox="0 0 360 240" aria-hidden="true">
      {[70, 58, 46, 34, 22].map((r) => <circle key={r} className="o" cx="104" cy="125" r={r} {...ns} />)}
      <circle className="t" cx="104" cy="125" r="8" {...ns} />
      <path className="o" d="M104 55H318V63H104" {...ns} />
      <Dim x1={336} y1={55} x2={336} y2={63} label="t" lx={350} ly={63} />
    </svg>
  );
}

export function Forming() {
  return (
    <svg className="fig" viewBox="0 0 360 240" aria-hidden="true">
      {/* the slat, in section: a shallow roll-formed face with hooked edges */}
      <path className="o" d="M52 150Q180 66 308 150" {...ns} />
      <path className="o" d="M62 150Q180 80 298 150" {...ns} />
      <path className="o" d="M52 150v16h12v-10h-2M308 150v-16h-12v10h2" {...ns} />
      {/* forming rollers pinching the profile: its outer face peaks at y=108
          and inner at y=115, so r=14 rollers sit at 94 and 129 */}
      <circle className="t" cx="180" cy="94" r="14" {...ns} />
      <circle className="t" cx="180" cy="129" r="14" {...ns} />
      <Dim x1={52} y1={200} x2={308} y2={200} label="PITCH" lx={180} ly={192} />
    </svg>
  );
}

export function Assembly() {
  return (
    <svg className="fig" viewBox="0 0 360 240" aria-hidden="true">
      <rect className="o" x="96" y="18" width="168" height="30" rx="15" {...ns} />
      <line className="t" x1="112" y1="33" x2="248" y2="33" strokeDasharray="10 4 2 4" {...ns} />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} className="o" x="112" y={86 + i * 20} width="136" height="20" {...ns} />
      ))}
      <rect className="o" x="46" y="80" width="18" height="140" {...ns} />
      <rect className="o" x="296" y="80" width="18" height="140" {...ns} />
      {/* assembly paths: curtain into guides, curtain up onto the barrel */}
      <path className="h" d="M110 136H72M250 136H288M180 82V54" {...ns} />
      <path className="h" d="M80 132l-8 4 8 4M280 132l8 4-8 4M176 62l4-8 4 8" {...ns} />
    </svg>
  );
}

export function Installed() {
  return (
    <svg className="fig" viewBox="0 0 360 240" aria-hidden="true">
      <rect className="t" x="76" y="30" width="208" height="180" {...ns} />
      <rect className="o" x="68" y="22" width="224" height="28" rx="3" {...ns} />
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} className="t" x1="82" y1={65 + i * 15} x2="278" y2={65 + i * 15} {...ns} />
      ))}
      <rect className="o" x="68" y="50" width="14" height="160" {...ns} />
      <rect className="o" x="278" y="50" width="14" height="160" {...ns} />
      <line className="o" x1="40" y1="210" x2="320" y2="210" {...ns} />
      <Dim x1={82} y1={228} x2={278} y2={228} label="W" lx={180} ly={222} />
      <Dim x1={46} y1={50} x2={46} y2={210} label="H" lx={32} ly={134} />
    </svg>
  );
}

/* --- 09 · what to measure -------------------------------------------- */

export function MeasureWidth() {
  return (
    <svg className="fig" viewBox="0 0 120 92" aria-hidden="true">
      <rect className="t" x="22" y="10" width="76" height="56" {...ns} />
      <Dim x1={22} y1={80} x2={98} y2={80} label="" lx={0} ly={0} />
    </svg>
  );
}

export function MeasureHeight() {
  return (
    <svg className="fig" viewBox="0 0 120 92" aria-hidden="true">
      <rect className="t" x="36" y="10" width="62" height="72" {...ns} />
      <Dim x1={18} y1={10} x2={18} y2={82} label="" lx={0} ly={0} />
    </svg>
  );
}

export function MeasureHeadroom() {
  return (
    <svg className="fig" viewBox="0 0 120 92" aria-hidden="true">
      <line className="o" x1="8" y1="8" x2="112" y2="8" {...ns} />
      <line className="o" x1="26" y1="34" x2="112" y2="34" {...ns} />
      <rect className="t" x="36" y="34" width="62" height="50" {...ns} />
      <Dim x1={18} y1={8} x2={18} y2={34} label="" lx={0} ly={0} />
    </svg>
  );
}

export function MeasureUsage() {
  return (
    <svg className="fig" viewBox="0 0 120 92" aria-hidden="true">
      <rect className="t" x="16" y="10" width="60" height="72" {...ns} />
      {[24, 36, 48].map((y) => <line key={y} className="t" x1="16" y1={y} x2="76" y2={y} {...ns} />)}
      <path className="d" d="M94 44V12M88 20l6-8 6 8M104 50v32M98 74l6 8 6-8" {...ns} />
    </svg>
  );
}
