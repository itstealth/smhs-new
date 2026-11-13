import type { Metadata } from "next";
import BlogClient from "@/components/blog/BlogClient";
import { getCategories, getPosts } from "@/lib/wordpress";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog | Education Insights from Seedling Modern Jaipur",
  description: "Read expert articles on parenting, CBSE education, school life, and learning tips from the educators at Seedling Modern High School, Durgapura, Jaipur.",
  path: "/blog",
});

export const revalidate = 300;

export default async function BlogPage() {
  // Both helpers are time-limited and return [] on failure; BlogClient
  // renders its empty state in that case.
  const [posts, categories] = await Promise.all([getPosts(100), getCategories()]);

  return <BlogClient posts={posts} categories={categories} />;
}
