import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { products, flatName } from '@/lib/content';
import { company } from '@/lib/company';

export function SiteFooter() {
  return (
    <footer className="ftr on-dark">
      <div className="ftr__top">
        <div>
          <p className="meta meta--annot" style={{ marginBottom: 20 }}>Start a drawing</p>
          <h2 className="display d-lg">Tell us <br />about the opening.</h2>
        </div>
        <Link className="btn" href="/quote">
          Get a quote <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="ftr__grid">
        <div>
          <img
            src="/images/logo-mark.svg" width={108} height={37} alt="Ashoka Fabricators"
            style={{ marginBottom: 18 }}
          />
          <p style={{ color: 'var(--ink-inv-2)', fontSize: 14, maxWidth: '32ch' }}>
            Rolling shutters, gates, entrance automation and steel fabrication.
            Made in Hyderabad for nearly six decades.
          </p>
          <p className="meta" style={{ marginTop: 18 }}>
            {company.city}, {company.region}, {company.country}
          </p>
        </div>

        <div>
          <h3>Products</h3>
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`}>{flatName(p)}</Link>
          ))}
        </div>

        <div>
          <h3>Company</h3>
          <Link href="/about">Our story</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/resources">Notes</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <h3>Enquiries</h3>
          <Link href="/quote">Get a quote</Link>
          <Link href="/contact">Ways to reach us</Link>
          {company.phone && <a href={`tel:${company.phone.replace(/s/g, '')}`}>{company.phone}</a>}
          {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
        </div>
      </div>

      <div className="ftr__bottom">
        <span>© {new Date().getFullYear()} {company.name}</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <span aria-hidden="true">Since the late 1960s</span>
      </div>
    </footer>
  );
}
