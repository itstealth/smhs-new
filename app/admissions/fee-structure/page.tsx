import { cmsFetch, cmsPageContent } from "@/lib/cms";
import FeeStructureClient, { type CmsFeeStructureEntry, type FeeNote } from "./FeeStructureClient";

export default async function FeeStructurePage() {
  const feeData = await cmsFetch<CmsFeeStructureEntry>("fee-structure");
  const content = await cmsPageContent("/admissions/fee-structure");
  const notes = (content.notes as FeeNote[]) ?? [];

  return <FeeStructureClient feeData={feeData ?? []} notes={notes} />;
}
