"use client";

import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";
import { IconGripVertical } from "@tabler/icons-react";

function ResizablePanelGroup({ className, ...props }: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn("flex h-full w-full gap-px aria-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "group/resizable-handle relative flex w-2 items-center justify-center outline-none after:absolute after:inset-y-0 after:inset-s-1/2 after:w-px after:-translate-x-1/2 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-s-0 aria-[orientation=horizontal]:after:h-6 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 rtl:after:translate-x-1/2 rtl:aria-[orientation=horizontal]:after:translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90",
        "after:transition-colors hover:after:bg-input",
        // "focus:bg-ring/10 focus:after:bg-ring focus-visible:outline-hidden",
        "[--pattern-bg:var(--muted)] [--pattern-fg:var(--border)]",
        "hover:bg-(--pattern-bg) hover:bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] hover:bg-size-[5px_5px]",

        // !withHandle && "focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex shrink-0 items-center justify-center rounded-md bg-foreground shadow-xs backdrop-blur-lg transition-all duration-200 ease-in-out",
            "h-6 w-4",
            "md:h-16 md:w-1 md:rounded-sm md:group-hover/resizable-handle:h-20 md:group-hover/resizable-handle:w-1.5",
            // "group-hover/resizable-handle:bg-(--pattern-fg) group-hover/resizable-handle:outline-primary group-focus/resizable-handle:ring-background",
            "group-active/resizable-handle:ring-background",
            "bg-foreground/50 group-hover/resizable-handle:bg-foreground/75 group-active/resizable-handle:bg-foreground"
          )}
        >
          <IconGripVertical className="size-3 shrink-0 text-background md:hidden" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
