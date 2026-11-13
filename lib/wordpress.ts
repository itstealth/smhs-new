import { cache } from "react";

// Blog posts live in the WordPress install under /blog on the same host.
export const WP_API = "https://smhs.seedlingschools.com/blog/wp-json/wp/v2";

// The WordPress API answers in 2-7 s (sometimes far slower). With no limit a
// stuck request held the page open until the crawler gave up (60 s+).
//
// A page waits at most WP_WAIT_MS for an answer, then renders its fallback.
// The request itself is allowed to run on (up to WP_REQUEST_TIMEOUT_MS) so
// that, when it does finish, Next's fetch cache is filled and the next
// visitor gets the real content immediately.
const WP_WAIT_MS = 8_000;
const WP_REQUEST_TIMEOUT_MS = 60_000;
// Cached copies are served while a background refresh runs, so a slow or
// failing WordPress only affects the first visitor after a cold cache.
const WP_REVALIDATE_SECONDS = 300;

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

type WPResult<T> = { ok: true; data: T } | { ok: false };

/**
 * GET a WordPress REST path. Never throws: a slow answer, timeout, network
 * error, non-2xx status or non-JSON body (e.g. a firewall or maintenance
 * page) all come back as { ok: false } so callers can fall back instead of
 * hanging or returning a 500.
 */
async function wpGet<T>(
  path: string,
  { waitMs = WP_WAIT_MS, revalidate = WP_REVALIDATE_SECONDS } = {}
): Promise<WPResult<T>> {
  const request = (async (): Promise<WPResult<T>> => {
    try {
      const res = await fetch(`${WP_API}${path}`, {
        next: { revalidate },
        signal: AbortSignal.timeout(WP_REQUEST_TIMEOUT_MS),
      });
      if (!res.ok) {
        console.error(`[wordpress] GET ${path} failed: ${res.status} ${res.statusText}`);
        return { ok: false };
      }
      return { ok: true, data: (await res.json()) as T };
    } catch (err) {
      console.error(`[wordpress] GET ${path} threw: ${err instanceof Error ? err.message : String(err)}`);
      return { ok: false };
    }
  })();

  let timer: ReturnType<typeof setTimeout> | undefined;
  const gaveUp = new Promise<WPResult<T>>((resolve) => {
    timer = setTimeout(() => {
      console.error(`[wordpress] GET ${path} still pending after ${waitMs} ms; rendering fallback`);
      resolve({ ok: false });
    }, waitMs);
  });

  try {
    return await Promise.race([request, gaveUp]);
  } finally {
    clearTimeout(timer);
  }
}

export type PostLookup =
  | { status: "found"; post: WPPost }
  | { status: "missing" }
  | { status: "unavailable" };

/**
 * One post by slug, with embedded media and terms. Wrapped in React cache()
 * so generateMetadata and the page share a single WordPress request.
 */
export const getPostBySlug = cache(async (slug: string): Promise<PostLookup> => {
  const result = await wpGet<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
  if (!result.ok || !Array.isArray(result.data)) return { status: "unavailable" };
  const post = result.data[0];
  return post ? { status: "found", post } : { status: "missing" };
});

/** Up to `limit` other posts sharing a category with `post`. Empty on failure. */
export async function getRelatedPosts(post: WPPost, limit = 3): Promise<WPPost[]> {
  if (!post.categories?.length) return [];
  const result = await wpGet<WPPost[]>(
    `/posts?categories=${post.categories.join(",")}&per_page=${limit + 1}&_embed&exclude=${post.id}`,
    { waitMs: 5_000 }
  );
  return result.ok && Array.isArray(result.data) ? result.data.slice(0, limit) : [];
}

/** Posts for the blog index. Empty on failure. */
export async function getPosts(perPage = 100): Promise<WPPost[]> {
  const result = await wpGet<WPPost[]>(`/posts?per_page=${perPage}&_embed`);
  return result.ok && Array.isArray(result.data) ? result.data : [];
}

/** Categories for the blog index filter. Empty on failure. */
export async function getCategories(): Promise<WPCategory[]> {
  const result = await wpGet<WPCategory[]>(`/categories?per_page=50`);
  return result.ok && Array.isArray(result.data) ? result.data : [];
}

/**
 * Slugs and modified dates for the sitemap. Empty on failure. Waits longer
 * than a page does: no visitor is waiting, and a sitemap built without the
 * posts would leave them out for the next hour.
 */
export async function getPostSlugs(): Promise<{ slug: string; modified: string }[]> {
  const result = await wpGet<{ slug: string; modified: string }[]>(
    `/posts?per_page=100&_fields=slug,modified`,
    { waitMs: 55_000, revalidate: 3600 }
  );
  return result.ok && Array.isArray(result.data) ? result.data : [];
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