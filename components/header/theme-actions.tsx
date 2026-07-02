"use client";

import dynamic from "next/dynamic";
import { IconWheel } from "@tabler/icons-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { responsiveNavButtonSize } from "@/components/ui/button-variants";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const ThemeSettingsPopover = dynamic(() => import("@/components/theme/settings-popover").then((mod) => mod.ThemeSettingsPopover), {
  loading: () => (
    <Button variant="ghost" size="sm" className={cn("rounded-full", responsiveNavButtonSize)} aria-label="Theme settings">
      <span className="size-4 shrink-0 rounded-full bg-conic/longer from-red-400 to-pink-400 text-background inset-ring inset-ring-border">
        <IconWheel strokeWidth={1.5} className="size-4" />
      </span>
      Theme
    </Button>
  ),
});

export function ThemeActions() {
  return (
    <>
      <Separator orientation="vertical" className="h-4" />
      <ThemeSettingsPopover className={cn("rounded-full", responsiveNavButtonSize)} size="sm" />
      <ModeToggle size="icon-sm" className={cn("rounded-full", responsiveNavButtonSize)} variant="ghost" />
    </>
  );
}
