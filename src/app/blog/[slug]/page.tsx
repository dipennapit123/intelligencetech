import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { markdownToHtml } from "@/lib/markdown";
import { getBaseUrl } from "@/lib/baseUrl";
import { BlogPostClient } from "@/components/blog/BlogPostClient";
import { DUMMY_BLOGS, getDummyBlogBySlug } from "@/components/blog/dummyPosts";

export const revalidate = 60;

type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  featured_image: string | null;
  tags: string[];
  category: string | null;
  created_at: string;
};

function titleFromSlug(slug?: string) {
  const safe = (slug ?? "").trim();
  if (!safe) return "Article";

  return safe
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function fallbackBlogFromSlug(slug?: string): Blog {
  const safeSlug = (slug ?? "").trim() || "article";
  const title = titleFromSlug(safeSlug);
  const now = new Date().toISOString();
  const heroImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAeAxcu6zyY4OgnsBKQchFs49w4k5T9vYrqxbmCPcEweuduRZGEBfQLzaGdtlw9OoUnPiYkgAL_wIPti4nbH2BdQ1lGZvVnd_nPGN9C9gLndjT55yMtxfhSAL1-j94DfHj0InrlnYginkK6viW8ir0H31Vigrv8buTJJHBLW5BTndEyyCagpdKjK-ezWVfK19y89vSlr2tMbYyhr2tat9cNaYAw4P79XUXSZ0LD9sXTMBil2OzUFSJY7vuyt9iBNvB1AJR413l7pxgj",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBkalvA6GRwcBvCpx6uBLv7eYC4BGswnZWXe0L6eKMQbkLcPQx5J0yFhQ2efSql_iu67jj1Eedk6ZHWQggBVmCXM-ytMU54hVhllJgt2N2uZpby6nRbiHDYRTmY3akLkhNIoG1a9FurzeDOeayf-FEJBpZXQZ_pLiN-J0SBt_FJDl8AGGJueO-2r-3p2S0rmDVIpjCp2E0cgRQKZhMHT8I8KLncTlGohocC-ThCbJvjG8YkLjjJIoQsVl-zRuQ-Yf2Uw3CqZbJwes5H",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmfGDmqaPVSrOSA_EqIOHNmrRbUJuvUgy8g2XA9qFl_bBNgdZShAjAfdlC79Y4y801s4SqLV4jcLd1akKDWzqx0sOK0n0nqjT16qM_M0IYsKAzb_N9OsvK1HjNrsCFn1bAiqvuRgWfnUfccvtgz9US3v0szIEG8C4hkhoKqbpBDz-fR_-LTVh3Mmy1e73mYsZAZhGEb2Gp_InK_U-PvhPv__-bQ-jG4m0MweM-vO9htj155qxilzRi890lzlrputn6i3jVcBnlCqD9",
  ];
  const hero = heroImages[Math.abs(safeSlug.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % heroImages.length];

  return {
    id: `fallback-${safeSlug}`,
    title,
    slug: safeSlug,
    meta_title: `${title} | Intelligence Tech`,
    meta_description:
      "A design-stable placeholder article with realistic structure and content. This will be replaced by posts published from the dashboard.",
    content: `## Why this article exists

This is **dummy content** generated to help you preview the full blog post design — typography, spacing, rhythm, and motion — before the dashboard and backend are connected.

Once your admin/dashboard publishes a real post to the backend, this page will render that content automatically.

## The idea behind “${title}”

When products evolve into an ecosystem, the details matter:

- **Consistency**: tokens, spacing, and components stay aligned across pages
- **Clarity**: headings are scannable and sections feel calm
- **Motion**: animations should be slow, smooth, and purposeful

## What we’re building

The Intelligence Tech blog is structured for SEO and long-form reading:

1. A strong headline and meta description
2. A visual hero image
3. Clear section hierarchy with readable line-height
4. Tags and categories for discovery

## Practical takeaways

Here are a few practical patterns you’ll see across posts:

- Start with a short “why”
- Use bullets for scanning
- Use **bold** to emphasize intent
- Keep sections short and rhythmic (white/grey cadence across the site)

## Next steps

When your backend is ready, you’ll publish:

- \`title\`, \`slug\`, \`content\` (markdown)
- \`meta_title\`, \`meta_description\`
- \`featured_image\`, \`tags\`, \`category\`

And the site will automatically become fully dynamic.

--- 

If you want, I can also add a “Related posts” section (dummy for now) to further validate the final layout.`,
    featured_image: hero,
    tags: ["design", "updates", "seo"],
    category: "Updates",
    created_at: now,
  };
}

async function getPublishedBlog(slug: string) {
  const baseUrl = await getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      next: { tags: ["blog"], revalidate },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { blog: Blog };
    return json.blog ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!slug) return {};
  const blog = (await getPublishedBlog(slug)) ?? getDummyBlogBySlug(slug) ?? fallbackBlogFromSlug(slug);

  const images = blog.featured_image ? [{ url: blog.featured_image }] : [];

  return {
    title: blog.meta_title,
    description: blog.meta_description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: blog.meta_title,
      description: blog.meta_description,
      type: "article",
      images,
    },
    twitter: {
      card: blog.featured_image ? "summary_large_image" : "summary",
      title: blog.meta_title,
      description: blog.meta_description,
      images: blog.featured_image ? [blog.featured_image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  // Pre-render dummy slugs for a clean SEO baseline (API content will still revalidate).
  return DUMMY_BLOGS.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  if (!slug) redirect("/blog");
  const blog = (await getPublishedBlog(slug)) ?? getDummyBlogBySlug(slug) ?? fallbackBlogFromSlug(slug);
  // slug is always set here; keep a safe hard-stop just in case
  if (!blog?.slug) redirect("/blog");

  const html = await markdownToHtml(blog.content);

  return (
    <BlogPostClient
      title={blog.title}
      metaDescription={blog.meta_description}
      category={blog.category}
      tags={blog.tags ?? []}
      html={html}
      featuredImage={blog.featured_image ?? null}
      slug={blog.slug}
      createdAt={blog.created_at}
    />
  );
}

