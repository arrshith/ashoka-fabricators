/**
 * Client logos scrolling side by side. Pure CSS: the list is rendered twice
 * and the track slides by exactly one copy, so the loop is seamless. It pauses
 * on hover or focus, and stands still for visitors who prefer reduced motion.
 */
import { clients } from '@/lib/company';

export function ClientMarquee() {
  const row = (hidden: boolean) => clients.map((c) => (
    <li key={`${c.slug}${hidden ? '-2' : ''}`} aria-hidden={hidden || undefined}>
      <img src={`/images/clients/${c.slug}.webp`} width={c.w ?? 138} height={68} alt={hidden ? '' : c.name} loading="lazy" />
    </li>
  ));
  return (
    <div className="marquee" role="region" aria-label="Clients">
      <ul className="marquee__track">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
