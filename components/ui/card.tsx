import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "text-card-foreground overflow-hidden rounded-(--card-radius) py-(--card-padding) text-sm has-[>[data-slot=card-footer]]:pb-0 has-[>img:first-child]:pt-0 gap-[calc(var(--card-padding)/1)] [&>img:first-child]:rounded-t-[inherit] [&>img:last-child]:rounded-b-[inherit] has-[>[data-slot=media]:last-child]:pb-0 group/card flex flex-col",
  {
    variants: {
      variant: {
        default: "shadow-border-sm bg-card",
        muted: "bg-muted/50 border-transparent",
        outline: "outline-border -outline-offset-1 outline-1 dark:-outline-offset-1",
      },
      size: {
        default: "[--card-padding:--spacing(4)] [--card-radius:var(--radius-xl)]",
        sm: "[--card-padding:--spacing(3)] [--card-radius:var(--radius-lg)]",
        lg: "[--card-padding:--spacing(5)] [--card-radius:var(--radius-3xl)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Card({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div data-slot="card" data-size={size} data-variant={variant} className={cn(cardVariants({ variant, size }), className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-x-2 gap-y-1 rounded-t-(--card-radius) px-(--card-padding) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-[calc(var(--card-padding)/2)]",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "-mt-0.5 flex items-center gap-1.5 text-base font-[525] text-foreground group-data-[size=md]/card:text-base in-group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground group-data-[size=sm]/card:text-xs", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 flex items-center gap-1 self-start justify-self-end has-[button]:-me-0.5 has-[button]:-mt-0.5",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("grid flex-1 space-y-[calc(var(--card-padding)/2)] self-stretch px-(--card-padding)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-[inherit] border-border/50 px-(--card-padding) pb-(--card-padding) text-sm not-group-data-[variant=muted]/card:border-t not-group-data-[variant=muted]/card:bg-muted/50 not-group-data-[variant=muted]/card:pt-[calc(var(--card-padding)/1.5)] group-data-[size=sm]/card:text-xs",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
