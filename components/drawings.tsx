/**
 * Technical drawings.
 *
 * These are orthographic schematics in the house stroke language (see .dwg in
 * globals.css), not illustrations of specific products. They are deliberately
 * unlabelled where a real drawing would carry a number, because no dimensions
 * or specifications have been supplied. Red is only ever a dimension.
 *
 * Every stroke is non-scaling, so hairlines stay hairlines at any size —
 * which is the whole reason the site is drawn rather than photographed.
 */
import type { DrawingKey } from '@/lib/content';

const ns = { vectorEffect: 'non-scaling-stroke' } as const;

/** Horizontal dimension line with extension lines, arrows and a label. */
function DimH({ x1, x2, y, label, drop = 8 }: { x1: number; x2: number; y: number; label: string; drop?: number }) {
  return (
    <g>
      <line className="dim" x1={x1} y1={y - drop} x2={x1} y2={y + 4} {...ns} />
      <line className="dim" x1={x2} y1={y - drop} x2={x2} y2={y + 4} {...ns} />
      <line className="dim" x1={x1} y1={y} x2={x2} y2={y} {...ns} />
      <path className="dim" d={`M${x1 + 7} ${y - 3}L${x1} ${y}L${x1 + 7} ${y + 3}`} {...ns} />
      <path className="dim" d={`M${x2 - 7} ${y - 3}L${x2} ${y}L${x2 - 7} ${y + 3}`} {...ns} />
      <text className="dim-t" x={(x1 + x2) / 2} y={y - 6} textAnchor="middle">{label}</text>
    </g>
  );
}

/** Vertical dimension line, label rotated to read up the page. */
function DimV({ y1, y2, x, label, run = 8 }: { y1: number; y2: number; x: number; label: string; run?: number }) {
  return (
    <g>
      <line className="dim" x1={x - 4} y1={y1} x2={x + run} y2={y1} {...ns} />
      <line className="dim" x1={x - 4} y1={y2} x2={x + run} y2={y2} {...ns} />
      <line className="dim" x1={x} y1={y1} x2={x} y2={y2} {...ns} />
      <path className="dim" d={`M${x - 3} ${y1 + 7}L${x} ${y1}L${x + 3} ${y1 + 7}`} {...ns} />
      <path className="dim" d={`M${x - 3} ${y2 - 7}L${x} ${y2}L${x + 3} ${y2 - 7}`} {...ns} />
      <text
        className="dim-t" x={x - 6} y={(y1 + y2) / 2} textAnchor="middle"
        transform={`rotate(-90 ${x - 6} ${(y1 + y2) / 2})`}
      >{label}</text>
    </g>
  );
}

/** Leader line to a part name. */
function Leader({ x, y, tx, ty, label, anchor = 'start' }: {
  x: number; y: number; tx: number; ty: number; label: string; anchor?: 'start' | 'end';
}) {
  return (
    <g>
      <circle className="thin" cx={x} cy={y} r={1.6} fill="currentColor" {...ns} />
      <path className="thin" d={`M${x} ${y}L${tx} ${ty}`} {...ns} />
      <text className="part-t" x={anchor === 'start' ? tx + 5 : tx - 5} y={ty + 3} textAnchor={anchor}>{label}</text>
    </g>
  );
}

/* ---------------------------------------------------------------- */

