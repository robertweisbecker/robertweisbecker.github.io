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
        "shadow-border-sm data-checked:shadow-border-xs",
        "outline outline-border dark:-outline-offset-1",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "hover:not-data-disabled:not-data-checked:outline-input",
        // "in-[label:hover]:not-data-disabled:not-data-checked:outline-destructive",
        // "[[data-slot=checkbox]:not([data-disabled]):not([data-checked])~label]]:hover:outline-success",
        "data-checked:bg-(--hue-500) data-checked:text-primary-foreground",
        "text-primary-foreground data-indeterminate:outline-primary",
        "data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:shadow-none",
        "will-change-transform active:scale-[0.95]",

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid-stack size-full shrink-0 text-primary-foreground opacity-0 transition-[transform,color,scale,opacity] duration-200 ease-out data-checked:scale-100 data-checked:opacity-100 data-unchecked:scale-50 data-unchecked:text-muted-foreground"
      >
        {/* <IconCheck className="stroke-3 size-2.5" /> */}
        <CheckIcon className="me-[0.5px] size-2.5 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
