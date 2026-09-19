import type { MetadataRoute } from 'next';
import { products, articles } from '@/lib/content';
import { projects } from '@/lib/projects';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '', '/products', '/projects', '/about', '/contact', '/quote',
    '/resources', '/privacy', '/terms',
    ...products.map((p) => `/products/${p.slug}`),
    ...articles.map((a) => `/resources/${a.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((path) => ({
    url: siteUrl + path,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : path.startsWith('/products') ? 0.8 : path === '/quote' ? 0.7 : 0.5,
  }));
}
