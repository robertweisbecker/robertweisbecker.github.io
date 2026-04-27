"use client";

import { cn } from "@/lib/utils";
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type React from "react";

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
        "size-lh decoration-none! relative inline-block self-center font-pixel text-[22px] leading-none opacity-50 transition-[opacity,transform,rotate] delay-50 duration-150 ease-out group-hover/collapsible-trigger:opacity-100 in-data-panel-open:opacity-100",
        side === "inline-end" &&
          "decoration-none text-[16.5px] leading-none no-underline decoration-transparent in-data-panel-open:-rotate-180",
        side === "inline-start" && "in-data-panel-open:rotate-90",
        className
      )}
      data-slot="collapsible-icon"
      {...props}
    >
      {/* <IconChevronDown  className="size-[1em]" /> */}
      {side === "inline-start" ? (
        "\u203A"
      ) : (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="size-[1em]">
          <rect x="9" y="3" width="1" height="1" fill="currentColor" />
          <rect x="8" y="4" width="1" height="1" fill="currentColor" />
          <rect x="7" y="5" width="1" height="1" fill="currentColor" />
          <rect x="6" y="6" width="1" height="1" fill="currentColor" />
          <rect x="5" y="7" width="1" height="1" fill="currentColor" />
          <rect x="4" y="6" width="1" height="1" fill="currentColor" />
          <rect x="3" y="5" width="1" height="1" fill="currentColor" />
          <rect x="2" y="4" width="1" height="1" fill="currentColor" />
          <rect x="1" y="3" width="1" height="1" fill="currentColor" />
        </svg>
      )}
    </span>
  );
}

export function CollapsiblePanel({ className, ...props }: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "mt-1 h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { CollapsiblePanel as CollapsibleContent, CollapsiblePrimitive };
