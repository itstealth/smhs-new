import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Seedling Modern High School Jaipur",
  description:
    "Read the privacy policy of Seedling Modern High School, Durgapura, Jaipur — a trusted CBSE school serving families since 1993.",
  path: "/policies",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
