import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CBSE Curriculum at Senior Secondary School Jaipur | Seedling Schools",
  description: "Explore the CBSE curriculum at Seedling Modern High School, Jaipur, with student-focused learning, smart classrooms, STEM activities, sports and skill development.",
};
import { cmsPageContent } from "@/lib/cms";
import CurriculumClient, {
  type CmsHighlight,
  type CmsLearningApproach,
  type CmsLearnerProfile,
} from "./CurriculumClient";

export default async function AcademicsPage() {
  const content = await cmsPageContent("/curriculum");
  const highlights = (content.highlights as CmsHighlight[]) ?? [];
  const learningApproaches = (content.learningApproaches as CmsLearningApproach[]) ?? [];
  const learnerProfile = (content.learnerProfile as CmsLearnerProfile[]) ?? [];

  return (
    <CurriculumClient
      highlights={highlights}
      learningApproaches={learningApproaches}
      learnerProfile={learnerProfile}
    />
  );
}
