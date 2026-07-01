"use client";

import { cn } from "@/lib/utils";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const switchVariants = cva(
  [
    // Default styles
    "group/switch peer self-start rounded-full inline-flex relative shrink-0",
    "inset-shadow-2xs inset-ring-[0.5px] inset-ring-input",
    "h-(--switch-height) w-(--switch-width)",
    "transition-colors",
    // State-specific classes
    "data-unchecked:bg-border",
    "hover:not-data-disabled:inset-ring-input hover:not-data-disabled:data-unchecked:bg-input",
    "data-unchecked:active:not-data-disabled:bg-input",
    "data-checked:bg-(--hue-500)",
    "data-checked:justify-end data-checked:active:not-data-disabled:bg-(--hue-600)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:inset-ring-border",
  ],
  {
    variants: {
      size: {
        default:
          "[--switch-height:var(--spacing-thumb)] [--switch-inset:2px] [--switch-width:round(calc(var(--switch-height)*11/7),1px)] h-thumb w-[calc(var(--spacing-thumb)*11/7)]",
        sm: "[--switch-height:--spacing(4.5)] [--switch-inset:1px] [--switch-width:--spacing(7)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root data-slot="switch" className={cn(switchVariants({ size }), className)} {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn([
          "pointer-events-none relative inset-s-(--switch-inset) top-1/2 origin-center -translate-y-1/2 rounded-full shadow-border-sm ring-[0.5px] ring-border",
          "h-[calc(var(--switch-height)-calc(var(--switch-inset)*2))] w-[calc(var(--switch-height)-calc(var(--switch-inset)*2))]",

          "data-checked:bg-white",
          "bg-white bg-linear-to-b to-black/5 group-hover/switch:bg-white",
          "inset-ring-1 inset-ring-white",

          // "data-checked:h-[calc(var(--switch-height)-var(--switch-inset))] data-checked:w-[calc(var(--switch-height)-var(--switch-inset))] data-checked:translate-x-[calc(var(--switch-inset)/2)]",
          "data-checked:inset-s-auto data-checked:inset-e-px data-checked:h-[calc(var(--switch-height)-var(--switch-inset))] data-checked:w-[calc(var(--switch-height)-var(--switch-inset))]",
          "transition-[margin,translate,width,height] ease-out",
          "group-active/switch:not-data-disabled:w-[calc(var(--switch-height)+var(--switch-inset))]",
          // "in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:w-[calc(var(--switch-height)+var(--switch-inset))]",
          "in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:w-[calc(var(--switch-height)+var(--switch-inset))]!",
          "data-disabled:bg-border! data-disabled:bg-none data-disabled:shadow-none data-disabled:inset-ring-0",
        ])}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
