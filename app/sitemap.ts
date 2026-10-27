import { MetadataRoute } from 'next';

const BASE_URL = 'https://smhs.seedlingschools.com';

const staticRoutes = [
  '/',
  '/about',
  '/academics',
  '/admissions',
  '/alumni',
  '/career',
  '/contact-us',
  '/curriculum',
  '/erp-login',
  '/faculty',
  '/learning-support',
  '/mandatory-disclosure',
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

  try {
    const res = await fetch(
      'https://smhs.seedlingschools.com/blog/wp-json/wp/v2/posts?per_page=100&_fields=slug,modified',
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const posts: { slug: string; modified: string }[] = await res.json();
      for (const post of posts) {
        entries.push({
          url: `${BASE_URL}/blog/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  } catch {}

  return entries;
}
