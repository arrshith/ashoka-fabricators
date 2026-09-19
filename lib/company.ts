/**
 * Single source of truth for company facts.
 *
 * Every value here is either verified against the company's own published
 * profile, or left empty with a matching entry in `unconfirmed`. Nothing is
 * estimated, rounded up or inferred. See docs/DIRECTION.md and docs/RESEARCH.md.
 */

export const company = {
  name: 'Ashoka Fabricators',
  founded: 1972,
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'India',

  /** Verified: IndiaMART company profile. */
  legalStatus: 'Proprietorship',
  gstin: '36DVXPS6316E2ZX',
  nature: ['Manufacturer', 'Trader', 'Supplier'],
  staffBand: 'Up to 10 people',
  premisesSqFt: 1000,
  departments: [
    'Manufacturing',
    'Designing',
    'Quality testing',
    'Warehousing',
    'Packaging',
    'Sales & marketing',
  ],

  /** Named by the company on its own profile. Not endorsements; no logos used. */
  clientsListed: [
    'R.S. Brothers', 'J.C. Brothers', 'Centro', 'Chandana Bros',
    'South India', 'GRT', 'Kalanjali', 'Kala Niketan',
  ],

  profile: 'https://www.indiamart.com/ashokafabricators/profile.html',

  /* --- Awaiting the client. Deliberately empty: the UI hides or marks any
     channel that is not configured, rather than showing a plausible stand-in.
     Typed as plain strings so filling one in stays a one-line content change. */
  phone: '' as string,
  whatsapp: '' as string,
  email: '' as string,
  streetAddress: '' as string,
  postalCode: '' as string,
  openingHours: '' as string,
} as const;

export const unconfirmed = [
  'Direct telephone number, WhatsApp number and enquiry email address.',
  'Exact street address, pincode and opening hours. Public directories list a Fathe Nagar address, but with a conflicting GST number and founding year, so it is not published here.',
  'Logo master artwork, and reuse rights for the company-listed photographs.',
  'Approved project photographs, project details and client-reference permissions.',
  'Product dimensions, materials, finishes, motor datasheets, safety devices, warranty terms and installation/service scope.',
  'Enquiry notification destination, data retention policy and privacy contact.',
] as const;

export const yearsTrading = new Date().getFullYear() - company.founded;

export function waLink(message: string) {
  if (!company.whatsapp) return null;
  return `https://wa.me/${company.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
