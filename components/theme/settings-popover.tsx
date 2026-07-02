"use client";

import { IconWheel } from "@tabler/icons-react";
import type * as React from "react";
import { LinkButton } from "@/components/ui/link-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ThemeResetAllButton, ThemeSettingsPanel } from "./settings-fields";

export function ThemeSettingsPopover({ className, ...props }: Omit<React.ComponentProps<typeof Button>, "aria-label">) {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" {...props} aria-label="Theme settings" />} className={cn(className)}>
        <span className="size-4 shrink-0 rounded-full bg-conic/longer from-red-400 to-pink-400 text-background inset-ring inset-ring-border transition-[rotate] duration-400 ease-in-out-quad in-data-popup-open:rotate-720">
          <IconWheel strokeWidth={1.5} />
        </span>
        Theme
      </PopoverTrigger>
      <PopoverContent align="end" className="w-xs overflow-hidden">
        <PopoverHeader>
          <PopoverTitle>Theme</PopoverTitle>
          <PopoverDescription>Adjust the theme to your heart&apos;s content.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <LinkButton variant="link" href="/posts/theming">
            How it works
          </LinkButton>
          <span className="text-muted-foreground" aria-hidden>
            &middot;
          </span>
          <LinkButton variant="link" href="/oklch-colors#palettes">
            View palettes
          </LinkButton>
        </div>
        <Separator />
        <ThemeSettingsPanel />
        <PopoverFooter>
          <ThemeResetAllButton variant="outline" size="md" className="w-full flex-1" />
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
