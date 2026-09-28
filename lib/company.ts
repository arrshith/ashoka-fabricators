/**
 * Single source of truth for company facts.
 *
 * Every value here was supplied by the client. Nothing is estimated,
 * rounded up or inferred. The IndiaMART listing is no longer a source (client, 28 Sep 2026).
 */

export const company = {
  name: 'Ashoka Fabricators',
  /**
   * No founding year is published (client decision, 28 Sep 2026). The first
   * unit, Ashok Rolling Shutters & Engineering Works, opened in the late 1960s
   * and was later rebuilt as Ashoka Fabricators. That is just under sixty
   * years, so copy says "nearly six decades", never "60+".
   */
  since: 'the late 1960s',
  heritage: 'Nearly six decades',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'India',

  /**
   * Where the work is. Confirmed by the client, 26 September 2026: based in
   * Hyderabad, working primarily in Hyderabad, and taking on work anywhere in
   * India. `city` above is where the workshop IS; this is where it SERVES.
   * Copy may say the company works across India; it must not claim specific
   * installations outside Hyderabad, because none have been supplied.
   */
  serviceArea: {
    primary: 'Hyderabad',
    extent: 'India',
  },

  /* Contact, from the proprietor's current business card (28 Sep 2026).
     Every CALL / WHATSAPP action on the site resolves from these; an empty
     string hides that channel rather than showing a stand-in. */
  phone: '+91 93910 53009' as string,
  whatsapp: '+91 93910 53009' as string,
  email: 'reddy.ashoka555@gmail.com' as string,
  streetAddress: '#1-13-166/3, Elico Road, beside Hetero Drugs, Industrial Gate No 5 & 6, Balanagar, Hyderabad' as string,
  postalCode: '500018' as string,
  openingHours: '' as string,
  website: 'https://www.ashokafabs.com',

  /** The person behind the business. Shown in the owner's own words only;
      nothing here is ever paraphrased or supplied on their behalf. */
  owner: {
    name: 'Sai Charan Reddy' as string,
    role: 'Proprietor' as string,
    quote: '' as string,
    portrait: '' as string,
  },
} as const;

/**
 * Clients, from the client-list sheet the company supplied (28 Sep 2026).
 * Logos are cut from that sheet by scripts/prepare-assets.mjs into
 * public/images/clients/<slug>.webp at native size (138 x 68, two at 98 x 68).
 * Two logos carry no legible name and the client does not know them either;
 * they stay on the wall as 'Industrial client' (alt text only).
 */
export const clients: { slug: string; name: string; sector: 'Retail' | 'Industry' | 'Builders'; w?: number }[] = [
  { slug: 'rs-brothers', name: 'R.S. Brothers', sector: 'Retail' },
  { slug: 'jc-brothers', name: 'J.C. Brothers', sector: 'Retail' },
  { slug: 'chandana-bros', name: 'Chandana Bros', sector: 'Retail' },
  { slug: 'south-india', name: 'South India Shopping Mall', sector: 'Retail' },
  { slug: 'grt', name: 'GRT Jewellers', sector: 'Retail' },
  { slug: 'kalanjali', name: 'Kalanjali', sector: 'Retail' },
  { slug: 'kala-niketan', name: 'Kala Niketan', sector: 'Retail' },
  { slug: 'chennai-shopping-mall', name: 'The Chennai Shopping Mall', sector: 'Retail' },
  { slug: 'vijay-textiles', name: 'Vijay Textiles', sector: 'Retail' },
  { slug: 'nilkamal', name: 'Nilkamal', sector: 'Retail' },
  { slug: 'gayatri', name: 'Gayatri Projects', sector: 'Retail' },
  { slug: 'viceroy', name: 'Viceroy Hotels and Resorts', sector: 'Retail' },
  { slug: 'mtar', name: 'MTAR Technologies', sector: 'Industry' },
  { slug: 'vem', name: 'VEM Technologies', sector: 'Industry' },
  { slug: 'esennar', name: 'Esennar Transformers', sector: 'Industry' },
  { slug: 'bhel', name: 'BHEL', sector: 'Industry' },
  { slug: 'client-being-there', name: 'Industrial client', sector: 'Industry', w: 98 },
  { slug: 'client-chevron', name: 'Industrial client', sector: 'Industry' },
  { slug: 'mruga', name: 'Mruga Group', sector: 'Industry' },
  { slug: 'powergrid', name: 'Power Grid', sector: 'Industry' },
  { slug: 'natco', name: 'NATCO', sector: 'Industry' },
  { slug: 'solar-semiconductor', name: 'Solar Semiconductor', sector: 'Industry' },
  { slug: 'ashoka-developers', name: 'Ashoka Developers & Builders', sector: 'Builders' },
  { slug: 'kcp', name: 'KCP Projects', sector: 'Builders' },
  { slug: 'kaandu', name: 'Kaandu Infrastructure', sector: 'Builders' },
  { slug: 'sspdl', name: 'SSPDL Group', sector: 'Builders', w: 98 },
];

/** schema.org areaServed: the primary city first, then the whole country. */
export const areaServed = [
  { '@type': 'City', name: company.serviceArea.primary },
  { '@type': 'Country', name: company.serviceArea.extent },
];

export function waLink(message: string) {
  if (!company.whatsapp) return null;
  return `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return company.phone ? `tel:${company.phone.replace(/[^\d+]/g, '')}` : null;
}

/**
 * Every CALL / WHATSAPP action resolves through here, so filling in `phone`
 * and `whatsapp` above switches the whole conversion layer on with no markup
 * change. Until then each action falls back to the quote form rather than
 * disappearing — and never to a third-party marketplace.
 */
export function actions(message: string) {
  const tel = telLink();
  const wa = waLink(message);
  return {
    call: tel
      ? { href: tel, label: `Call ${company.phone}`, short: 'Call', live: true }
      : { href: '/quote', label: 'Enquire', short: 'Enquire', live: false },
    whatsapp: wa
      ? { href: wa, label: 'WhatsApp', short: 'WhatsApp', live: true }
      : { href: '/quote', label: 'Send a brief', short: 'Quote', live: false },
  };
}
