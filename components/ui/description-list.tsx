import * as React from "react";

import { cn } from "@/lib/utils";

function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn("grid grid-cols-1 text-sm sm:grid-cols-[min(33%,--spacing(60))_auto]", className)}
      {...props}
    />
  );
}

function DescriptionListLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-list-label"
      className={cn(
        "col-start-1 border-t pt-3 text-muted-foreground first:border-none first:pt-0 sm:border-t sm:py-3",
        className
      )}
      {...props}
    />
  );
}

function DescriptionListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-list-value"
      className={cn(
        "flex items-center gap-2 space-y-3 pt-1 pb-3 text-foreground nth-2:pt-0 sm:border-t sm:py-3 sm:nth-2:border-none",
        className
      )}
      {...props}
    />
  );
}

export { DescriptionList, DescriptionListLabel, DescriptionListValue };
