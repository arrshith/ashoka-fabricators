import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, Chapter, SectionHead } from '@/components/shared';
import { projects } from '@/lib/projects';
import { pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? pageMeta(p.title, p.description, `/projects/${p.slug}`) : { title: 'Not found' };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  const story = [
    ['The challenge', p.challenge],
    ['The solution', p.solution],
    ['The result', p.result],
  ] as const;

  return (
    <div className="shell">
      <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }, { label: p.title }]} />

      <div className="page-head">
        <p className="meta meta--annot">{p.category}{p.location ? ` · ${p.location}` : ''}</p>
        <h1 className="display d-lg">{p.title}</h1>
        <p className="lede" style={{ marginTop: 26 }}>{p.description}</p>
      </div>

      <figure className="ref" style={{ maxWidth: p.imageWidth }}>
        <img src={p.image} alt={p.imageAlt} width={p.imageWidth} height={p.imageHeight} />
      </figure>

      <Chapter no="01 / THE JOB">
        <div className="two-col two-col--aside">
          <div>
            <ul className="ledger">
              {p.location && (
                <li>
                  <span className="ledger__k">Location</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <span className="ledger__v">{p.location}</span>
                </li>
              )}
              {p.application && (
                <li>
                  <span className="ledger__k">Application</span>
                  <span className="ledger__dots" aria-hidden="true" />
                  <span className="ledger__v">{p.application}</span>
                </li>
              )}
              <li>
                <span className="ledger__k">Category</span>
                <span className="ledger__dots" aria-hidden="true" />
                <span className="ledger__v">{p.category}</span>
              </li>
            </ul>
            {p.productSlug && (
              <Link className="link" href={`/products/${p.productSlug}`} style={{ marginTop: 20 }}>
                The product <ArrowUpRight size={14} />
              </Link>
            )}
          </div>
          <div className="prose">
            {story.map(([title, copy]) => (copy ? (
              <section key={title}><h2>{title}</h2><p>{copy}</p></section>
            ) : null))}
          </div>
        </div>
      </Chapter>

      <Chapter no="02 / YOURS" tight>
        <div className="cta-band">
          <div>
            <SectionHead label="Next step" title="A different opening?" />
            <p className="body-c">Every one of them is. Send us the measurements.</p>
          </div>
          <Link className="btn" href="/quote">Get a quote <ArrowUpRight size={16} /></Link>
        </div>
      </Chapter>
    </div>
  );
}
