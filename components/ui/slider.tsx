"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";

import { cn } from "@/lib/utils";

type SliderGroupProps = SliderPrimitive.Root.Props;

function SliderGroup({ className, defaultValue, value, min = 0, max = 100, children, ...props }: SliderGroupProps) {
  return (
    <SliderPrimitive.Root
      className={cn(
        "group/slider isolate flex items-start justify-start gap-3 data-disabled:opacity-50 data-horizontal:w-full data-vertical:h-full data-vertical:flex-col",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      {children}
    </SliderPrimitive.Root>
  );
}

function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return <SliderPrimitive.Label data-slot="slider-label" className={cn("text-sm font-medium", className)} {...props} />;
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value data-slot="slider-value" className={cn("text-xs text-muted-foreground tabular-nums", className)} {...props} />
  );
}

type SliderControlProps = SliderPrimitive.Control.Props;

function SliderControl({ id, className, ...props }: SliderControlProps) {
  return (
    <SliderPrimitive.Control
      id={id}
      data-slot="slider-control"
      className={cn(
        "relative flex flex-1 touch-none items-center select-none data-dragging:cursor-grabbing",
        "data-horizontal:w-full data-horizontal:min-w-24 data-horizontal:py-2",
        "data-vertical:h-full data-vertical:min-h-button-xs data-vertical:w-auto data-vertical:flex-col data-vertical:px-1.5",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative isolate grow rounded-sm bg-input/25 inset-shadow-xs outline-[0.5px] outline-offset-[-0.5px] outline-input select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
        )}
      >
        <SliderPrimitive.Indicator
          data-slot="slider-range"
          className="-z-1 rounded-[inherit] bg-primary bg-linear-to-b from-white/30 to-white/0 to-40% select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Value render={<span className="contents" />}>
        {(_, values) =>
          values.map((_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              index={index}
              className={cn(
                "group/slider-thumb flex size-thumb shrink-0 items-center justify-center select-none group-hover/slider:cursor-grab data-dragging:cursor-grabbing",
                "rounded-xl has-focus-visible:outline-2 has-focus-visible:outline-ring",
                "disabled:pointer-events-none disabled:opacity-50"
              )}
              style={{ anchorName: `--thumb-${id}` }}
            >
              <div
                className={cn(
                  "relative aspect-square h-thumb rounded-[inherit] bg-white/96 bg-radial-[at_50%_25%] to-black/5 to-90% text-center outline outline-input backdrop-blur-[1px] transition-[aspect-ratio,box-shadow,width,height,transform,scale] dark:outline-background",
                  "group-hover/slider:transform-[scale(1.1)]",
                  "group-active/slider-thumb:scale-80 group-active/slider-thumb:bg-white/84 group-data-dragging/slider-thumb:group-active/slider-thumb:aspect-video group-data-focus/slider-thumb:ring-2 group-data-focus/slider-thumb:ring-ring/50 group-data-focus/slider-thumb:ring-offset-1 group-data-focus/slider-thumb:ring-offset-ring",
                  "shadow-[inset_-1px_0_--alpha(var(--background)/12%),inset_0_-1px_--alpha(var(--background)/12%),inset_-2px_-2px_2px_-3px_white,inset_0_1px_--alpha(var(--background)/24%),inset_1px_0_--alpha(var(--background)/16%),inset_4px_4px_1px_-5px_white,inset_0_0_0_2px_--alpha(#000/1%),var(--shadow-md)]",
                  "group-data-dragging/slider-thumb:group-active/slider-thumb:bg-glass"
                )}
              />
            </SliderPrimitive.Thumb>
          ))
        }
      </SliderPrimitive.Value>
    </SliderPrimitive.Control>
  );
}

type SliderProps = SliderGroupProps & {
  label?: React.ReactNode;
  showValue?: boolean;
};

function SliderSingle({ className, defaultValue, value, min = 0, max = 100, showValue, label, ...props }: SliderProps) {
  return (
    <SliderGroup className={className} defaultValue={defaultValue} value={value} min={min} max={max} {...props}>
      {label ? <SliderLabel>{label}</SliderLabel> : null}
      {showValue && props.orientation === "vertical" && <SliderValue className="inline" />}
      <SliderControl />
      {showValue && props.orientation === "horizontal" && <SliderValue />}
    </SliderGroup>
  );
}

const Slider = Object.assign(SliderSingle, {
  Group: SliderGroup,
  Label: SliderLabel,
  Value: SliderValue,
  Control: SliderControl,
});

export { Slider, SliderControl, SliderGroup, SliderLabel, SliderValue };
export type { SliderControlProps, SliderGroupProps, SliderProps };
