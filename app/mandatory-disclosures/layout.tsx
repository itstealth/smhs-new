import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandatory Disclosures | Seedling Modern High School CBSE",
  description: "Access all CBSE mandatory public disclosures for Seedling Modern High School, Durgapura, Jaipur — affiliation, fee structure, results, and compliance documents.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
