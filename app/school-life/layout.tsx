import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Life & Campus | Top School in Durgapura Jaipur",
  description: "Discover vibrant school life at Seedling Modern High School — sports, arts, cultural events, and world-class infrastructure at our Durgapura, Jaipur campus.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
