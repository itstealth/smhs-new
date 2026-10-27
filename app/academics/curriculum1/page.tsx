import { cmsPageContent } from "@/lib/cms";
import Curriculum1Client, { type CmsCurriculumTab } from "./Curriculum1Client";

export default async function CurriculumPage() {
  const content = await cmsPageContent("/academics/curriculum1");
  const curriculumTabs = (content.curriculumTabs as CmsCurriculumTab[]) ?? [];

  return <Curriculum1Client curriculumTabs={curriculumTabs} />;
}
