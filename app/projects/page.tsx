import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { productBySlug } from '@/lib/content';
import { clients } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Projects & clients',
  'Rolling shutters installed by Ashoka Fabricators, and the retailers, industrial plants and builders who have trusted the workshop.',
  '/projects',
);

const SECTORS: [typeof clients[number]['sector'], string][] = [
  ['Retail', 'Shopping malls, retail and hospitality'],
  ['Industry', 'Industry and public sector'],
  ['Builders', 'Builders and developers'],
];

export default function Projects() {
  const installed = productBySlug('industrial-rolling-shutters')?.refs ?? [];

  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'Projects' }]} />
      <PageHead
        label="Projects & clients"
        title={<>Shutters in <br />service.</>}
        lede="From shopping malls to power plants, Ashoka shutters close openings across Hyderabad and beyond. Every one was measured, drawn and made for the opening it closes."
      />

      <Chapter no="01 / INSTALLED">
        <SectionHead label="Recent work" title={<>Made and fitted <br />by Ashoka.</>} />
        <div className="ref-row">
          {installed.map((r) => (
            <figure className="ref" key={r.src} style={{ maxWidth: Math.min(r.w, 460) }}>
              <img src={r.src} width={r.w} height={r.h} alt={r.alt} loading="lazy" />
              <figcaption className="meta">{r.caption}</figcaption>
            </figure>
          ))}
        </div>
      </Chapter>

      <Chapter no="02 / CLIENTS">
        <SectionHead label="Who we work for" title={<>Trusted across <br />three sectors.</>} />
        {SECTORS.map(([sector, label]) => (
          <div className="logo-set" key={sector}>
            <p className="meta meta--annot">{label}</p>
            <ul className="logo-grid">
              {clients.filter((c) => c.sector === sector).map((c) => (
                <li key={c.slug}>
                  <img src={`/images/clients/${c.slug}.webp`} width={c.w ?? 138} height={68} alt={c.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Chapter>

      <Chapter no="03 / NEXT" tight>
        <div className="cta-band">
          <div>
            <p className="meta meta--annot">Next step</p>
            <h2 className="display d-sm" style={{ margin: '16px 0 14px' }}>Have an opening?</h2>
            <p className="body-c">Width, height and a photograph are enough to start.</p>
          </div>
          <Link className="btn" href="/quote">Get a quote <ArrowUpRight size={16} /></Link>
        </div>
      </Chapter>
    </div>
  );
}
