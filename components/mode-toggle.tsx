"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconMoonFilled, IconSunHighFilled } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { PixelSunIcon, PixelMoonIcon } from "./icons";

export function ModeToggle(props: React.ComponentProps<typeof TooltipTrigger>) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="Toggle mode"
        className={cn(props.className)}
        {...props}
        render={<Button variant="ghost" size="icon-sm" />}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <PixelSunIcon className="dark:hidden" />
        <PixelMoonIcon className="hidden dark:block" />
      </TooltipTrigger>
      <TooltipContent>Toggle mode</TooltipContent>
    </Tooltip>
  );
}
