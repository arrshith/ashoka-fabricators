import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { company, waLink } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Contact',
  'Ways to reach Ashoka Fabricators, Hyderabad, about rolling shutters, gates, entrance automation and steel fabrication — from the city or anywhere in India.',
  '/contact',
);

const wa = waLink(
  "Hi Ashoka Fabricators, I'd like to discuss a rolling shutter, gate or fabrication project and get a quotation.",
);

export default function Contact() {
  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <PageHead
        label="Hyderabad, Telangana"
        title={<>Bring us <br />the opening.</>}
        lede="A sketch, a photograph, or a site that is ready. Whichever stage you are at, the quote form is the fastest way to get a specific answer."
      />

      <Chapter no="01 / WAYS TO REACH US">
        <div className="two-col">
          <div>
            <SectionHead label="Preferred" title="Send a brief." />
            <p className="body-c">
              Six short steps, and you can stop after the first three. It collects
              the opening size, the location and a photograph, which is what makes
              the reply useful rather than generic.
            </p>
            <Link className="btn" href="/quote" style={{ marginTop: 24 }}>
              Get a quote <ArrowUpRight size={16} />
            </Link>

            <ul className="ledger" style={{ marginTop: 40 }}>
              <li>
                <span className="ledger__k">Telephone</span>
                <span className="ledger__dots" aria-hidden="true" />
                <a className="ledger__v" href={`tel:${company.phone.replace(/s/g, '')}`}>{company.phone}</a>
              </li>
              {wa && (
                <li>
                  <span className="ledger__k">WhatsApp</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <a className="ledger__v" href={wa} target="_blank" rel="noreferrer">Message us</a>
                </li>
              )}
              <li>
                <span className="ledger__k">Email</span>
                <span className="ledger__dots" aria-hidden="true" />
                <a className="ledger__v" href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            </ul>

          </div>

          <div>
            <SectionHead label="Where we are" title="Hyderabad." />
            {/* Service area confirmed by the client: primarily Hyderabad,
                nationwide on request. See company.serviceArea. */}
            <p className="body-c">
              Most of the work is in and around Hyderabad, and projects anywhere else
              in India are taken on too. Outside the city, start with the quote form:
              the width, the height and a photograph of the opening are enough.
            </p>
            <p className="body-c" style={{ marginTop: 16 }}>
              The workshop is in Balanagar, Hyderabad, on Elico Road beside Hetero
              Drugs, between Industrial Gates 5 and 6. Call ahead before visiting.
            </p>
            <iframe
              className="map"
              title="Map of the Ashoka Fabricators workshop, Balanagar, Hyderabad"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${company.name}, ${company.streetAddress} ${company.postalCode}`)}&z=15&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <ul className="ledger" style={{ marginTop: 26 }}>
              <li>
                <span className="ledger__k">Address</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__v">{company.streetAddress} {company.postalCode}</span>
              </li>
            </ul>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
