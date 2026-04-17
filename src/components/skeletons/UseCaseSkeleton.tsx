import { Skeleton } from "@/components/ui/Skeleton";

export function UseCaseSkeleton() {
  return (
    <section className="py-28 px-8 bg-surface-container-high/30">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-12 w-72 mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-[75%] mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-surface p-14">
              <Skeleton className="w-12 h-12 rounded-lg mb-8" />
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[70%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
