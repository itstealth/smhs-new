import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Seedling Modern High School, Durgapura Jaipur",
  description:
    "Contact Seedling Modern High School. Visit us at Ashok Marg, Mahaveer Nagar-II, Durgapura, Jaipur 302018 or call +91 95877 72837. Admissions enquiry welcome.",
  path: "/contact-us",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
