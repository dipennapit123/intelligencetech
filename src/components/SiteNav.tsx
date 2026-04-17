import Link from "next/link";

import { Button } from "@/components/ui/Button";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-it-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-it-accent text-it-black">
            IT
          </span>
          <span className="text-it-text">Intelligence Tech</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-it-text/80 hover:text-it-text" href="/products">
            Products
          </Link>
          <Link className="text-it-text/80 hover:text-it-text" href="/ecosystem">
            Ecosystem
          </Link>
          <Link className="text-it-text/80 hover:text-it-text" href="/updates">
            Updates
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/blog" variant="secondary" size="sm">
            Blog
          </Button>
          <Button href="/products" size="sm">
            Explore
          </Button>
        </div>
      </div>
    </header>
  );
}

