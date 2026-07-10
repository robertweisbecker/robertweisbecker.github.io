import { Favicon } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

export function BrowserFramePreview() {
  return (
    <div className="min-h-44 bg-background p-4 text-sm">
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2 font-medium">
            <Favicon className="size-4" />
            Studio
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Skeleton className="h-2.5 w-12" />
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-2.5 w-10" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_0.72fr]">
          <div className="space-y-3 rounded-lg border border-border/60 bg-card p-3">
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-5/6" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <Skeleton className="mb-3 h-2.5 w-20" />
              <div className="space-y-2">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-4/5" />
                <Skeleton className="h-2 w-2/3" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
