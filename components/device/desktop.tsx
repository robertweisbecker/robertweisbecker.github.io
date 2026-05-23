"use client";

import { cn } from "@/lib/utils";
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

export function Desktop({
  className,
  children,
  appName = "Finder",
  island = true,
  toolbar = true,
  gutter = false,
  ref,
  ...props
}: DesktopProps) {
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
          <div data-slot="device-desktop-screen" className="relative aspect-16/10 w-full overflow-hidden rounded-t-[1.4cqw] bg-sidebar">
            {toolbar && (
              <div
                className="absolute inset-x-0 top-0 z-20 grid h-[2.4cqw] grid-cols-[1fr_min(22cqw,180px)_1fr] items-center bg-black/30 px-[1.2cqw] text-white backdrop-blur-sm"
                role="presentation"
              >
                <div className="flex min-w-0 items-center gap-[0.5cqw] pe-2">
                  <svg viewBox="0 0 814 1000" className="size-[1cqw]">
                    <path
                      fill="currentColor"
                      d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
                    />
                  </svg>
                  <span className="truncate text-[1cqw] font-semibold">{appName}</span>
                </div>
                <div aria-hidden className="min-w-0" />
                <div className="flex min-w-0 items-center justify-end gap-[0.7cqw] ps-2">
                  <SignalDisplay size="desktop" />
                  <Time size="desktop" />
                  <BatteryDisplay size="desktop" level={batteryLevel} charging={Boolean(charging)} loading={batteryLoading} />
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
}
Desktop.displayName = "Device.Desktop";
