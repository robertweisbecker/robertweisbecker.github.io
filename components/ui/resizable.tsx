"use client";

  import * as ResizablePrimitive from "react-resizable-panels"

  import { cn } from "@/lib/utils"

function ResizablePanelGroup({ className, ...props }: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn("flex h-full w-full aria-[orientation=vertical]:flex-col", className)}
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
        "group/resizable-handle relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:inset-s-1/2 after:w-2 after:-translate-x-1/2 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-s-0 aria-[orientation=horizontal]:after:h-2 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 rtl:after:translate-x-1/2 rtl:aria-[orientation=horizontal]:after:-translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90",
        // !withHandle && "focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-12 w-1 shrink-0 rounded-lg bg-muted-foreground outline-2 outline-background transition-[height,background] duration-100 group-hover/resizable-handle:h-16 group-hover/resizable-handle:bg-foreground group-focus-visible/resizable-handle:outline group-focus-visible/resizable-handle:outline-offset-2 group-focus-visible/resizable-handle:outline-ring" />
      )}
    </ResizablePrimitive.Separator>
  );
}

  export { ResizableHandle,ResizablePanel,ResizablePanelGroup }
