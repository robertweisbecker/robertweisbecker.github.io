"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ArrowSvg } from "../icons";

const TooltipGroupContext = React.createContext<{
  handle: TooltipPrimitive.Handle<React.ReactNode>;
} | null>(null);

export type TooltipGroupProps = Pick<
  TooltipPrimitive.Positioner.Props,
  "side" | "sideOffset" | "align" | "alignOffset"
> &
  Pick<TooltipPrimitive.Provider.Props, "delay" | "closeDelay" | "timeout"> & {
    /** Additional class names for the popup element. */
    popupClassName?: string;
    children: React.ReactNode;
  };

function TooltipProvider({ delay = 200, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  tooltip,
  handle: handleProp,
  payload: payloadProp,
  ...props
}: TooltipPrimitive.Trigger.Props<React.ReactNode> & {
  /** Tooltip content shown when inside a TooltipGroup. Accepts any ReactNode. */
  tooltip?: React.ReactNode;
}) {
  const groupContext = React.useContext(TooltipGroupContext);
  const handle = handleProp ?? groupContext?.handle;
  const payload = payloadProp ?? (groupContext ? tooltip : undefined);

  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" handle={handle} payload={payload} {...props} />;
}

function TooltipGroup({
  children,
  popupClassName,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  delay = 200,
  closeDelay = 200,
  timeout,
  trackCursorAxis,
}: TooltipPrimitive.Root.Props & TooltipGroupProps) {
  const handle = React.useMemo(() => TooltipPrimitive.createHandle<React.ReactNode>(), []);

  return (
    <TooltipProvider data-slot="tooltip-group-provider" delay={delay} closeDelay={closeDelay} timeout={timeout}>
      <TooltipGroupContext.Provider value={{ handle }}>
        {children}
        <TooltipPrimitive.Root data-slot="tooltip-group" handle={handle} trackCursorAxis={trackCursorAxis}>
          {({ payload }) => (
            <TooltipPrimitive.Portal>
              <TooltipPrimitive.Positioner
                align={align}
                alignOffset={alignOffset}
                side={side}
                sideOffset={sideOffset}
                className={cn(
                  "isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
                  "transition-[top,left,right,bottom,transform]",
                  "duration-[0.35s]",
                  "ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "data-instant:transition-none"
                )}
              >
                <TooltipPrimitive.Popup
                  data-slot="tooltip-group-popup"
                  className={cn(
                    "flex origin-(--transform-origin) flex-col",
                    "h-(--popup-height,auto) w-(--popup-width,auto)",
                    "rounded-md bg-popover text-[0.8125rem] text-popover-foreground",
                    "shadow-border-lg drop-shadow-md/2 dark:shadow-black/50",
                    "transition-[width,height,opacity,scale]",
                    "duration-[0.35s]",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "data-starting-style:scale-90 data-starting-style:opacity-0",
                    "data-ending-style:scale-90 data-ending-style:opacity-0",
                    "data-instant:transition-none",
                    "data-[side=left]:*:data-[slot=tooltip-arrow]:hidden data-[side=right]:*:data-[slot=tooltip-arrow]:hidden",
                    popupClassName
                  )}
                >
                  <TooltipPrimitive.Arrow
                    data-slot="tooltip-arrow"
                    className={cn(
                      "flex",
                      "transition-[left]",
                      "duration-[0.35s]",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "data-instant:transition-none",
                      "data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0",
                      "data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
                      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
                      "data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
                    )}
                  >
                    <ArrowSvg />
                  </TooltipPrimitive.Arrow>
                  <TooltipPrimitive.Viewport
                    data-slot="tooltip-group-viewport"
                    className={cn(
                      "[--viewport-inline-padding:0.5rem]",
                      "relative h-full w-full overflow-clip",
                      "px-[var(--viewport-inline-padding)] py-1",
                      "[&_[data-previous]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]",
                      "[&_[data-previous]]:translate-x-0",
                      "[&_[data-previous]]:opacity-100",
                      "[&_[data-previous]]:transition-[translate,opacity]",
                      "[&_[data-previous]]:duration-[350ms,175ms]",
                      "[&_[data-previous]]:ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "[&_[data-current]]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]",
                      "[&_[data-current]]:translate-x-0",
                      "[&_[data-current]]:opacity-100",
                      "[&_[data-current]]:transition-[translate,opacity]",
                      "[&_[data-current]]:duration-[350ms,175ms]",
                      "[&_[data-current]]:ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2",
                      "data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0",
                      "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2",
                      "data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0",
                      "[[data-instant]_&_[data-previous]]:transition-none",
                      "[[data-instant]_&_[data-current]]:transition-none",
                      "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2",
                      "data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0",
                      "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2",
                      "data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0"
                    )}
                  >
                    {payload}
                  </TooltipPrimitive.Viewport>
                </TooltipPrimitive.Popup>
              </TooltipPrimitive.Positioner>
            </TooltipPrimitive.Portal>
          )}
        </TooltipPrimitive.Root>
      </TooltipGroupContext.Provider>
    </TooltipProvider>
  );
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "origin-(--transform-origin) rounded-md bg-popover px-1.5 py-1 text-[0.8125rem] text-popover-foreground shadow-border-lg drop-shadow-md/2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-black/50",
            "data-[side=left]:*:data-[slot=tooltip-arrow]:hidden data-[side=right]:*:data-[slot=tooltip-arrow]:hidden",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow
            data-slot="tooltip-arrow"
            className="flex data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180"
          >
            <ArrowSvg />
          </TooltipPrimitive.Arrow>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipContent, TooltipGroup, TooltipProvider, TooltipTrigger };
