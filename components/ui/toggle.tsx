"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "relative text-muted-foreground data-pressed:text-secondary-foreground active:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive data-pressed:bg-secondary text-sm font-medium transition-[background-color,color,box-shadow] [&_svg:not([class*='size-'])]:size-4 group/toggle hover:bg-accent/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent text-muted-foreground data-pressed:text-foreground",
        outline: " data-pressed:border-input border border-input data-pressed:text-foreground",
        elevated:
          "data-pressed:bg-card dark:data-pressed:bg-popover data-pressed:text-foreground text-muted-foreground data-pressed:shadow-border-xs",
      },
      shape: {
        default: "inline-flex items-center justify-center whitespace-nowrap",
        column: "flex flex-col gap-1 p-2 items-center justify-center leading-tight w-full h-auto text-center",
        square: "flex flex-col gap-0 items-center [&_svg]:size-5 justify-center aspect-square h-full",
      },
      size: {
        default: "min-h-button min-w-button px-2.5 rounded-md gap-1.5",
        xs: "min-h-button-xs min-w-button-xs rounded px-1 text-[0.6875rem] gap-1 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-button-sm min-w-button-sm rounded-md px-2.5 text-sm gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-button-lg min-w-button-lg rounded-lg px-3 gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

function Toggle({
  className,
  variant = "default",
  size = "default",
  shape,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      data-shape={shape}
      className={cn(toggleVariants({ variant, size, shape, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
