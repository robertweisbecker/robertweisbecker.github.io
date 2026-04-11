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
        "group/resizable-handle relative flex w-2 items-center justify-center outline-none after:absolute after:inset-y-0 after:inset-s-1/2 after:w-px after:-translate-x-1/2 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-s-0 aria-[orientation=horizontal]:after:h-6 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 rtl:after:translate-x-1/2 rtl:aria-[orientation=horizontal]:after:-translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90",
        "after:transition-colors hover:after:bg-input",
        // "focus:bg-ring/10 focus:after:bg-ring focus-visible:outline-hidden",
        "[--pattern-bg:var(--color-pink-300)]/50 [--pattern-fg:var(--color-pink-500)]",
        "dark:[--pattern-bg:var(--color-pink-500)]/50 dark:[--pattern-fg:var(--color-pink-300)]",
        "bg-(--pattern-bg)/20 bg-[image:repeating-linear-gradient(315deg,var(--pattern-bg)_0,var(--pattern-bg)_1px,transparent_0,transparent_50%)] bg-size-[5px_5px] bg-fixed",

        // !withHandle && "focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "z-10 flex shrink-0 items-center justify-center rounded-md bg-muted-foreground/50 shadow-xs ring inset-ring ring-black/30 inset-ring-background/20 backdrop-blur-lg transition-all duration-200 ease-in-out",
            "h-6 w-4",
            "md:h-16 md:w-0.5 md:rounded-none md:group-hover/resizable-handle:h-20",
            "group-hover/resizable-handle:bg-muted-foreground group-hover/resizable-handle:outline-primary group-focus/resizable-handle:ring-background",
            "group-focus/resizable-handle:bg-ring",
            "bg-(--pattern-fg) shadow-none ring-white"
          )}
        >
          <IconGripVertical className="size-3 shrink-0 text-background md:hidden" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
