import HeroWrapper from "@/components/layout/HeroWrapper";
import { cmsPageContent } from "@/lib/cms";
import NewsAndEventsClient, {
  type NewsItem,
  type FoundationItem,
  type CampusEvent,
  type Snapshot,
} from "./NewsAndEventsClient";
import { pageMetadata } from "@/lib/seo";

// Set on the page, not the layout: a layout canonical would be inherited by
// /news-and-events/news and /news-and-events/events.
export const metadata = pageMetadata({
  title: "News & Events | Seedling Modern High School Jaipur",
  description:
    "Stay updated with the latest events, achievements, and school news from Seedling Modern High School — best School in Jaipur.",
  path: "/news-and-events",
});

export default async function CampusHighlightsPage() {
  const content = await cmsPageContent("/news-and-events");
  const newsItems = (content.newsItems as NewsItem[]) ?? [];
  const foundationItems = (content.foundationItems as FoundationItem[]) ?? [];
  const events = (content.events as CampusEvent[]) ?? [];
  const snapshots = (content.snapshots as Snapshot[]) ?? [];

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">

      {/* ══════════════════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/newsAndEvents.webp"
        title="News & Events"
        badge="Campus Highlights"
        breadcrumbs={[{ label: "News & Events" }]}
        height="large"
        overlayOpacity={0.6}
      />

      <NewsAndEventsClient
        newsItems={newsItems}
        foundationItems={foundationItems}
        events={events}
        snapshots={snapshots}
      />
    </main>
  );
}
