import { cmsFetch, cmsPageContent } from "@/lib/cms";
import RollOfHonourClient, {
  type CmsAchievement,
  type CmsHonourRollEntry,
} from "./RollOfHonourClient";

export default async function RollOfHonourPage() {
  const [content, hallOfFame] = await Promise.all([
    cmsPageContent("/academics/roll-of-honour"),
    cmsFetch<CmsHonourRollEntry>("honour-roll"),
  ]);

  const achievements = (content.achievements as CmsAchievement[]) ?? [];

  return <RollOfHonourClient achievements={achievements} hallOfFame={hallOfFame} />;
}
