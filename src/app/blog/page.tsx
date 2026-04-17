import { getBaseUrl } from "@/lib/baseUrl";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { DUMMY_BLOGS } from "@/components/blog/dummyPosts";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description: "Product updates, engineering notes, and platform learnings.",
};

export default async function BlogIndexPage() {
  let blogs = DUMMY_BLOGS.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    meta_description: b.meta_description,
    featured_image: b.featured_image,
    tags: b.tags,
    category: b.category,
    created_at: b.created_at,
  }));

  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/blog`, {
      next: { tags: ["blog"], revalidate },
    });
    if (res.ok) {
      const json = (await res.json().catch(() => ({ blogs: [] }))) as {
        blogs: Array<{
          id: string;
          title: string;
          slug: string;
          meta_description: string;
          featured_image: string | null;
          tags: string[];
          category: string | null;
          created_at: string;
        }>;
      };
      const fromApi = json.blogs ?? [];
      if (fromApi.length) blogs = fromApi;
    }
  } catch {
    // Use dummy data for design stability
  }

  return <BlogIndexClient blogs={blogs} />;
}

