"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { ArrowRotateLeft } from "@gravity-ui/icons";

export {
  MotionText,
  MotionTextEffect,
  MotionTextLoop,
  MotionTextMorph,
  MotionTextReveal,
  MotionTextScramble,
  MotionTextWave,
  TextReveal,
} from "./MotionText";

// //
//  Pixel Filter
//  //

interface PixelFilterProps {
  id: string;
  size?: number;
  crossLayers?: boolean;
}

const PIXEL_REVEAL_DEFAULT_SIZE = 12;

export function PixelFilter({ id = "pixel-filter", size = 16, crossLayers = false }: PixelFilterProps) {
  return (
    <svg className="absolute inset-0">
      <defs>
        <filter id={id} x="0" y="0" width="1" height="1">
          {"First layer: Normal pixelation effect"}
          <feConvolveMatrix
            kernelMatrix="1 1 1
                          1 1 1
                          1 1 1"
            result="AVG"
          />
          <feFlood x="1" y="1" width="1" height="1" />
          <feComposite operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width={size} height={size} />
          <feTile result="TILE" />
          <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
          <feMorphology operator="dilate" radius={size / 2} result={"NORMAL"} />
          {crossLayers && (
            <>
              {"Second layer: Fallback with full-width tiling"}
              <feConvolveMatrix
                kernelMatrix="1 1 1
                              1 1 1
                              1 1 1"
                result="AVG"
              />
              <feFlood x="1" y="1" width="1" height="1" />
              <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width={size / 2} height={size} />
              <feTile result="TILE" />
              <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
              <feMorphology operator="dilate" radius={size / 2} result={"FALLBACKX"} />
              {"Third layer: Fallback with full-height tiling"}
              <feConvolveMatrix
                kernelMatrix="1 1 1
                              1 1 1
                              1 1 1"
                result="AVG"
              />
              <feFlood x="1" y="1" width="1" height="1" />
              <feComposite in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="0" k4="0" width={size} height={size / 2} />
              <feTile result="TILE" />
              <feComposite in="AVG" in2="TILE" operator="in" k1="0" k2="1" k3="0" k4="0" />
              <feMorphology operator="dilate" radius={size / 2} result={"FALLBACKY"} />
              <feMerge>
                <feMergeNode in="FALLBACKX" />
                <feMergeNode in="FALLBACKY" />
                <feMergeNode in="NORMAL" />
              </feMerge>
            </>
          )}
          {!crossLayers && <feMergeNode in="NORMAL" />}
        </filter>
      </defs>
    </svg>
  );
}

export function PixelReveal({
  children,
  className,
  duration = 1,
  resetButton = false,
  ...props
}: React.ComponentProps<"div"> & { resetButton?: boolean; duration?: number }) {
  const id = React.useId();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pixelSize = useMotionValue(16);
  const [size, setSize] = React.useState(16);
  const [isAnimating, setIsAnimating] = React.useState(true);
  const [resetKey, setResetKey] = React.useState(0);

  useMotionValueEvent(pixelSize, "change", (latest) => {
    setSize(latest);
  });

  const replay = React.useCallback(() => {
    setIsAnimating(true);
    setResetKey((k) => k + 1);
  }, []);

  React.useEffect(() => {
    pixelSize.set(PIXEL_REVEAL_DEFAULT_SIZE);

    const controls = animate(pixelSize, 4, {
      duration: duration,
      ease: "easeIn",
      onComplete: () => setIsAnimating(false),
    });
    return controls.stop;
  }, [duration, pixelSize, resetKey]);

  return (
    <div ref={containerRef} {...props} className={cn("group relative", className)}>
      {isAnimating && <PixelFilter id={`${id}-pixel-filter`} size={size} />}
      {resetButton ? (
        <Button
          onClick={replay}
          size="icon-xs"
          disabled={isAnimating}
          variant="secondary"
          className={cn(
            isAnimating && "hidden",
            "squircle absolute inset-e-1 bottom-1 scale-95 opacity-0 transition-transform duration-100 ease-out-quad group-hover:scale-100 group-hover:opacity-100"
          )}
        >
          <ArrowRotateLeft />
        </Button>
      ) : null}
      <div
        className="animate-fade-in supports-[(hanging-punctuation:_first)_and_(font:_-apple-system-body)_and_(-webkit-appearance:_none)]:filter-none!"
        style={{
          filter: isAnimating ? `url(#${id}-pixel-filter)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function GlitchFilter({ offsetX = 1, offsetY = 1, id }: { offsetX?: number; offsetY?: number; id?: string }) {
  return (
    <svg width="0" height="0">
      <filter id={`glitch-${id}`}>
        <feOffset in="SourceGraphic" dx={offsetX} dy={offsetY} result="layer-one" />
        <feComponentTransfer in="layer-one" result="red">
          <feFuncR type="identity" />
          <feFuncG type="discrete" tableValues="0" />
          <feFuncB type="discrete" tableValues="0" />
        </feComponentTransfer>

        <feOffset in="SourceGraphic" dx={offsetX * -1} dy={offsetY * -1} result="layer-two" />
        <feComponentTransfer in="layer-two" result="cyan">
          <feFuncR type="discrete" tableValues="0" />
          <feFuncG type="identity" />
          <feFuncB type="identity" />
        </feComponentTransfer>

        <feBlend in="red" in2="cyan" mode="screen" result="color-split" />
      </filter>
    </svg>
  );
}
