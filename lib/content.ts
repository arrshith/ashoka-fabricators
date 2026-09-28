/**
 * Product and editorial content.
 *
 * Rolling shutters are roughly nine-tenths of Ashoka's work, so they lead:
 * three applications (commercial, residential, industrial), then the materials,
 * strip profiles and ways of operating that every shutter is built from.
 * Gates, automation and fabrication follow as the secondary range.
 *
 * No dimensions, load ratings, motor models or warranty terms appear here;
 * those are confirmed in writing with each quotation.
 */

import type { StripKey } from '@/components/drawings';

export type DrawingKey =
  | 'shutter-auto' | 'shutter-manual' | 'gate-sliding'
  | 'gate-swing' | 'automation' | 'fabrication';

export type Photo = { src: string; w: number; h: number; alt: string; caption: string };

export type Product = {
  slug: string;
  /** Two-line display name. Set on its own line for the editorial bands. */
  name: string;
  family: 'Rolling shutters' | 'Gates' | 'Automation' | 'Fabrication';
  code: string;
  tagline: string;
  drawing: DrawingKey;
  intro: string;
  detail: string;
  /** The kinds made within this product. */
  variants: string[];
  applications: string[];
  /** What the customer should tell us — the brief, not a spec sheet. */
  brief: string[];
  /**
   * Photographs, with their true native pixel size. Nothing is ever rendered
   * above these numbers. Captions say plainly whether a photograph is
   * Ashoka's own work or an illustrative free-licence image.
   */
  refs?: Photo[];
};