function ShutterElevation({ powered }: { powered: boolean }) {
  const slats = Array.from({ length: 15 }, (_, i) => 96 + i * 13);
  return (
    <svg className="dwg" viewBox="0 0 400 320" role="img"
      aria-label={`Elevation of a ${powered ? 'motorised' : 'manually operated'} rolling shutter, showing the barrel, guides, curtain and bottom rail`}>
      {/* headbox + barrel */}
      <rect className="obj-f" x="78" y="46" width="244" height="44" {...ns} />
      <circle className="hidden-edge" cx="200" cy="68" r="17" {...ns} />
      <line className="centre" x1="70" y1="68" x2="330" y2="68" {...ns} />

      {/* guides */}
      <rect className="obj-f" x="78" y="90" width="14" height="194" {...ns} />
      <rect className="obj-f" x="308" y="90" width="14" height="194" {...ns} />

      {/* curtain */}
      <rect className="obj" x="92" y="90" width="216" height="182" {...ns} />
      {slats.map((y) => <line key={y} className="thin" x1="92" y1={y} x2="308" y2={y} {...ns} />)}

      {/* bottom rail */}
      <rect className="obj-f" x="92" y="272" width="216" height="12" {...ns} />

      {powered ? (
        <>
          {/* tubular drive at one end of the barrel */}
          <rect className="obj-f" x="40" y="55" width="34" height="26" {...ns} />
          <path className="obj" d="M40 62h-9v12h9" {...ns} />
          <Leader x={57} y={55} tx={46} ty={30} label="drive" anchor="start" />
        </>
      ) : (
        <>
          {/* centre lock and lifting handles */}
          <rect className="obj" x="190" y="274" width="20" height="8" {...ns} />
          <path className="obj" d={`M120 276h14M266 276h14`} {...ns} />
          <Leader x={200} y={274} tx={236} ty={302} label="centre lock" anchor="start" />
        </>
      )}

      <Leader x={200} y={68} tx={262} ty={26} label="barrel" anchor="start" />
      <Leader x={85} y={180} tx={44} ty={152} label="guide" anchor="end" />

      <DimH x1={78} x2={322} y={306} label="W" />
      <DimV y1={46} y2={284} x={360} label="H" />
    </svg>
  );
}

function SlidingGate() {
  const pickets = Array.from({ length: 16 }, (_, i) => 66 + i * 14.5);
  return (
    <svg className="dwg" viewBox="0 0 400 320" role="img"
      aria-label="Elevation of a sliding gate on a ground track, showing the leaf, pickets, rollers and the run-back it needs behind the opening">
      {/* piers */}
      <rect className="obj-f" x="30" y="84" width="20" height="170" {...ns} />
      <rect className="obj-f" x="350" y="84" width="20" height="170" {...ns} />

      {/* leaf frame */}
      <rect className="obj" x="60" y="104" width="240" height="140" {...ns} />
      <line className="obj" x1="60" y1="124" x2="300" y2="124" {...ns} />
      <line className="obj" x1="60" y1="226" x2="300" y2="226" {...ns} />
      {pickets.map((x) => <line key={x} className="thin" x1={x} y1="124" x2={x} y2="226" {...ns} />)}

      {/* ground line and track */}
      <line className="obj" x1="14" y1="254" x2="386" y2="254" {...ns} />
      <line className="thin" x1="14" y1="259" x2="386" y2="259" strokeDasharray="3 5" {...ns} />
      <circle className="obj" cx="86" cy="248" r="6" {...ns} />
      <circle className="obj" cx="274" cy="248" r="6" {...ns} />

      {/* travel */}
      <path className="dim" d="M300 88h84" {...ns} />
      <path className="dim" d="M377 84l7 4-7 4" {...ns} />
      <text className="dim-t" x="342" y="80" textAnchor="middle">TRAVEL</text>

      <Leader x={86} y={248} tx={110} ty={296} label="roller" anchor="start" />
      <Leader x={300} y={160} tx={344} ty={148} label="leaf" anchor="start" />

      <DimH x1={50} x2={350} y={286} label="CLEAR OPENING" />
    </svg>
  );
}

