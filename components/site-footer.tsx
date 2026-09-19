import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { products, flatName } from '@/lib/content';
import { company, yearsTrading } from '@/lib/company';

export function SiteFooter() {
  return (
    <footer className="ftr on-dark">
      <div className="ftr__top">
        <div>
          <p className="meta meta--annot" style={{ marginBottom: 20 }}>Start a drawing</p>
          <h2 className="display d-lg">Tell us<br />about the opening.</h2>
        </div>
        <Link className="btn" href="/quote">
          Get a quote <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="ftr__grid">
        <div>
          <img
            src="/images/logo-mark.webp" width={108} height={37} alt="Ashoka Fabricators"
            style={{ marginBottom: 18 }}
          />
          <p style={{ color: 'var(--ink-inv-2)', fontSize: 14, maxWidth: '32ch' }}>
            Rolling shutters, gates, entrance automation and steel fabrication.
            One workshop in Hyderabad, {yearsTrading} years.
          </p>
          <p className="meta" style={{ marginTop: 18 }}>
            {company.city}, {company.region}, {company.country}
            <br />GSTIN {company.gstin}
          </p>
        </div>

        <div>
          <h3>Solutions</h3>
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`}>{flatName(p)}</Link>
          ))}
        </div>

        <div>
          <h3>Company</h3>
          <Link href="/about">The workshop</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/resources">Notes</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h3>Enquiries</h3>
          <Link href="/quote">Get a quote</Link>
          <Link href="/contact">Ways to reach us</Link>
          <a href={company.profile} target="_blank" rel="noreferrer">
            IndiaMART profile <ArrowUpRight size={12} style={{ display: 'inline', verticalAlign: -1 }} />
          </a>
        </div>
      </div>

      <div className="ftr__bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <span aria-hidden="true">Est. {company.founded}</span>
      </div>
    </footer>
  );
}
