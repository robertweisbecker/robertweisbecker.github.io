import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "group/alert not-prose relative grid w-full outline outline-border/50 gap-0.5 rounded-lg shadow-[inset_0_1px_1px_.5px_rgba(255,255,255,0.20),var(--shadow-xs)] dark:shadow-border-xs px-3 py-2 text-start text-[0.8125rem] has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:min-h-lh *:[svg]:text-current/80 *:[svg:not([class*='size-'])]:size-4  dark:-outline-offset-1 ",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground [&>svg]:text-muted-foreground ",
        secondary:
          "bg-(--hue-50) dark:bg-(--hue-900) text-secondary-foreground [&>svg]:text-primary outline-primary/20",
        neutral: "bg-neutral-75 text-foreground dark:bg-neutral-900 [&>svg]:text-muted-foreground/72",
        info: "bg-info text-info-foreground outline-info-primary/20 [&>svg]:text-info-primary",
        success: "bg-success text-success-foreground outline-success-primary/20 [&>svg]:text-success-primary",
        warning: "bg-warning text-warning-foreground outline-warning-primary/20 [&>svg]:text-warning-primary",
        error: "bg-error text-error-foreground outline-destructive/20 [&>svg]:text-destructive",
        destructive: "bg-destructive/10 text-destructive-foreground outline-destructive/50  *:[svg]:text-current",
      },
      inline: {
        true: "flex my-8 rounded-md px-4 py-2.5 -mx-4 bg-muted self-center",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inline: false,
    },
  }
);

function Alert({
  className,
  variant,
  inline,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role={variant === "destructive" ? "alert" : "status"}
      className={cn(alertVariants({ variant, inline }), className)}
      {...props}
    />
  );
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-wrap gap-x-1 gap-y-2.5 [svg~&]:col-start-2", className)}
      data-slot="alert-content"
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-title" className={cn("font-medium [&_a]:link [svg~&]:col-start-2", className)} {...props} />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-pretty wrap-break-word text-current/72 [svg~&]:col-start-2", className)}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "flex gap-1 max-sm:col-start-2 max-sm:mt-2 sm:row-start-1 sm:row-end-3 sm:self-center sm:[[data-slot=alert-description]~&]:col-start-2 sm:[[data-slot=alert-title]~&]:col-start-2 sm:[svg~&]:col-start-2 sm:[svg~[data-slot=alert-description]~&]:col-start-3 sm:[svg~[data-slot=alert-title]~&]:col-start-3",
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle };
