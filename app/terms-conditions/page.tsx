import HeroWrapper from "@/components/layout/HeroWrapper";
import { cmsPageContent } from "@/lib/cms";
import TermsConditionsClient, { type TermsSection } from "./TermsConditionsClient";

export default async function TermsConditionsPage() {
  const content = await cmsPageContent("/terms-conditions");
  const sections = (content.sections as TermsSection[]) ?? [];

  return (
    <div className="bg-off-white">
      <HeroWrapper
        backgroundImage="/assets/img/sps-banner.webp"
        title="Terms & Conditions"
        badge="Legal"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <TermsConditionsClient sections={sections} />
    </div>
  );
}
