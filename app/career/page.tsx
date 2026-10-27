import { cmsPageContent } from "@/lib/cms";
import CareerClient, {
  type CmsJobRole,
  type CmsWhyWork,
  type CmsPerk,
  type CmsTestimonial,
  type CmsQualification,
  type CmsExperience,
} from "./CareerClient";

export default async function CareersPage() {
  const content = await cmsPageContent("/career");
  const openRoles = (content.openRoles as CmsJobRole[]) ?? [];
  const whyWork = (content.whyWork as CmsWhyWork[]) ?? [];
  const perks = (content.perks as CmsPerk[]) ?? [];
  const testimonials = (content.testimonials as CmsTestimonial[]) ?? [];
  const qualifications = (content.qualifications as CmsQualification[]) ?? [];
  const experiences = (content.experiences as CmsExperience[]) ?? [];

  return (
    <CareerClient
      openRoles={openRoles}
      whyWork={whyWork}
      perks={perks}
      testimonials={testimonials}
      qualifications={qualifications}
      experiences={experiences}
    />
  );
}
