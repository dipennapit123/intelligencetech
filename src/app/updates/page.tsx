import Link from "next/link";

import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Updates",
  description: "Product and platform updates from Intelligence Tech.",
};

export default function UpdatesPage() {
  return (
    <div className="bg-it-section">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Updates</h1>
        <p className="mt-3 max-w-2xl text-it-text/80">
          Highlights across the ecosystem. For deep dives, browse the{" "}
          <Link className="underline underline-offset-4" href="/blog">
            blog
          </Link>
          .
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-xs font-medium text-it-text/60">Platform</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              Centralized API layer is live
            </div>
            <p className="mt-2 text-sm text-it-text/80">
              All admin operations now flow through the main website API with
              Supabase-authenticated requests.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-xs font-medium text-it-text/60">Content</div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              Blog system ready for SEO growth
            </div>
            <p className="mt-2 text-sm text-it-text/80">
              Clean URLs, dynamic metadata, semantic markup, and fast ISR.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

