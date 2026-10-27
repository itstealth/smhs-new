import { cmsFetch, cmsPageContent } from "@/lib/cms";
import AlumniClient, { type CmsAlumnus, type StatItem, type AchievementItem } from "./AlumniClient";

export default async function AlumniPage() {
  const people = await cmsFetch<CmsAlumnus & { kind: string }>("people");
  const alumniList = people.filter((p) => p.kind === "alumni");

  const content = await cmsPageContent("/alumni");
  const stats = (content.stats as StatItem[]) ?? [];
  const achievements = (content.achievements as AchievementItem[]) ?? [];
  const alumniGallery = (content.alumniGallery as string[]) ?? [];

  return (
    <AlumniClient
      alumniList={alumniList}
      stats={stats}
      achievements={achievements}
      alumniGallery={alumniGallery}
    />
  );
}
