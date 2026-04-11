"use client";

import { cn } from "@/lib/utils";
import { IconAntennaBars5, IconBatteryFilled, IconChevronLeft, IconDots, IconWifi } from "@tabler/icons-react";
import * as React from "react";
import { CopyButton } from "./ui/copy-button";

const glassClass =
  "flex h-[12cqw] w-[12cqw] items-center justify-center rounded-full bg-radial-[at_50%_-50%] from-card/60 to-popover/30 bg-cover  text-foreground/80 shadow-[0px_1px_20px_-1px_rgba(0,0,0,0.04),0px_0.65px_5px_rgba(0,0,0,0.12),inset_0.65px_0.65px_1px_-0.65px_rgba(255,255,255,0.8),inset_-0.65px_-0.65px_2px_-0.65px_rgba(255,255,255,0.4),0px_1px_.5px_1px_rgba(0,0,0,0.02),var(--shadow-sm)] backdrop-blur-xs bg-blend-difference";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

function useCurrentTime() {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    function update() {
      setTime(timeFormatter.format(new Date()));
    }

    update();
    const id = window.setInterval(update, 60_000);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  return time;
}

export interface DeviceFrameProps extends React.ComponentProps<"div"> {
  /** Main content shown in the device screen area */
  children?: React.ReactNode;
  /** Show the top notch (Dynamic Island / island) */
  island?: boolean;
  /** Show the bottom toolbar (back, address bar, menu) */
  toolbar?: boolean;
  /** Content shown in the address bar when toolbar is true */
  address?: React.ReactNode;
  /** Show the bottom home indicator line */
  indicator?: boolean;
  /** Add padding to the content area so it is not hidden under island, toolbar, or indicator when they are visible */
  gutter?: boolean;
}

export function DeviceFrame({
  className,
  children,
  island = true,
  toolbar = true,
  address = "bob.fyi",
  gutter = false,
  ...props
}: DeviceFrameProps) {
  const time = useCurrentTime();
  const hasTopGutter = gutter && island;
  const hasBottomGutter = gutter && toolbar;

  return (
    <div data-slot="device-frame" className={cn("mx-auto w-full max-w-sm", className)} {...props}>
      <div style={{ containerType: "inline-size" }}>
        <div className="relative w-full bg-black p-[2.5%] shadow-lg outline-2 outline-neutral-600/40 [&]:rounded-[15cqw]">
          <div className="relative aspect-9/19.5 overflow-hidden [&]:rounded-[calc(15cqw-2.5cqw)]">
            <div className="border/50 absolute inset-0 rounded-[inherit] border bg-sidebar" />
            <div className={cn("absolute inset-0", hasTopGutter && "pt-[10%]", hasBottomGutter && "pb-[15%]")}>
              {children}
            </div>
            <div className="via-smooth pointer-events-none absolute inset-x-0 bottom-0 h-[25%] w-full bg-linear-to-b from-transparent via-black/5 to-black/20 bg-blend-multiply" />
            {/* <div className="via-smooth inset-inline-e-[2%] inset-inline-s-0 pointer-events-none absolute bottom-0 h-[20%] rounded-full from-success from-0% to-destructive mask-t-from-90% backdrop-blur-xl" /> */}
          </div>

          {island && (
            <>
              <div className="absolute inset-x-[10%] top-[3%] flex items-center justify-between">
                <div
                  className="w-[25%] text-center font-[system-ui] text-[3.67cqw] leading-none font-medium"
                  style={{ fontFeatureSettings: "normal" }}
                >
                  {time ?? "9:41"}
                </div>
                <div className="flex items-center gap-1">
                  <IconAntennaBars5
                    className="**:[path]:nth-child(3):opacity-30 size-[5cqw] scale-x-125 **:[path]:last:opacity-30"
                    strokeWidth={2.5}
                  />
                  <IconWifi className="size-[5cqw]" strokeWidth={2.5} />
                  <div className="grid-stack">
                    <div className="z-1 -ms-[.75ch] font-[system-ui] text-[2.5cqw] font-bold -tracking-wide text-background">
                      80
                    </div>
                    <IconBatteryFilled className="size-[7cqw] scale-x-120 opacity-30" strokeWidth={3} />
                    <IconBatteryFilled
                      className="size-[7cqw] scale-x-120 mask-r-from-67% mask-r-to-67%"
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </div>
              <div
                className="absolute top-[2.5%] left-1/2 box-border flex h-[4%] w-[30%] -translate-x-1/2 transform items-center justify-between rounded-full bg-neutral-975 px-2 shadow-border-xs outline-[0.5px] -outline-offset-3 outline-neutral-700"
                aria-hidden
              >
                <div className="aspect-square h-[50%] rounded-full bg-linear-to-br from-neutral-900 to-neutral-800 shadow-border-xs ring ring-black dark:opacity-50" />
              </div>
            </>
          )}

          {/* {indicator && (
            <div
              className="bg-input shadow-border-xs absolute bottom-[3%] left-1/2 h-[0.6%] w-[34%] -translate-x-1/2 rounded-full"
              aria-hidden
            />
          )} */}

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
                <IconDots className="h-[6cqw] w-[6cqw]" aria-hidden />
              </div>
            </div>
          )}

          <div
            className="absolute top-[15%] -left-1 h-[3.5%] w-0.5 rounded-tl-full rounded-bl-full bg-neutral-700/50"
            aria-hidden
          />
          <div
            className="absolute top-[23.4%] -left-1 h-[7.1%] w-0.5 rounded-tl-full rounded-bl-full bg-neutral-700/50"
            aria-hidden
          />
          <div
            className="absolute top-[32.4%] -left-1 h-[7.1%] w-0.5 rounded-tl-full rounded-bl-full bg-neutral-700/50"
            aria-hidden
          />
          <div
            className="absolute top-[28.2%] -right-1 h-[11%] w-0.5 rounded-tr-full rounded-br-full bg-neutral-600/50"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
