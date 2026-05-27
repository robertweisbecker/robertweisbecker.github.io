import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  " gap-1 px-1.5 py-px font-[450] transition-all **:data-[icon=inline-end]:-me-0.5 **:data-[icon=inline-start]:-ms-0.5 [&_svg:not([class*='size-'])]:size-[.875em] inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:outlin-2 focus-visible:outline-ring focus-visible:outline-offset-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive align-text-bottom overflow-hidden group/badge  tracking-normal ",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground [a]:hover:bg-muted outline outline-border",
        primary: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive [a]:hover:bg-destructive/20 focus-visible:ring-destructive text-white ",
        error: "bg-error [a]:hover:bg-error/20 focus-visible:ring-error text-error-foreground ",
        success: "bg-success [a]:hover:bg-success/20 focus-visible:ring-success text-success-foreground ",
        info: "bg-info [a]:hover:bg-info/20 focus-visible:ring-info text-info-foreground",
        beta: "bg-info text-2xs border border-dashed border-info-primary font-pixel text-info text-info-foreground ",
        inherit:
          "bg-current/8 [&_svg]:text-current/72 text-current text-[inherit] [a]:hover:underline [a]:hover:bg-current/12 [a]:hover:[&_svg]:text-current/84",
        warning: "bg-warning [a]:hover:bg-warning/20 focus-visible:ring-warning text-warning-foreground ",
        outline:
          "outline bg-card outline-border shadow-[0_-1px_hsl(0_0_100%_/_5%),0_1px_hsl(0_0%_0%_/_5%)] text-card-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground ",
        ghost: "[a]:hover:bg-accent text-foreground [a]:hover:text-accent-foreground -mx-1",
        link: "bg-muted dark:bg-white/10 [font-size:inherit] text-foreground hover:underline underline-offset-4 [a]:hover:bg-accent [a]:hover:text-accent-foreground",
      },
      size: {
        default: "text-xs/none rounded-sm h-5",
        sm: "text-[0.625rem]/3 py-0.5 px-1 rounded tracking-[0.015em] h-4 gap-0.5",
      },
    },
    compoundVariants: [
      {
        variant: "beta",
        size: "default",
        className: "px-2 rounded-full",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  });
}

export { Badge, badgeVariants };
