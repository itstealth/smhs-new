import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Support | English Medium School in Durgapura Jaipur",
  description: "Discover learning support at Seedling Modern High School, Jaipur, with student-focused guidance and resources to support diverse learning needs and academic growth.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}