"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function HueSlider({
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
      thumbAlignment="center"
      min={0}
      max={360}
      {...props}
    >
      {showValue && props.orientation === "vertical" && (
        <SliderPrimitive.Value className="inline text-xs text-muted-foreground tabular-nums" />
      )}

      <SliderPrimitive.Control className="relative flex max-w-full flex-1 touch-none items-center select-none after:absolute after:-inset-x-1.5 after:-inset-y-0.5 after:-z-1 after:rounded-md hover:after:bg-accent/50 data-dragging:cursor-grabbing data-horizontal:py-2.5 data-vertical:h-full data-vertical:min-h-24 data-vertical:w-auto data-vertical:flex-col data-vertical:py-1.5">
        {/* <div className="bg-primary inset-s-px absolute top-1/2 size-1 -translate-y-1/2 rounded-full" /> */}
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative isolate grow rounded-xl outline-1 -outline-offset-1 outline-input select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1",
            "bg-linear-to-r/longer from-[oklch(64%_.2_0)] to-[oklch(64%_.2_360)]"
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="-z-1 rounded-[inherit] bg-ring select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "flex size-thumb shrink-0 items-center justify-center select-none group-hover/slider:cursor-grab data-dragging:cursor-grabbing",
              "rounded-full has-focus-visible:outline-2 has-focus-visible:outline-ring",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            <div
              className={cn(
                "aspect-square h-thumb rounded-[inherit] bg-white shadow-border-xs outline outline-border transition-[aspect-ratio,box-shadow,width,height,transform,scale] group-hover/slider:transform-[scale(1.1)] dark:-outline-offset-1 dark:outline-background",
                "relative text-center in-data-dragging:aspect-video in-data-dragging:scale-75 in-data-dragging:outline-2"
                // "in-data-dragging:outline-input in-data-dragging:h-[calc(var(--spacing-thumb)-4px)] in-data-dragging:w-[calc(var(--spacing-thumb)+2px)] grid-stack"
              )}
            />
            {/* <SliderPrimitive.Value className="text-muted-foreground text-[10px]/none tabular-nums" /> */}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
      {showValue && props.orientation === "horizontal" && <SliderPrimitive.Value className="text-xs text-muted-foreground tabular-nums" />}
    </SliderPrimitive.Root>
  );
}

export { HueSlider };
