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
