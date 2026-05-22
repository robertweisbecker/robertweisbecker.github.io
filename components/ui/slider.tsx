"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showValue,
  label,
  ...props
}: SliderPrimitive.Root.Props & { label?: string; showValue?: boolean }) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      className={cn(
        "group/slider isolate flex items-center justify-center gap-1 data-disabled:opacity-50 data-horizontal:w-full data-vertical:h-full data-vertical:flex-col",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      // thumbAlignment="edge"
      min={min}
      max={max}
      {...props}
    >
      {showValue && props.orientation === "vertical" && (
        <SliderPrimitive.Value className="inline text-xs text-muted-foreground tabular-nums" />
      )}

      <SliderPrimitive.Control
        className={cn(
          "relative flex flex-1 touch-none items-center select-none data-dragging:cursor-grabbing",
          "data-horizontal:w-full data-horizontal:min-w-24 data-horizontal:py-2",
          "data-vertical:h-full data-vertical:min-h-button-xs data-vertical:w-auto data-vertical:flex-col data-vertical:px-1.5"
          // "before:absolute before:inset-y-1 before:rounded-md hover:before:bg-accent/50"
        )}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative isolate grow rounded-sm bg-input/25 inset-shadow-xs outline-[0.5px] -outline-offset-[0.5px] outline-input select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="-z-1 rounded-[inherit] bg-(--hue-500) bg-linear-to-b from-white/30 to-white/0 to-40% select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "group/slider-thumb flex size-thumb shrink-0 items-center justify-center select-none group-hover/slider:cursor-grab data-dragging:cursor-grabbing",
              "rounded-lg has-focus-visible:outline-2 has-focus-visible:outline-ring",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <div
              className={cn(
                "relative aspect-square h-thumb rounded-[inherit] bg-white/96 bg-radial-[at_50%_25%] to-black/5 to-90% text-center outline outline-input backdrop-blur-[1px] transition-[aspect-ratio,box-shadow,width,height,transform,scale] dark:outline-background",
                "group-hover/slider:transform-[scale(1.1)]",
                "group-active/slider-thumb:scale-75 group-active/slider-thumb:bg-white/84 group-data-dragging/slider-thumb:group-active/slider-thumb:aspect-video group-data-focus/slider-thumb:ring-2 group-data-focus/slider-thumb:ring-ring/50 group-data-focus/slider-thumb:ring-offset-1 group-data-focus/slider-thumb:ring-offset-ring",
                "shadow-[inset_-1px_0_--alpha(var(--background)/12%),inset_0_-1px_--alpha(var(--background)/12%),inset_-2px_-2px_2px_-3px_white,inset_0_1px_--alpha(var(--background)/24%),inset_1px_0_--alpha(var(--background)/16%),inset_4px_4px_1px_-5px_white,inset_0_0_0_2px_--alpha(#000/1%),var(--shadow-md)]"
              )}
            />
            {/* <SliderPrimitive.Value className="absolute font-grid text-[10px]/none opacity-0 in-data-dragging:opacity-100" /> */}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
      {showValue && props.orientation === "horizontal" && <SliderPrimitive.Value className="text-xs text-muted-foreground tabular-nums" />}
    </SliderPrimitive.Root>
  );
}

export { Slider };
