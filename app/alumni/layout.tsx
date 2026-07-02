import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network | Seedling Modern High School Jaipur",
  description: "Connect with the Seedling Modern High School alumni community. Celebrate a legacy of 33+ years of students who are leading change across India and beyond.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
