import { getBaseUrl } from "@/lib/baseUrl";

export async function fetchSiteContent<T = Record<string, unknown>>(
  key: string,
): Promise<T | null> {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/site-content?key=${key}`, {
      /** Invalidated when admin saves via `revalidateTag("site-content")` (see admin site-content PUT). */
      next: { tags: ["site-content"], revalidate: 86_400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.value as T) ?? null;
  } catch {
    return null;
  }
}

export async function fetchProducts(opts?: { featured?: boolean }) {
  try {
    const baseUrl = await getBaseUrl();
    const qs = opts?.featured ? "?featured=true" : "";
    const res = await fetch(`${baseUrl}/api/products${qs}`, {
      next: { tags: ["products"], revalidate: 86_400 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json?.products ?? [];
  } catch {
    return [];
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      next: { tags: ["products"], revalidate: 86_400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.product ?? null;
  } catch {
    return null;
  }
}
