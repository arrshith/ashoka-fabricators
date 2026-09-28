import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import { Breadcrumbs, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { Drawing } from '@/components/drawings';
import { products, productBySlug, flatName } from '@/lib/content';
import { company } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  return p
    ? pageMeta(flatName(p), p.intro, `/products/${p.slug}`)
    : { title: 'Not found' };
}

const faqs: [string, string][] = [
  ['What should I send with my first enquiry?',
    'The approximate width and height of the opening with the unit you measured in, what the opening is for, your location, and one clear photograph taken from ground level. That is enough to have a real conversation.'],
  ['Can you make a non-standard size?',
    'Yes. Everything here is made to the measured opening rather than to a stock size. Feasibility for your specific opening is confirmed when it is measured.'],
  ['Does the price include installation?',
    'Ask for the scope in writing. Product, controls, delivery, site preparation, installation, making good, lead time and warranty should each be stated in the quotation. Prices depend on the size, material and operation, so every quotation is prepared for the opening.'],
  ['How long does it take?',
    'Lead times depend on the size of the job and the current workload. You get a date in writing with the quotation.'],
];

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const url = `${siteUrl}/products/${slug}`;
  const others = products.filter((o) => o.slug !== slug);

  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': p.family === 'Fabrication' ? 'Service' : 'Product',
        name: flatName(p),
        description: p.intro,
        url,
        category: p.family,
        ...(p.family === 'Fabrication'
          ? { provider: { '@type': 'Organization', name: company.name } }
          : { brand: { '@type': 'Brand', name: company.name } }),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Rolling shutters', item: `${siteUrl}/products` },
          { '@type': 'ListItem', position: 3, name: flatName(p), item: url },
        ],
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({
          '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }} />

      <Breadcrumbs items={[{ label: 'Rolling shutters', href: '/products' }, { label: flatName(p) }]} />

      {/* Hero -------------------------------------------------- */}
      <div className="prod-hero">
        <div>
          <p className="meta meta--annot">{p.family} · {p.code}</p>
          <h1 className="display d-lg" style={{ margin: '20px 0 22px' }}>
            {p.name.split('\n').map((l, n) => <span key={n}>{l} <br /></span>)}
          </h1>
          <p className="lede">{p.tagline}</p>
          <p className="body-c" style={{ marginTop: 20 }}>{p.intro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px', alignItems: 'center', marginTop: 30 }}>
            <Link className="btn" href={`/quote?product=${p.slug}`}>
              Get a quote <ArrowUpRight size={16} />
            </Link>
            <Link className="link" href="/products">All products <ArrowRight size={14} /></Link>
          </div>
        </div>
        <figure className="prod-hero__fig ruled ruled-mask">
          <Drawing kind={p.drawing} />
          <figcaption className="meta">Fig. {p.code} — schematic, not to scale</figcaption>
        </figure>
      </div>

      {/* Range ------------------------------------------------- */}
      <Chapter no="01 / RANGE">
        <div className="two-col two-col--aside">
          <SectionHead label="What we make" title={<>Types, <br />made to order.</>} />
          <div>
            <ul className="spec-list">
              {p.variants.map((v) => <li key={v}>{v}</li>)}
            </ul>
            {p.family === 'Rolling shutters' && (
              <p className="meta" style={{ marginTop: 16 }}>
                Every type comes in <Link href="/products#materials" style={{ textDecoration: 'underline' }}>five materials</Link> and{' '}
                <Link href="/products#strips" style={{ textDecoration: 'underline' }}>four strip profiles</Link>.
              </p>
            )}
          </div>
        </div>
      </Chapter>

      {/* Applications + brief ---------------------------------- */}
      <Chapter no="02 / FIT">
        <div className="two-col">
          <div>
            <SectionHead label="Where it goes" title="Applications." />
            <ul className="spec-list">
              {p.applications.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <div>
            <SectionHead label="What to tell us" title="Your brief." />
            <ul className="spec-list">
              {p.brief.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>
        <p className="body-c" style={{ marginTop: 34 }}>{p.detail}</p>
      </Chapter>

      {/* Catalogue reference ----------------------------------- */}
      {p.refs?.length ? (
        <Chapter no="03 / PHOTOGRAPHS">
          <SectionHead label="Photographs" title="Seen on site.">
            <p className="body-c">
              Shutters of this kind, on site.
            </p>
          </SectionHead>
          <div className="ref-row">
            {p.refs.map((r) => (
              <figure className="ref" key={r.src} style={{ maxWidth: r.w }}>
                <img src={r.src} width={r.w} height={r.h} alt={r.alt} loading="lazy" />
                <figcaption className="meta">{r.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Chapter>
      ) : null}

      {/* FAQ --------------------------------------------------- */}
      <Chapter no={p.refs?.length ? '04 / QUESTIONS' : '03 / QUESTIONS'}>
        <SectionHead label="Before you enquire" title="Common questions." />
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </Chapter>

      {/* Next -------------------------------------------------- */}
      <Chapter no={p.refs?.length ? '05 / ALSO' : '04 / ALSO'} tight>
        <SectionHead label="Elsewhere in the range" title="Also made here." />
        <div className="next-row">
          {others.map((o) => (
            <Link className="next-card" key={o.slug} href={`/products/${o.slug}`}>
              <span className="meta meta--annot">{o.code}</span>
              <span className="next-card__name">{flatName(o)}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>

        <div className="cta-band" style={{ marginTop: 40 }}>
          <div>
            <p className="meta meta--annot">Next step</p>
            <h2 className="display d-sm" style={{ margin: '16px 0 14px' }}>
              Send the two numbers.
            </h2>
            <p className="body-c">
              Width, height and a photograph. We will come back with what we
              need to know next.
            </p>
          </div>
          <Link className="btn" href={`/quote?product=${p.slug}`}>
            Get a quote <ArrowUpRight size={16} />
          </Link>
        </div>
      </Chapter>
    </div>
  );
}
