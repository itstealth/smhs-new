import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "CBSE Curriculum in Jaipur | Seedling Modern High School",
  description:
    "Explore the CBSE curriculum at Seedling Modern High School, Jaipur: student-focused learning, smart classrooms, STEM activities, sports and skill development.",
  path: "/curriculum",
});
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
