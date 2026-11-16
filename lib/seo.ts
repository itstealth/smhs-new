import type { Metadata } from "next";

export const SITE_URL = "https://smhs.seedlingschools.com";
export const SITE_NAME = "Seedling Modern High School";

/** 1200x630 crop of public/smhs_images/seedling_images/SMHS.webp (campus building). */
export const DEFAULT_OG_IMAGE = {
  url: "/og-smhs-campus.jpg",
  width: 1200,
  height: 630,
  alt: "Seedling Modern High School campus building",
};

type OgImage = string | { url: string; width?: number; height?: number; alt?: string };

interface PageSeo {
  title: string;
  description: string;
  /** Path of the page itself, e.g. "/faculty". Used for the canonical and og:url. */
  path: string;
  type?: "website" | "article";
  images?: OgImage[];
}

/**
 * Full per-page metadata: title, description, self-referencing canonical,
 * Open Graph and Twitter tags that all agree with each other.
 *
 * Next.js merges metadata shallowly, so a page that sets `openGraph` replaces
 * the root layout's object entirely. That is why every field (site name,
 * locale, image) is repeated here instead of relying on inheritance.
 *
 * Set this on the page (or on a layout that has no child routes): a canonical
 * set on a layout is inherited by every child route below it.
 */
export function pageMetadata({ title, description, path, type = "website", images }: PageSeo): Metadata {
  const ogImages = images && images.length > 0 ? images : [DEFAULT_OG_IMAGE];
  const conciseTitle = title.length <= 60 ? title : `${title.slice(0, title.lastIndexOf(" ", 57))}…`;
  const conciseDescription = description.length <= 158 ? description : `${description.slice(0, description.lastIndexOf(" ", 157))}…`;
  return {
    title: conciseTitle,
    description: conciseDescription,
    alternates: { canonical: path },
    openGraph: {
      title: conciseTitle,
      description: conciseDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: conciseTitle,
      description: conciseDescription,
      images: ogImages,
    },
  };
}

/** Homepage title/description, also the root layout's fallback. */
export const HOME_SEO = {
  title: "CBSE School Durgapura, Jaipur | Seedling Modern High School",
  description:
    "Seedling Modern High School is a CBSE school in Durgapura, Jaipur, offering English-medium education and a broad academic and co-curricular programme.",
};
