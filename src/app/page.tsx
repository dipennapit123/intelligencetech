import { Suspense } from "react";

import { HeroSection, HeroData } from "@/components/home/HeroSection";
import { AboutSection, AboutData } from "@/components/home/AboutSection";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { UseCaseSection } from "@/components/home/UseCaseSection";
import { FeaturedProductSection } from "@/components/home/FeaturedProductSection";
import { ProductGridClient } from "@/components/home/ProductGridClient";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { ProductGridSkeleton } from "@/components/skeletons/ProductGridSkeleton";
import { AboutSkeleton } from "@/components/skeletons/AboutSkeleton";
import { EcosystemSkeleton } from "@/components/skeletons/EcosystemSkeleton";
import { UseCaseSkeleton } from "@/components/skeletons/UseCaseSkeleton";
import { FeaturedProductSkeleton } from "@/components/skeletons/FeaturedProductSkeleton";
import { fetchSiteContent, fetchProducts } from "@/lib/fetchContent";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroLoader />
      </Suspense>
      <Suspense fallback={<AboutSkeleton />}>
        <AboutLoader />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeProductGrid />
      </Suspense>
      <Suspense fallback={<EcosystemSkeleton />}>
        <EcosystemSection />
      </Suspense>
      <Suspense fallback={<UseCaseSkeleton />}>
        <UseCaseSection />
      </Suspense>
      <Suspense fallback={<FeaturedProductSkeleton />}>
        <FeaturedProductSection />
      </Suspense>
    </main>
  );
}

async function HeroLoader() {
  const data = await fetchSiteContent<HeroData>("hero");
  return <HeroSection data={data} />;
}

async function AboutLoader() {
  const data = await fetchSiteContent<AboutData>("about");
  return <AboutSection data={data} />;
}

async function HomeProductGrid() {
  const fallbackProducts = [
    { id: "demo-scalewise", name: "ScaleWise", slug: "scalewise", description: "Autonomous resource scaling for distributed infrastructures." },
    { id: "demo-omnigraph", name: "OmniGraph", slug: "omnigraph", description: "Relational data visualization for complex ecosystems." },
    { id: "demo-flowgenie", name: "FlowGenie", slug: "flowgenie", description: "Generative automation for repetitive operational tasks." },
    { id: "demo-neuralhub", name: "NeuralHub", slug: "neuralhub", description: "Centralized intelligence repository for shared team learning." },
  ];

  const apiProducts = await fetchProducts({ featured: true });
  const products = apiProducts.length > 0
    ? apiProducts.slice(0, 4).map((p: Record<string, string>) => ({ id: p.id, name: p.name, slug: p.slug, description: p.description }))
    : fallbackProducts;

  return (
    <section className="py-28 bg-surface-container-low px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <span className="text-primary tracking-widest text-xs uppercase block mb-4">
            Core Platform
          </span>
          <h2 className="text-4xl tracking-tight text-on-surface">
            Our Products
          </h2>
        </div>
        <ProductGridClient products={products} />
      </div>
    </section>
  );
}
