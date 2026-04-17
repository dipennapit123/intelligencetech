import { Skeleton } from "@/components/ui/Skeleton";

export function AboutSkeleton() {
  return (
    <section className="py-28 px-8 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 items-start">
          <div className="space-y-7 max-w-2xl">
            <Skeleton className="h-4 w-28" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-[85%]" />
              <Skeleton className="h-12 w-[60%]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[92%]" />
              <Skeleton className="h-5 w-[70%]" />
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-36 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10"
              >
                <div className="flex items-start gap-5">
                  <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[85%]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-14 border-t border-outline-variant/20">
          <Skeleton className="h-10 w-64 mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-10 w-24 mx-auto mb-2" />
                <Skeleton className="h-3 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

