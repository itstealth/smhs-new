import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CBSE School in Mahaveer Nagar Durgapura Jaipur",
  description: "Founded in 1993, Seedling Modern High School in Durgapura, Jaipur offers holistic, value-based CBSE education. Meet our legacy, vision, and passionate faculty.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
