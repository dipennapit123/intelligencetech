import { Skeleton } from "@/components/ui/Skeleton";

export function FeaturedProductSkeleton() {
  return (
    <section className="py-36 px-8">
      <div className="max-w-screen-2xl mx-auto bg-[#14213d] rounded-[2.5rem] p-12 md:p-20 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <Skeleton className="h-5 w-36 !bg-white/10" />
            <div className="space-y-3">
              <Skeleton className="h-14 w-full !bg-white/10" />
              <Skeleton className="h-14 w-[60%] !bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-full !bg-white/10" />
              <Skeleton className="h-5 w-[85%] !bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <Skeleton className="h-8 w-20 mb-2 !bg-white/10" />
                <Skeleton className="h-3 w-32 !bg-white/10" />
              </div>
              <div>
                <Skeleton className="h-8 w-16 mb-2 !bg-white/10" />
                <Skeleton className="h-3 w-28 !bg-white/10" />
              </div>
            </div>
            <Skeleton className="h-14 w-44 rounded-xl !bg-white/10" />
          </div>
          <div className="w-full lg:w-1/2">
            <Skeleton className="aspect-video rounded-2xl !bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
