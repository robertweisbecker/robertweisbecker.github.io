"use client";

import { PixelMorph } from "@/components/pixel-morph";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ModeToggleProps extends Omit<React.ComponentProps<typeof Button>, "children"> {
  label?: boolean;
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
        className={cn("capitalize", className)}
        render={<Button variant={variant} size={size} onClick={handleClick} {...props} />}
      >
        <PixelMorph
          data-icon={label ? "inline-start" : ""}
          from="PixelSunSmallIcon"
          to="PixelMoon2Icon"
          active={icon === "moon"}
          strategy="radial"
          animation="ease"
          duration={0.5}
          stagger={0.025}
          scale={1}
        />
        {label && (
          <span suppressHydrationWarning className="min-w-[5ch]">
            {resolvedTheme === "dark" ? "Dark" : "Light"}
          </span>
        )}
      </TooltipTrigger>
      <TooltipContent>Toggle mode</TooltipContent>
    </Tooltip>
  );
}
