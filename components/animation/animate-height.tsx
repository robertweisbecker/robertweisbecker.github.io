"use client";

import { useMeasure } from "@uidotdev/usehooks";
import { motion, type HTMLMotionProps } from "motion/react";
import * as React from "react";

export type AnimateHeightProps = Omit<HTMLMotionProps<"div">, "animate" | "children" | "exit" | "initial"> &
  React.PropsWithChildren<{
    /** Whether the wrapper should animate to its measured content height. */
    open?: boolean;
    /** Height used for the initial, closed, and exit states. Percentages resolve against the measured content height. */
    initialHeight?: React.CSSProperties["height"];
    /** Class applied to the measured inner wrapper. */
    innerClassName?: string;
  }>;

function resolveHeightValue(value: React.CSSProperties["height"], measuredHeight: number) {
  if (typeof value !== "string") return value;

  const percentage = value.trim().match(/^(-?\d*\.?\d+)%$/);

  if (!percentage) return value;

  return Math.max(0, (measuredHeight * Number(percentage[1])) / 100);
}

export function AnimateHeight({
  children,
  className,
  innerClassName,
  initialHeight = 0,
  open = true,
  style,
  transition = { type: "spring", stiffness: 360, damping: 36, mass: 0.8 },
  ...props
}: AnimateHeightProps) {
  const [measureRef, { height = 0 }] = useMeasure<HTMLDivElement>();
  const measuredHeight = Math.ceil(height ?? 0);
  const resolvedInitialHeight = resolveHeightValue(initialHeight, measuredHeight);

  return (
    <motion.div
      data-slot="animate-height"
      className={className}
      initial={{ height: resolvedInitialHeight }}
      animate={{ height: open ? measuredHeight : resolvedInitialHeight }}
      exit={{ height: resolvedInitialHeight }}
      transition={transition}
      style={{ ...style, overflowY: "hidden" }}
      {...props}
    >
      <div ref={measureRef} className={innerClassName}>
        {children}
      </div>
    </motion.div>
  );
}
