import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events | Seedling Modern High School Jaipur",
  description: "Stay updated with the latest events, achievements, and school news from Seedling Modern High School — best School in Jaipur.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
