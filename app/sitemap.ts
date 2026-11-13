import { MetadataRoute } from 'next';
import { getPostSlugs } from '@/lib/wordpress';

const BASE_URL = 'https://smhs.seedlingschools.com';

const staticRoutes = [
  '/',
  '/about',
  '/about/leadership',
  '/admissions',
  '/admissions/apply',
  '/alumni',
  '/career',
  '/contact-us',
  '/curriculum',
  '/erp-login',
  '/faculty',
  '/learning-support',
  '/mandatory-disclosure',
  '/mandatory-disclosures',
  '/news-and-events',
  '/policies',
  '/result',
  '/school-life',
  '/sports',
  '/terms-and-conditions',
  '/transport-facility',
  '/blog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/blog' ? 0.9 : 0.7,
  }));

  // Time-limited; returns [] if WordPress is slow or down.
  for (const post of await getPostSlugs()) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
