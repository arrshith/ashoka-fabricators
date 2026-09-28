import { Suspense } from 'react';
import { Breadcrumbs, JsonLd } from '@/components/shared';
import { QuoteForm } from '@/components/quote-form';
import { pageMeta, siteUrl } from '@/lib/seo';

export const metadata = pageMeta(
  'Get a quote',
  'Send Ashoka Fabricators the size of your opening and how to reach you. Three short steps; photographs and detail are optional.',
  '/quote',
);

export default function Quote() {
  return (
    <div className="shell">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Get a quote', item: `${siteUrl}/quote` },
        ],
      }} />

      <Breadcrumbs items={[{ label: 'Get a quote' }]} />

      <div className="quote-layout">
        <aside className="quote-aside">
          <p className="meta meta--annot">Enquiry</p>
          <h1 className="display d-md" style={{ margin: '20px 0 22px' }}>
            Two numbers <br />and a name.
          </h1>
          <p className="body-c">
            That is the whole requirement. Everything else on this form is
            optional and can be added later, or worked out in the conversation.
          </p>

          <ul className="ledger" style={{ marginTop: 34 }}>
            <li>
              <span className="ledger__k">Required</span>
              <span className="ledger__dots" aria-hidden="true" />
              <span className="ledger__v">3 steps</span>
            </li>
            <li>
              <span className="ledger__k">Optional</span>
              <span className="ledger__dots" aria-hidden="true" />
              <span className="ledger__v">Photos, detail</span>
            </li>
            <li>
              <span className="ledger__k">Obligation</span>
              <span className="ledger__dots" aria-hidden="true" />
              <span className="ledger__v">None</span>
            </li>
          </ul>

          <p className="meta" style={{ marginTop: 26, maxWidth: '36ch' }}>
            You will get a reference number as soon as it is recorded. It is a
            receipt for the enquiry, not a quotation.
          </p>
        </aside>

        <Suspense fallback={<div className="form-panel"><p role="status">Loading the form…</p></div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
