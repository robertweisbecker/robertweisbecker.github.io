import * as React from "react";

import { cn } from "@/lib/utils";

function DescriptionList({ borderless = false, className, ...props }: React.ComponentProps<"dl"> & { borderless?: boolean }) {
  return (
    <dl
      data-slot="description-list"
      data-borderless={borderless}
      className={cn(
        "[--description-list-spacing:--spacing(3)]",
        "grid w-full grid-cols-1 text-sm sm:grid-cols-[min(33%,--spacing(60))_auto]",
        // hide borders on nested mobile lists
        "in-data-[slot=description-list]:[--description-list-spacing:--spacing(1.5)] in-data-[slot=description-list]:*:border-border/50 max-sm:in-data-[slot=description-list]:*:border-dotted max-sm:in-data-[slot=description-list]:[&_dt]:text-muted-foreground/72 max-sm:in-data-[slot=description-list]:[&_dt]:first:pt-2",
        borderless && "in-data-[slot=description-list]:*:border-none",
        className
      )}
      {...props}
    />
  );
}

function DescriptionListLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-list-label"
      className={cn(
        "col-start-1 border-t border-dotted pt-(--description-list-spacing) text-muted-foreground first:border-none not-in-data-[borderless=true]:first:pt-0 max-sm:pb-1 max-sm:text-xs sm:border-t sm:py-(--description-list-spacing)",
        className
      )}
      {...props}
    />
  );
}

function DescriptionListValue({
  orientation = "horizontal",
  className,
  ...props
}: React.ComponentProps<"dd"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <dd
      data-slot="description-list-value"
      data-orientation={orientation}
      className={cn(
        "flex flex-wrap gap-x-2 gap-y-3 border-dotted pt-1 pb-(--description-list-spacing) text-foreground nth-2:pt-0 sm:border-t sm:py-(--description-list-spacing) sm:nth-2:border-none",
        "in-data-[borderless=true]:border-none in-data-[borderless=true]:pb-2",
        "has-data-[slot=description-list]:pb-1.5",
        orientation === "horizontal" && "flex-wrap items-center",
        orientation === "vertical" && "flex-col items-start",
        className
      )}
      {...props}
    />
  );
}

export { DescriptionList, DescriptionListLabel, DescriptionListValue };
