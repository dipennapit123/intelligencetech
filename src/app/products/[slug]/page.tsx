import Link from "next/link";

import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { fetchProductBySlug } from "@/lib/fetchContent";

export const revalidate = 300;

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  logo_url: string | null;
  icon?: string;
  page_content?: Record<string, unknown>;
  created_at: string;
};

const FALLBACK_BY_SLUG: Record<string, Product> = {
  scalewise: { id: "demo-scalewise", name: "ScaleWise", slug: "scalewise", description: "Autonomous resource scaling for distributed infrastructures.", category: "Platform", status: "active", logo_url: null, created_at: new Date().toISOString() },
  omnigraph: { id: "demo-omnigraph", name: "OmniGraph", slug: "omnigraph", description: "Relational data visualization for complex ecosystems.", category: "Platform", status: "active", logo_url: null, created_at: new Date().toISOString() },
  flowgenie: { id: "demo-flowgenie", name: "FlowGenie", slug: "flowgenie", description: "Generative automation for repetitive operational tasks.", category: "Platform", status: "active", logo_url: null, created_at: new Date().toISOString() },
  neuralhub: { id: "demo-neuralhub", name: "NeuralHub", slug: "neuralhub", description: "Centralized intelligence repository for shared team learning.", category: "Platform", status: "active", logo_url: null, created_at: new Date().toISOString() },
};

export default async function ProductDetailPage(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;

  const apiProduct = await fetchProductBySlug(slug);
  const product: Product | null = apiProduct ?? FALLBACK_BY_SLUG[slug] ?? null;

  if (!product) {
    return (
      <div className="px-8 py-24">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-3xl tracking-tight text-on-surface">
            Product not found
          </h1>
          <p className="mt-4 text-on-surface-variant">
            The product you&apos;re looking for doesn&apos;t exist yet.
          </p>
          <div className="mt-8">
            <Link
              className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:scale-102 transition-transform shadow-lg"
              href="/products"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductDetailClient
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          category: product.category,
          status: product.status,
        }}
        pageContent={product.page_content}
      />
    </div>
  );
}
