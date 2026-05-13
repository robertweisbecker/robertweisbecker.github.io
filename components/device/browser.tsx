"use client";

import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight, IconDots, IconRefresh } from "@tabler/icons-react";
import * as React from "react";

import { CopyButton } from "@/components/ui/copy-button";

import { TrafficLights } from "./shared";

export interface BrowserNavBarProps extends React.ComponentProps<"div"> {
  address?: React.ReactNode;
  /**
   * Controls the NavBar's flex behavior. Defaults to `"flex-1"` so it fills
   * a row shared with TrafficLights. Use `"standalone"` when the NavBar is
   * the sole row (e.g. inside `Browser.Window`).
   */
  layout?: "flex-1" | "standalone";
}

export function BrowserNavBar({ className, address = "vercel.com", layout = "flex-1", ref, ...props }: BrowserNavBarProps) {
  return (
    <div
      ref={ref}
      data-slot="device-browser-navbar"
      className={cn(
        "flex w-full items-center gap-2 px-2 py-2 @md:px-3 @md:py-2.5",
        layout === "flex-1" && "min-w-0 flex-1 basis-xs",
        className
      )}
      {...props}
    >
      <div className="hidden shrink-0 items-center gap-2 opacity-50 @[360px]:flex">
        <IconArrowLeft strokeWidth={2.5} className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <IconArrowRight strokeWidth={2.5} className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <IconRefresh strokeWidth={2.5} className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </div>

      <div className="relative flex min-w-0 flex-1 items-center rounded-md bg-foreground/5 px-1 py-0.5">
        <span className="flex min-w-0 flex-1 gap-[.25em] truncate px-1 text-xs text-muted-foreground/50">
          https:// <span className="text-foreground">{address}</span>
        </span>
        <CopyButton value={String(address)} size="icon-xs" className="shrink-0" />
      </div>

      <IconDots className="hidden size-4 shrink-0 text-muted-foreground @[360px]:inline-block" aria-hidden />
    </div>
  );
}
BrowserNavBar.displayName = "Device.Browser.NavBar";

export interface BrowserWindowProps extends React.ComponentProps<"div"> {
  /** Show the navigation/address bar. */
  toolbar?: boolean;
  address?: React.ReactNode;
  /** Pad the content area. */
  gutter?: boolean;
  /** Replace the default NavBar when `toolbar` is false. */
  chrome?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * `Browser.Window` renders a NavBar (or custom chrome) plus a content area.
 * Use it inside a `ChromeTabs.Panel` when composing tabbed browser UIs,
 * or directly inside `Browser` when you don't need tabs.
 *
 * The NavBar sits on `bg-card` (so active tabs merge into it); the content
 * area sits on `bg-background` (matches non-tabbed Browser visual).
 */
export function BrowserWindow({
  className,
  toolbar = true,
  address = "vercel.com",
  gutter = false,
  chrome,
  children,
  ref,
  ...props
}: BrowserWindowProps) {
  return (
    <div
      ref={ref}
      data-slot="device-browser-window"
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      {...props}
    >
      {toolbar ? (
        <div className="bg-card">
          <BrowserNavBar address={address} layout="standalone" />
        </div>
      ) : chrome ? (
        <div className="bg-card">{chrome}</div>
      ) : null}
      <div className={cn("min-h-0 flex-1 bg-background", gutter && "p-6")}>{children}</div>
    </div>
  );
}
BrowserWindow.displayName = "Device.Browser.Window";

export interface BrowserProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  /** Show the NavBar inside the default Window. Ignored when `tabs` is provided. */
  toolbar?: boolean;
  address?: React.ReactNode;
  gutter?: boolean;
  /**
   * Optional `<ChromeTabs.List>` (or any node) rendered below the traffic lights,
   * inside the outer chrome. When provided, `children` should be the tabs' panels —
   * typically each panel contains its own `<Browser.Window>`.
   */
  tabs?: React.ReactNode;
  /** When `toolbar` is false and `tabs` is absent, slot custom chrome beside traffic lights. */
  chrome?: React.ReactNode;
}

function BrowserRoot({
  className,
  children,
  toolbar = true,
  address = "vercel.com",
  gutter = false,
  tabs,
  chrome,
  ref,
  ...props
}: BrowserProps) {
  return (
    <div ref={ref} data-slot="device-browser" className={cn("w-full", className)} {...props}>
      <div style={{ containerType: "inline-size" }}>
        <div className="overflow-hidden rounded-xl bg-background shadow-border-md">
          {tabs ? (
            <>
              {/*
                Traffic lights share a row with the tab list.
                Row uses `bg-muted` so ChromeTabs.Tab's `data-active:bg-card` pops visually
                and curves into the Browser.Window NavBar (also `bg-card`) below.
              */}
              <div className="flex items-stretch gap-x-3 bg-muted px-2 pt-2 @md:px-3 @md:pt-2.5">
                <TrafficLights className="pt-1" />
                <div className="min-w-0 flex-1">{tabs}</div>
              </div>
              {children}
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-card">
                <TrafficLights className="ps-2 pt-2 @md:ps-3 @md:pt-2.5" />
                {toolbar ? <BrowserNavBar address={address} /> : chrome}
              </div>
              <div className={cn(gutter && "p-6")}>{children}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

BrowserRoot.displayName = "Device.Browser";

export const Browser = Object.assign(BrowserRoot, {
  NavBar: BrowserNavBar,
  Window: BrowserWindow,
});
