"use client";

import Link from "next/link";

type Product = { id: string; name: string; slug: string; description: string };

export function ProductGridClient({
  products,
}: {
  products: Product[];
}) {
  const iconBySlug: Record<string, { icon: string; isSecondary: boolean }> = {
    scalewise: { icon: "trending_up", isSecondary: false },
    omnigraph: { icon: "hub", isSecondary: true },
    flowgenie: { icon: "auto_fix_high", isSecondary: false },
    neuralhub: { icon: "psychology", isSecondary: true },
  };

  const base = products.length ? products : [];
  const longList: Product[] = Array.from({ length: 18 }).flatMap((_, i) =>
    base.map((p) => ({
      ...p,
      id: `${p.id}__${i}`,
    })),
  );
  const track = [...longList, ...longList];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max gap-4 pr-4 will-change-transform hover:[animation-play-state:paused]"
        style={{ animation: "marquee-left 420s linear infinite" }}
        aria-label="Product marquee"
      >
        {track.map((p, idx) => {
          const meta = iconBySlug[p.slug] ?? { icon: "apps", isSecondary: false };
          const boxClass = meta.isSecondary
            ? "bg-secondary-container/25 group-hover:bg-secondary-container"
            : "bg-primary-container/25 group-hover:bg-primary-container";
          const iconClass = meta.isSecondary
            ? "text-secondary group-hover:text-on-secondary"
            : "text-primary group-hover:text-on-primary";

          return (
            <Link
              key={`${p.id}__track_${idx}`}
              href={`/products/${p.slug}`}
              className="group shrink-0 bg-surface border border-outline-variant/10 rounded-2xl px-4 py-4 hover:shadow-lg hover:border-outline-variant/25 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 ${boxClass} rounded-xl flex items-center justify-center transition-colors`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${iconClass}`}>
                    {meta.icon}
                  </span>
                </div>
                <div className="min-w-[160px] max-w-[180px]">
                  <div className="text-[15px] text-on-surface tracking-normal leading-snug">
                    {p.name}
                  </div>
                  <div className="mt-1 text-[12px] text-on-surface-variant leading-snug line-clamp-2">
                    {p.description}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/80 to-transparent" />
    </div>
  );
}

