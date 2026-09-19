import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import { ShutterHero } from '@/components/shutter-hero';
import { Chapter, SectionHead, JsonLd } from '@/components/shared';
import { Drawing, OpeningVariations, ProcessMark } from '@/components/drawings';
import { products, flatName } from '@/lib/content';
import { company, yearsTrading } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Rolling shutters, gates & entrance automation in Hyderabad',
  `Ashoka Fabricators has been making rolling shutters, gates, entrance automation and steel fabrication to measure in Hyderabad since 1972. ${yearsTrading} years, one workshop.`,
  '/',
);

const process: [string, string][] = [
  ['Measure', 'Someone comes and measures the opening. Width, height, headroom, side space, and what the structure around it will actually take.'],
  ['Draw', 'The measurements become a drawing. Everything after this point is made against it, which is why it is worth getting right.'],
  ['Fabricate', 'Cut, formed, welded and finished in the workshop, to the drawing rather than to a nearest standard size.'],
  ['Install', 'Fitted, aligned and set to run. A shutter that binds on the guides was not finished.'],
];

export default function Home() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#organization`,
        name: company.name,
        url: siteUrl,
        foundingDate: String(company.founded),
        description: 'Manufacturer of rolling shutters, security gates, entrance automation and steel fabrication in Hyderabad, Telangana.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: company.city,
          addressRegion: company.region,
          addressCountry: 'IN',
        },
        areaServed: { '@type': 'City', name: 'Hyderabad' },
        knowsAbout: products.map(flatName),
      }} />

      <ShutterHero />

      {/* 02 — THE PROBLEM ------------------------------------------- */}
      <div className="wrap">
        <Chapter no="02 / THE PROBLEM">
          <SectionHead label="Why nothing standard fits" title={<>No two openings<br />are the same size.</>}>
            <p className="body-c">
              An opening is defined by more than a width and a height. Headroom above the
              lintel, clearance at each side, the state of the structure, which way the
              ground falls, how many times a day someone has to move it — change any one
              and the answer changes with it.
            </p>
            <p className="body-c" style={{ marginTop: 16 }}>
              Which is why every job here starts with a measurement and a drawing, and
              never with a catalogue number.
            </p>
          </SectionHead>

          <div className="ruled ruled-mask" style={{ border: '1px solid var(--rule)', background: '#fff', padding: 'clamp(20px,4vw,52px)' }}>
            <OpeningVariations />
          </div>
        </Chapter>
      </div>

      {/* 03 — THE SOLUTIONS ----------------------------------------- */}
      <div className="wrap">
        <Chapter no="03 / SOLUTIONS" id="solutions">
          <SectionHead label="What we make" title={<>Four things,<br />made to fit.</>}>
            <p className="body-c">
              Shutters that roll, gates that slide or swing, the drives that move them,
              and the steelwork for everything that does not have a category.
            </p>
            <Link className="link" href="/products" style={{ marginTop: 18 }}>
              All solutions <ArrowRight size={14} />
            </Link>
          </SectionHead>

          {products.map((p, i) => (
            <article className="band" key={p.slug}>
              <p className="band__no">{String(i + 1).padStart(2, '0')} · {p.code}</p>
              <div className="band__txt">
                <h3>{p.name.split('\n').map((l, n) => <span key={n}>{l}<br /></span>)}</h3>
                <p>{p.intro}</p>
                <ul className="band__specs">
                  {p.variants.slice(0, 4).map((v) => <li key={v}>{v}</li>)}
                </ul>
                <Link className="link" href={`/products/${p.slug}`}>
                  {flatName(p)} <ArrowUpRight size={14} />
                </Link>
              </div>
              <figure className="band__fig">
                <Drawing kind={p.drawing} />
              </figure>
            </article>
          ))}
        </Chapter>
      </div>

      {/* 04 — HERITAGE ---------------------------------------------- */}
      <section className="heritage on-dark">
        <div className="wrap">
          <Chapter no="04 / SINCE 1972">
            <div className="heritage__layout">
              <div>
                <p className="meta meta--annot">The workshop</p>
                <span className="heritage__year">1972</span>
                <h2 className="display d-sm" style={{ margin: '22px 0 20px' }}>
                  The sign has been<br />up a long time.
                </h2>
                <p className="body-c" style={{ color: 'var(--ink-inv-2)' }}>
                  Ashoka Fabricators has been making shutters and gates in Hyderabad
                  since 1972 — {yearsTrading} years, as a proprietorship, from a single
                  workshop. Not a large operation, and it has never claimed to be. It is
                  ten people who have been doing one thing for a very long time.
                </p>
                <Link className="link" href="/about" style={{ marginTop: 22 }}>
                  Inside the workshop <ArrowUpRight size={14} />
                </Link>
              </div>

              <figure className="heritage__photo">
                <img
                  src="/images/board.webp" width={1000} height={750} loading="lazy"
                  alt="The weathered hand-painted Ashoka signboard above the workshop's corrugated awning"
                />
                <figcaption className="meta">The workshop signboard, Hyderabad</figcaption>
              </figure>
            </div>
          </Chapter>
        </div>
      </section>

      {/* 05 — PROCESS ----------------------------------------------- */}
      <div className="wrap">
        <Chapter no="05 / PROCESS">
          <SectionHead label="Measurement to installation" title={<>Four steps, and<br />the first one matters most.</>} />
          <ol className="steps">
            {process.map(([title, copy], i) => (
              <li key={title}>
                <ProcessMark step={i as 0 | 1 | 2 | 3} />
                <p className="meta meta--annot">Step {String(i + 1).padStart(2, '0')}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </Chapter>
      </div>

      {/* 06 — EVIDENCE ---------------------------------------------- */}
      <div className="wrap">
        <Chapter no="06 / THE RECORD">
          <div className="two-col two-col--aside">
            <div>
              <SectionHead label="Verified, not claimed" title={<>What we can<br />actually show you.</>} />
              <p className="body-c">
                Everything on this page comes from the company&rsquo;s own published
                record. There are no invented certifications, no rounded-up project
                counts and no testimonials here, because none have been supplied.
                Where something is missing, the site says so.
              </p>
              <Link className="link" href="/projects" style={{ marginTop: 20 }}>
                Project references <ArrowUpRight size={14} />
              </Link>
            </div>

            <div>
              <ul className="ledger">
                <Row k="Established" v="1972" />
                <Row k="Years trading" v={String(yearsTrading)} />
                <Row k="Legal status" v={company.legalStatus} />
                <Row k="GSTIN" v={company.gstin} />
                <Row k="Team" v={company.staffBand} />
                <Row k="Premises" v={`${company.premisesSqFt.toLocaleString('en-IN')} sq ft`} />
                <Row k="Catalogue" v="39 products" />
                <Row k="Location" v={`${company.city}, ${company.region}`} />
              </ul>
              <p className="meta" style={{ marginTop: 16 }}>
                Source: the company&rsquo;s IndiaMART profile
              </p>
            </div>
          </div>
        </Chapter>
      </div>

      {/* 07 — CTA --------------------------------------------------- */}
      <div className="wrap">
        <Chapter no="07 / ENQUIRIES" tight>
          <div className="cta-band">
            <div>
              <p className="meta meta--annot">Next step</p>
              <h2 className="display d-md" style={{ margin: '18px 0 16px' }}>
                Send us the<br />two numbers.
              </h2>
              <p className="body-c">
                Width, height, and a photograph of the opening. That is enough to start.
                Everything else can be settled in the conversation.
              </p>
            </div>
            <Link className="btn" href="/quote">Get a quote <ArrowUpRight size={16} /></Link>
          </div>
        </Chapter>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li>
      <span className="ledger__k">{k}</span>
      <span className="ledger__dots" aria-hidden="true" />
      <span className="ledger__v">{v}</span>
    </li>
  );
}
