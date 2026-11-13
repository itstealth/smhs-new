import HeroWrapper from "@/components/layout/HeroWrapper";
import { cmsPageContent } from "@/lib/cms";
import TermsAndConditionsClient, { type TermsAndConditionsSection } from "./TermsAndConditionsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions | Seedling Modern High School",
  description:
    "Terms and conditions for using the Seedling Modern High School website, covering disclaimers, third-party links, acceptable use, copyright and governing law.",
  path: "/terms-and-conditions",
});

export default async function TermsAndConditions() {
  const content = await cmsPageContent("/terms-and-conditions");
  const sections = (content.sections as TermsAndConditionsSection[]) ?? [];

  return (
    <div className="min-h-screen bg-off-white font-dm selection:bg-navy/10 scroll-smooth">

      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Terms & Conditions"
        badge="Legal"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <TermsAndConditionsClient sections={sections} />

      <footer className="py-12 text-center border-t border-sand/30">
        <p className="text-text-light text-[10px] font-black uppercase tracking-[0.2em]">
          Seedling Schools | Jaipur • Rajasthan • India
        </p>
      </footer>
    </div>
  );
}
