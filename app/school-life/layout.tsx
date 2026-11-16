import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "School Life & Campus | Top School in Jaipur",
  description:
    "Discover vibrant school life at Seedling Modern High School — sports, arts, cultural events, and world-class infrastructure at our Durgapura, Jaipur campus.",
  path: "/school-life",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
