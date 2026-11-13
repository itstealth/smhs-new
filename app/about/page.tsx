import { cmsPageContent } from "@/lib/cms";
import AboutClient, { type TimelineItem, type CampusImage, type StatItem } from "./AboutClient";
import { pageMetadata } from "@/lib/seo";

// Set on the page, not app/about/layout.tsx: a canonical on the layout would
// be inherited by /about/leadership and the other child routes.
export const metadata = pageMetadata({
  title: "About Us | CBSE School in Mahaveer Nagar Durgapura Jaipur",
  description:
    "Founded in 1993, Seedling Modern High School in Durgapura, Jaipur offers holistic, value-based CBSE education. Meet our legacy, vision, and passionate faculty.",
  path: "/about",
});

export default async function AboutPage() {
  const content = await cmsPageContent("/about");
  const timeline = (content.timeline as TimelineItem[]) ?? [];
  const campusImages = (content.campusImages as CampusImage[]) ?? [];
  const stats = (content.stats as StatItem[]) ?? [];

  return <AboutClient timeline={timeline} campusImages={campusImages} stats={stats} />;
}
