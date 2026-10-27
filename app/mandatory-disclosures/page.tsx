import { cmsPageContent } from "@/lib/cms";
import MandatoryDisclosuresClient, { type CmsMandatoryItem } from "./MandatoryDisclosuresClient";

export default async function MandatoryDisclosuresPage() {
  const content = await cmsPageContent("/mandatory-disclosures");
  const mandatoryData = (content.mandatoryData as CmsMandatoryItem[]) ?? [];

  return <MandatoryDisclosuresClient mandatoryData={mandatoryData} />;
}
