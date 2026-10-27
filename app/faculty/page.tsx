import { cmsFetch } from "@/lib/cms";
import FacultyClient, { type CmsFacultyWing } from "./FacultyClient";

export default async function FacultyPage() {
  const people = await cmsFetch<CmsFacultyWing & { kind: string }>("people");
  const faculty = people.filter(
    (p) => p.kind === "faculty" && p.custom?.group === "faculty-page"
  );

  return <FacultyClient faculty={faculty} />;
}
