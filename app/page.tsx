import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import './home.css';
import { ShutterHero } from '@/components/shutter-hero';
import { ProductDetail } from '@/components/home/product-detail';
import { ClientMarquee } from '@/components/client-marquee';
import {
  Steel, Forming, Assembly, Installed,
  MeasureWidth, MeasureHeight, MeasureHeadroom, MeasureUsage,
} from '@/components/home/figures';
import { Drawing } from '@/components/drawings';
import { JsonLd, WhatsAppIcon } from '@/components/shared';
import { products, shutters, flatName, type DrawingKey, type Photo } from '@/lib/content';
import { company, clients, actions, areaServed } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Rolling shutters in Hyderabad — commercial, residential & industrial',
  'Ashoka Fabricators makes commercial, residential and industrial rolling shutters in Hyderabad, manual or remote-controlled, plus gates and entrance automation. In the trade since the late 1960s.',
  '/',
);

const PHOTO_BRIEF = 'Hi Ashoka Fabricators, here is a photo of my opening.\n'
  + 'Width: ___\nHeight: ___\nHeadroom: ___\nOpened per day: ___\nArea: ___';

/** The three shutter applications lead; everything else shares one card. */
const CARDS: {
  name: string; code: string; href: string; slug: string; blurb: string;
  chips: string[]; drawing: DrawingKey; photo?: Photo;
}[] = [
  ...shutters.map((p) => ({
    name: flatName(p), code: p.code, href: `/products/${p.slug}`, slug: p.slug,
    blurb: p.tagline, chips: p.variants, drawing: p.drawing, photo: p.refs?.[0],
  })),
  { name: 'Gates & automation', code: 'GT · AU · FB', href: '/products#more', slug: 'security-gates',
    blurb: 'Sliding and swing gates, gate automation, and custom steel fabrication.',
    chips: ['Sliding gates', 'Swing gates', 'Gate automation', 'Fabrication'], drawing: 'gate-sliding' },
];

const PROCESS = [
  { n: '01', title: 'Steel', note: 'Sheet and section, cut to the measured opening.', Fig: Steel },
  { n: '02', title: 'Fabrication', note: 'Formed into strips, guides and brackets, and welded in the workshop.', Fig: Forming },
  { n: '03', title: 'Assembly', note: 'Curtain, barrel, guides and drive brought together and checked.', Fig: Assembly },
  { n: '04', title: 'Installation', note: 'Fitted to the opening, aligned, and set to run.', Fig: Installed },
];

const MEASURE = [
  { n: '01', title: 'Width', note: 'Across the opening, at its widest point.', Fig: MeasureWidth },
  { n: '02', title: 'Height', note: 'Floor to the underside of the lintel.', Fig: MeasureHeight },
  { n: '03', title: 'Headroom', note: 'Lintel to ceiling. It decides whether the barrel fits.', Fig: MeasureHeadroom },
  { n: '04', title: 'Usage', note: 'How many times a day it opens. It decides manual or motor.', Fig: MeasureUsage },
];

