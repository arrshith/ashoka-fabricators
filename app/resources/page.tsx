import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, JsonLd } from '@/components/shared';
import { articles } from '@/lib/content';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Notes — preparing a shutter, gate or automation enquiry',
  'Short, practical guidance on choosing between manual and automatic operation, preparing a project brief, and planning gate automation.',
  '/resources',
);

export default function Resources() {
  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Notes', item: `${siteUrl}/resources` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'Notes' }]} />
      <PageHead
        label="Working notes"
        title={<>What to work out <br />before you ask.</>}
        lede="Three short pieces on the decisions that come up first. Written to help you ask a better question, not to sell you a product."
      />

      <ol className="note-list">
        {articles.map((a, i) => (
          <li key={a.slug}>
            <Link href={`/resources/${a.slug}`}>
              <span className="meta meta--annot">
                {String(i + 1).padStart(2, '0')} · {a.readMinutes} min read
              </span>
              <h2>{a.title}</h2>
              <p className="body-c">{a.description}</p>
              <span className="link">Read <ArrowUpRight size={14} /></span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
