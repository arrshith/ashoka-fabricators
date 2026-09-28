import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs, PageHead, Chapter, SectionHead, JsonLd } from '@/components/shared';
import { Drawing, StripProfile } from '@/components/drawings';
import { shutters, secondary, materials, strips, operation, flatName, type Product } from '@/lib/content';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Rolling shutters — commercial, residential & industrial',
  'Commercial, residential and industrial rolling shutters in mild steel, galvanised iron, galvalume, aluminium and polycarbonate, manual or remote-controlled, from Ashoka Fabricators, Hyderabad. Also gates, automation and fabrication.',
  '/products',
);

function Band({ p, i }: { p: Product; i: number }) {
  const photo = p.refs?.[0];
  return (
    <article className="band">
      <p className="band__no">{String(i + 1).padStart(2, '0')} · {p.code}</p>
      <div className="band__txt">
        <h3>{p.name.split('\n').map((l, n) => <span key={n}>{l} <br /></span>)}</h3>
        <p>{p.intro}</p>
        <ul className="band__specs">
          {p.variants.map((v) => <li key={v}>{v}</li>)}
        </ul>
        <Link className="link" href={`/products/${p.slug}`}>
          {flatName(p)} <ArrowUpRight size={14} />
        </Link>
      </div>
      <figure className={`band__fig${photo ? ' band__fig--photo' : ''}`}>
        {photo
          ? <img src={photo.src} width={photo.w} height={photo.h} alt={photo.alt} loading="lazy" />
          : <Drawing kind={p.drawing} />}
      </figure>
    </article>
  );
}

export default function Products() {
  return (
    <div className="shell">
      <Breadcrumbs items={[{ label: 'Rolling shutters' }]} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Rolling shutters', item: `${siteUrl}/products` },
        ],
      }} />

      <PageHead
        label="What we make"
        title={<>Rolling shutters, <br />made to the opening.</>}
        lede="Shutters are most of what Ashoka makes. Choose where yours is going, then the material, the strip and how it opens. Every one is built to the measured opening, never to a stock size."
      />

      <Chapter no="01 / WHERE IT GOES" id="applications">
        <SectionHead label="Three applications" title={<>Commercial, residential, <br />industrial.</>} />
        {shutters.map((p, i) => <Band p={p} i={i} key={p.slug} />)}
      </Chapter>

      <Chapter no="02 / MATERIALS" id="materials">
        <SectionHead label="What the curtain is made of" title={<>Five materials, <br />each with a trade-off.</>}>
          <p className="body-c">
            Steel is bought from the mills named below. The right choice depends on the
            budget, the weather the shutter faces, and whether you need to see through it.
          </p>
        </SectionHead>
        <div className="mats">
          {materials.map((m, i) => (
            <article className="mat" key={m.slug} id={m.slug}>
              <figure className="mat__img">
                <img src={m.image.src} width={m.image.w} height={m.image.h} alt={m.image.alt} loading="lazy" />
              </figure>
              <p className="meta meta--annot">{String(i + 1).padStart(2, '0')} · Sourced from {m.supplier}</p>
              <h3 className="mat__name">{m.name}</h3>
              <p className="mat__sum">{m.summary}</p>
              <div className="mat__pc">
                <div>
                  <p className="meta">Advantages</p>
                  <ul>{m.pros.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div>
                  <p className="meta">Disadvantages</p>
                  <ul className="con">{m.cons.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
              <p className="mat__credit">{m.image.caption}</p>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter no="03 / STRIPS" id="strips">
        <SectionHead label="Shutter patti" title={<>Four strip <br />profiles.</>}>
          <p className="body-c">
            A curtain is a stack of strips, each hooked into the next. The profile sets how
            the shutter looks, and how stiff it is across the opening. Drawn from the
            workshop&rsquo;s own samples, seen end-on.
          </p>
        </SectionHead>
        <div className="strips">
          {strips.map((s, i) => (
            <figure className="strip" key={s.key}>
              <div className="strip__dwg"><StripProfile kind={s.key} /></div>
              <figcaption>
                <p className="meta meta--annot">Fig. {String(i + 1).padStart(2, '0')}</p>
                <h3>{s.name}{s.alias && <span> · {s.alias}</span>}</h3>
                <p>{s.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="meta" style={{ marginTop: 22 }}>Cross-sections, not to scale. W is set by the profile you choose.</p>
      </Chapter>

      <Chapter no="04 / OPERATION" id="operation">
        <div className="two-col two-col--aside">
          <SectionHead label="How it opens" title={<>By hand, by motor, <br />or by remote.</>}>
            <p className="body-c">
              Ashoka builds the motor for each remote-controlled shutter to suit its load:
              the width, height and material of the curtain. One standard motor is not
              fitted to every size.
            </p>
          </SectionHead>
          <ul className="ledger">
            {operation.map(([k, v]) => (
              <li key={k} className="op">
                <span className="ledger__k">{k}</span>
                <span className="op__v">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </Chapter>

      <Chapter no="05 / ALSO MADE HERE" id="more">
        <SectionHead label="Beyond shutters" title={<>Gates, automation <br />and fabrication.</>} />
        {secondary.map((p, i) => <Band p={p} i={i + shutters.length} key={p.slug} />)}
        <p className="meta" style={{ marginTop: 26, maxWidth: '60ch' }}>
          Drawings are schematic. Photographs are captioned with their source: Ashoka&rsquo;s
          own work is marked as such, and anything else is illustrative.
        </p>
      </Chapter>
    </div>
  );
}
