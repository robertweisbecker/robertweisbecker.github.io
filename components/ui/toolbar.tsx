"use client";

import { cn } from "@/lib/utils";
import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cva, type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

const toolbarVariants = cva("flex items-center data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col", {
  variants: {
    variant: {
      outline: "outline outline-border p-1 rounded-md",
      muted: "bg-muted border-transparent p-1 rounded-md",
      elevated: "rounded-md bg-popover shadow-border-xs p-1",
      minimal: "",
    },
  },
  defaultVariants: {
    variant: "minimal",
  },
});

function ToolbarRoot({
  className,
  variant,
  orientation = "horizontal",
  ...props
}: ToolbarPrimitive.Root.Props & VariantProps<typeof toolbarVariants>) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      data-variant={variant}
      orientation={orientation}
      className={cn(toolbarVariants({ variant }), className)}
      {...props}
    />
  );
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn("inline-flex items-center gap-px data-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  );
}

function ToolbarButton({
  className,
  size = "sm",
  variant = "ghost",
  ...props
}: ToolbarPrimitive.Button.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      data-size={size}
      className={cn(buttonVariants({ size, variant, className }), "rounded-sm")}
      {...props}
    />
  );
}

function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1 px-1 text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline",
        "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

function ToolbarSeparator({ className, orientation, ...props }: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        "data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-px",
        "data-[orientation=vertical]:my-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        className
      )}
      {...props}
    />
  );
}

function ToolbarInput({ size = "sm", className, ...props }: Omit<ToolbarPrimitive.Input.Props, "size"> & { size?: "md" | "sm" }) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      data-size={size}
      className={cn(
        "min-w-24 rounded-sm border border-border/50 bg-accent py-1 text-base hover:not-focus-visible:border-input data-[size=md]:h-button data-[size=md]:px-2.5 data-[size=sm]:h-8 data-[size=sm]:px-1.5 sm:text-sm",
        "hover:text-foreground focus:bg-background",
        "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
        "placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50",
        "data-[orientation=vertical]:w-full",
        className
      )}
      {...props}
    />
  );
}

const Toolbar = {
  Root: ToolbarRoot,
  Group: ToolbarGroup,
  Button: ToolbarButton,
  Link: ToolbarLink,
  Separator: ToolbarSeparator,
  Input: ToolbarInput,
};

export { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarRoot, ToolbarSeparator };
