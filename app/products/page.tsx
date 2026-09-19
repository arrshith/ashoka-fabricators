import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, JsonLd } from '@/components/shared';
import { Drawing } from '@/components/drawings';
import { products, flatName } from '@/lib/content';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Solutions — shutters, gates, automation & fabrication',
  'Manual and automatic rolling shutters, sliding and swing gates, entrance automation, boom barriers and steel fabrication from Ashoka Fabricators, Hyderabad.',
  '/products',
);

export default function Products() {
  return (
    <div className="shell">
      <Breadcrumbs items={[{ label: 'Solutions' }]} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/products` },
        ],
      }} />

      <PageHead
        label="The range"
        title={<>Four families.<br />One way of working.</>}
        lede="Everything below is made to the opening it is going into. Pick the closest starting point — the specification is settled in the conversation, not on this page."
      />

      {products.map((p, i) => (
        <article className="band" key={p.slug}>
          <p className="band__no">{String(i + 1).padStart(2, '0')} · {p.code}</p>
          <div className="band__txt">
            <h3>{p.name.split('\n').map((l, n) => <span key={n}>{l}<br /></span>)}</h3>
            <p>{p.intro}</p>
            <ul className="band__specs">
              {p.variants.map((v) => <li key={v}>{v}</li>)}
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

      <p className="meta" style={{ marginTop: 26, maxWidth: '60ch' }}>
        Drawings are schematic. They show how each product works, not the
        dimensions or specification of any particular one — those are set
        against your opening.
      </p>
    </div>
  );
}
