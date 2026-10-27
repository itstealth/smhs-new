import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Seedling Modern High School Jaipur",
  description: "Read the privacy policy of Seedling Modern High School, Durgapura, Jaipur — a trusted CBSE school serving families since 1993.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