function SwingGate() {
  return (
    <svg className="dwg" viewBox="0 0 400 320" role="img"
      aria-label="Plan view of a double swing gate, showing both leaves, their hinges and the clear arc each leaf sweeps">
      {/* piers */}
      <rect className="obj-f" x="42" y="150" width="22" height="22" {...ns} />
      <rect className="obj-f" x="336" y="150" width="22" height="22" {...ns} />

      {/* closed leaves, shown solid */}
      <rect className="obj-f" x="64" y="157" width="136" height="8" {...ns} />
      <rect className="obj-f" x="200" y="157" width="136" height="8" {...ns} />

      {/* swept arcs and open positions, shown as hidden edges */}
      <path className="hidden-edge" d="M64 161a136 136 0 0 1 136-136" {...ns} />
      <path className="hidden-edge" d="M336 161a136 136 0 0 0-136-136" {...ns} />
      <line className="hidden-edge" x1="64" y1="161" x2="64" y2="25" {...ns} />
      <line className="hidden-edge" x1="336" y1="161" x2="336" y2="25" {...ns} />

      {/* hinge points */}
      <circle className="obj" cx="64" cy="161" r="5" {...ns} />
      <circle className="obj" cx="336" cy="161" r="5" {...ns} />

      {/* sweep direction */}
      <path className="dim" d="M108 138a92 92 0 0 1 24-38" {...ns} />
      <path className="dim" d="M126 100l7 1-2 7" {...ns} />
      <text className="dim-t" x="196" y="70" textAnchor="middle">CLEAR ARC REQUIRED</text>

      <line className="centre" x1="200" y1="14" x2="200" y2="230" {...ns} />
      <Leader x={64} y={161} tx={34} ty={206} label="hinge" anchor="start" />

      <DimH x1={64} x2={336} y={262} label="CLEAR OPENING" />
    </svg>
  );
}

function AutomationDrive() {
  return (
    <svg className="dwg" viewBox="0 0 400 320" role="img"
      aria-label="Schematic of a shutter drive assembly: motor, gearbox, output shaft and the barrel it turns, with control and supply shown">
      <line className="centre" x1="24" y1="150" x2="376" y2="150" {...ns} />

      {/* motor body */}
      <rect className="obj-f" x="58" y="118" width="86" height="64" {...ns} />
      {[66, 74, 82, 90, 98, 106, 114, 122, 130, 138].map((x) => (
        <line key={x} className="thin" x1={x} y1="118" x2={x} y2="182" {...ns} />
      ))}
      {/* gearbox */}
      <rect className="obj-f" x="144" y="106" width="52" height="88" {...ns} />
      {/* output shaft */}
      <rect className="obj" x="196" y="143" width="44" height="14" {...ns} />
      {/* barrel driven */}
      <circle className="obj" cx="284" cy="150" r="46" {...ns} />
      <circle className="obj" cx="284" cy="150" r="14" {...ns} />
      <path className="hidden-edge" d="M240 150h30" {...ns} />

      {/* curtain leaving the barrel */}
      <path className="thin" d="M284 196v48" {...ns} />
      <path className="thin" d="M300 196v48" {...ns} />
      {[206, 216, 226, 236].map((y) => <line key={y} className="thin" x1="284" y1={y} x2="300" y2={y} {...ns} />)}

      {/* supply + control */}
      <path className="thin" d="M58 150H26" {...ns} />
      <path className="thin" d="M26 150v-46h34" strokeDasharray="4 4" {...ns} />
      <rect className="obj" x="60" y="84" width="40" height="22" {...ns} />
      <text className="part-t" x="80" y="99" textAnchor="middle">CTRL</text>

      <Leader x={101} y={118} tx={118} ty={62} label="motor" anchor="start" />
      <Leader x={170} y={106} tx={196} ty={78} label="gearbox" anchor="start" />
      <Leader x={284} y={104} tx={330} ty={72} label="barrel" anchor="start" />

      <DimH x1={58} x2={240} y={278} label="DRIVE ASSEMBLY" />
    </svg>
  );
}

