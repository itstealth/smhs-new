import { cmsPageContent } from "@/lib/cms";
import About1Client, { type Leader } from "./About1Client";

export default async function AboutPage() {
  const content = await cmsPageContent("/about/about1");
  const leaders = (content.leaders as Leader[]) ?? [];

  return <About1Client leaders={leaders} />;
}
