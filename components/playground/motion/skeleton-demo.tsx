"use client";

import * as React from "react";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Avatar } from "@/components/ui/avatar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { IconMapPin, IconSailboat2 } from "@tabler/icons-react";

export function SkeletonDemo() {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="grid w-full max-w-sm gap-3" data-testid="skeleton-demo" data-loaded={loaded}>
      <div className="order-last flex justify-center">
        <Field orientation="horizontal" className="w-auto items-center gap-2">
          <FieldLabel className="text-xs" htmlFor="skeleton-loaded">
            Loaded
          </FieldLabel>
          <Switch id="skeleton-loaded" checked={loaded} onCheckedChange={setLoaded} data-testid="skeleton-loaded" />
        </Field>
      </div>

      <div
        className={cn(
          "relative min-h-[13.5rem] overflow-hidden rounded-2xl border squircle",
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
              <IconSailboat2 className="size-6 fill-muted" />
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">HMS Surprise</p>
              <Marker className="text-xs">
                <MarkerIcon>
                  <IconMapPin />
                </MarkerIcon>
                <MarkerContent>Maritime Museum of San Diego</MarkerContent>
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
