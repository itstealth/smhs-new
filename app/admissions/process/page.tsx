import { cmsPageContent } from "@/lib/cms";
import AdmissionProcessClient, { type ProcessStep } from "./AdmissionProcessClient";

export default async function AdmissionProcessPage() {
  const content = await cmsPageContent("/admissions/process");
  const steps = (content.steps as ProcessStep[]) ?? [];
  const documents = (content.documents as string[]) ?? [];

  return <AdmissionProcessClient steps={steps} documents={documents} />;
}
