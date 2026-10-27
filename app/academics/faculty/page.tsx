import { cmsFetch, cmsPageContent } from "@/lib/cms";
import AcademicsFacultyClient, {
  type CmsFacultyPerson,
  type CmsFacultyStat,
  type CmsDepartment,
} from "./AcademicsFacultyClient";

export default async function FacultyPage() {
  const [people, content] = await Promise.all([
    cmsFetch<CmsFacultyPerson & { kind: string }>("people"),
    cmsPageContent("/academics/faculty"),
  ]);

  const leadership = people.filter(
    (p) => p.kind === "faculty" && p.custom?.group === "leadership"
  );
  const facultyStats = (content.facultyStats as CmsFacultyStat[]) ?? [];
  const departments = (content.departments as CmsDepartment[]) ?? [];

  return (
    <AcademicsFacultyClient
      leadership={leadership}
      facultyStats={facultyStats}
      departments={departments}
    />
  );
}
