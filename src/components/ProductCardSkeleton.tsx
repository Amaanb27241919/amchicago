import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="group">
      {/* Image skeleton */}
      <div className="relative aspect-[3/4] mb-3 sm:mb-4 overflow-hidden rounded-xl bg-secondary">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        
        {/* Price */}
        <Skeleton className="h-5 w-1/4" />
        
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};
