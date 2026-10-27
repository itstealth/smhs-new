import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP Login | Seedling Modern High School Jaipur",
  description: "Secure ERP portal login for students, parents, and staff of Seedling Modern High School, Durgapura, Jaipur.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
