import { cn } from "@/lib/utils";

/**
 * Skeleton component for loading states
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-800/50", className)}
      {...props}
    />
  );
}

/**
 * Article card skeleton for loading state
 */
export function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col border border-zinc-800 p-4 rounded-lg space-y-3",
        className,
      )}
    >
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/2 mt-2" />
    </div>
  );
}

/**
 * Header skeleton for loading state
 */
export function HeaderSkeleton({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex flex-col items-center mb-20 md:mb-20 space-y-6",
        className,
      )}
    >
      <Skeleton className="w-[150px] h-[150px] rounded-full" />
      <div className="space-y-3 text-center">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
    </header>
  );
}

/**
 * Resources section skeleton
 */
export function ResourcesSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="text-center space-y-3">
        <Skeleton className="h-6 w-48 mx-auto" />
        <Skeleton className="h-4 w-80 mx-auto" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
