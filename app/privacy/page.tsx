import { Breadcrumbs, PageHead } from '@/components/shared';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta(
  'Privacy notice',
  'How enquiries, attachments and technical data are handled on this site.',
  '/privacy',
);

export default function Privacy() {
  return (
    <div className="shell">
      <Breadcrumbs items={[{ label: 'Privacy' }]} />
      <PageHead label="Your information" title="Privacy notice." />

      <div className="prose" style={{ maxWidth: '70ch' }}>
        <h2>What is collected</h2>
        <p>
          When you submit an enquiry, this site stores the contact details, the
          project information and any files you attach, so the enquiry can be read
          and answered. Send only what is needed for the project. Do not attach
          identity documents, financial records or other sensitive material.
        </p>

        <h2>How it is stored</h2>
        <p>
          Enquiries are written to the site&rsquo;s database and attachments to
          private object storage. If a notification service is configured, the
          enquiry details are forwarded to the business. The reference you receive
          confirms that the enquiry was stored — it is not a quotation, an order,
          or a promise of a response time.
        </p>

        <h2>External services</h2>
        <p>
          IndiaMART, Google Maps and WhatsApp are separate services with their own
          privacy policies. Following those links, or loading the embedded map,
          may share technical information with them. WhatsApp messages are sent
          only when you choose to send them from within WhatsApp.
        </p>

        <h2>Analytics and abuse prevention</h2>
        <p>
          No third-party marketing analytics or tracking cookies are enabled.
          Submission protection stores a short-lived keyed digest derived from a
          network address in order to rate-limit abuse; raw network addresses are
          not kept in enquiry records, and expired protection records are cleared
          on later submissions.
        </p>

        <h2>Access, correction and deletion</h2>
        <p>
          Contact Ashoka through its published IndiaMART listing, quoting your
          enquiry reference, to request access to, correction of, or deletion of
          your enquiry.
        </p>

        <div className="note">
          A retention schedule and a named privacy contact must be confirmed by the
          business before this site goes live. Until then, this notice describes
          how the system behaves, not a finalised policy.
        </div>
      </div>
    </div>
  );
}
