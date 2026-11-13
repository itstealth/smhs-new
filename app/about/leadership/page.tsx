import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "School Leadership Team | Seedling Modern High School",
  description: "Meet the leadership team at Seedling Modern High School, Jaipur, and learn about the educators guiding the school's vision, academic excellence and student development.",
  path: "/about/leadership",
});
import { cmsFetch } from "@/lib/cms";
import LeadershipClient, { type CmsBoardMember } from "./LeadershipClient";

export default async function LeadershipPage() {
  const people = await cmsFetch<CmsBoardMember & { kind: string }>("people");
  const leaders = people.filter((p) => p.kind === "board");

  return <LeadershipClient leaders={leaders} />;
}
