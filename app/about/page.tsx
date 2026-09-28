import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { ProcessMark } from '@/components/drawings';
import { company } from '@/lib/company';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Our story — three generations of rolling shutters',
  'From Ashok Rolling Shutters in the late 1960s, among the first rolling shutter makers in South India, to Ashoka Fabricators today: three generations of one Hyderabad family in one trade.',
  '/about',
);

/** Archive prints of the original unit. Native sizes; never shown larger. */
const ARCHIVE = [
  { src: '/images/archive-team.webp', w: 1280, h: 882,
    alt: 'Nine men in white shirts, five standing and four seated, in front of a signboard reading Rolling Shutters in English and Telugu',
    caption: 'The team outside Ashok Rolling Shutters. The signboard is in English and Telugu.' },
  { src: '/images/archive-staff.webp', w: 605, h: 445,
    alt: 'Fourteen men posed in two rows beneath the illuminated Ashok sign, one of them garlanded',
    caption: 'Under the Ashok sign.' },
  { src: '/images/archive-opening.webp', w: 450, h: 655,
    alt: 'A crowd gathered on the street beneath a banner reading Ashok Rolling Shutters & Engineering Works',
    caption: 'Ashok Rolling Shutters & Engineering Works, dressed with bunting.' },
  { src: '/images/archive-street.webp', w: 378, h: 665,
    alt: 'Families and workers gathered outside the Ashok works, with the banner and sign above',
    caption: 'A gathering outside the works.' },
];

const GENERATIONS: { no: string; era: string; name: string; title: string; body: string[] }[] = [
  {
    no: '01', era: 'Late 1960s', name: 'Somanagurthy Janga Reddy',
    title: 'Ashok Rolling Shutters',
    body: [
      'Janga Reddy set up Ashok Rolling Shutters & Engineering Works in the late 1960s. By the family’s account it was among the first rolling shutter manufacturers in South India.',
      'The prints on this page are from those years: the team in white shirts under a signboard lettered in English and Telugu, and the street outside the works full of people.',
    ],
  },
  {
    no: '02', era: 'The second generation', name: 'Somanagurthy Yadi Reddy',
    title: 'Ashoka Fabricators',
    body: [
      'His son, Yadi Reddy, carried the trade on and rebuilt the business as Ashoka Fabricators. He scaled it from a local workshop into a manufacturer that has served tens of thousands of clients: shops and showrooms, homes and garages, factories and warehouses.',
    ],
  },
  {
    no: '03', era: 'Today', name: 'Somanagurthy Sai Charan Reddy',
    title: 'The third generation',
    body: [
      'Sai Charan Reddy, Yadi Reddy’s son, runs the business today from the workshop on Elico Road in Balanagar, Hyderabad. The work is still what it was in the 1960s: a shutter measured, drawn and made for one opening.',
    ],
  },
];

export default function About() {
  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Our story', item: `${siteUrl}/about` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'Our story' }]} />
      <PageHead
        label={`${company.city} · Since ${company.since}`}
        title={<>Three generations. <br />One trade.</>}
        lede="Ashoka Fabricators began as Ashok Rolling Shutters in the late 1960s. Nearly six decades later the same family still measures, draws and makes every shutter."
      />

      <figure className="ref story__lead" style={{ maxWidth: ARCHIVE[0].w }}>
        <img src={ARCHIVE[0].src} width={ARCHIVE[0].w} height={ARCHIVE[0].h} alt={ARCHIVE[0].alt} fetchPriority="high" />
        <figcaption className="meta">{ARCHIVE[0].caption}</figcaption>
      </figure>

      {GENERATIONS.map((g, i) => (
        <Chapter no={`${g.no} / ${g.era.toUpperCase()}`} key={g.no}>
          <div className="two-col two-col--aside">
            <div>
              <p className="meta meta--annot">{g.era}</p>
              <h2 className="display d-md" style={{ margin: '14px 0 12px' }}>{g.title}</h2>
              <p className="meta">{g.name}</p>
            </div>
            <div className="prose">
              {g.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              {i === 0 && (
                <div className="story__prints">
                  {ARCHIVE.slice(1).map((a) => (
                    <figure className="ref" key={a.src} style={{ maxWidth: a.w }}>
                      <img src={a.src} width={a.w} height={a.h} alt={a.alt} loading="lazy" />
                      <figcaption className="meta">{a.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {i === GENERATIONS.length - 1 && (
                <Link className="link" href="/quote">
                  Start with your opening <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </Chapter>
      ))}

      {/* Process ----------------------------------------------- */}
      <Chapter no="04 / HOW A JOB RUNS">
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

    </div>
  );
}
