"use client";

import { cn } from "@/lib/utils";
import {
  IconAntennaBars5,
  IconArrowLeft,
  IconArrowRight,
  IconBatteryFilled,
  IconBoltFilled,
  IconChevronLeft,
  IconDots,
  IconRefresh,
  IconWifi,
} from "@tabler/icons-react";
import * as React from "react";
import { CopyButton } from "./ui/copy-button";
import { Skeleton } from "./ui/skeleton";
import { useBattery } from "@uidotdev/usehooks";

const glassClass =
  "flex items-center justify-center rounded-full bg-radial-[at_50%_-50%] from-card/60 to-popover/30 bg-cover  text-foreground/80 shadow-[0px_1px_20px_-1px_rgba(0,0,0,0.04),0px_0.65px_5px_rgba(0,0,0,0.12),inset_0.65px_0.65px_1px_-0.65px_rgba(255,255,255,0.8),inset_-0.65px_-0.65px_2px_-0.65px_rgba(255,255,255,0.4),0px_1px_.5px_1px_rgba(0,0,0,0.02),var(--shadow-sm)] backdrop-blur-xs bg-blend-difference";
const glassCircleClass = "rounded-full h-[12cqw] w-[12cqw]";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function formatTime(date: Date) {
  return timeFormatter.format(date).replace(/\s?(AM|PM)$/i, "");
}
function useCurrentTime() {
  const [time, setTime] = React.useState<string | null>(null);
  React.useEffect(() => {
    function update() {
      setTime(formatTime(new Date()));
    }
    update();
    const id = window.setInterval(update, 60_000);
    return () => {
      window.clearInterval(id);
    };
  }, []);

  return time;
}

export interface PhoneProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  island?: boolean;
  toolbar?: boolean;
  address?: React.ReactNode;
  indicator?: boolean;
  gutter?: boolean;
}

function BatteryDisplay({
  loading,
  supported,
  level,
  charging,
}: {
  loading: boolean;
  supported: boolean;
  level: number;
  charging: boolean;
}) {
  const batteryLevel = supported ? Math.round((level ?? 0) * 100) : 67;
  const batteryColor = batteryLevel > 50 ? "var(--success-primary)" : "var(--warning-primary)";
  return (
    <div className="z-1 -me-[.125em] flex items-center font-[system-ui] text-[2.4cqw] font-bold tracking-tighter text-white">
      {loading ? (
        <Skeleton className="absolute inset-0 rounded-sm" />
      ) : (
        <>
          {batteryLevel} {charging && <IconBoltFilled className="size-[.9em] scale-y-110" />}
        </>
      )}
    </div>
  );
}

