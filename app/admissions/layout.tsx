import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Admissions 2026 | Nursery to Class XII Durgapura Jaipur",
  description: "Apply for school admissions 2026 at Seedling Modern High School, Durgapura, Jaipur. Nursery, primary & senior secondary CBSE seats filling fast. Enquire now.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
