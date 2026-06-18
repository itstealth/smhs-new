import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CBSE School Near Mahaveer Nagar Durgapura Jaipur",
  description: "Get in touch with Seedling Modern High School. Visit us at Ashok Marg, Mahaveer Nagar-II, Durgapura, Jaipur 302018 or call +91 95877 72837. Admissions enquiry welcome.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
