import { Skeleton } from "@/components/ui/Skeleton";

export function EcosystemSkeleton() {
  return (
    <section className="py-28 px-8 overflow-hidden bg-surface">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-2/5 order-2 md:order-1">
            <div className="w-full aspect-square flex items-center justify-center">
              <div className="relative w-80 h-80">
                <Skeleton className="absolute inset-0 m-auto w-24 h-24 rounded-2xl" />
                <Skeleton className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl" />
                <Skeleton className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-xl" />
                <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-xl" />
                <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-xl" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/5 order-1 md:order-2 space-y-8">
            <Skeleton className="h-4 w-28" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-[70%]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[95%]" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
            <div className="space-y-5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Skeleton className="w-6 h-6 rounded-full shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
