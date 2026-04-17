import { fetchProducts } from "@/lib/fetchContent";
import { ProductsPageClient } from "@/components/products/ProductsPageClient";

export const revalidate = 300;

export const metadata = {
  title: "Products",
  description: "Explore the Intelligence Tech SaaS ecosystem products.",
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  status: string;
  logo_url: string | null;
  icon?: string;
  featured?: boolean;
  featured_order?: number;
  created_at: string;
};

const FALLBACK_PRODUCTS: Product[] = [
  { id: "demo-scalewise", name: "ScaleWise", slug: "scalewise", description: "Autonomous resource scaling for distributed infrastructures.", category: "Platform", status: "active", logo_url: null, icon: "insights", featured: true, featured_order: 1, created_at: new Date().toISOString() },
  { id: "demo-omnigraph", name: "OmniGraph", slug: "omnigraph", description: "Relational data visualization for complex ecosystems.", category: "Platform", status: "active", logo_url: null, icon: "hub", featured: true, featured_order: 2, created_at: new Date().toISOString() },
  { id: "demo-flowgenie", name: "FlowGenie", slug: "flowgenie", description: "Generative automation for repetitive operational tasks.", category: "Platform", status: "active", logo_url: null, icon: "auto_fix_high", featured: true, featured_order: 3, created_at: new Date().toISOString() },
  { id: "demo-neuralhub", name: "NeuralHub", slug: "neuralhub", description: "Centralized intelligence repository for shared team learning.", category: "Platform", status: "active", logo_url: null, icon: "psychology", featured: true, featured_order: 4, created_at: new Date().toISOString() },
  { id: "demo-signalstack", name: "SignalStack", slug: "signalstack", description: "Event pipelines and alerting with unified intelligence routing.", category: "Platform", status: "beta", logo_url: null, created_at: new Date().toISOString() },
  { id: "demo-policyforge", name: "PolicyForge", slug: "policyforge", description: "Automated compliance checks and policy enforcement for teams.", category: "Security", status: "beta", logo_url: null, created_at: new Date().toISOString() },
  { id: "demo-omniops", name: "OmniOps", slug: "omniops", description: "Ops command center for incidents, runbooks, and on-call coordination.", category: "Operations", status: "beta", logo_url: null, created_at: new Date().toISOString() },
];

export default async function ProductsPage() {
  const apiProducts = await fetchProducts();
  const products: Product[] = apiProducts.length > 0 ? apiProducts : FALLBACK_PRODUCTS;

  const featured = products
    .filter((p) => p.featured)
    .sort((a, b) => (a.featured_order ?? 0) - (b.featured_order ?? 0));
  const otherProducts = products.filter((p) => !p.featured);

  return <ProductsPageClient featured={featured} otherProducts={otherProducts} />;
}
