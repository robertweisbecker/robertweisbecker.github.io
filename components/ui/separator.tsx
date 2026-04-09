"use client";

  import { cn } from "@/lib/utils"
  import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
  import { cva,type VariantProps } from "class-variance-authority"

const separatorVariants = cva(
  "data-horizontal:w-full data-horizontal:min-w-0 data-vertical:min-h-0 data-horizontal:grow data-horizontal:flex data-vertical:self-stretch shrink-0 [--separator-color:var(--border)]",
  {
    variants: {
      variant: {
        default:
          "bg-(--separator-color) data-horizontal:h-[var(--separator-thickness)] data-vertical:w-[var(--separator-thickness)]",
        dotted:
          "border-dotted border-(--separator-color) data-horizontal:border-t-[var(--separator-thickness)] data-vertical:border-s-[var(--separator-thickness)]",
        dashed:
          "border-dashed border-(--separator-color) data-horizontal:border-t-[var(--separator-thickness)] data-vertical:border-s-[var(--separator-thickness)]",
      },
    },
  }
);

function Separator({
  className,
  orientation = "horizontal",
  variant = "default",
  thickness = 1,
  ...props
}: SeparatorPrimitive.Props & VariantProps<typeof separatorVariants> & { thickness?: number }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      style={
        {
          "--separator-thickness": `${thickness}px`,
        } as React.CSSProperties
      }
      className={cn(separatorVariants({ variant, className }))}
      {...props}
    />
  );
}

  export { Separator }
