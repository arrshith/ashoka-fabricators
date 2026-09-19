import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, JsonLd } from '@/components/shared';
import { articles, articleBySlug } from '@/lib/content';
import { pageMeta, siteUrl } from '@/lib/seo';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  return a ? pageMeta(a.title, a.description, `/resources/${a.slug}`) : { title: 'Not found' };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Notes', item: `${siteUrl}/resources` },
          { '@type': 'ListItem', position: 3, name: a.title, item: `${siteUrl}/resources/${a.slug}` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'Notes', href: '/resources' }, { label: a.title }]} />

      <article className="note-article">
        <header>
          <p className="meta meta--annot">Working note · {a.readMinutes} min read</p>
          <h1 className="display d-md" style={{ margin: '20px 0 22px' }}>{a.title}</h1>
          <p className="lede">{a.description}</p>
        </header>

        <div className="note-body">
          {a.sections.map(([title, text], i) => (
            <section key={title}>
              <p className="meta meta--annot">{String(i + 1).padStart(2, '0')}</p>
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </section>
          ))}
        </div>

        <div className="note" style={{ marginTop: 34 }}>
          This is guidance for preparing an enquiry. Product selection, final
          measurements and safety requirements have to be assessed on site by a
          qualified person.
        </div>

        <div className="cta-band" style={{ marginTop: 40 }}>
          <div>
            <p className="meta meta--annot">Next step</p>
            <h2 className="display d-sm" style={{ margin: '16px 0 14px' }}>Ready to ask?</h2>
            <p className="body-c">Width, height and a photograph is enough to start.</p>
          </div>
          <Link className="btn" href="/quote">Get a quote <ArrowUpRight size={16} /></Link>
        </div>
      </article>
    </div>
  );
}
