"use client";

import * as React from "react";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { PixelRedoIcon } from "@/components/icons-pixel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonDemo() {
  const [replayKey, setReplayKey] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 4000);
    return () => window.clearTimeout(timeout);
  }, [replayKey]);

  const replay = React.useCallback(() => {
    setLoaded(false);
    setReplayKey((key) => key + 1);
  }, []);

  return (
    <div className="grid w-full max-w-sm gap-3" data-testid="skeleton-demo" data-loaded={loaded}>
      <div className="order-last flex justify-center">
        <Button variant="outline" rounded onClick={replay} data-testid="skeleton-replay">
          Reload
          <PixelRedoIcon data-icon="inline-end" />
        </Button>
      </div>

      <div
        className={cn(
          "squircle relative min-h-[13.5rem] overflow-hidden rounded-2xl border",
          "ring-4 transition-[opacity,border-color] duration-500 ease-out",
          loaded ? "pointer-events-none border-success-primary bg-card ring-success-primary/20" : "border-dashed bg-card/50 ring-border/20"
        )}
        aria-live="polite"
        data-testid="skeleton-frame"
      >
        <div
          aria-hidden={loaded}
          data-testid="skeleton-loading"
          className={cn(
            "absolute inset-0 grid gap-4 p-4",
            "[transition:inherit]",
            loaded ? "pointer-events-none opacity-0" : "border-dashed opacity-100"
          )}
        >
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>

        <div
          aria-hidden={!loaded}
          data-testid="skeleton-content"
          className={cn(
            "absolute inset-0 grid gap-4 p-4 transition-opacity duration-500 ease-out",
            loaded ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar className="size-10 rounded-md">
              <AvatarImage src="/assets/unused/bob.png" alt="Robert Weisbecker" />
              <AvatarFallback>RW</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Bob Weisbecker</p>
              <Marker className="text-xs">
                <MarkerContent>San Diego, CA</MarkerContent>
              </Marker>
            </div>
          </div>
          <div className="grid h-28 rounded-xl p-0">
            <div>
              <p className="mt-1 line-clamp-5 text-sm text-muted-foreground">
                Ipsum officia sit eu velit irure ullamco magna qui occaecat id. Incididunt proident exercitation culpa dolore officia sunt
                aliquip minim anim aliqua non quis Lorem irure esse. Occaecat dolore irure dolor elit aliqua ea duis aliquip irure officia
                enim deserunt adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
