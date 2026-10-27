import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sports Facilities | Senior Secondary School Jaipur",
  description: "Explore sports facilities at Seedling Modern High School, a senior secondary school in Jaipur, offering basketball, swimming, badminton, cricket, karate and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}