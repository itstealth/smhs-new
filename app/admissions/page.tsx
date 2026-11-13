import { cmsPageContent } from "@/lib/cms";
import AdmissionsClient, {
  type StatItem,
  type WhyUsItem,
  type StepItem,
  type DocumentItem,
  type GalleryImage,
  type TransportItem,
  type CampusLocation,
} from "./AdmissionsClient";
import { pageMetadata } from "@/lib/seo";

// Set on the page, not app/admissions/layout.tsx: a layout canonical would be
// inherited by /admissions/apply and the other child routes.
export const metadata = pageMetadata({
  title: "School Admissions 2026-2027 | Seedling Modern High School",
  description:
    "Apply for admissions 2026-2027 at Seedling Modern High School, Durgapura, Jaipur. Nursery, primary & senior secondary CBSE seats filling fast. Enquire now.",
  path: "/admissions",
});

export default async function AdmissionsPage() {
  const content = await cmsPageContent("/admissions");

  const stats = (content.stats as StatItem[]) ?? [];
  const requisites = (content.requisites as string[]) ?? [];
  const whyUs = (content.whyUs as WhyUsItem[]) ?? [];
  const steps = (content.steps as StepItem[]) ?? [];
  const documents = (content.documents as DocumentItem[]) ?? [];
  const galleryImages = (content.galleryImages as GalleryImage[]) ?? [];
  const transport = (content.transport as TransportItem[]) ?? [];
  const campusLocations = (content.campusLocations as CampusLocation[]) ?? [];

  return (
    <AdmissionsClient
      stats={stats}
      requisites={requisites}
      whyUs={whyUs}
      steps={steps}
      documents={documents}
      galleryImages={galleryImages}
      transport={transport}
      campusLocations={campusLocations}
    />
  );
}
