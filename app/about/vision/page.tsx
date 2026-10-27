import { cmsPageContent } from "@/lib/cms";
import VisionClient, { type Pillar } from "./VisionClient";

export default async function VisionPage() {
  const content = await cmsPageContent("/about/vision");
  const pillars = (content.pillars as Pillar[]) ?? [];

  return <VisionClient pillars={pillars} />;
}
