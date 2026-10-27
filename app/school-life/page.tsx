import { cmsFetch } from "@/lib/cms";
import SchoolLifeClient, { type GalleryItem } from "./SchoolLifeClient";

// Shape of GET /api/public/v1/albums -- an album with its media_items joined
// (cms repo: app/api/public/v1/[collection]/route.ts). media_items has no
// per-item custom column (db/migrations/003_school_collections.sql), so the
// masonry "size"/"category" hints the original hardcoded galleryItems array
// carried per-photo live on the album's own custom.items, keyed by
// sortOrder -- see the cms repo's scripts/import-smhs.ts (one-shot, already
// deleted) for how they were written.
type CmsMediaItem = {
  id: string;
  fileUrl: string;
  caption: string | null;
  sortOrder: number;
};

type CmsAlbum = {
  id: string;
  title: string;
  category: string | null;
  status: string;
  custom: { items?: Array<{ sortOrder: number; category?: string; size?: string }> };
  items: CmsMediaItem[];
};

export default async function SchoolLifePage() {
  const albums = await cmsFetch<CmsAlbum>("albums");
  const album = albums.find((a) => a.title === "School Life") ?? albums[0];

  const meta = album?.custom?.items ?? [];
  const galleryItems: GalleryItem[] = (album?.items ?? []).map((item) => {
    const m = meta.find((entry) => entry.sortOrder === item.sortOrder);
    return {
      id: item.id,
      src: item.fileUrl,
      title: item.caption ?? "",
      category: m?.category ?? "Events",
      size: m?.size ?? "small",
    };
  });

  return <SchoolLifeClient galleryItems={galleryItems} />;
}
