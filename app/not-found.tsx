import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

// Without this the 404 inherits the homepage's title, so a broken link reads
// as the homepage in the tab, in history and to a crawler.
export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="shell">
      <div className="page-head">
        <p className="meta meta--annot">Error 404</p>
        <h1 className="display d-lg">Nothing <br />at this opening.</h1>
        <p className="lede" style={{ marginTop: 26 }}>
          That page does not exist. The range, the workshop and the quote form
          are all still where you left them.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 26px', alignItems: 'center', marginTop: 32 }}>
          <Link className="btn" href="/products">See the range <ArrowUpRight size={16} /></Link>
          <Link className="link" href="/">Back to the start <ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}
