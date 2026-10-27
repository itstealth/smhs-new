const BASE_URL = 'https://stealthlearn.in/seedlingschool/wp-json/wp/v2';

export interface WPPost {
  id: number;
  title: { rendered: string };
  slug: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  categories: number[];
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function getPosts(perPage = 20): Promise<WPPost[]> {
  const res = await fetch(`${BASE_URL}/posts?per_page=${perPage}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_embed`);
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export async function getCategories(): Promise<WPCategory[]> {
  const res = await fetch(`${BASE_URL}/categories?per_page=50`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getPostsByCategory(categoryId: number, perPage = 20): Promise<WPPost[]> {
  const res = await fetch(`${BASE_URL}/posts?categories=${categoryId}&per_page=${perPage}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export function getMediaUrl(post: WPPost): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/placeholder.webp';
}

export function getPostCategories(post: WPPost): string[] {
  return post._embedded?.['wp:term']?.[0]?.map(t => t.name) ?? [];
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|ndash|mdash|rsquo|lsquo|rdquo|ldquo|hellip);/gi, (_, entity: string) => {
      const named: Record<string, string> = {
        amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
        ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…",
      };
      if (entity[0] === "#") {
        const codePoint = entity[1]?.toLowerCase() === "x"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
        return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : "";
      }
      return named[entity.toLowerCase()] ?? "";
    })
    .trim();
}
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}