"use client";

import { cn } from "@/lib/utils";
import { IconChevronLeft, IconDots } from "@tabler/icons-react";
import * as React from "react";

import { CopyButton } from "@/components/ui/copy-button";

import { BatteryDisplay, SideButtons, SignalDisplay, Time, useBatteryStatus } from "./shared";

const glassClass =
  "flex h-[12cqw] w-[12cqw] items-center justify-center rounded-full bg-radial-[at_50%_-50%] from-card/60 to-popover/30 bg-cover  text-foreground/80 shadow-[0px_1px_20px_-1px_rgba(0,0,0,0.04),0px_0.65px_5px_rgba(0,0,0,0.12),inset_0.65px_0.65px_1px_-0.65px_rgba(255,255,255,0.8),inset_-0.65px_-0.65px_2px_-0.65px_rgba(255,255,255,0.4),0px_1px_.5px_1px_rgba(0,0,0,0.02),var(--shadow-sm)] backdrop-blur-xs bg-blend-difference";

export interface PhoneProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  island?: boolean;
  toolbar?: boolean;
  address?: React.ReactNode;
  indicator?: boolean;
  gutter?: boolean;
}

export function Phone({
  className,
  children,
  island = true,
  toolbar = true,
  address = "bob.fyi",
  gutter = false,
  ref,
  ...props
}: PhoneProps) {
  const hasTopGutter = gutter && island;
  const hasBottomGutter = gutter && toolbar;
  const { supported, level, charging } = useBatteryStatus();
  const batteryLoading = supported === true && level === null;
  const batteryLevel = supported ? Math.round((level ?? 0) * 100) : 67;

  return (
    <div ref={ref} data-slot="device-phone" className={cn("mx-auto w-full max-w-sm", className)} {...props}>
      <div style={{ containerType: "inline-size" }}>
        <div className="relative w-full bg-black p-[2.5%] shadow-lg outline-2 outline-neutral-600/40 [&]:rounded-[15cqw]">
          <div className="relative aspect-9/19.5 overflow-hidden [&]:rounded-[calc(15cqw-2.5cqw)]">
            <div className="border/50 absolute inset-0 rounded-[inherit] border bg-sidebar" />
            <div className={cn("absolute inset-0", hasTopGutter && "pt-[10%]", hasBottomGutter && "pb-[15%]")}>
              {children}
            </div>
            <div className="via-smooth pointer-events-none absolute inset-x-0 bottom-0 h-[20%] w-full bg-linear-to-b from-transparent via-black/10 via-30% to-black/25 bg-blend-multiply" />
          </div>

          {island && (
            <>
              <div className="absolute inset-x-[10%] top-[3%] flex items-center justify-between">
                <Time size="phone" className="w-[25%] text-center text-white" />
                <div className="flex items-center gap-1">
                  <SignalDisplay size="phone" />
                  <BatteryDisplay
                    size="phone"
                    level={batteryLevel}
                    charging={Boolean(charging)}
                    loading={batteryLoading}
                  />
                </div>
              </div>
              <div
                className="absolute top-[2.5%] left-1/2 box-border flex h-[4%] w-[30%] -translate-x-1/2 transform items-center justify-between rounded-full bg-neutral-975 px-2 shadow-border-xs outline-[0.5px] -outline-offset-3 outline-neutral-700"
                aria-hidden
              >
                <div className="aspect-square h-[50%] rounded-full bg-linear-to-br from-neutral-900 to-neutral-800 p-[2%] shadow-border-xs ring ring-black dark:opacity-50">
                  <div
                    className="size-full rounded-full bg-foreground/5 mix-blend-plus-darker"
                    style={{
                      backgroundImage:
                        "radial-gradient(farthest-corner at 20% 20%,#6074bf 0,transparent 40%),radial-gradient(farthest-corner at 80% 80%,#513785 0,#24555e 20%,transparent 50%)",
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {toolbar && (
            <div
              className="absolute bottom-[3.5%] left-0 flex w-full items-center justify-between gap-2 px-[7%]"
              role="img"
              aria-label="Device navigation"
            >
              <div className={glassClass}>
                <IconChevronLeft className="-ml-[1cqw] size-10 max-h-[6cqw] max-w-[6cqw]" aria-hidden />
              </div>
              <div className={cn(glassClass, "relative h-[12cqw] w-auto min-w-0 flex-1 gap-[1cqw]")}>
                <span className="block w-full truncate px-4 text-center text-[4.5cqw] text-foreground">{address}</span>
                <CopyButton
                  value={address as string}
                  size="icon"
                  className="absolute top-[2cqw] left-[2cqw] size-[8cqw]! rounded-full [&>svg]:size-[6cqw]!"
                />
              </div>
              <div className={glassClass}>
                <IconDots className="size-[6cqw]" aria-hidden />
              </div>
            </div>
          )}

          <SideButtons />
        </div>
      </div>
    </div>
  );
}
Phone.displayName = "Device.Phone";
