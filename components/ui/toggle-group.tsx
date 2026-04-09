"use client";

  import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
  import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
  import { type VariantProps } from "class-variance-authority"
  import * as React from "react"

  import { toggleVariants } from "@/components/ui/toggle"
  import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
    orientation?: "horizontal" | "vertical" | "grid";
    grid?: boolean;
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal",
  grid: false,
});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  orientation = "horizontal",
  children,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[size=lg]:rounded-lg data-[size=sm]:rounded-sm data-vertical:flex-col data-vertical:items-stretch",
        variant === "elevated" && "bg-accent p-px",
        variant === "default" && !!spacing && "gap-px",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

const toggleGroupItemVariants = [
  "group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-[inherit]",
  "group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-[inherit]",
  "group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-[inherit]",
  "group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-[inherit]",
  "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:not-first:border-s-transparent",
  "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:not-first:not-last:-mx-px",
  "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:data-pressed:border-s-input",
  "group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-transparent",
  "group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s",
  "group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
  "group-data-[spacing=0]/toggle-group:rounded-none",
  // "group-data-[spacing=0]/toggle-group:px-2",
];

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  shape = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);
  const isGrid = context.grid === true;

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 focus-visible:z-10 data-selected:z-1",
        !isGrid && toggleGroupItemVariants,
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
          shape: isGrid ? "column" : context.shape,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  );
}

function ToggleGrid({
  className,
  variant,
  size,
  columns = 3,
  spacing = 0,
  children,
  style,
  ...props
}: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants> & {
    columns?: number;
    spacing?: number;
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-grid"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-grid
      style={
        {
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          "--gap": spacing,
        } as React.CSSProperties
      }
      className={cn(
        "grid gap-[--spacing(var(--gap))] rounded-xl data-[size=lg]:rounded-xl data-[size=sm]:rounded-md",
        variant === "elevated" && "rounded-lg! bg-accent p-0.5",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{
          variant: variant,
          size: size ?? "sm",
          spacing: 0,
          orientation: "vertical",
          grid: true,
        }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

  export { ToggleGrid,ToggleGroup,ToggleGroupItem }
