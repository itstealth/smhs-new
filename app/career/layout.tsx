import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Career Opportunities | Seedling Modern High School Jaipur",
  description:
    "Join the team at Seedling Modern High School, Durgapura, Jaipur. We are hiring passionate educators and staff committed to holistic student development.",
  path: "/career",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
