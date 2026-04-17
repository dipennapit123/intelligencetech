"use client";

import Link from "next/link";
import { FadeUp, SlideInLeft, SlideInRight, ScaleIn, StaggerContainer, StaggerItem } from "@/components/motion/AnimatedSection";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: string;
  status?: string;
};

type PageContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  heroCopy: string;
  heroImage: string;
  benefits: Array<{ icon: string; title: string; desc: string }>;
  deepDive: Array<{
    eyebrow: string;
    title: string;
    copy: string;
    bullets?: string[];
    link?: { label: string; href: string };
    image: string;
    imageStyle: "card" | "circle";
    bgTinted: boolean;
    layout: "image-left" | "image-right";
  }>;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  integrity?: Array<{ icon: string; title: string; desc: string }>;
  cta?: {
    heading: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
};

const CLOUD_LOGOS = [
  { name: "AWS", height: "h-8", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzwtLbrNIZYrnTqG4iHUJOQaQU-1cRbxD44IcbwWqEzhQe1rckgAvbsB_Csxhmyke9JyjakuiFPTJLBhPe46ryFSh9NdR_5DDqyg87KUc2PLFQ3TLjS7rN_BmYpGXxaxOiG3ZdcjECNzlFdtwGWGs5VhJkO54zNxgh-K7esrwo6eRdxq7KstwCTDW1feeJbKdrgS00L6mEJ_4IF5F7PLngoo_0qOwzRLEA7bu5UI-ngnEc2ol6ICOpLPxiQ3Nfc79nQbTA3SjqUU54" },
  { name: "Azure", height: "h-8", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebZQElng8CS0i-0o158WgDXal-mHMEI5oyVWFIDdQjtw9kS5j1my-PVrZLvyqG42dGam5KgBySLKVNejzPutVcQWLP55lxhrpzi_jIyOIajKUogkD23MMiTmEBKpPUb23IkxBtH2ZXGnmBnZ_L5kBZtlCp7nHcpXXipsBy5den4O5XAyBOU7e-T6i85SL6GHwii6y5Oi5lW2ZstmPGgKrocuWXOAcDHNtKktG53k3MhEfGPMWB4yrfSuR2mVUmjunrdkxeH8htlrR" },
  { name: "Kubernetes", height: "h-10", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpBSqCOGRomwrkVY0cfOxIeaIBDIL_gY30YZs179XHZHV9rt9I4jeWS2nxhfq3XTygy1Zzxvgy6csDYSnJAFxC2lDnITPjD1_d5pLfkAQHKuqRNBoikWyz1frv3uZK7Fg7cFI9vpG1TJflCFYr50nZdNgdrUjxMrL6sp0OQSTHnYrAaN_3hSsP4IxroFFu-FZCZ1_sliFv2c693fukVplazzUl9vrC4trr9VHNl__6cNhHOc6oSJKj2hHuWPJCBWhrGIP4om3xEgIZ" },
  { name: "Docker", height: "h-10", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgNY1yKL9bEDYyBfU9-OaWBi-Ze6CqSz20HJWoGJSgF48OfHLogoH7YMpIQMg2LTLKCq_Dw9FyKuocJ5tVEgomf4-eCSn6cyPWlCMatowA3UXFwECB8Ri1EOYGtQkFiuxkLhVdpvBgaK5MoWfq63DL37GMIxLzfaOk8uLVyqIJEK1zJ7qvJTSG8IGCGsbS1EP4f14E2HfCN-U5rswRwSH5Atw9rRxXk6hwOSkJP2uPkanxaXUtVQH7aCUEo8W6oc_imxwRbmgdk7kR" },
  { name: "GCP", height: "h-8", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhLxnspFc3Ft2uDaHu9mEHZU_tRd8vZDtwzBkvaYaZKUTq4CAZPpg6WPGmbVkOJqnxVkNDnPCXdIDYpCVfSG_wz1sdlSO88aDNI20IoxGoPtlHx-mmLqEfGXpPBetDcUSPFfwJZwB4EFW4boTq54HlwfVyx9KQvNv-ccTB9NR81t_qoBBTJ7Qyp5gh0XINULAynZokhLVQwi9oETRZ8K3iKkV4rZZdNtOJPS4qjn7pfKKcmCyyAc65Q7M4D3qEAIz9h3t4XArJtWzy" },
];

function safeContent(slug: string, fallbackName: string, pageContent?: Record<string, unknown>): PageContent {
  if (pageContent && Object.keys(pageContent).length > 0) {
    return pageContent as unknown as PageContent;
  }

  return {
    eyebrow: "Intelligence Ecosystem Product",
    headline: fallbackName,
    subhead: "A product built for modern teams.",
    heroCopy:
      "An Intelligence Tech product designed to streamline workflows, improve visibility, and help teams ship faster — with a cohesive intelligence layer.",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z",
    benefits: [
      { icon: "bolt", title: "Fast Setup", desc: "Get started quickly with sensible defaults and clean UX." },
      { icon: "security", title: "Secure by Design", desc: "Enterprise-grade guardrails with a modern security posture." },
      { icon: "api", title: "Extensible", desc: "Integrate into your stack via flexible APIs and workflows." },
    ],
    deepDive: [
      {
        eyebrow: "Capability",
        title: "Built for Scale",
        copy: "Designed to grow with your team — from first users to global operations.",
        bullets: ["Production-ready architecture", "Observability-first workflows"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE",
        imageStyle: "card" as const,
        bgTinted: true,
        layout: "image-left" as const,
      },
    ],
  };
}

export function ProductDetailClient({
  product,
  pageContent,
}: {
  product: Product;
  pageContent?: Record<string, unknown>;
}) {
  const c = safeContent(product.slug, product.name, pageContent);

  const testimonial = c.testimonial ?? {
    quote: `${product.name} didn't just save us money on our AWS bill; it gave our engineering team back 15 hours a week. It's the silent architect every high-growth startup needs.`,
    author: "Marcus Thorne",
    role: "CTO, NexaGen Labs",
  };

  const integrity = c.integrity ?? [
    { icon: "verified_user", title: "SOC2 Type II", desc: "Fully compliant with the highest industry security standards." },
    { icon: "update", title: "99.99% Uptime", desc: "Guaranteed reliability with our premium service level agreement." },
    { icon: "api", title: "REST & GraphQL", desc: "Deeply extensible API architecture for custom workflows." },
    { icon: "lock", title: "End-to-End Encryption", desc: "Your infrastructure metadata is encrypted in transit and at rest." },
  ];

  const cta = c.cta ?? {
    heading: "Ready to scale?",
    body: `Join 2,000+ companies optimizing their infrastructure with the intelligence of ${product.name}.`,
    buttonLabel: "Start Your Free Trial",
    buttonHref: "/products",
  };

  return (
    <main className="pt-24 overflow-x-hidden font-body">
      {/* Hero */}
      <section className="relative min-h-[921px] flex items-center px-6 md:px-12 max-w-[1440px] mx-auto py-20 bg-surface">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp className="space-y-8 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">
                {c.eyebrow}
              </span>
            </div>
            <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tight leading-[1.05] text-on-surface">
              {c.headline}<span className="text-primary">.</span>
            </h1>
            <h2 className="text-3xl font-bold text-on-surface tracking-tight">{c.subhead}</h2>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-light">{c.heroCopy}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products" className="px-8 py-4 bg-gradient-to-br from-[#855300] to-[#fca311] text-on-primary rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-primary/20">
                Get Started
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-outline-variant/30 text-on-surface rounded-xl font-bold text-lg hover:bg-surface-container-low transition-colors">
                Book a Demo
              </Link>
            </div>
          </FadeUp>
          <ScaleIn className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-700" />
            <div className="bg-surface-container-lowest p-4 rounded-[2rem] shadow-2xl border border-outline-variant/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={`${product.name} Dashboard UI`} className="rounded-xl w-full" src={c.heroImage} />
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <StaggerContainer className="grid md:grid-cols-3 gap-12 lg:gap-24">
            {c.benefits.map((b) => (
              <StaggerItem key={b.title} className="space-y-6 group">
                <div className="w-14 h-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-3xl">{b.icon}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{b.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{b.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Feature Deep Dive */}
      {c.deepDive.map((d, idx) => {
        const sectionTone = idx % 2 === 0 ? "bg-surface" : "bg-surface-container-low";
        const isImageLeft = d.layout === "image-left";

        const imageEl = d.imageStyle === "circle" ? (
          <div className="relative">
            <div className="aspect-square bg-surface-container-highest rounded-full overflow-hidden flex items-center justify-center p-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt={d.title} className="w-full grayscale opacity-50 contrast-125" src={d.image} />
            </div>
          </div>
        ) : (
          <div className="bg-surface rounded-3xl p-12 shadow-inner border border-outline-variant/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={d.title} className="w-full mix-blend-multiply opacity-80" src={d.image} />
          </div>
        );

        const textEl = (
          <div className="space-y-8">
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary">{d.eyebrow}</span>
            <h2 className="text-5xl font-black tracking-tighter leading-tight text-on-surface">{d.title}</h2>
            <p className="text-xl text-on-surface-variant font-light leading-relaxed">{d.copy}</p>
            {d.bullets ? (
              <ul className="space-y-4">
                {d.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3 font-medium">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            {d.link ? (
              <div className="pt-6">
                <Link href={d.link.href} className="inline-flex items-center gap-2 text-primary font-bold group/link">
                  {d.link.label}
                  <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
              </div>
            ) : null}
          </div>
        );

        return (
          <section key={d.title} className={`${sectionTone} py-32`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
              {isImageLeft ? (
                <>
                  <SlideInLeft className="relative order-2 lg:order-1">{imageEl}</SlideInLeft>
                  <SlideInRight className="order-1 lg:order-2">{textEl}</SlideInRight>
                </>
              ) : (
                <>
                  <SlideInLeft>{textEl}</SlideInLeft>
                  <SlideInRight className="relative">{imageEl}</SlideInRight>
                </>
              )}
            </div>
          </section>
        );
      })}

      {/* Enterprise-Grade Integrity */}
      <section className="py-32 px-6 md:px-12 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp className="flex flex-col items-center text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tighter">Enterprise-Grade Integrity</h2>
            <div className="w-24 h-1 bg-primary-container" />
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {integrity.map((s) => (
              <StaggerItem key={s.title} className="p-8 bg-surface rounded-2xl text-center space-y-4">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">{s.icon}</span>
                <h4 className="font-bold text-lg">{s.title}</h4>
                <p className="text-sm text-on-surface-variant">{s.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeUp className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:opacity-80 transition-opacity">
            {CLOUD_LOGOS.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={logo.name} alt={logo.name} className={logo.height} src={logo.src} />
            ))}
          </FadeUp>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-on-background text-surface">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <span className="material-symbols-outlined text-primary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
          <p className="text-3xl md:text-5xl font-light italic leading-tight tracking-tight">
            &quot;{testimonial.quote}&quot;
          </p>
          <div className="space-y-2">
            <div className="text-xl font-bold text-primary-container">{testimonial.author}</div>
            <div className="text-surface-dim uppercase tracking-[0.2em] text-sm">{testimonial.role}</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 overflow-hidden bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 text-center space-y-12">
          <FadeUp>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface">{cta.heading}</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">{cta.body}</p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex justify-center">
            <Link href={cta.buttonHref} className="bg-[#FCA311] text-on-primary-container px-12 py-6 rounded-2xl font-black text-2xl hover:scale-110 transition-transform duration-300 shadow-2xl shadow-primary/30">
              {cta.buttonLabel}
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
