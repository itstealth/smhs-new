import { cmsPageContent } from "@/lib/cms";
import ContactUsClient, { type CmsCampusMap, type CmsStat, type CmsHour } from "./ContactUsClient";

export default async function ContactPage() {
  const content = await cmsPageContent("/contact-us");
  const campusMaps = (content.CAMPUS_MAPS as CmsCampusMap[]) ?? [];
  const schools = (content.SCHOOLS as string[]) ?? [];
  const stats = (content.STATS as CmsStat[]) ?? [];
  const hours = (content.HOURS as CmsHour[]) ?? [];

  return (
    <ContactUsClient
      campusMaps={campusMaps}
      schools={schools}
      stats={stats}
      hours={hours}
    />
  );
}