function FabricationProfiles() {
  /** Section hatching at 45°, the way a cut face is shown on a drawing. */
  return (
    <svg className="dwg" viewBox="0 0 400 320" role="img"
      aria-label="Three steel sections drawn in cut view: a channel, an equal angle and a square hollow section">
      <defs>
        <pattern id="hatch45" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
        </pattern>
      </defs>

      {/* channel */}
      <g>
        <path className="obj" d="M44 84h64v16H60v72h48v16H44z" fill="url(#hatch45)" {...ns} />
        <text className="part-t" x="76" y="212" textAnchor="middle">CHANNEL</text>
        <DimV y1={84} y2={188} x={26} label="D" run={-6} />
      </g>

      {/* equal angle */}
      <g>
        <path className="obj" d="M168 84h16v88h56v16h-72z" fill="url(#hatch45)" {...ns} />
        <text className="part-t" x="204" y="212" textAnchor="middle">ANGLE</text>
      </g>

      {/* square hollow section */}
      <g>
        <path className="obj" d="M290 84h84v104h-84zM306 100h52v72h-52z" fillRule="evenodd" fill="url(#hatch45)" {...ns} />
        <text className="part-t" x="332" y="212" textAnchor="middle">HOLLOW SECTION</text>
        <DimH x1={290} x2={374} y={238} label="B" />
      </g>

      <line className="thin" x1="24" y1="252" x2="376" y2="252" {...ns} />
      <text className="part-t" x="24" y="272">SECTIONS SHOWN CUT — SIZES TO SUIT THE JOB</text>
    </svg>
  );
}

/* ---------------------------------------------------------------- */

/**
 * Shutter strip (patti) cross-sections, traced from the workshop's own
 * samples. Each is one sheet of steel seen end-on: a hook curl on one edge and
 * a tube curl on the other, which is how neighbouring strips lock together.
 * Proportions follow the samples; no gauge or width is stated because none has
 * been supplied, so the width is labelled W.
 */
export type StripKey = 'semi-round' | 'semi-flat-large' | 'semi-flat-small' | 'flat';

/** Line to the arc's start, then the arc. Angles in degrees, 0 = +x, 90 = down. */
function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const pt = (a: number) => `${(cx + r * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(cy + r * Math.sin((a * Math.PI) / 180)).toFixed(1)}`;
  return `L${pt(a0)} A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${a1 > a0 ? 1 : 0} ${pt(a1)}`;
}

/** A path that starts at the arc's own start point. */
const from = (a: string) => a.replace(/^L/, 'M');

const STRIPS: Record<StripKey, { d: string; x1: number; x2: number }> = {
  // A single arch between an open hook (left) and a closed tube (right).
  'semi-round': {
    d: `${from(arc(70, 122, 10, 30, 270))} L80 112 A150 150 0 0 1 320 112 ${arc(330, 122, 10, -90, 240)}`,
    x1: 60, x2: 340,
  },
  // Raised flat face, a groove at each side, a bead on the left and a tube on the right.
  'semi-flat-large': {
    d: `${from(arc(66, 104, 8, 60, 270))} L78 96 L90 116 L104 116 L116 88 L288 88 L300 116 L312 116 L321 110 ${arc(331, 104, 10, 150, 480)}`,
    x1: 58, x2: 341,
  },
  // Narrower: a tube on the left, the raised face, then a step down to a half-round rib.
  'semi-flat-small': {
    d: `${from(arc(100, 98, 8, 300, 630))} L110 88 L236 88 L244 110 L252 110 A18 18 0 0 1 288 110 L288 114 ${arc(282, 114, 6, 0, 160)}`,
    x1: 92, x2: 288,
  },
  // Kerala patti: a flat strip, rolled under at both edges.
  flat: {
    d: `${from(arc(70, 108, 10, -30, 270))} L330 98 ${arc(330, 108, 10, 270, 570)}`,
    x1: 60, x2: 340,
  },
};

