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
    'Yes — everything here is made to the opening rather than to a stock size, and the company profile describes products in different dimensions, shapes and sizes. Feasibility for your specific opening still has to be confirmed by the team.'],
  ['Does the price include installation?',
    'Ask for the scope in writing. Product, controls, delivery, site preparation, installation, making good, lead time and warranty should each be stated in the quotation. This site does not publish prices, because none have been supplied.'],
  ['How long does it take?',
    'Lead times depend on the work and the current workload, and have not been published. Ask for a date in writing when you ask for the price.'],
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
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/products` },
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

      <Breadcrumbs items={[{ label: 'Solutions', href: '/products' }, { label: flatName(p) }]} />

      {/* Hero -------------------------------------------------- */}
      <div className="prod-hero">
        <div>
          <p className="meta meta--annot">{p.family} · {p.code}</p>
          <h1 className="display d-lg" style={{ margin: '20px 0 22px' }}>
            {p.name.split('\n').map((l, n) => <span key={n}>{l}<br /></span>)}
          </h1>
          <p className="lede">{p.tagline}</p>
          <p className="body-c" style={{ marginTop: 20 }}>{p.intro}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px', alignItems: 'center', marginTop: 30 }}>
            <Link className="btn" href={`/quote?product=${p.slug}`}>
              Get a quote <ArrowUpRight size={16} />
            </Link>
            <Link className="link" href="/products">All solutions <ArrowRight size={14} /></Link>
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
          <SectionHead label="What is in the range" title={<>The published<br />catalogue.</>} />
          <div>
            <ul className="spec-list">
              {p.variants.map((v) => <li key={v}>{v}</li>)}
            </ul>
            <p className="meta" style={{ marginTop: 16 }}>
              Names as published by the company. Sizes and finishes to suit the job.
            </p>
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

      {/* Technical --------------------------------------------- */}
      <Chapter no="03 / TECHNICAL">
        <div className="two-col two-col--aside">
          <div>
            <SectionHead label="Specification" title={<>What we will not<br />publish yet.</>} />
            <p className="body-c">
              A specification you can rely on is one the company has signed off.
              The items opposite have not been supplied, so they are listed as
              outstanding rather than filled in with something plausible. Ask for
              each of them in writing with your quotation.
            </p>
            <Link className="link" href="/quote" style={{ marginTop: 20 }}>
              Ask for a written specification <ArrowUpRight size={14} />
            </Link>
          </div>
          <ul className="todo-list">
            {p.unconfirmed.map((u) => (
              <li key={u}><span>TODO</span>{u}</li>
            ))}
          </ul>
        </div>
      </Chapter>

      {/* Catalogue reference ----------------------------------- */}
      {p.refs?.length ? (
        <Chapter no="04 / REFERENCE">
          <SectionHead label="From the catalogue" title="Photographed, not rendered.">
            <p className="body-c">
              Shown at the size the original file actually is. These are the
              company&rsquo;s own catalogue photographs — they are not presented
              as completed projects, and none has been enlarged.
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
      <Chapter no={p.refs?.length ? '05 / QUESTIONS' : '04 / QUESTIONS'}>
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
      <Chapter no={p.refs?.length ? '06 / ALSO' : '05 / ALSO'} tight>
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
