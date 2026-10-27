import { cmsPageContent } from "@/lib/cms";
import AffiliationClient, { type Affiliation } from "./AffiliationClient";

export default async function AffiliationPage() {
  const content = await cmsPageContent("/about/affiliation");
  const affiliations = (content.affiliations as Affiliation[]) ?? [];

  return <AffiliationClient affiliations={affiliations} />;
}
