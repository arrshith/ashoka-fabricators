import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { ProcessMark } from '@/components/drawings';
import { company, yearsTrading, unconfirmed } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'The workshop — Ashoka Fabricators since 1972',
  `A ten-person fabrication workshop in Hyderabad, making rolling shutters, gates and steelwork to measure since 1972. ${yearsTrading} years, one trade.`,
  '/about',
);

export default function About() {
  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'The workshop', item: `${siteUrl}/about` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'The workshop' }]} />
      <PageHead
        label="Hyderabad · Established 1972"
        title={<>Ten people.<br />One trade.<br />{yearsTrading} years.</>}
        lede="Ashoka Fabricators is a proprietorship working out of a single workshop in Hyderabad. It is not a large company, and this page is not going to pretend otherwise."
      />

      {/* The premises ------------------------------------------ */}
      <Chapter no="01 / THE PREMISES">
        <div className="two-col">
          <figure className="ref" style={{ maxWidth: 750 }}>
            <img
              src="/images/premises.webp" width={750} height={1000} loading="lazy"
              alt="The street frontage of the Ashoka Fabricators workshop: a corrugated awning over an open workshop bay, with the painted signboard above"
            />
            <figcaption className="meta">
              The workshop frontage, from the company&rsquo;s own 2024 album.
            </figcaption>
          </figure>

          <div className="prose">
            <h2>A thousand square feet.</h2>
            <p>
              That is the whole of it: a permanent structure with a front porch, in a
              semi-urban part of Hyderabad, with a hand-painted board over the awning
              that has clearly been there a while.
            </p>
            <p>
              The company describes six functions under that roof — manufacturing,
              designing, quality testing, warehousing, packaging, and sales. In a
              workshop this size that does not mean six departments in six rooms. It
              means the same small group does all six, and the person who draws your
              shutter is likely to be the person who checks it before it leaves.
            </p>
            <h2>Why that is the point.</h2>
            <p>
              A larger operation sells you a product from a range. A workshop this size
              sells you the thing it made for your opening, because making one-offs is
              the only way it has ever worked. Fifty-four years of that is a long time
              to keep getting the measurements right.
            </p>
            <Link className="link" href="/quote">
              Start a drawing <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </Chapter>

      {/* The record -------------------------------------------- */}
      <Chapter no="02 / THE RECORD">
        <div className="two-col two-col--aside">
          <SectionHead label="Published facts" title={<>Everything<br />we can verify.</>} />
          <div>
            <ul className="ledger">
              <Row k="Established" v="1972" />
              <Row k="Legal status" v={company.legalStatus} />
              <Row k="Nature of business" v={company.nature.join(' · ')} />
              <Row k="GSTIN" v={company.gstin} />
              <Row k="Team size" v={company.staffBand} />
              <Row k="Premises" v={`${company.premisesSqFt.toLocaleString('en-IN')} sq ft`} />
              <Row k="Location" v={`${company.city}, ${company.region}`} />
            </ul>
            <p className="meta" style={{ marginTop: 16 }}>
              Source: the company&rsquo;s own{' '}
              <a href={company.profile} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>
                published profile
              </a>.
            </p>
          </div>
        </div>
      </Chapter>

      {/* Functions --------------------------------------------- */}
      <Chapter no="03 / THE WORK">
        <SectionHead label="What happens in the workshop" title="Six functions, one room.">
          <p className="body-c">
            The company lists these as its departments. They are listed here as what
            the work consists of, which is closer to the truth at this size.
          </p>
        </SectionHead>
        <div className="tiles tiles--3">
          {company.departments.map((d, i) => (
            <div className="tile" key={d}>
              <span className="meta meta--annot">{String(i + 1).padStart(2, '0')}</span>
              <h3>{d}</h3>
            </div>
          ))}
        </div>
      </Chapter>

      {/* Clients ----------------------------------------------- */}
      <Chapter no="04 / NAMED BY THE COMPANY">
        <div className="two-col two-col--aside">
          <SectionHead label="Customers" title="Who they say they work for." />
          <div>
            <ul className="band__specs" style={{ gap: 8 }}>
              {company.clientsListed.map((c) => <li key={c} style={{ fontSize: 12, padding: '8px 12px' }}>{c}</li>)}
            </ul>
            <div className="note" style={{ marginTop: 22 }}>
              These names are listed by Ashoka on its own profile. They are reproduced
              here as the company&rsquo;s own claim, without logos, without
              testimonials and without project details — because no reference
              permissions or project evidence have been provided. One photograph of a
              Centro storefront appears on the{' '}
              <Link href="/products/automatic-rolling-shutters" style={{ textDecoration: 'underline' }}>
                automatic shutters page
              </Link>, labelled for exactly what it is.
            </div>
          </div>
        </div>
      </Chapter>

      {/* Process ----------------------------------------------- */}
      <Chapter no="05 / HOW A JOB RUNS">
        <SectionHead label="Measurement to installation" title="Four steps." />
        <ol className="steps">
          {([
            ['Measure', 'On site, against the actual opening, including the things a photograph will not show you.'],
            ['Draw', 'The measurements become a drawing, and the drawing becomes the agreement.'],
            ['Fabricate', 'Cut, formed, welded and finished here, to that drawing.'],
            ['Install', 'Fitted and set to run properly in its guides.'],
          ] as [string, string][]).map(([t, c], i) => (
            <li key={t}>
              <ProcessMark step={i as 0 | 1 | 2 | 3} />
              <p className="meta meta--annot">Step {String(i + 1).padStart(2, '0')}</p>
              <h3>{t}</h3>
              <p>{c}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      {/* Outstanding ------------------------------------------- */}
      <Chapter no="06 / OUTSTANDING" tight>
        <div className="two-col two-col--aside">
          <SectionHead label="Being honest about it" title={<>What this site<br />still cannot tell you.</>} />
          <ul className="todo-list">
            {unconfirmed.map((u) => <li key={u}><span>TODO</span>{u}</li>)}
          </ul>
        </div>
      </Chapter>
    </div>
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
