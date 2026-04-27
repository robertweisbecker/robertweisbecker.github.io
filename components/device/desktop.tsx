"use client";

import { cn } from "@/lib/utils";
import { IconBrandApple } from "@tabler/icons-react";
import * as React from "react";

import { BatteryDisplay, SignalDisplay, Time, useBatteryStatus } from "./shared";

export interface DesktopProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  /** Menu bar title (left side). */
  appName?: string;
  /** Show the MacBook-style notch. */
  island?: boolean;
  /** Show the menu bar (Wi‑Fi, battery, clock, app name). */
  toolbar?: boolean;
  /** Pad content below the menu bar when toolbar is on. */
  gutter?: boolean;
}

/**
 * MacBook-style notch.
 *
 * Silhouette is drawn as one element via `clip-path: shape()` (baseline widely
 * available as of 2026 — see /posts/clip-path-curve).
 *
 * The bounding box is 20cqw × 1.8cqw. Layout:
 *   0%..10%   → left outer fillet (concave arc, screen edge → notch wall)
 *   10%..90%  → notch proper (flat top; gently rounded bottom corners)
 *   90%..100% → right outer fillet (mirror)
 *
 * Path (clockwise from top-left):
 *   0% 0%
 *   → hline 100% 0%                            (flat top)
 *   → curve to 90% 100% with 90% 0% / 90% 0%   (right outer fillet, concave)
 *   → curve to 88% 100%                        (tiny inner round, bottom-right)
 *   → hline 12% 100%                           (flat bottom of notch)
 *   → curve to 10% 100%                        (tiny inner round, bottom-left)
 *   → curve to 0% 0% with 10% 0% / 10% 0%      (left outer fillet, concave)
 */
function DesktopNotch() {
  const clipPath =
    "shape(" +
    "from 0% 0%," +
    "hline to 100%," +
    "curve to 90% 100% with 90% 0%/90% 0%," +
    "hline to 10%," +
    "curve to 0% 0% with 10% 0%/10% 0%" +
    ")";

  return (
    <div
      data-slot="device-desktop-notch"
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 z-30 flex h-[1.8cqw] w-[18cqw] -translate-x-1/2 items-start justify-center bg-black"
      style={{ clipPath }}
    >
      {/* Camera dot — sits inside the notch proper (10%..90% of bounding width). */}
      <div className="mt-[0.4cqw] size-[0.35cqw] rounded-full bg-neutral-700 ring-[0.15cqw] ring-black/60" />
    </div>
  );
}

export const Desktop = React.forwardRef<HTMLDivElement, DesktopProps>(function Desktop(
  { className, children, appName = "Finder", island = true, toolbar = true, gutter = false, ...props },
  ref
) {
  const { supported, level, charging } = useBatteryStatus();
  const batteryLoading = supported === true && level === null;
  const batteryLevel = supported ? Math.round((level ?? 0) * 100) : 67;

  return (
    <div ref={ref} data-slot="device-desktop" className={cn("w-full", className)} {...props}>
      <div style={{ containerType: "inline-size" }}>
        {/*
          Thin bezel, flat bottom edge (monitor / kiosk feel):
          top + sides padded, bottom flush. Rounded only on the top corners.
        */}
        <div className="rounded-t-[2cqw] bg-black px-[0.6cqw] pt-[0.6cqw] shadow-lg outline outline-neutral-700/40">
          <div
            data-slot="device-desktop-screen"
            className="relative aspect-16/10 w-full overflow-hidden rounded-t-[1.4cqw] bg-sidebar"
          >
            {toolbar && (
              <div
                className="absolute inset-x-0 top-0 z-20 grid h-[2.4cqw] grid-cols-[1fr_min(22cqw,180px)_1fr] items-center bg-black/30 px-[1.2cqw] text-white backdrop-blur-sm"
                role="presentation"
              >
                <div className="flex min-w-0 items-center gap-[0.5cqw] pe-2">
                  <IconBrandApple className="size-[1.4cqw] shrink-0" aria-hidden />
                  <span className="truncate text-[1.1cqw] font-semibold tabular-nums">{appName}</span>
                </div>
                <div aria-hidden className="min-w-0" />
                <div className="flex min-w-0 items-center justify-end gap-[0.7cqw] ps-2">
                  <SignalDisplay size="desktop" />
                  <Time size="desktop" />
                  <BatteryDisplay
                    size="desktop"
                    level={batteryLevel}
                    charging={Boolean(charging)}
                    loading={batteryLoading}
                  />
                </div>
              </div>
            )}

            {island && <DesktopNotch />}

            <div
              className={cn(
                "absolute inset-0 flex min-h-0 flex-col overflow-hidden",
                gutter && toolbar && "pt-[2.4cqw]",
                gutter && !toolbar && "p-6"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
Desktop.displayName = "Device.Desktop";
