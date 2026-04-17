import { Skeleton } from "@/components/ui/Skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden pt-28 pb-36 px-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-20">
        <div className="w-full md:w-1/2 space-y-10">
          <Skeleton className="h-8 w-40 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-[80%]" />
            <Skeleton className="h-16 w-[60%]" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-full max-w-lg" />
            <Skeleton className="h-5 w-[90%] max-w-lg" />
            <Skeleton className="h-5 w-[70%] max-w-lg" />
          </div>
          <div className="flex items-center gap-5 pt-2">
            <Skeleton className="h-14 w-48 rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-xl" />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <Skeleton className="aspect-square rounded-[3rem]" />
        </div>
      </div>
    </section>
  );
}