function Phone({ className, children, island = true, toolbar = true, address = "bob.fyi", gutter = false, ...props }: PhoneProps) {
  const time = useCurrentTime();
  const hasTopGutter = gutter && island;
  const hasBottomGutter = gutter && toolbar;
  const { loading, supported, level, charging } = useBattery();
  const batteryLevel = supported ? Math.round((level ?? 0) * 100) : 67;
  const batteryColor = batteryLevel > 50 ? "var(--color-foreground)" : "var(--color-yellow-400)";

  return (
    <div data-slot="device-frame" className={cn("mx-auto w-full max-w-sm", className)} {...props}>
      <div style={{ containerType: "inline-size" }}>
        <div className="relative w-full bg-black p-[2.5%] shadow-lg outline-2 outline-neutral-600/40 [&]:rounded-[15cqw]">
          <div className="relative aspect-9/19.5 overflow-hidden [&]:rounded-[calc(15cqw-2.5cqw)]">
            <div className="border/50 absolute inset-0 rounded-[inherit] border bg-sidebar" />
            <div className={cn("absolute inset-0", hasTopGutter && "pt-[10%]", hasBottomGutter && "pb-[15%]")}>{children}</div>
            <div className="via-smooth pointer-events-none absolute inset-x-0 bottom-0 h-[20%] w-full bg-linear-to-b from-transparent via-black/10 via-30% to-black/25 bg-blend-multiply" />
          </div>

          {island && (
            <>
              <div className="absolute inset-x-[10%] top-[3%] flex items-center justify-between">
                <div
                  className="relative min-h-[1em] w-[25%] text-center font-[system-ui] text-[3.67cqw] leading-none font-semibold"
                  style={{ fontFeatureSettings: "normal" }}
                >
                  {time ?? <Skeleton className="mx-auto h-4 w-[3.5ch]" />}
                </div>
                <div className="flex items-center gap-[1cqw] text-[6cqw]">
                  <IconAntennaBars5
                    className="**:[path]:nth-child(3):opacity-30 size-[1em] scale-x-125 **:[path]:last:opacity-30"
                    strokeWidth={2.5}
                  />
                  <IconWifi className="size-[1em]" strokeWidth={2.5} />
                  <div className="grid-stack aspect-square">
                    <div
                      className="z-1 flex items-center self-center text-[2.5cqw] font-bold tracking-[-5%]"
                      style={{ color: charging ? "var(--color-foreground)" : "var(--color-background)" }}
                    >
                      {loading ? (
                        <span className="relative inline-block min-h-[1em] w-[2ch]">
                          <Skeleton className="absolute inset-0 rounded-sm" />
                        </span>
                      ) : (
                        <>
                          {batteryLevel} {charging && <IconBoltFilled className="mx-[-0.08em] size-[.875em] scale-x-90 scale-y-120" />}
                        </>
                      )}
                    </div>
                    <IconBatteryFilled className="size-[7cqw] origin-center scale-x-120 text-input bg-blend-difference" strokeWidth={2} />
                    <IconBatteryFilled
                      className="size-[7cqw] origin-center scale-x-120"
                      style={{
                        maskImage: `linear-gradient(to left, transparent 0%, transparent ${100 - batteryLevel}%, currentColor ${100 - batteryLevel}%, currentColor 100%)`,
                        fill: charging ? "var(--color-green-400)" : batteryColor,
                      }}
                      strokeWidth={2}
                    />
                  </div>
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
              <div className={cn(glassClass, glassCircleClass)}>
                <IconChevronLeft className="-ml-[1cqw] size-10 max-h-[6cqw] max-w-[6cqw]" aria-hidden />
              </div>
              <div className={cn(glassClass, "relative h-[12cqw] w-auto min-w-0 flex-1 gap-[1cqw]")}>
                <span className="block w-full truncate px-4 text-center text-[4.5cqw] text-foreground">{address}</span>
                <CopyButton
                  value={address as string}
                  size="icon"
                  className="absolute top-[2cqw] left-[2cqw] size-[8cqw]! rounded-full **:[svg]:h-[5cqw]!"
                />
              </div>
              <div className={cn(glassClass, glassCircleClass)}>
                <IconDots className="size-[6cqw]" aria-hidden />
              </div>
            </div>
          )}

          <div className="absolute top-[15%] -left-1 h-[3.5%] w-0.5 rounded-tl-full rounded-bl-full bg-neutral-700/50" aria-hidden />
          <div className="absolute top-[23.4%] -left-1 h-[7.1%] w-0.5 rounded-tl-full rounded-bl-full bg-neutral-700/50" aria-hidden />
          <div className="absolute top-[32.4%] -left-1 h-[7.1%] w-0.5 rounded-tl-full rounded-bl-full bg-neutral-700/50" aria-hidden />
          <div className="absolute top-[28.2%] -right-1 h-[11%] w-0.5 rounded-tr-full rounded-br-full bg-neutral-600/50" aria-hidden />
        </div>
      </div>
    </div>
  );
}

export interface BrowserProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  /** Show the toolbar with navigation buttons and address bar */
  toolbar?: boolean;
  /** Content shown in the address bar */
  address?: React.ReactNode;
  /** Add padding so content doesn't sit flush against the header */
  gutter?: boolean;
}

function Browser({ className, children, toolbar = true, address = "vercel.com", gutter = false, ...props }: BrowserProps) {
  return (
    <div data-slot="device-frame" className={cn("w-full", className)} {...props}>
      <div style={{ containerType: "inline-size" }}>
        <div className="squircle overflow-hidden rounded-2xl bg-popover shadow-border-md">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-2 py-2 md:px-3 md:py-2.5">
            <div className="flex shrink-0 items-center gap-1.5 self-start pe-1 md:self-center md:ps-1">
              <div className="aspect-square size-3 shrink-0 rounded-full bg-[#ff5f56] inset-ring inset-ring-border/50" />
              <div className="aspect-square size-3 shrink-0 rounded-full bg-[#ffbd2e] inset-ring inset-ring-border/50" />
              <div className="aspect-square size-3 shrink-0 rounded-full bg-[#27c93f] inset-ring inset-ring-border/50" />
            </div>

            {toolbar && (
              <div className="flex flex-1 basis-xs items-center justify-between gap-2">
                <div
                  className={cn(
                    "flex h-full shrink-0 items-center gap-2 pe-2 opacity-50 max-md:hidden"
                    // glassClass
                  )}
                >
                  <IconArrowLeft strokeWidth={2} className={"size-4 text-muted-foreground"} aria-hidden />
                  <IconArrowRight strokeWidth={2} className={"size-4 text-muted-foreground"} aria-hidden />
                  {/* <IconRefresh strokeWidth={2} className={"size-4 text-muted-foreground"} aria-hidden /> */}
                </div>

                <div className="squircle relative mx-auto flex h-button-sm max-w-md flex-1 items-center rounded-lg bg-accent p-1">
                  <span className="flex min-w-0 flex-1 gap-[.25em] truncate px-1.5 text-xs text-muted-foreground/50">
                    https:// <span className="text-foreground">{address}</span>
                  </span>
                  <CopyButton value={String(address)} size="icon-xs" className="squircle shrink-0 rounded-md" />
                </div>
                <div className="flex w-16 justify-end max-md:hidden md:me-1">
                  <IconDots className={cn("size-4 text-muted-foreground", "shrink-0")} aria-hidden />
                </div>
              </div>
            )}
          </div>

          <div className={cn(gutter && "p-6")}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const DeviceFrame = { Phone, Browser };
