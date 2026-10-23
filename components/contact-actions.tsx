'use client';

/**
 * The persistent contact rail.
 *
 * On mobile this is a fixed bar; on desktop it is a single WhatsApp affordance.
 * Channels that the company has not confirmed are not rendered at all, so the
 * bar never offers a number that does not work. With nothing configured it
 * still gets the visitor to the quote form.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, PencilRuler } from 'lucide-react';
import { WhatsAppIcon } from './shared';
import { products, flatName } from '@/lib/content';
import { company, waLink } from '@/lib/company';
import { track } from '@/lib/analytics';

/** Contextual message: on a product page, name the product. */
function useMessage() {
  const path = usePathname();
  const product = products.find((p) => path === `/products/${p.slug}`);
  const subject = product
    ? flatName(product).toLowerCase()
    : 'a rolling shutter, gate or fabrication project';
  return {
    product,
    text: `Hi Ashoka Fabricators, I'd like to discuss ${subject} and get a quotation. `
      + `My opening is roughly ___ wide × ___ high, in ___.`,
  };
}

export function ContactActions() {
  const { product, text } = useMessage();
  const wa = waLink(text);

  return (
    <>
      {wa && (
        <a
          className="wa-dock" href={wa} target="_blank" rel="noreferrer"
          onClick={() => track('whatsapp_click', { product: product?.slug || 'general' })}
          aria-label={`Message Ashoka Fabricators on WhatsApp about ${product ? flatName(product) : 'your project'}`}
        >
          <WhatsAppIcon size={19} />
          <span>WhatsApp</span>
        </a>
      )}

      <nav className="action-bar" aria-label="Contact Ashoka">
        {company.phone && (
          <a href={`tel:${company.phone}`} onClick={() => track('call_click', {})}>
            <Phone size={17} aria-hidden="true" /> Call
          </a>
        )}
        {wa && (
          <a
            href={wa} target="_blank" rel="noreferrer"
            onClick={() => track('whatsapp_click', { product: product?.slug || 'general' })}
          >
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
        )}
        <Link href="/quote" data-primary="1">
          <PencilRuler size={17} aria-hidden="true" /> Get a quote
        </Link>
      </nav>
    </>
  );
}
