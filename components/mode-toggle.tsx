"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { motion, useReducedMotion } from "motion/react";

interface ModeToggleProps extends Omit<React.ComponentProps<typeof Button>, "children"> {
  label?: React.ReactNode;
}

export function ModeToggle({ label, className, size = "icon-sm", variant = "ghost", onClick, ...props }: ModeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const icon = mounted ? (resolvedTheme === "dark" ? "moon" : "sun") : "sun";

  function handleClick(event: Parameters<NonNullable<React.ComponentProps<typeof Button>["onClick"]>>[0]) {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="Toggle mode"
        className={cn(className)}
        render={<Button type="button" variant={variant} size={size} onClick={handleClick} {...props} />}
      >
        <SunMoonIcon icon={icon} className="size-[16.5px]" />
        {label}
      </TooltipTrigger>
      <TooltipContent>Toggle mode</TooltipContent>
    </Tooltip>
  );
}

// [sunX, sunY, moonX, moonY]
const RECT_MAP: Array<[number, number, number, number]> = [
  [2, 4, 7, 8],
  [2, 5, 8, 7],
  [2, 6, 5, 7],
  [3, 3, 1, 4],
  [2, 2, 5, 2],
  [9, 1, 8, 1],
  [1, 1, 9, 2],
  [1, 9, 7, 2],
  [9, 9, 8, 3],
  [5, 10, 4, 9],
  [5, 0, 3, 9],
  [10, 5, 5, 9],
  [0, 5, 6, 9],
  [8, 8, 4, 3],
  [3, 7, 3, 4],
  [4, 2, 3, 2],
  [5, 2, 2, 3],
  [6, 2, 4, 2],
  [4, 8, 3, 5],
  [5, 8, 4, 6],
  [6, 8, 1, 5],
  [7, 3, 2, 8],
  [8, 2, 1, 7],
  [2, 8, 1, 6],
  [7, 7, 6, 7],
  [8, 4, 7, 6],
  [8, 5, 8, 5],
  [8, 6, 8, 6],
];

function SunMoonIcon({ icon = "sun", className }: { icon?: "sun" | "moon"; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", display: "block" }}
      className={className}
    >
      {RECT_MAP.map(([sx, sy, mx, my], i) => (
        <motion.rect
          key={i}
          width={1}
          height={1}
          fill="currentColor"
          initial={false}
          animate={{
            x: icon === "moon" ? mx : sx,
            y: icon === "moon" ? my : sy,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            ease: "linear",
            delay: reduceMotion ? 0 : i * 0.01,
          }}
        />
      ))}
    </svg>
  );
}
