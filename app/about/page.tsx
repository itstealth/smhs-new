import { cmsPageContent } from "@/lib/cms";
import AboutClient, { type TimelineItem, type CampusImage, type StatItem } from "./AboutClient";

export default async function AboutPage() {
  const content = await cmsPageContent("/about");
  const timeline = (content.timeline as TimelineItem[]) ?? [];
  const campusImages = (content.campusImages as CampusImage[]) ?? [];
  const stats = (content.stats as StatItem[]) ?? [];

  return <AboutClient timeline={timeline} campusImages={campusImages} stats={stats} />;
}