export function StripProfile({ kind }: { kind: StripKey }) {
  const s = STRIPS[kind];
  return (
    <svg className="dwg" viewBox="0 0 400 170" role="img" aria-label={`Cross-section of a ${kind.replace(/-/g, ' ')} shutter strip`}>
      <line className="centre" x1="20" y1="104" x2="380" y2="104" {...ns} />
      {/* Scales with the drawing (no non-scaling stroke) so its length can be
          measured for the draw-on in components/motion.tsx. */}
      <path className="sect" d={s.d} />
      <DimH x1={s.x1} x2={s.x2} y={150} label="W" drop={12} />
    </svg>
  );
}

export function Drawing({ kind }: { kind: DrawingKey }) {
  switch (kind) {
    case 'shutter-auto': return <ShutterElevation powered />;
    case 'shutter-manual': return <ShutterElevation powered={false} />;
    case 'gate-sliding': return <SlidingGate />;
    case 'gate-swing': return <SwingGate />;
    case 'automation': return <AutomationDrive />;
    case 'fabrication': return <FabricationProfiles />;
  }
}

/**
 * Three openings at different proportions, each dimensioned. The argument of
 * the whole site in one figure: no two openings are the same, so nothing
 * standard fits them.
 */
export function OpeningVariations() {
  const boxes: [number, number, number, string][] = [
    [30, 108, 150, 'SHOPFRONT'],
    [172, 96, 180, 'ENTRANCE'],
    [300, 74, 114, 'SERVICE'],
  ];
  return (
    <svg className="dwg" viewBox="0 0 400 250" role="img"
      aria-label="Three openings drawn side by side at different widths and heights, each with its own dimensions">
      <line className="obj" x1="14" y1="210" x2="386" y2="210" {...ns} />
      <line className="thin" x1="14" y1="216" x2="386" y2="216" strokeDasharray="4 6" {...ns} />
      {boxes.map(([x, w, h, label]) => (
        <g key={label}>
          <rect className="obj" x={x} y={210 - h} width={w} height={h} {...ns} />
          <line className="thin" x1={x + 7} y1={210 - h + 7} x2={x + w - 7} y2={210 - h + 7} {...ns} />
          <text className="part-t" x={x + w / 2} y={232} textAnchor="middle">{label}</text>
          <DimH x1={x} x2={x + w} y={210 - h - 12} label="W" drop={6} />
        </g>
      ))}
      <DimV y1={60} y2={210} x={396} label="H" run={-7} />
    </svg>
  );
}

/** Small inline marks used to number and annotate the process section. */
export function ProcessMark({ step }: { step: 0 | 1 | 2 | 3 }) {
  const common = { className: 'dwg', viewBox: '0 0 72 56', 'aria-hidden': true } as const;
  if (step === 0) return (
    <svg {...common} width="72" height="56">
      <rect className="obj" x="10" y="12" width="40" height="32" {...ns} />
      <DimH x1={10} x2={50} y={52} label="" drop={5} />
      <line className="dim" x1="56" y1="12" x2="56" y2="44" {...ns} />
    </svg>
  );
  if (step === 1) return (
    <svg {...common} width="72" height="56">
      <path className="obj" d="M12 44L30 12l18 32z" {...ns} />
      <line className="centre" x1="30" y1="6" x2="30" y2="50" {...ns} />
      <circle className="dim" cx="30" cy="28" r="4" {...ns} />
    </svg>
  );
  if (step === 2) return (
    <svg {...common} width="72" height="56">
      <rect className="obj-f" x="10" y="18" width="30" height="20" {...ns} />
      <path className="obj" d="M40 28h16" {...ns} />
      <path className="dim" d="M50 24l6 4-6 4" {...ns} />
      <line className="thin" x1="10" y1="44" x2="56" y2="44" {...ns} />
    </svg>
  );
  return (
    <svg {...common} width="72" height="56">
      <rect className="obj" x="10" y="10" width="36" height="36" {...ns} />
      <path className="dim" d="M18 28l8 8 16-18" {...ns} />
    </svg>
  );
}
