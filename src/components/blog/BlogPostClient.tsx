"use client";

import Link from "next/link";
import { FadeUp } from "@/components/motion/AnimatedSection";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function estimateReadingMinutesFromHtml(html: string) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 220));
}

export function BlogPostClient({
  title,
  metaDescription,
  category,
  tags,
  html,
  featuredImage,
  slug,
  createdAt,
}: {
  title: string;
  metaDescription: string;
  category: string | null;
  tags: string[];
  html: string;
  featuredImage: string | null;
  slug: string;
  createdAt: string;
}) {
  const readingMins = estimateReadingMinutesFromHtml(html);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: metaDescription,
    image: featuredImage ? [featuredImage] : undefined,
    datePublished: createdAt,
    dateModified: createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Intelligence Tech",
    },
  };

  return (
    <main className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Header — white */}
      <section className="bg-surface">
        <div className="max-w-screen-md mx-auto px-8 pt-6 pb-8 md:pt-8 md:pb-10">
          <FadeUp className="space-y-6">
            <div className="text-primary font-bold tracking-[0.15em] text-[10px] uppercase">
              {(category ?? "Updates").toString()}
            </div>
            <h1 className="text-[2.5rem] md:text-[3.25rem] font-black leading-tight tracking-[0.03em] text-on-surface">
              {title}
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed tracking-[0.04em]">
              {metaDescription}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-on-surface-variant tracking-[0.04em]">
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
                {formatDate(createdAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">schedule</span>
                {readingMins} min read
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(tags ?? []).map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold tracking-[0.15em] uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Content — grey */}
      <section className="bg-surface-container-low">
        <div className="max-w-screen-md mx-auto px-8 py-14 md:py-16">
          <FadeUp>
            <article className="space-y-10">
              {featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={title}
                  src={featuredImage}
                  className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-2xl"
                />
              ) : null}
              <section
                className="prose-it max-w-none text-on-surface"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <div className="rounded-2xl border border-outline-variant/15 bg-surface p-8 shadow-[0_18px_48px_rgba(20,33,61,0.06)]">
                <div className="text-primary font-bold tracking-widest text-[10px] uppercase">Next</div>
                <div className="mt-2 text-2xl font-black tracking-tight text-on-surface">
                  Want more updates?
                </div>
                <p className="mt-3 text-on-surface-variant leading-relaxed">
                  New posts will be published from your dashboard and backend. This layout is already SEO-friendly and
                  ready for real data.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/blog"
                    className="px-6 py-3 bg-gradient-to-br from-[#14213d] to-[#fca311] text-on-primary rounded-xl font-bold hover:scale-[1.02] transition-all duration-500 shadow-lg shadow-primary/15"
                  >
                    Back to Blog
                  </Link>
                  <Link
                    href="/products"
                    className="px-6 py-3 border-2 border-outline-variant/30 text-on-surface rounded-xl font-bold hover:bg-surface-container-low transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>
            </article>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}