export default function Home() {
  const photo = actions(PHOTO_BRIEF).whatsapp;

  return (
    <div className="v2">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#organization`,
        name: company.name,
        url: siteUrl,
        description: 'Manufacturer of commercial, residential and industrial rolling shutters, gates and entrance automation in Hyderabad, Telangana.',
        telephone: company.phone,
        email: company.email,
        address: {
          '@type': 'PostalAddress', streetAddress: company.streetAddress, postalCode: company.postalCode,
          addressLocality: company.city, addressRegion: company.region, addressCountry: 'IN',
        },
        areaServed,
        knowsAbout: products.map(flatName),
      }} />

      <ShutterHero />

      {/* 01 WHAT WE MAKE ------------------------------------------------ */}
      <section className="make" id="what-we-make">
        <div className="v-wrap">
          <header className="sechead sechead--split rise">
            <div>
              <p className="kicker">01 / What we make</p>
              <h2 className="t-editorial">Rolling shutters for every kind of opening.</h2>
            </div>
            <p className="copy">
              Commercial, residential and industrial, in five materials and four strip
              profiles, opened by hand, by motor or by remote.
            </p>
          </header>

          <div className="cards">
            {CARDS.map((f, i) => (
              <Link className="card rise" key={f.name} href={f.href}>
                <div className={`card__fig${f.photo ? ' card__fig--photo' : ''}`}>
                  {f.photo
                    ? <img src={f.photo.src} width={f.photo.w} height={f.photo.h} alt={f.photo.alt} loading="lazy" />
                    : <Drawing kind={f.drawing} />}
                </div>
                <div className="card__body">
                  <p className="t-spec card__no">{String(i + 1).padStart(2, '0')} · {f.code}</p>
                  <h3 className="card__name">{f.name}</h3>
                  <p className="card__blurb">{f.blurb}</p>
                  <ul className="chips">{f.chips.slice(0, 4).map((v) => <li key={v}>{v}</li>)}</ul>
                  <span className="tlink tlink--strong">View details <ArrowUpRight size={14} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 02 IN DETAIL --------------------------------------------------- */}
      <section className="detail dark">
        <div className="v-wrap">
          <header className="sechead sechead--split rise">
            <div>
              <p className="kicker">02 / In detail</p>
              <h2 className="t-editorial">A motorised rolling shutter, part by part.</h2>
            </div>
            <p className="copy">Select a part to see where it sits and what it does.</p>
          </header>
          <div className="rise"><ProductDetail /></div>
        </div>
      </section>

      {/* 03 CLIENTS ----------------------------------------------------- */}
      <section className="clients">
        <div className="v-wrap">
          <header className="sechead sechead--split rise">
            <div>
              <p className="kicker">03 / Clients</p>
              <h2 className="t-editorial">Trusted by retailers, industry and builders.</h2>
            </div>
            <p className="copy">
              Shopping malls, factories, public-sector plants and developers across the
              region, {clients.length} of them named here.
            </p>
          </header>
        </div>
        <ClientMarquee />
      </section>

      {/* 04 THE WORKSHOP ------------------------------------------------ */}
      <section className="proc">
        <div className="v-wrap">
          <header className="sechead sechead--split rise">
            <div>
              <p className="kicker">04 / The workshop</p>
              <h2 className="t-editorial">Flat steel in. A working shutter out.</h2>
            </div>
            <p className="copy">Four stages, each made against the measurement taken at the opening.</p>
          </header>

          <ol className="proc__steps">
            {PROCESS.map(({ n, title, note, Fig }) => (
              <li className="rise" key={n}>
                <div className="proc__fig"><Fig /></div>
                <p className="t-spec">{n}</p>
                <h3>{title}</h3>
                <p>{note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 WHERE WE WORK ----------------------------------------------- */}
      <section className="city">
        <div className="v-wrap city__grid">
          <div className="rise">
            <p className="kicker">05 / Where we work</p>
            <h2 className="city__title">Based out of <span>Hyderabad.</span></h2>
            <p className="city__reach">Working across India.</p>
          </div>
          <div className="city__side rise">
            <p className="copy">
              Most of the work is in and around Hyderabad. Projects elsewhere in India
              start the same way: four measurements and a photograph of the opening.
            </p>
            <dl className="v-ledger v-ledger--row">
              <div><dt>Workshop</dt><dd>Balanagar, {company.city}</dd></div>
              <div><dt>Primarily</dt><dd>{company.serviceArea.primary}</dd></div>
              <div><dt>Also</dt><dd>Across {company.serviceArea.extent}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* 06 BEFORE YOU CALL --------------------------------------------- */}
      <section className="pre">
        <div className="v-wrap">
          <p className="kicker">06 / Before you call</p>
          <h2 className="pre__title">Four measurements make a quotation possible.</h2>
          <ol className="pre__steps">
            {MEASURE.map(({ n, title, note, Fig }) => (
              <li key={n}>
                <div className="pre__fig"><Fig /></div>
                <span className="t-spec">{n}</span>
                <h3>{title}</h3>
                <p>{note}</p>
              </li>
            ))}
          </ol>
          <div className="pre__ask">
            <p className="pre__line">
              Take a photo of the opening. <br />
              {photo.live ? 'Send it to us on WhatsApp.' : 'Send it with your brief.'}
            </p>
            {photo.live ? (
              <a className="v-btn v-btn--onred" href={photo.href} target="_blank" rel="noreferrer">
                <WhatsAppIcon size={17} /> Send photo on WhatsApp
              </a>
            ) : (
              <Link className="v-btn v-btn--onred" href="/quote">
                Send photo with your brief <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
