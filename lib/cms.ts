// lib/cms.ts
//
// Read-only fetch layer for the CMS's public content API
// (see cms repo: app/api/public/v1/[collection]/route.ts). The site holds a
// bearer token that resolves to exactly this institution's published
// content -- no database credentials live here.
//
// CMS_URL / CMS_TOKEN are required at build/start time: a site that silently
// renders an empty events page because nobody set the token is worse than a
// build that fails loudly and says why. See .env.example.
const CMS_URL = process.env.CMS_URL;
const CMS_TOKEN = process.env.CMS_TOKEN;

if (!CMS_URL || !CMS_TOKEN) {
  throw new Error(
    'CMS_URL and CMS_TOKEN must both be set (see .env.example). ' +
      'Without them every CMS-driven page would silently render empty.'
  );
}

/**
 * Fetches one collection ("events", "notices", "albums", ...) from the CMS.
 *
 * Never throws at request time: a CMS outage degrades a school's website
 * (empty section) rather than taking the whole page down with a 500. Errors
 * are logged so the failure is still visible in server logs.
 */
export async function cmsFetch<T>(collection: string): Promise<T[]> {
  try {
    const res = await fetch(`${CMS_URL}/api/public/v1/${collection}`, {
      headers: { Authorization: `Bearer ${CMS_TOKEN}` },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[cms] GET ${collection} failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = (await res.json()) as { data?: T[] };
    return json.data ?? [];
  } catch (err) {
    console.error(`[cms] GET ${collection} threw:`, err);
    return [];
  }
}

/**
 * Fetches every published page_content section for a single page path,
 * e.g. `/about`, grouped by section_key (see cms repo's
 * app/api/public/v1/[collection]/route.ts's pageContentForPath). Used for
 * one-off page content (timelines, leader lists, stats strips, prose) that
 * doesn't belong to a real cross-page collection.
 *
 * Never throws: a CMS outage should degrade a page's content (missing
 * section), not 500 the whole site.
 */
export async function cmsPageContent(path: string): Promise<Record<string, unknown>> {
  try {
    const res = await fetch(
      `${CMS_URL}/api/public/v1/page-content?path=${encodeURIComponent(path)}`,
      {
        headers: { Authorization: `Bearer ${CMS_TOKEN}` },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(`[cms] GET page-content?path=${path} failed: ${res.status} ${res.statusText}`);
      return {};
    }

    const json = (await res.json()) as { data?: Record<string, unknown> };
    return json.data ?? {};
  } catch (err) {
    console.error(`[cms] GET page-content?path=${path} threw:`, err);
    return {};
  }
}
