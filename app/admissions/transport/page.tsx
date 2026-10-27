import { cmsFetch, cmsPageContent } from "@/lib/cms";
import AdmissionTransportClient, { type CmsTransportRoute } from "./AdmissionTransportClient";

export default async function TransportFacilityPage() {
  const routes = await cmsFetch<CmsTransportRoute>("transport-routes");
  const content = await cmsPageContent("/admissions/transport");
  const features = (content.features as string[]) ?? [];

  return <AdmissionTransportClient routes={routes ?? []} features={features} />;
}
