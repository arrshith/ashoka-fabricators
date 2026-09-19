'use client';

/**
 * Renders the project archive once `lib/projects.ts` has approved entries in
 * it. It is empty today; the projects page shows an honest explanation instead
 * of calling this. Kept data-driven so publishing a case study is a content
 * change, not a rebuild.
 */
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/projects';

export function ProjectGallery() {
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const [active, setActive] = useState('All');
  const shown = projects.filter((p) => active === 'All' || p.category === active);

  return (
    <>
      {categories.length > 2 && (
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c} className={`filter${c === active ? ' is-on' : ''}`}
              aria-pressed={c === active} onClick={() => setActive(c)}
            >{c}</button>
          ))}
        </div>
      )}

      <div className="proj-grid" aria-live="polite">
        {shown.map((p, i) => (
          <Link className="proj" key={p.slug} href={`/projects/${p.slug}`}>
            <figure className="proj__fig">
              <img src={p.image} alt={p.imageAlt} width={p.imageWidth} height={p.imageHeight} loading="lazy" />
            </figure>
            <p className="meta meta--annot">
              Project {String(i + 1).padStart(3, '0')} · {p.category}
              {p.location ? ` · ${p.location}` : ''}
            </p>
            <h2 className="proj__title">{p.title}</h2>
            <p className="body-c">{p.description}</p>
            <span className="link">Read the project <ArrowUpRight size={14} /></span>
          </Link>
        ))}
      </div>
    </>
  );
}
