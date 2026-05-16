"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import * as React from "react";

import { cn } from "@/lib/utils";
import { CheckIcon } from "../icons";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "size-4 shrink-0 touch-manipulation rounded bg-card transition-[background-color,outline-color,box-shadow] duration-100 ease-out",
        "shadow-border-sm data-checked:shadow-border-sm",
        "outline outline-border dark:-outline-offset-1 data-checked:outline-primary",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "hover:not-data-checked:not-data-disabled:outline-input",
        // "in-[label:hover]:not-data-disabled:not-data-checked:outline-destructive",
        // "[[data-slot=checkbox]:not([data-disabled]):not([data-checked])~label]]:hover:outline-success",
        "data-checked:bg-linear-to-b data-checked:from-primary/84 data-checked:to-primary data-checked:text-primary-foreground",
        "text-primary-foreground data-indeterminate:outline-primary",
        "data-disabled:cursor-not-allowed data-disabled:bg-black/10 data-disabled:shadow-none data-disabled:outline-border/50",
        "will-change-transform active:scale-95",

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid-stack size-full shrink-0 text-primary-foreground transition-all delay-50 duration-100 ease-out data-ending-style:scale-0 data-ending-style:opacity-0 data-starting-style:scale-50 data-starting-style:opacity-0 data-checked:scale-100 data-checked:opacity-100"
      >
        {/* <IconCheck className="stroke-3 size-2.5" /> */}
        <CheckIcon className="me-[0.5px] size-2.5 stroke-2" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
