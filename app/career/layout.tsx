import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Opportunities | Seedling Modern High School Jaipur",
  description: "Join the team at Seedling Modern High School, Durgapura, Jaipur. We are hiring passionate educators and staff committed to holistic student development.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
