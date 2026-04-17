"use client";

import Link from "next/link";
import { FadeUp, FadeIn, SlideInLeft, SlideInRight, ScaleIn, StaggerContainer, StaggerItem } from "@/components/motion/AnimatedSection";

type BlogCard = {
  id: string;
  title: string;
  slug: string;
  meta_description: string;
  featured_image: string | null;
  tags: string[];
  category: string | null;
  created_at: string;
};

export function BlogIndexClient({ blogs }: { blogs: BlogCard[] }) {
  const featured = blogs.slice(0, 4);
  const rest = blogs.slice(4);

  return (
    <main className="pt-24">
      {/* Header — white */}
      <section className="bg-surface">
        <div className="max-w-screen-2xl mx-auto px-8 pt-10 pb-10 md:pt-12 md:pb-12">
          <FadeUp className="space-y-5 max-w-3xl">
            <span className="text-primary font-bold tracking-widest text-[0.6875rem] uppercase block">
              Updates
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-on-surface">
              Blog<span className="text-primary">.</span>
            </h1>
            <p className="text-on-surface-variant leading-relaxed">
              Product updates, engineering notes, and platform learnings from the Intelligence Tech ecosystem.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured posts — alternating like Products */}
      {featured.map((b, idx) => {
        const imageFirst = idx % 2 !== 0;
        const isGrey = idx % 2 !== 0;
        const TextColumn = imageFirst ? SlideInRight : SlideInLeft;
        const ImageColumn = imageFirst ? SlideInLeft : SlideInRight;

        return (
          <section
            key={b.id}
            className={`px-8 py-14 md:py-18 ${isGrey ? "bg-surface-container-low" : "bg-surface"}`}
          >
            <div
              className={`max-w-screen-xl mx-auto grid gap-12 lg:gap-16 items-center ${
                imageFirst ? "md:grid-cols-[380px_1fr]" : "md:grid-cols-[1fr_380px]"
              }`}
            >
              <TextColumn className={`space-y-5 ${imageFirst ? "md:order-2" : ""}`}>
                <FadeIn>
                  <div className="text-primary font-bold tracking-widest text-[10px] uppercase">
                    {(b.category ?? "Updates").toString()}
                  </div>
                </FadeIn>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-on-surface">
                  {b.title}
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {b.meta_description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(b.tags ?? []).slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold tracking-widest uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-bold group/link"
                  >
                    Read article
                    <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </TextColumn>

              <ImageColumn className={`relative ${imageFirst ? "md:order-1" : ""}`}>
                <ScaleIn>
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-3xl -z-10" />
                  <div className="p-3 rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={b.title}
                      className="rounded-xl w-full shadow-2xl"
                      src={
                        b.featured_image ??
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLxnspFc3Ft2uDaHu9mEHZU_tRd8vZDtwzBkvaYaZKUTq4CAZPpg6WPGmbVkOJqnxVkNDnPCXdIDYpCVfSG_wz1sdlSO88aDNI20IoxGoPtlHx-mmLqEfGXpPBetDcUSPFfwJZwB4EFW4boTq54HlwfVyx9KQvNv-ccTB9NR81t_qoBBTJ7Qyp5gh0XINULAynZokhLVQwi9oETRZ8K3iKkV4rZZdNtOJPS4qjn7pfKKcmCyyAc65Q7M4D3qEAIz9h3t4XArJtWzy"
                      }
                    />
                  </div>
                </ScaleIn>
              </ImageColumn>
            </div>
          </section>
        );
      })}

      {/* More posts — grid */}
      {rest.length ? (
        <section className="bg-surface-container-low">
          <div className="max-w-screen-2xl mx-auto px-8 py-16 md:py-20">
            <FadeUp className="mb-10 max-w-2xl">
              <span className="text-primary font-bold tracking-widest text-[0.6875rem] uppercase block mb-3">
                More articles
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
                Latest posts
              </h2>
              <p className="mt-3 text-on-surface-variant">
                Design notes, engineering deep dives, and ecosystem updates — published regularly.
              </p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((b) => (
                <StaggerItem key={b.id}>
                  <Link
                    href={`/blog/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-surface rounded-2xl border border-outline-variant/15 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/5 blur-2xl" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={b.title}
                        className="h-44 w-full object-cover"
                        src={
                          b.featured_image ??
                          "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLxnspFc3Ft2uDaHu9mEHZU_tRd8vZDtwzBkvaYaZKUTq4CAZPpg6WPGmbVkOJqnxVkNDnPCXdIDYpCVfSG_wz1sdlSO88aDNI20IoxGoPtlHx-mmLqEfGXpPBetDcUSPFfwJZwB4EFW4boTq54HlwfVyx9KQvNv-ccTB9NR81t_qoBBTJ7Qyp5gh0XINULAynZokhLVQwi9oETRZ8K3iKkV4rZZdNtOJPS4qjn7pfKKcmCyyAc65Q7M4D3qEAIz9h3t4XArJtWzy"
                        }
                      />
                    </div>
                    <div className="p-8">
                    <div className="text-primary font-bold tracking-widest text-[10px] uppercase">
                      {(b.category ?? "Updates").toString()}
                    </div>
                    <h3 className="text-xl font-bold mt-3 mb-2 text-on-surface">
                      {b.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                      {b.meta_description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(b.tags ?? []).slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-[10px] font-bold tracking-widest uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      ) : null}
    </main>
  );
}

