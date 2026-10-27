import HeroWrapper from "@/components/layout/HeroWrapper";
import { Newspaper, Calendar } from "lucide-react";
import { cmsFetch } from "@/lib/cms";
import NewsClient, { type CmsNotice } from "./NewsClient";

export default async function NewsCoveragePage() {
  const notices = await cmsFetch<CmsNotice>("notices");

  return (
    <main className="bg-neutral-bg min-h-screen">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="News & Updates"
        badge="Latest News"
        breadcrumbs={[{ label: "News" }]}
      />

      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-20">
          <Newspaper className="text-secondary w-10 h-10" />
          <h2 className="text-heading text-4xl md:text-5xl">Media Highlights.</h2>
        </div>

        <NewsClient notices={notices} />
      </section>

      {/* Archives Section */}
      <section className="pt-16 pb-10 bg-neutral-950 text-white rounded-t-[5rem] mx-4 md:mx-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Calendar className="w-16 h-16 text-secondary mx-auto mb-10" />
          <h2 className="text-heading text-white text-4xl md:text-5xl mb-12 italic font-serif">News Archives.</h2>
          <p className="text-white/50 text-xl font-medium mb-16 max-w-xl mx-auto leading-relaxed">
            Looking for older milestones? Explore our complete library of press releases and media clippings since 1993.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["2024", "2023", "2022", "2021"].map((year) => (
              <button key={year} className="h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black hover:bg-white hover:text-neutral-950 transition-all">
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
