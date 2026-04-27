"use client";

import { cn } from "@/lib/utils";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const switchVariants = cva(
  [
    // Default styles
    "group/switch peer self-start rounded-full inline-flex shrink-0 items-center justify-start",
    "inset-shadow-2xs inset-ring inset-ring-input",
    // Spacing & layout
    "h-(--switch-height) w-(--switch-width) p-(--switch-inset)",

    // Animation & transitions
    "transition-colors",
    // State-specific classes
    "data-unchecked:bg-border",
    "hover:not-data-disabled:inset-ring-input hover:not-data-disabled:data-unchecked:bg-accent",
    "data-unchecked:active:not-data-disabled:bg-input",
    "data-checked:bg-(--hue-500)",
    "data-checked:justify-end data-checked:active:not-data-disabled:bg-(--hue-600)",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:inset-ring-border",
    "",
  ],
  {
    variants: {
      size: {
        default:
          "[--switch-height:var(--spacing-thumb)] [--switch-inset:2px] [--switch-width:round(calc(var(--switch-height)*11/7),2px)]",
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
          "pointer-events-none relative top-[0.125px] block origin-center self-center",
          "h-[calc(var(--switch-height)-calc(var(--switch-inset)*2))] w-[calc(var(--switch-height)-calc(var(--switch-inset)*2))]",
          "shadow-border-sm",
          "relative",
          "data-checked:bg-white",
          "bg-white bg-linear-to-b to-black/5 group-hover/switch:bg-white",
          "inset-ring-1 inset-ring-white",
          "data-checked:h-[calc(var(--switch-height)-var(--switch-inset))] data-checked:w-[calc(var(--switch-height)-var(--switch-inset))] data-checked:translate-x-[calc(var(--switch-inset)/2)]",
          "transition-[margin,translate,width,height] ease-out",
          "rounded-full group-active/switch:not-data-disabled:w-[calc(var(--switch-height)+var(--switch-inset)/2)]",
          "data-disabled:bg-border! data-disabled:bg-none data-disabled:shadow-none data-disabled:inset-ring-0",
        ])}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
