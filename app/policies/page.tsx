import HeroWrapper from "@/components/layout/HeroWrapper";
import { cmsPageContent } from "@/lib/cms";
import PoliciesClient, { type PolicySection } from "./PoliciesClient";

export default async function PrivacyPolicyPage() {
  const content = await cmsPageContent("/policies");
  const sections = (content.sections as PolicySection[]) ?? [];

  return (
    <div className="bg-off-white">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/privacy.webp"
        objectPosition="center 60%"
        title="Privacy Policy"
        badge="Privacy & Safety"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <PoliciesClient sections={sections} />
    </div>
  );
}