export const products: Product[] = [
  {
    slug: 'commercial-rolling-shutters',
    name: 'Commercial\nrolling shutters',
    family: 'Rolling shutters',
    code: 'RS-C',
    tagline: 'Shopfronts, showrooms and shopping complexes.',
    drawing: 'shutter-auto',
    intro:
      'Shutters for shops, showrooms and the frontages of shopping complexes: closed every night, opened every morning, and seen by everyone who walks past.',
    detail:
      'On a retail frontage the shutter is part of the display. Perforated and polycarbonate curtains keep the shop window visible after closing; solid galvanised or galvalume curtains close it off completely. Wide frontages, and shutters opened many times a day, are usually motorised.',
    variants: ['Solid steel curtains', 'Perforated curtains', 'Polycarbonate see-through curtains', 'Manual, motorised or remote'],
    applications: ['Shops and showrooms', 'Shopping complexes and malls', 'Banks and offices', 'Restaurants and kiosks'],
    brief: [
      'Clear opening width and height, approximate is fine',
      'Headroom above the lintel and space at each side',
      'Whether the display should stay visible after closing',
      'How many times a day it will be opened',
    ],
    refs: [
      {
        src: '/images/commercial.webp', w: 590, h: 310,
        alt: 'A see-through polycarbonate rolling shutter closed across a mall storefront, the display lit behind it',
        caption: 'Polycarbonate see-through shutter on a mall storefront.',
      },
      {
        src: '/images/commercial-perforated.webp', w: 330, h: 400,
        alt: 'A perforated rolling shutter with a brick-pattern grille closed across a shopfront',
        caption: 'Perforated brick-pattern shutter on a shopfront.',
      },
    ],
  },
  {
    slug: 'residential-rolling-shutters',
    name: 'Residential\nrolling shutters',
    family: 'Rolling shutters',
    code: 'RS-R',
    tagline: 'Homes, indoor openings and car garages.',
    drawing: 'shutter-manual',
    intro:
      'Shutters for houses: garage entrances, ground-floor openings and indoor partitions, where the shutter has to be quiet, tidy and easy for anyone in the family to operate.',
    detail:
      'A garage shutter is opened at least twice a day, often by someone sitting in the car, which is where a remote-controlled motor earns its place. Indoors and on balconies, a polycarbonate curtain gives security without shutting out the light.',
    variants: ['Garage shutters', 'Indoor and balcony shutters', 'Polycarbonate see-through curtains', 'Remote-controlled'],
    applications: ['Car garages', 'Ground-floor openings', 'Indoor partitions', 'Balconies and terraces'],
    brief: [
      'Clear opening width and height, approximate is fine',
      'Headroom above the opening and space at each side',
      'Whether you want to open it by hand or by remote',
      'Whether you want light or a view through it',
    ],
    refs: [
      {
        src: '/images/residential.webp', w: 1000, h: 1000,
        alt: 'A motorised aluminium rolling shutter half open over a house garage, a car parked inside',
        caption: 'Motorised garage shutter, with the drive housing beside the barrel.',
      },
      {
        src: '/images/residential-polycarbonate.webp', w: 900, h: 1015,
        alt: 'A see-through polycarbonate shutter in a dark frame across a garden-facing opening, with potted plants in front',
        caption: 'Polycarbonate shutter across a garden-facing opening.',
      },
      {
        src: '/images/residential-grille.webp', w: 736, h: 981,
        alt: 'A dark grille rolling shutter closed in front of a glazed double door',
        caption: 'Grille shutter in front of an entrance door.',
      },
    ],
  },
  {
    slug: 'industrial-rolling-shutters',
    name: 'Industrial\nrolling shutters',
    family: 'Rolling shutters',
    code: 'RS-I',
    tagline: 'Factories, godowns and warehouses.',
    drawing: 'shutter-auto',
    intro:
      'Large, heavy-duty shutters for factories, godowns, warehouses and loading bays: openings a truck drives through, closed on stock worth protecting.',
    detail:
      'Industrial openings are wide and tall, so the curtain is heavy and the barrel, brackets and guides are sized to match. Most are motorised, and Ashoka builds each motor to suit the load it has to lift rather than fitting one standard unit to every size.',
    variants: ['Heavy-duty steel curtains', 'Wide-span openings', 'Motors built to the load', 'Manual or remote operation'],
    applications: ['Factories', 'Godowns', 'Warehouses', 'Loading bays'],
    brief: [
      'Clear opening width and height, approximate is fine',
      'Headroom above the opening and space at each side',
      'What passes through it — people, forklifts or trucks',
      'Power supply available at the opening',
    ],
    refs: [
      {
        src: '/images/industrial.webp', w: 900, h: 1196,
        alt: 'A tall galvanised rolling shutter closing a warehouse opening, with the ASHOKA plate on its bottom rail',
        caption: 'A galvanised warehouse shutter by Ashoka Fabricators. The ASHOKA plate is on the bottom rail.',
      },
      {
        src: '/images/industrial-shed.webp', w: 576, h: 837,
        alt: 'A perforated galvanised rolling shutter in a factory shed, with the barrel and brackets exposed above it',
        caption: 'A perforated galvanised shutter by Ashoka in a factory shed, barrel and brackets exposed above.',
      },
    ],
  },
  {
    slug: 'security-gates',
    name: 'Security\ngates',
    family: 'Gates',
    code: 'GT',
    tagline: 'A boundary that has to open.',
    drawing: 'gate-sliding',
    intro:
      'Sliding and swing gates in mild and heavy steel, fabricated to the opening. The choice between sliding and swinging is usually decided by the ground, not by preference.',
    detail:
      'A swing gate needs a clear arc on one side and reasonably level ground through that arc. A sliding gate needs a run-back roughly as long as the opening is wide, and a track or cantilever path kept clear. Which of those your site can give up is the first question.',
    variants: ['Sliding gates', 'Swing gates', 'Heavy metal gates', 'Locking gates'],
    applications: ['Property entrances', 'Commercial access', 'Compound boundaries', 'Vehicle gates'],
    brief: [
      'Clear opening width, and the space either side of it',
      'Whether the ground is level, and how it drains',
      'Vehicle and pedestrian traffic through the same opening',
      'Whether it will be automated now or later',
    ],
  },
  {
    slug: 'entrance-automation',
    name: 'Entrance\nautomation',
    family: 'Automation',
    code: 'AU',
    tagline: 'The drive, the controls, and everything between.',
    drawing: 'automation',
    intro:
      'Motors and remote control for rolling shutters, and automation systems for sliding and swing gates. Automation is specified against the thing it has to move, not on its own.',
    detail:
      'Shutter motors are built to the load: the width, height and material of the curtain decide the drive. Retrofitting a motor to an existing shutter or gate also depends on the condition of what is already there — the barrel, the bearings, the guides, the alignment — and a drive fitted to a mechanism that already binds will break it faster.',
    variants: ['Rolling shutter motors, built to the load', 'Remote control', 'Sliding gate automation', 'Swing gate automation'],
    applications: ['New rolling shutters', 'Existing rolling shutters', 'Sliding gates', 'Swing gates'],
    brief: [
      'What you are automating, and whether it is new or existing',
      'Its approximate size and material, or a photograph of it',
      'How often it will run each day',
      'Power supply, and what should happen during an outage',
    ],
  },
  {
    slug: 'custom-fabrication',
    name: 'Custom\nfabrication',
    family: 'Fabrication',
    code: 'FB',
    tagline: 'Bring the drawing. Or bring the problem.',
    drawing: 'fabrication',
    intro:
      'Heavy metal, mild steel and stainless steel fabrication. The work that does not have a catalogue entry, because it only exists once.',
    detail:
      'This is where nearly six decades in one trade earn their keep: the opening that is not rectangular, the frame that has to meet an existing structure, the replacement for something nobody makes any more. Send a drawing if you have one. A dimensioned sketch and a photograph is usually enough to start.',
    variants: ['Heavy metal fabrication', 'Mild steel fabrication', 'Stainless steel fabrication', 'Shutter locks and fittings'],
    applications: ['Non-standard openings', 'Grilles and frames', 'Structural steelwork', 'Repairs and replacements'],
    brief: [
      'A drawing, sketch or photograph of what you need',
      'Material and finish, if it matters to you',
      'Where it has to fit, and what it has to meet',
      'Site access and when you need it',
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

/** Plain single-line name, for titles, menus and form options. */
export const flatName = (p: Product) => p.name.replace('\n', ' ');

export const shutters = products.filter((p) => p.family === 'Rolling shutters');
export const secondary = products.filter((p) => p.family !== 'Rolling shutters');

/* --- What a shutter is made of ------------------------------------------ */

/**
 * Curtain materials, with the mill each is bought from. Advantages and
 * disadvantages are general properties of the material, not claims about a
 * particular product; keep them that way.
 */
export type Material = {
  slug: string;
  name: string;
  supplier: string;
  summary: string;
  pros: string[];
  cons: string[];
  image: Photo;
};

export const materials: Material[] = [
  {
    slug: 'mild-steel',
    name: 'Mild steel',
    supplier: 'Tata Steel',
    summary: 'Plain carbon steel, painted after fabrication. The traditional shutter material, and still the most economical.',
    pros: ['The most affordable option', 'Strong, and easy to weld and repair', 'Can be painted any colour'],
    cons: ['Rusts and corrodes if the paint is not maintained', 'The heaviest to lift, so it needs more effort or a larger motor'],
    image: {
      src: '/images/mat-mild-steel.webp', w: 720, h: 478,
      alt: 'Coils of hot-rolled steel on railway wagons',
      caption: 'Hot-rolled steel coils. Photo: Methem, public domain, via Wikimedia Commons.',
    },
  },
  {
    slug: 'galvanised-iron',
    name: 'Galvanised iron',
    supplier: 'AM/NS India',
    summary: 'Steel coated in zinc at the mill. The zinc corrodes first, protecting the steel underneath.',
    pros: ['Far better rust resistance than bare mild steel', 'Low maintenance, with no paint needed', 'Good value over its lifespan'],
    cons: ['The coating wears at cuts and scratches, and white rust can form in damp or salty air', 'As heavy as mild steel', 'A plain silver finish unless painted, which needs a suitable primer'],
    image: {
      src: '/images/mat-galvanised.webp', w: 720, h: 480,
      alt: 'Close view of the crystalline spangle pattern on a galvanised steel sheet',
      caption: 'The zinc spangle of galvanised steel. Public domain, via Wikimedia Commons.',
    },
  },
  {
    slug: 'galvalume',
    name: 'Galvalume',
    supplier: 'JSW',
    summary: 'Steel coated with an aluminium–zinc alloy, about 55% aluminium: the barrier protection of aluminium with the sacrificial protection of zinc.',
    pros: ['Typically outlasts plain galvanised steel several times over in the same conditions', 'Reflects heat, keeping the space behind it cooler', 'Available pre-painted in colours'],
    cons: ['Costs more than galvanised iron', 'Cut edges are less self-protecting than on galvanised steel', 'Damaged by contact with wet cement, lime or plaster'],
    image: {
      src: '/images/mat-galvalume.webp', w: 277, h: 263,
      alt: 'Close view of the fine, even surface of a galvalume sheet',
      caption: 'Galvalume sheet surface. Photo: Pinqui, CC BY-SA 3.0, via Wikimedia Commons.',
    },
  },
  {
    slug: 'aluminium',
    name: 'Aluminium',
    supplier: 'Trusted suppliers',
    summary: 'Extruded aluminium slats, usually powder-coated. Light, and naturally resistant to rust.',
    pros: ['About a third of the weight of steel, so easier to lift and to motorise', 'Does not rust, even in humid or coastal air', 'A clean powder-coated or anodised finish'],
    cons: ['Dents more easily than steel', 'Less resistant to forced entry than a steel curtain', 'Costs more than steel'],
    image: {
      src: '/images/mat-aluminium.webp', w: 659, h: 774,
      alt: 'Cut sections of extruded aluminium profiles laid out beside a ruler',
      caption: 'Extruded aluminium profiles. Photo: Ulfbastel, public domain, via Wikimedia Commons.',
    },
  },
  {
    slug: 'polycarbonate',
    name: 'Polycarbonate',
    supplier: 'Trusted suppliers',
    summary: 'Clear polycarbonate panels held in an aluminium frame. A shutter you can see through.',
    pros: ['See-through, so a shop display stays visible after closing', 'Far more impact-resistant than glass', 'Lets daylight in while the shutter is down'],
    cons: ['The most expensive of the five', 'Can scratch, and yellows over time unless UV-stabilised', 'Less secure than a solid metal curtain'],
    image: {
      src: '/images/mat-polycarbonate.webp', w: 720, h: 540,
      alt: 'A clear ribbed polycarbonate sheet standing on edge against a grey background',
      caption: 'Clear polycarbonate sheet. Photo: MaterialScience100, CC BY-SA 4.0, via Wikimedia Commons.',
    },
  },
];

/** Strip (patti) profiles, as drawn from the workshop's own samples. */
export const strips: { key: StripKey; name: string; alias?: string; note: string }[] = [
  { key: 'semi-round', name: 'Semi round', note: 'A shallow arched strip. The curve stiffens it across the width of the opening. The classic shutter profile.' },
  { key: 'semi-flat-large', name: 'Semi flat, large', note: 'A wide, flat face between two grooves. Fewer joints up the height of the shutter, and a cleaner look.' },
  { key: 'semi-flat-small', name: 'Semi flat, small', note: 'The same flat face on a narrower strip, for smaller openings and a finer line across the curtain.' },
  { key: 'flat', name: 'Flat', alias: 'Kerala patti', note: 'A completely flat strip, rolled under at both edges. The most even face of the four.' },
];

/** How a shutter is opened. */
export const operation: [string, string][] = [
  ['Manual', 'Lifted by hand on a spring-balanced barrel. For shutters opened once or twice a day.'],
  ['Motorised', 'Driven by a motor at the push of a button, for heavy curtains and busy entrances.'],
  ['Remote control', 'Opened from a remote, from inside a car or across a shop floor.'],
];

/* --- Editorial ------------------------------------------------------- */

export type Article = {
  slug: string;
  title: string;
  description: string;
  readMinutes: number;
  sections: [string, string][];
};

export const articles: Article[] = [
  {
    slug: 'manual-or-automatic',
    title: 'Manual or automatic? Start with how often it moves.',
    description: 'The question is not which is better. It is how many times a day someone has to stand there.',
    readMinutes: 3,
    sections: [
      ['Count the cycles', 'A shutter opened twice a day and a shutter opened forty times a day are different problems, and the second one is the case for a motor. Frequency, not opening size, is usually what decides this.'],
      ['Then look above the opening', 'A powered shutter needs the barrel, the drive and, on most installations, room to reach the drive for service. Headroom above the lintel and clear space at the sides can rule an option out before anything else is discussed.'],
      ['Ask about the whole system', 'A motor is not an installation. Controls, safety devices, and what happens when the power fails are separate decisions, and they should each appear in the written specification. Do not assume they are included.'],
      ['Make the first enquiry useful', 'Application, approximate width and height with units, location, and one clear photograph taken from a safe position. That is enough to have a real conversation instead of an estimate.'],
    ],
  },
  {
    slug: 'prepare-your-enquiry',
    title: 'What to send with your first enquiry.',
    description: 'Four things that turn a quotation request into an actual quotation.',
    readMinutes: 3,
    sections: [
      ['Photograph the opening', 'Stand back far enough to include the wall around the opening, the space above it and the space to each side. Photograph from ground level, from somewhere safe. Never climb, and never reach into a mechanism to get the shot.'],
      ['Write down two numbers', 'Width and height, and the unit you measured in. Approximate is genuinely fine at this stage — the point is to establish scale, not to place an order. The measurements that go on the drawing are taken on site, by someone qualified to take them.'],
      ['Say what the opening is for', 'The building use, who operates it, how often, and anything unusual about the site. Constraints you already know about are worth more than a tidy brief.'],
      ['Ask what the price covers', 'Product, controls, delivery, installation, site preparation, making good, lead time and warranty. Ask for it in writing, and ask before you confirm. A number without a scope is not a quotation.'],
    ],
  },
  {
    slug: 'planning-gate-automation',
    title: 'Before you automate a gate.',
    description: 'Space, ground, power and the condition of what is already there.',
    readMinutes: 3,
    sections: [
      ['Start with the gate, not the motor', 'If the gate is existing, its condition decides everything. Hinges, rollers, track, alignment and how freely it moves today all have to be inspected. A drive fitted to a mechanism that already binds will not correct it.'],
      ['Work out what the ground allows', 'A swing leaf needs a clear arc and level ground through it. A sliding gate needs a run-back about as long as the opening is wide. Drainage, gradient and what the vehicles do at the gate all belong in the brief.'],
      ['Plan the power and the failure', 'Where the supply comes from, how it reaches the gate, and what you want to happen during an outage. Manual release is a specification item. Confirm it, and confirm the safety devices, in writing.'],
      ['Get it specified for your site', 'Model, duty rating, controls, safety devices and service requirements — for your gate, in a document. An online calculator cannot produce any of that, and this site deliberately does not pretend otherwise.'],
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
