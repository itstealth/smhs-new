import BlogClient from "@/components/blog/BlogClient";
import { type WPPost, type WPCategory } from "@/lib/wordpress";

export const revalidate = 300;

export default async function BlogPage() {
  let posts: WPPost[] = [];
  let categories: WPCategory[] = [];

  try {
    const [postsRes, categoriesRes] = await Promise.all([
      fetch('https://smhs.seedlingschools.com/blog/wp-json/wp/v2/posts?per_page=100&_embed', {
        next: { revalidate: 300 },
      }),
      fetch('https://smhs.seedlingschools.com/blog/wp-json/wp/v2/categories?per_page=50', {
        next: { revalidate: 300 },
      }),
    ]);

    if (postsRes.ok) posts = await postsRes.json();
    if (categoriesRes.ok) categories = await categoriesRes.json();
  } catch {
    // render empty state handled by BlogClient
  }

  return <BlogClient posts={posts} categories={categories} />;
}
