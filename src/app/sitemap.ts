import type { MetadataRoute } from 'next';

const SITE = 'https://963run.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/events',
    '/gallery',
    '/gallery/champions',
    '/products',
    '/sponsors',
    '/contact',
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
