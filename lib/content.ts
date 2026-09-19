/**
 * Product and editorial content.
 *
 * The `variants` lists are the product names Ashoka actually publishes on its
 * own catalogue — they are not descriptions of capability beyond that. No
 * dimensions, load ratings, motor brands, finishes or warranty terms appear
 * anywhere in this file, because none have been supplied. Where a page would
 * naturally want one, `unconfirmed` carries a TODO instead.
 */

export type DrawingKey =
  | 'shutter-auto' | 'shutter-manual' | 'gate-sliding'
  | 'gate-swing' | 'automation' | 'fabrication';

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
  /** Catalogue names published by the company. */
  variants: string[];
  applications: string[];
  /** What the customer should tell us — the brief, not a spec sheet. */
  brief: string[];
  /** Facts a buyer will ask for that the company has not yet supplied. */
  unconfirmed: string[];
  /**
   * Catalogue photographs, with their true native pixel size. Nothing is ever
   * rendered above these numbers — that rule is what keeps the site sharp.
   * Products with no usable photograph simply have none.
   */
  refs?: { src: string; w: number; h: number; alt: string; caption: string }[];
};

export const products: Product[] = [
  {
    slug: 'automatic-rolling-shutters',
    name: 'Automatic\nrolling shutters',
    family: 'Rolling shutters',
    code: 'RS-A',
    tagline: 'Powered opening, on one axis, every day.',
    drawing: 'shutter-auto',
    intro:
      'A motor-driven curtain that rises into a barrel above the opening. Suited to entrances that are opened and closed often enough that doing it by hand becomes the bottleneck.',
    detail:
      'The shutter and its drive are specified together. Curtain material, guide depth, headroom above the lintel, duty cycle and the controls you want all shape the selection, and all of them are settled against your actual opening rather than a catalogue default.',
    variants: ['Electric Rolling Shutters', 'Motorized Rolling Shutters', 'Automatic Rolling Shutters'],
    applications: ['Retail entrances', 'Showroom frontages', 'Commercial openings', 'Warehouse access'],
    brief: [
      'Clear opening width and height, approximate is fine',
      'Headroom above the lintel and space at each side',
      'How many times a day it will be operated',
      'Available power supply and how you want to control it',
    ],
    unconfirmed: [
      'Maximum manufacturable width and height.',
      'Motor brands, duty ratings and datasheets.',
      'Safety devices offered — bottom-edge sensing, manual override on power failure.',
      'Warranty terms and service intervals.',
    ],
    refs: [{
      src: '/images/centro.webp', w: 238, h: 238,
      alt: 'A metal rolling shutter closed across a Centro store frontage',
      caption: 'Centro storefront. Centro is named as a client on the company profile; the photograph is company-listed and shown at its native size.',
    }],
  },
  {
    slug: 'manual-rolling-shutters',
    name: 'Manual\nrolling shutters',
    family: 'Rolling shutters',
    code: 'RS-M',
    tagline: 'The mechanism that has closed shopfronts for fifty years.',
    drawing: 'shutter-manual',
    intro:
      'A counterbalanced curtain lifted by hand. For openings where the shutter is moved once or twice a day and a motor would be servicing a problem that does not exist.',
    detail:
      'Ashoka lists steel, aluminium, perforated and polycarbonate curtains. Perforated and polycarbonate curtains trade some opacity for daylight and visibility of the display behind, which matters on a retail frontage and rarely matters on a store room.',
    variants: [
      'Manual Rolling Shutters', 'Steel Rolling Shutters', 'Perforated Rolling Shutters',
      'Aluminium Rolling Shutters', 'Polycarbonate Rolling Shutters', 'Flat Design Rolling Shutter',
    ],
    applications: ['Shops', 'Store rooms', 'Commercial premises', 'Secondary entrances'],
    brief: [
      'Clear opening width and height, approximate is fine',
      'Who will be operating it, and how often',
      'Whether you need daylight or visibility through the curtain',
      'Material and finish preference, if you have one',
    ],
    unconfirmed: [
      'Curtain gauges, profiles and available finishes.',
      'Maximum manufacturable width for each curtain material.',
      'Locking arrangements supplied as standard.',
    ],
    refs: [{
      src: '/images/shutter-face.webp', w: 484, h: 269,
      alt: 'Close view of a galvanised perforated rolling shutter curtain in its guides',
      caption: 'Perforated curtain, from the company catalogue. Cropped only to remove the catalogue frame.',
    }],
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
    variants: ['Sliding Gate', 'Swing Gate', 'Heavy Metal Gate', 'Locking Gates'],
    applications: ['Property entrances', 'Commercial access', 'Compound boundaries', 'Vehicle gates'],
    brief: [
      'Clear opening width, and the space either side of it',
      'Whether the ground is level, and how it drains',
      'Vehicle and pedestrian traffic through the same opening',
      'Whether it will be automated now or later',
    ],
    unconfirmed: [
      'Section sizes, infill options and finishes.',
      'Maximum leaf width for swing and sliding configurations.',
      'Foundation and civil work included in, or excluded from, supply.',
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
      'Motors for rolling shutters, swing gates and sliding gates, plus boom barriers for controlled vehicle access. Automation is specified against the thing it has to move, not on its own.',
    detail:
      'Retrofitting a motor to an existing shutter or gate depends on the condition of what is already there — the barrel, the bearings, the guides, the alignment. That has to be inspected. A drive fitted to a mechanism that was already binding will not fix it; it will break it faster.',
    variants: ['Rolling Shutter Motor', 'Swing Gate Automation Motor', 'Sliding Gate Motor', 'Boom Barrier'],
    applications: ['Existing rolling shutters', 'Swing gates', 'Sliding gates', 'Vehicle entry control'],
    brief: [
      'What you are automating, and whether it is new or existing',
      'Its approximate weight and size, or a photograph of it',
      'How often it will run each day',
      'Power supply, and what should happen during an outage',
    ],
    unconfirmed: [
      'Motor brands, models, duty ratings and datasheets.',
      'Safety devices offered — photocells, edge sensing, obstruction detection.',
      'Manual release arrangement on power failure.',
      'Boom barrier arm lengths and cycle ratings.',
    ],
    refs: [{
      src: '/images/motor.webp', w: 250, h: 101,
      alt: 'Two rolling shutter drive units photographed against a white background',
      caption: 'Drive units from the company catalogue. Brands and ratings are not confirmed.',
    }],
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
      'This is where a fifty-four-year-old workshop earns its keep: the opening that is not rectangular, the frame that has to meet an existing structure, the replacement for something nobody makes any more. Send a drawing if you have one. A dimensioned sketch and a photograph is usually enough to start.',
    variants: [
      'Heavy Metal Fabrication Services', 'Mild Steel Fabrication Services',
      'Stainless Steel Fabrication Services', 'MS C Channels', 'Shutter Locks',
    ],
    applications: ['Non-standard openings', 'Grilles and frames', 'Structural steelwork', 'Repairs and replacements'],
    brief: [
      'A drawing, sketch or photograph of what you need',
      'Material and finish, if it matters to you',
      'Where it has to fit, and what it has to meet',
      'Site access and when you need it',
    ],
    unconfirmed: [
      'Materials and sections routinely held or sourced.',
      'Fabrication processes available in-house versus subcontracted.',
      'Surface treatment and finishing options.',
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);

/** Plain single-line name, for titles, menus and form options. */
export const flatName = (p: Product) => p.name.replace('\n', ' ');

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
