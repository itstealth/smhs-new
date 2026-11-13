import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ERP Login | Seedling Modern High School Jaipur",
  description:
    "Secure ERP portal login for students, parents, and staff of Seedling Modern High School, Durgapura, Jaipur.",
  path: "/erp-login",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
