import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sports Facilities | Senior Secondary School Jaipur",
  description:
    "Sports facilities at Seedling Modern High School, a senior secondary school in Jaipur, offering basketball, swimming, badminton, cricket, karate and more.",
  path: "/sports",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}