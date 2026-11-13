import type { Metadata } from "next";
import HeroWrapper from "@/components/layout/HeroWrapper";
import { cmsFetch, cmsPageContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import TransportFacilityClient, {
  type SafetyFeature,
  type RouteStep,
  type CmsTransportRoute,
} from "./TransportFacilityClient";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "School Bus & Transport Facility in Jaipur | Seedling Schools",
    description:
      "Explore Seedling Schools' transport facility in Jaipur: safe school buses, trained attendants, CCTV monitoring, route planning and convenient pickup support.",
    path: "/transport-facility",
  }),
  keywords: [
    "Seedling Schools transport facility",
    "school bus service Jaipur",
    "safe school transport Jaipur",
    "Seedling school bus routes",
    "school transportation facility",
  ],
};

export default async function TransportFacilityPage() {
  const routes = await cmsFetch<CmsTransportRoute>("transport-routes");
  const content = await cmsPageContent("/transport-facility");
  const safetyFeatures = (content.safetyFeatures as SafetyFeature[]) ?? [];
  const routeSteps = (content.routeSteps as RouteStep[]) ?? [];
  const assurances = (content.assurances as string[]) ?? [];

  return (
    <main className="bg-off-white text-text-base overflow-x-hidden font-dm">
      <HeroWrapper
        backgroundImage="/smhs_images/seedling_images/smhs_tran.webp"
        title="Transport Facility"
        badge="Safe Transportation"
        breadcrumbs={[{ label: "Transport" }]}
      />

      <TransportFacilityClient
        safetyFeatures={safetyFeatures}
        routeSteps={routeSteps}
        assurances={assurances}
        routes={routes ?? []}
      />
    </main>
  );
}
