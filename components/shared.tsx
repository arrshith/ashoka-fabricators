import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((i, n) => (
        <span key={n}>
          <ChevronRight size={11} aria-hidden="true" />
          {i.href ? <Link href={i.href}>{i.label}</Link> : <span aria-current="page">{i.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function PageHead({ label, title, lede }: { label: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="page-head">
      <p className="meta meta--annot">{label}</p>
      <h1 className="display d-lg">{title}</h1>
      {lede && <p className="lede" style={{ marginTop: 26, maxWidth: '52ch' }}>{lede}</p>}
    </div>
  );
}

/** A numbered chapter rule — the site's spine. */
export function Chapter({
  no, children, tight = false, id,
}: { no: string; children: React.ReactNode; tight?: boolean; id?: string }) {
  return (
    <section className={`chapter${tight ? ' chapter--tight' : ''}`} id={id}>
      <div className="chapter__rule" aria-hidden="true" />
      <span className="chapter__no" aria-hidden="true">{no}</span>
      {children}
    </section>
  );
}

export function SectionHead({
  label, title, children,
}: { label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className={`head${children ? ' head--split' : ''}`}>
      <p className="meta head__label">{label}</p>
      <h2 className="display d-md">{title}</h2>
      {children && <div>{children}</div>}
    </div>
  );
}

/** An item the company has not supplied. Shown, never filled in. */
export function Todo({ children }: { children: React.ReactNode }) {
  return <span className="todo">{children}</span>;
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
