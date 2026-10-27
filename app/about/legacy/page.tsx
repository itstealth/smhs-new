import { cmsPageContent } from "@/lib/cms";
import LegacyClient, { type Milestone } from "./LegacyClient";

export default async function LegacyPage() {
  const content = await cmsPageContent("/about/legacy");
  const milestones = (content.milestones as Milestone[]) ?? [];

  return <LegacyClient milestones={milestones} />;
}
