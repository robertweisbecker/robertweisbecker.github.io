"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import { cn } from "@/lib/utils";

type MorphIconName = keyof typeof morphIcons;
type MorphIconLine = { x1: number; y1: number; x2: number; y2: number; opacity: number };
type MorphIconData = Record<string, MorphIconLine[]>;

const morphIcons: MorphIconData = {
  none: [
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
  ],
  filter: [
    { x1: 2, y1: 4, x2: 12, y2: 4, opacity: 1 },
    { x1: 4, y1: 7, x2: 10, y2: 7, opacity: 1 },
    { x1: 6, y1: 10, x2: 8, y2: 10, opacity: 1 },
  ],
  chevronRight: [
    { x1: 5, y1: 3, x2: 9, y2: 7, opacity: 1 },
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
    { x1: 5, y1: 11, x2: 9, y2: 7, opacity: 1 },
  ],
  chevronLeft: [
    { x1: 9, y1: 11, x2: 5, y2: 7, opacity: 1 },
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
    { x1: 9, y1: 3, x2: 5, y2: 7, opacity: 1 },
  ],
  chevronDown: [
    { x1: 7, y1: 5, x2: 7, y2: 9, opacity: 1 },
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
    { x1: 7, y1: 11, x2: 7, y2: 5, opacity: 1 },
  ],
  chevronUp: [
    { x1: 7, y1: 9, x2: 7, y2: 5, opacity: 1 },
    { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
    { x1: 7, y1: 3, x2: 7, y2: 9, opacity: 1 },
  ],
};

export function MorphIcon({
  from = "filter",
  to = "chevronRight",
  active,
  className,
}: {
  from?: MorphIconName;
  to?: MorphIconName;
  active?: boolean;
} & React.ComponentProps<"svg">) {
  const lines = active ? morphIcons[to] : morphIcons[from];

  return (
    <LazyMotion features={domAnimation}>
      <m.svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={cn("block overflow-visible", className)} aria-hidden>
        {lines.map((line, index) => (
          <m.line
            key={index}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            initial={false}
            animate={line}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 38,
              mass: 0.7,
            }}
          />
        ))}
      </m.svg>
    </LazyMotion>
  );
}
