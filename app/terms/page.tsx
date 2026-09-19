import { Breadcrumbs, PageHead } from '@/components/shared';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta(
  'Terms',
  'What the information on this site does and does not represent.',
  '/terms',
);

export default function Terms() {
  return (
    <div className="shell">
      <Breadcrumbs items={[{ label: 'Terms' }]} />
      <PageHead label="Website information" title="What this site is." />

      <div className="prose" style={{ maxWidth: '70ch' }}>
        <h2>Product information</h2>
        <p>
          The drawings on this site are schematics. They show how a product works;
          they are not to scale and they do not represent the dimensions, sections
          or specification of any particular item. Material, size, performance,
          price, installation scope, delivery and warranty are confirmed in a
          written quotation and nowhere else.
        </p>

        <h2>Photographs</h2>
        <p>
          The photographs are the company&rsquo;s own catalogue and album images.
          They illustrate listed products and the premises. They do not establish
          a completed project, a client endorsement, or the result of a specific
          installation, and each is shown at or below its original resolution
          without retouching.
        </p>

        <h2>Enquiries</h2>
        <p>
          Submitting an enquiry does not place an order, and the reference you
          receive is a receipt for the enquiry only. Nothing on this site is an
          offer, a price, or an engineering assessment of your opening.
        </p>

        <h2>Company information</h2>
        <p>
          Company facts on this site are taken from Ashoka Fabricators&rsquo; own
          published profile. Where a detail has not been supplied, the site says
          so rather than estimating it.
        </p>
      </div>
    </div>
  );
}
