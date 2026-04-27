"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "relative z-0 text-sm group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col [--tabs-radius:var(--radius-lg)] rounded-[var(--tabs-radius)]",
  {
    variants: {
      variant: {
        default:
          "bg-muted p-0.5 gap-0.5 [--tab-padding-x:--spacing(2.5)] [--tab-padding-y:--spacing(1.5)] *:data-[slot=tabs-trigger]:rounded-[calc(var(--tabs-radius)-2px)]",
        line: "rounded-none gap-px bg-transparent [--tab-padding-x:--spacing(2.5)] [--tab-padding-y:--spacing(1.5)] *:data-[slot=tabs-trigger]:rounded-(--tabs-radius) -mx-(--tab-padding-x) data-[orientation=horizontal]:py-1 data-[orientation=vertical]:px-1 font-normal",
        pill: "[--tabs-radius:999px] gap-px [--tab-padding-x:--spacing(2.5)] [--tab-padding-y:--spacing(1)] ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className={cn(
          "absolute bottom-0 left-0 translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 ease-in-out will-change-transform",
          variant === "line" &&
            "z-10 w-[calc(var(--active-tab-width)-var(--tab-padding-x)*2)] translate-x-[calc(var(--active-tab-left)+var(--tab-padding-x))] rounded-full bg-primary/80 data-[orientation=horizontal]:h-[3px] data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:w-[3px] data-[orientation=vertical]:-translate-x-px",
          variant === "pill" &&
            "-z-1 h-(--active-tab-height) w-(--active-tab-width) rounded-(--tabs-radius) bg-secondary",
          variant === "default" &&
            "-z-1 h-(--active-tab-height) w-(--active-tab-width) rounded-[calc(var(--tabs-radius)-2px)] bg-card shadow-border-xs"
        )}
      />
    </TabsPrimitive.List>
  );
}

function TabsTrigger({ className, children, label, ...props }: TabsPrimitive.Tab.Props & { label?: string }) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-full flex-1 items-center justify-center gap-[calc(var(--tab-padding-x)/1.5)] px-(--tab-padding-x) py-(--tab-padding-y) whitespace-nowrap transition-[color,background,background-color,box-shadow,border-radius] duration-200 ease-in-out group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground hover:not-disabled:not-data-active:not-active:bg-accent",
        "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring",
        "disabled:opacity-50 aria-disabled:opacity-50 [&_svg]:pointer-events-none",
        "[&_svg]:-mx-[calc(var(--tab-padding-x)/4)] [&_svg]:shrink-0 [&_svg]:opacity-72 [&_svg:not([class*='size-'])]:size-[1em]",
        "data-active:bg-transparent data-active:text-foreground",
        "group-data-[variant=pill]/tabs-list:rounded-(--tabs-radius) group-data-[variant=pill]/tabs-list:bg-transparent!",
        // "will-change-contents",
        "[--tab-gap:--spacing(2)]",
        className
      )}
      {...props}
    >
      <span className="absolute flex items-center justify-center gap-(--tab-gap) text-center transition-[opacity,color] duration-100 ease-in-out will-change-contents in-data-active:opacity-0">
        {children ?? label}
      </span>
      {/* Hidden active text - note: tracking-[-.015em] in case I switch fonts */}
      <span className="pointer-events-none flex grow items-center justify-center gap-(--tab-gap) font-[500] tracking-[-.015em] opacity-0 transition-[opacity,color] duration-100 ease-in-out will-change-contents select-none in-data-active:opacity-100">
        {children ?? label}
      </span>
    </TabsPrimitive.Tab>
  );
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("w-full max-w-full min-w-0 flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsPanel as TabsContent, TabsList, tabsListVariants, TabsPanel, TabsTrigger };
