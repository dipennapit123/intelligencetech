import { Skeleton } from "@/components/ui/Skeleton";

export function ProductGridSkeleton() {
  return (
    <section className="py-28 bg-surface-container-low px-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <Skeleton className="h-4 w-28 mb-4" />
          <Skeleton className="h-10 w-52" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/10"
            >
              <Skeleton className="w-14 h-14 rounded-xl mb-6" />
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
