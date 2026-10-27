import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics & CBSE Curriculum | English Medium School Jaipur",
  description: "Explore CBSE curriculum from Pre-Primary to Class XII at Seedling Modern High School, Durgapura. Smart classrooms, STEM labs, and experiential learning in Jaipur.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
