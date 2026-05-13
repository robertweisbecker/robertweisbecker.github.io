"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- Primitive; use with Field/FieldLabel + control (Base UI).
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-1 text-sm select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "[&>svg]:size-4",
        className
      )}
      {...props}
    />
  );
}

export { Label };
