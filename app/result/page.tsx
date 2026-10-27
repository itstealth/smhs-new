import HeroWrapper from "@/components/layout/HeroWrapper";
import { cmsPageContent } from "@/lib/cms";
import ResultClient, { type Achievement, type Topper } from "./ResultClient";

export default async function ResultPage() {
  const content = await cmsPageContent("/result");
  const achievements = (content.achievements as Achievement[]) ?? [];
  const toppers = (content.toppers as Topper[]) ?? [];

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Results"
        badge="Academic Excellence"
        // breadcrumbs={[{ label: "Academics" }, { label: "Results" }]}
        height="large"
        overlayOpacity={0.6}
      />

      <ResultClient achievements={achievements} toppers={toppers} />
    </main>
  );
}
