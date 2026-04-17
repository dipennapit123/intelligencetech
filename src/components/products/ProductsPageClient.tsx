"use client";

import Link from "next/link";
import { FadeUp, FadeIn, SlideInLeft, SlideInRight, ScaleIn } from "@/components/motion/AnimatedSection";
import { ProductGridClient } from "@/components/home/ProductGridClient";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  logo_url: string | null;
  created_at: string;
};

function productThumbnail(slug: string) {
  switch (slug) {
    case "scalewise":
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuAeAxcu6zyY4OgnsBKQchFs49w4k5T9vYrqxbmCPcEweuduRZGEBfQLzaGdtlw9OoUnPiYkgAL_wIPti4nbH2BdQ1lGZvVnd_nPGN9C9gLndjT55yMtxfhSAL1-j94DfHj0InrlnYginkK6viW8ir0H31Vigrv8buTJJHBLW5BTndEyyCagpdKjK-ezWVfK19y89vSlr2tMbYyhr2tat9cNaYAw4P79XUXSZ0LD9sXTMBil2OzUFSJY7vuyt9iBNvB1AJR413l7pxgj";
    case "omnigraph":
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE";
    case "flowgenie":
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z";
    case "neuralhub":
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCmfGDmqaPVSrOSA_EqIOHNmrRbUJuvUgy8g2XA9qFl_bBNgdZShAjAfdlC79Y4y801s4SqLV4jcLd1akKDWzqx0sOK0n0nqjT16qM_M0IYsKAzb_N9OsvK1HjNrsCFn1bAiqvuRgWfnUfccvtgz9US3v0szIEG8C4hkhoKqbpBDz-fR_-LTVh3Mmy1e73mYsZAZhGEb2Gp_InK_U-PvhPv__-bQ-jG4m0MweM-vO9htj155qxilzRi890lzlrputn6i3jVcBnlCqD9";
    default:
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuBkalvA6GRwcBvCpx6uBLv7eYC4BGswnZWXe0L6eKMQbkLcPQx5J0yFhQ2efSql_iu67jj1Eedk6ZHWQggBVmCXM-ytMU54hVhllJgt2N2uZpby6nRbiHDYRTmY3akLkhNIoG1a9FurzeDOeayf-FEJBpZXQZ_pLiN-J0SBt_FJDl8AGGJueO-2r-3p2S0rmDVIpjCp2E0cgRQKZhMHT8I8KLncTlGohocC-ThCbJvjG8YkLjjJIoQsVl-zRuQ-Yf2Uw3CqZbJwes5H";
  }
}

function productTagline(slug: string) {
  switch (slug) {
    case "scalewise":
      return "Autonomous Scaling for Modern Infrastructure.";
    case "omnigraph":
      return "Relational Visualization for Complex Ecosystems.";
    case "flowgenie":
      return "Generative Automation for Operational Tasks.";
    case "neuralhub":
      return "Central Intelligence Repository for Teams.";
    default:
      return "Intelligence Tech Ecosystem Product.";
  }
}

function productDescription(slug: string) {
  switch (slug) {
    case "scalewise":
      return "Predict load, optimize resources, and scale your infrastructure with zero manual intervention. Built on our proprietary Neural Engine, ScaleWise learns your application\u2019s unique patterns and scales proactively \u2014 saving up to 40% on cloud spend while guaranteeing 99.99% uptime.";
    case "omnigraph":
      return "Map and explore the hidden relationships across your entire data ecosystem. OmniGraph transforms complex relational data into intuitive, interactive visualizations \u2014 helping teams uncover dependencies, trace lineage, and make better decisions at every layer of the stack.";
    case "flowgenie":
      return "Eliminate repetitive operational overhead with AI-generated workflows. FlowGenie watches how your team works, identifies recurring patterns, and builds automated pipelines that execute tasks in seconds \u2014 from incident triage to deployment rollbacks.";
    case "neuralhub":
      return "A shared intelligence layer that captures, organizes, and surfaces institutional knowledge across your entire organization. NeuralHub connects siloed teams through a unified learning repository powered by contextual AI \u2014 so every decision is informed by collective wisdom.";
    default:
      return "A product built for modern teams, designed to streamline workflows, improve visibility, and help teams ship faster with a cohesive intelligence layer.";
  }
}

export function ProductsPageClient({
  featured,
  otherProducts,
}: {
  featured: Product[];
  otherProducts: Product[];
}) {
  return (
    <div>
      {/* Page header — white */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-12 px-4 sm:px-6 md:px-8 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-primary font-bold tracking-widest text-[0.6875rem] uppercase block mb-4">
              Core Platform
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
              Our Products
            </h1>
            <p className="mt-4 max-w-2xl text-on-surface-variant text-lg">
              A growing ecosystem of SaaS products designed to work together.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured products — alternating white / grey with animations */}
      {featured.map((p, idx) => {
        const imageFirst = idx % 2 !== 0;
        const isGrey = idx % 2 !== 0;

        const TextColumn = imageFirst ? SlideInRight : SlideInLeft;
        const ImageColumn = imageFirst ? SlideInLeft : SlideInRight;

        return (
          <section
            key={p.id}
            className={`px-4 sm:px-6 md:px-8 py-14 sm:py-16 md:py-24 ${isGrey ? "bg-surface-container-low" : "bg-surface"}`}
          >
            <div
              className={`max-w-screen-xl mx-auto grid gap-10 sm:gap-12 lg:gap-16 items-center ${
                imageFirst ? "lg:grid-cols-[380px_1fr]" : "lg:grid-cols-[1fr_380px]"
              }`}
            >
              {/* Text column */}
              <TextColumn className={`space-y-5 ${imageFirst ? "lg:order-2" : ""}`}>
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-on-surface-variant">
                      Featured Product
                    </span>
                  </div>
                </FadeIn>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-on-surface">
                  {p.name}
                  <span className="text-primary">.</span>
                </h2>
                <p className="text-lg font-medium text-on-surface">
                  {productTagline(p.slug)}
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  {productDescription(p.slug)}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/products/${p.slug}`}
                    className="px-6 py-3 bg-gradient-to-br from-[#14213d] to-[#fca311] text-on-primary rounded-xl font-bold hover:scale-[1.02] transition-all duration-500 shadow-lg shadow-primary/15"
                  >
                    View Product Page
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-outline-variant/30 text-on-surface rounded-xl font-bold hover:bg-surface-container-low transition-colors"
                  >
                    Book a Demo
                  </Link>
                </div>
              </TextColumn>

              {/* Image column */}
              <ImageColumn className={`relative ${imageFirst ? "lg:order-1" : ""}`}>
                <ScaleIn>
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-3xl -z-10" />
                  <div className="p-3 rounded-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={`${p.name} preview`}
                      className="rounded-xl w-full shadow-2xl"
                      src={productThumbnail(p.slug)}
                    />
                  </div>
                </ScaleIn>
              </ImageColumn>
            </div>
          </section>
        );
      })}

      {/* Other products (marquee) — white */}
      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <FadeUp className="mb-10">
            <span className="text-primary font-bold tracking-widest text-[0.6875rem] uppercase block mb-3">
              More Products
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
              Products we&apos;ve built
            </h2>
            <p className="mt-3 text-on-surface-variant max-w-xl">
              Beyond our flagship products, we&apos;re building tools for every layer of the modern tech stack.
            </p>
          </FadeUp>
          <FadeIn>
            <ProductGridClient products={otherProducts} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
