import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { company, waLink } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Contact',
  'Ways to reach Ashoka Fabricators in Hyderabad about rolling shutters, gates, entrance automation and steel fabrication.',
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
        title={<>Bring us<br />the opening.</>}
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
              {company.phone ? (
                <li>
                  <span className="ledger__k">Telephone</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <a className="ledger__v" href={`tel:${company.phone}`}>{company.phone}</a>
                </li>
              ) : (
                <li>
                  <span className="ledger__k">Telephone</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <span className="todo">Not yet published</span>
                </li>
              )}
              {wa ? (
                <li>
                  <span className="ledger__k">WhatsApp</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <a className="ledger__v" href={wa} target="_blank" rel="noreferrer">Message us</a>
                </li>
              ) : (
                <li>
                  <span className="ledger__k">WhatsApp</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <span className="todo">Not yet published</span>
                </li>
              )}
              {company.email ? (
                <li>
                  <span className="ledger__k">Email</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <a className="ledger__v" href={`mailto:${company.email}`}>{company.email}</a>
                </li>
              ) : (
                <li>
                  <span className="ledger__k">Email</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <span className="todo">Not yet published</span>
                </li>
              )}
              <li>
                <span className="ledger__k">Listing</span>
                <span className="ledger__dots" aria-hidden="true" />
                <a className="ledger__v" href={company.profile} target="_blank" rel="noreferrer">
                  IndiaMART <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 0 }} />
                </a>
              </li>
            </ul>

            <div className="note" style={{ marginTop: 24 }}>
              The direct telephone, WhatsApp and email have not been confirmed by the
              company, so they are not shown. Rather than print a number that might
              not be answered, this site sends you to the channels that do work: the
              quote form, which records your enquiry with a reference, and the
              company&rsquo;s own IndiaMART listing.
            </div>
          </div>

          <div>
            <SectionHead label="Where we are" title="Hyderabad." />
            <p className="body-c">
              The workshop is in Hyderabad, Telangana. The exact street address and
              opening hours have not been confirmed, so the map below shows the city
              rather than a pin that might send you to the wrong door. Confirm the
              address and arrange a time before travelling.
            </p>
            <iframe
              className="map"
              title="Map of Hyderabad, Telangana — the city, not a verified business location"
              src="https://maps.google.com/maps?q=Hyderabad%2C%20Telangana&t=&z=11&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="meta" style={{ marginTop: 12 }}>
              City view. Not a verified workshop pin.
            </p>
            <ul className="ledger" style={{ marginTop: 26 }}>
              <li>
                <span className="ledger__k">Address</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="todo">Awaiting confirmation</span>
              </li>
              <li>
                <span className="ledger__k">Hours</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="todo">Awaiting confirmation</span>
              </li>
              <li>
                <span className="ledger__k">GSTIN</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__v">{company.gstin}</span>
              </li>
            </ul>
          </div>
        </div>
      </Chapter>
    </div>
  );
}
