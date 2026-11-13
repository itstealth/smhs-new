import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Learning Support | English Medium School in Durgapura Jaipur",
  description:
    "Learning support at Seedling Modern High School, Jaipur, with student-focused guidance and resources to support diverse learning needs and academic growth.",
  path: "/learning-support",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}