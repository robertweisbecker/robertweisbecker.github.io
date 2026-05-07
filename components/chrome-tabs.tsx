"use client";

import { cn } from "@/lib/utils";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

function ChromeTabsRoot({ className, children, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      className={cn(
        "flex w-full flex-col rounded-[calc(var(--radius-lg)+--spacing(0.5))] bg-background p-px drop-shadow-xs [&>div]:data-[slot=tabs-panel]:bg-card",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

function ChromeTabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List data-slot="tabs-list" className={cn("flex flex-1", className)} {...props}>
      {children}
    </TabsPrimitive.List>
  );
}

function ChromeTabsTab({ value, children, className, flush = true, ...props }: TabsPrimitive.Tab.Props & { flush?: boolean }) {
  return (
    <TabsPrimitive.Tab
      value={value}
      data-slot="tabs-trigger"
      data-flush={flush}
      className={cn(
        "group/tab ease relative isolate flex h-9 w-full flex-row items-center justify-start gap-2 rounded-lg border-t border-t-transparent text-sm text-muted-foreground transition-[border-radius] duration-100 text-shadow-2xs text-shadow-background hover:z-1 hover:text-foreground active:z-1 data-active:rounded-b-none data-active:bg-card data-active:text-foreground dark:data-active:border-t-accent [&_svg]:-ms-1 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:opacity-50 hover:[&_svg]:opacity-100 data-active:[&_svg]:opacity-100",
        "before:pointer-events-none before:absolute before:inset-e-full before:bottom-0 before:aspect-square before:h-0.5 before:origin-top-right before:bg-inherit before:mask-b-from-100% before:mask-radial-from-100% before:mask-radial-farthest-side before:mask-radial-at-[0%_0%] before:mask-exclude before:mask-no-repeat before:transition-[height] before:delay-50 before:duration-50 before:ease-in data-active:before:h-(--radius-lg)",
        "after:pointer-events-none after:absolute after:inset-s-full after:bottom-0 after:aspect-square after:h-0.5 after:origin-top-left after:bg-inherit after:mask-b-from-100% after:mask-radial-from-100% after:mask-radial-farthest-side after:mask-radial-at-[100%_0%] after:mask-exclude after:mask-no-repeat after:transition-[height] after:delay-50 after:duration-100 after:ease-in data-active:after:h-(--radius-lg)",
        "data-[flush=true]:first:before:hidden data-[flush=true]:last:after:hidden",
        className
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-2 truncate px-4 py-2 before:absolute before:inset-1 before:-z-1 before:rounded-md before:transition-colors group-hover/tab:not-group-data-active/tab:before:bg-accent group-active/tab:before:bg-transparent group-data-active/tab:before:bg-transparent">
        {children ?? value}
      </span>
    </TabsPrimitive.Tab>
  );
}

function ChromeTabsPanel({ children, className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn(
        "min-h-16 w-full rounded-lg p-px shadow-[0_1px_--alpha(black/10%)]",
        "[[data-slot=tabs-list]:has([data-active][data-flush='true']:first-child)~&]:rounded-ss-none",
        "[[data-slot=tabs-list]:has([data-active][data-flush='true']:last-child)~&]:rounded-se-none",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}

export const ChromeTabs = Object.assign(ChromeTabsRoot, {
  List: ChromeTabsList,
  Tab: ChromeTabsTab,
  Panel: ChromeTabsPanel,
});
