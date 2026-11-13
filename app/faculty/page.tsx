import { cmsFetch } from "@/lib/cms";
import FacultyClient, { type CmsFacultyWing } from "./FacultyClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Faculty & Teachers | Seedling Modern High School, Jaipur",
  description:
    "Meet the faculty of Seedling Modern High School, Jaipur: experienced, qualified teachers giving individual attention, with regular tests and remedial classes.",
  path: "/faculty",
});

export default async function FacultyPage() {
  const people = await cmsFetch<CmsFacultyWing & { kind: string }>("people");
  const faculty = people.filter(
    (p) => p.kind === "faculty" && p.custom?.group === "faculty-page"
  );

  return <FacultyClient faculty={faculty} />;
}
