import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Ecosystem",
  description: "How Intelligence Tech products work together.",
};

export default function EcosystemPage() {
  return (
    <div className="bg-it-bg">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">Ecosystem</h1>
        <p className="mt-3 max-w-2xl text-it-text/80">
          A modular architecture that keeps products independent while sharing a
          consistent design system and centralized API surface.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="font-semibold">Consistent UI</div>
            <p className="mt-2 text-sm text-it-text/80">
              Tailwind-based design tokens and shared UX patterns.
            </p>
          </Card>
          <Card className="p-6">
            <div className="font-semibold">Central API</div>
            <p className="mt-2 text-sm text-it-text/80">
              All writes go through the main website API for security and
              auditing.
            </p>
          </Card>
          <Card className="p-6">
            <div className="font-semibold">Supabase</div>
            <p className="mt-2 text-sm text-it-text/80">
              Shared auth, database, and storage—cleanly abstracted behind the
              API layer.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

