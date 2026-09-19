import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { ProjectGallery } from '@/components/project-gallery';
import { projects } from '@/lib/projects';
import { company } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Project references',
  'Ashoka Fabricators has not published case studies. Ask for installation references relevant to your own opening when you enquire.',
  '/projects',
);

export default function Projects() {
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

      {projects.length > 0 ? (
        <>
          <PageHead
            label="Installed work"
            title={<>Openings we<br />have already made.</>}
            lede="Each of these was measured, drawn, fabricated and fitted to a specific opening."
          />
          <ProjectGallery />
        </>
      ) : (
        <>
          <PageHead
            label="References"
            title={<>There are no<br />case studies here.</>}
            lede="Not because there is no work — because publishing someone else's building needs their permission, and that has not been given yet."
          />

          <Chapter no="01 / WHY THIS PAGE IS EMPTY">
            <div className="two-col">
              <div className="prose">
                <h2>The honest version.</h2>
                <p>
                  Ashoka has been fitting shutters and gates in Hyderabad since 1972,
                  and names eight customers on its own profile — R.S. Brothers,
                  J.C. Brothers, Centro, Chandana Bros, South India, GRT, Kalanjali
                  and Kala Niketan.
                </p>
                <p>
                  What it has not supplied is photographs of those installations,
                  the details of what was fitted, or permission from those customers
                  to publish either. So nothing is published. A page of stock
                  photography with invented project names would look better than
                  this one and would be worth nothing to you.
                </p>
                <h2>What to do instead.</h2>
                <p>
                  Ask. When you enquire, say what kind of opening you have, and ask
                  for references for work like it. A reference that matches your
                  situation is worth more than a gallery that does not.
                </p>
                <Link className="btn" href="/quote?interest=references">
                  Ask for references <ArrowUpRight size={16} />
                </Link>
              </div>

              <div>
                <figure className="ref ref--square">
                  <img
                    src="/images/centro.webp" width={238} height={238} loading="lazy"
                    alt="A metal rolling shutter closed across a Centro store frontage"
                  />
                  <figcaption className="meta">
                    The one photograph on this site that shows a shutter in place:
                    a Centro storefront, from the company&rsquo;s own catalogue.
                    Centro is one of the eight customers named above. It is shown at
                    its native 238&nbsp;px, and it is not captioned as a case study,
                    because the details have not been confirmed.
                  </figcaption>
                </figure>
              </div>
            </div>
          </Chapter>

          <Chapter no="02 / MAKE THE ASK USEFUL">
            <SectionHead label="What to include" title="Four things.">
              <p className="body-c">
                A reference request with these in it gets a specific answer instead
                of a general one.
              </p>
            </SectionHead>
            <ul className="spec-list" style={{ maxWidth: '60ch' }}>
              <li>The kind of space — shopfront, warehouse, compound, factory</li>
              <li>The product you are considering, if you know</li>
              <li>Your location and the approximate size of the opening</li>
              <li>That you would like to see comparable installed work</li>
            </ul>
            <p className="meta" style={{ marginTop: 26, maxWidth: '62ch' }}>
              Client names above are reproduced from {company.name}&rsquo;s own
              published profile. No logos, endorsements or performance claims are
              implied by listing them.
            </p>
          </Chapter>
        </>
      )}
    </div>
  );
}
