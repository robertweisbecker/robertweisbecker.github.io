"use client";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";

import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  innerClass,
  children,
  showScrollbar = false,
  scrollFade = false,
  scrollbarGutter = false,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Root.Props & {
  scrollFade?: boolean;
  scrollbarGutter?: boolean;
  showScrollbar?: boolean;
  innerClass?: string;
  orientation?: "vertical" | "horizontal" | "both";
}) {
  return (
    <ScrollAreaPrimitive.Root
      className={cn(
        "box-border min-h-0 min-w-0",
        orientation === "vertical" && "h-full w-full",
        orientation === "horizontal" && "w-full",
        orientation === "both" && "size-full",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "transition-shadows h-full rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-has-overflow-x:overscroll-x-contain data-has-overflow-y:overscroll-y-contain",
          scrollFade &&
            "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))] [--fade-size:1.5rem]",
          scrollbarGutter && "data-has-overflow-x:pb-2.5 data-has-overflow-y:pe-2.5",
          innerClass
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation="vertical" visible={showScrollbar} />
      <ScrollBar orientation="horizontal" visible={showScrollbar} />
      <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  visible = false,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props & {
  visible?: boolean;
}) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "m-1 flex transition-all delay-300 data-hovering:delay-0 data-hovering:duration-100 data-scrolling:delay-0 data-scrolling:duration-100 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:flex-col hover:data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-1 hover:data-[orientation=vertical]:w-2",
        visible ? "opacity-100" : "opacity-0 data-hovering:opacity-100 data-scrolling:opacity-100",
        className
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className="relative flex-1 rounded-full bg-foreground/20 hover:bg-foreground/40"
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
