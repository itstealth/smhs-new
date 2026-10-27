import { cmsPageContent } from "@/lib/cms";
import LearningSupportClient, { type CmsSupportSystem } from "./LearningSupportClient";

export default async function LearningSupportPage() {
  const content = await cmsPageContent("/academics/learning-support");
  const supportSystems = (content.supportSystems as CmsSupportSystem[]) ?? [];

  return <LearningSupportClient supportSystems={supportSystems} />;
}
