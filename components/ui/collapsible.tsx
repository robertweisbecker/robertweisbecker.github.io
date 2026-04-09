"use client";

  import { cn } from "@/lib/utils"
  import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
  import type React from "react"

export function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export function CollapsibleTrigger({ className, ...props }: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      className={cn("group/collapsible-trigger relative cursor-pointer", className)}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export function CollapsibleIcon({
  side = "inline-end",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { side?: "inline-start" | "inline-end" }): React.ReactElement {
  return (
    <span
      data-icon={side}
      className={cn(
        "size-lh ease relative font-pixel text-[11px] leading-none opacity-50 transition-[opacity,transform,rotate] delay-50 duration-100 group-hover/collapsible-trigger:opacity-100 in-data-panel-open:opacity-100",
        side === "inline-end" && "rotate-90 text-[16.5px] leading-none in-data-panel-open:rotate-270",
        side === "inline-start" && "in-data-panel-open:rotate-90",
        className
      )}
      data-slot="collapsible-icon"
      {...props}
    >
      {/* <IconChevronDown  className="size-[1em]" /> */}
      {side === "inline-start" ? "►" : ">"}
    </span>
  );
}

export function CollapsiblePanel({ className, ...props }: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "mt-1 h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

  export { CollapsiblePanel as CollapsibleContent,CollapsiblePrimitive }
