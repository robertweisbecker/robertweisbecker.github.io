"use client";

/**
 * ─────────────────────────────────────────────────────────
 * SHINE STORYBOARD
 *
 *   sweep:   diagonal highlight translates top-left → bottom-right
 *            8s · linear · infinite · peak ~12% opacity
 *
 *   glow:    radial light breathes (opacity keyframes)
 *            5s · ease-in-out · infinite
 *
 *   ambient: conic highlight rotates around center
 *            12s · linear · infinite
 *
 *   none:    static / no animation
 *
 *   All variants: pointer-events:none, aria-hidden,
 *   motion-reduce:animate-none + prefers-reduced-motion in CSS.
 * ─────────────────────────────────────────────────────────
 */

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { IconAntennaBars5, IconBatteryFilled, IconBoltFilled, IconWifi } from "@tabler/icons-react";
import * as React from "react";
import { useBattery } from "@uidotdev/usehooks";

import { Skeleton } from "@/components/ui/skeleton";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function formatTime(date: Date) {
  return timeFormatter.format(date).replace(/\s?(AM|PM)$/i, "");
}

export function useCurrentTime() {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    function update() {
      setTime(formatTime(new Date()));
    }
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

type BatteryHookResult = ReturnType<typeof useBattery>;

const BatteryContext = React.createContext<BatteryHookResult | undefined>(undefined);

/** Optional: wrap multiple Device surfaces to share one Battery Manager subscription. */
export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const battery = useBattery();
  return <BatteryContext.Provider value={battery}>{children}</BatteryContext.Provider>;
}

/** Uses context when inside DeviceProvider; otherwise calls useBattery locally. */
export function useBatteryStatus(): BatteryHookResult {
  const ctx = React.useContext(BatteryContext);
  const local = useBattery();
  return ctx ?? local;
}

const timeSize = {
  phone: "text-[3.67cqw] leading-none font-medium",
  desktop: "text-[1.1cqw] font-medium tabular-nums leading-none",
} as const;

export interface TimeProps extends React.ComponentProps<"span"> {
  /** `phone` = status bar on Phone; `desktop` = menu bar */
  size?: keyof typeof timeSize;
}

export const Time = React.forwardRef<HTMLSpanElement, TimeProps>(function Time(
  { className, size = "phone", ...props },
  ref
) {
  const t = useCurrentTime();
  return (
    <span
      ref={ref}
      data-slot="device-time"
      className={cn(
        "relative inline-flex min-h-[1em] items-center justify-center font-[system-ui]",
        timeSize[size],
        className
      )}
      style={{ fontFeatureSettings: "normal" }}
      {...props}
    >
      {t ?? <Skeleton className={size === "phone" ? "mx-auto h-4 w-[3.5ch]" : "h-[1em] w-[3ch]"} />}
    </span>
  );
});
Time.displayName = "Device.Time";

export interface BatteryDisplayProps extends React.ComponentProps<"div"> {
  level: number;
  charging: boolean;
  loading?: boolean;
  /** `phone` = island; `desktop` = menu bar */
  size?: "phone" | "desktop";
}

export function BatteryDisplay({
  className,
  level,
  charging,
  loading = false,
  size = "phone",
  ...props
}: BatteryDisplayProps) {
  const batteryColor = level > 50 ? "var(--green-400)" : "var(--yellow-300)";
  const iconClass = size === "phone" ? "size-[7cqw] scale-x-120" : "size-[2.2cqw] scale-x-110 text-white/90";

  return (
    <div data-slot="device-battery" className={cn("grid-stack", className)} {...props}>
      <div
        className={cn(
          "z-1 -me-[.125em] flex items-center font-[system-ui] font-bold tracking-tighter",
          size === "phone" ? "text-[2.4cqw] text-white" : "text-[1.15cqw] text-white"
        )}
      >
        {loading ? (
          <span className="relative inline-block min-h-[1em] w-[2ch] rounded-sm bg-white/10" aria-hidden />
        ) : (
          <>
            {level} {charging && <IconBoltFilled className="size-[.9em] scale-y-110" />}
          </>
        )}
      </div>
      <IconBatteryFilled className={cn(iconClass, "text-input bg-blend-difference")} strokeWidth={2} />
      <IconBatteryFilled
        className={iconClass}
        style={{
          maskImage: `linear-gradient(to left, transparent 0%, transparent ${100 - level}%, currentColor ${100 - level}%, currentColor 100%)`,
          fill: charging ? "var(--success-primary)" : batteryColor,
        }}
        strokeWidth={2}
      />
    </div>
  );
}

export interface SignalDisplayProps extends React.ComponentProps<"div"> {
  size?: "phone" | "desktop";
}

export function SignalDisplay({ className, size = "phone", ...props }: SignalDisplayProps) {
  const antenna =
    size === "phone"
      ? "**:[path]:nth-child(3):opacity-30 size-[5cqw] scale-x-125 **:[path]:last:opacity-30"
      : "size-[2cqw] scale-x-125 [&_path]:nth-child(3):opacity-30 [&_path]:last:opacity-30";
  const wifi =
    size === "phone"
      ? "relative -top-[.125em] size-[5.25cqw] [&_path]:last:hidden"
      : "relative -top-px size-[2.25cqw] [&_path]:last:hidden";

  return (
    <div data-slot="device-signal" className={cn("flex items-center gap-1", className)} {...props}>
      <IconAntennaBars5 className={antenna} strokeWidth={size === "phone" ? 2.5 : 2} />
      <IconWifi className={wifi} strokeWidth={size === "phone" ? 2.5 : 2} />
    </div>
  );
}

export function TrafficLights({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="device-traffic-lights"
      className={cn("flex shrink-0 items-center gap-1.5 self-start pe-1", className)}
      {...props}
    >
      <div className="h-3 w-3 rounded-full bg-error inset-ring inset-ring-border" />
      <div className="h-3 w-3 rounded-full bg-warning inset-ring inset-ring-border" />
      <div className="h-3 w-3 rounded-full bg-success inset-ring inset-ring-border" />
    </div>
  );
}

export function SideButtons() {
  return (
    <>
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
    </>
  );
}

const shineVariants = cva(
  "pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] motion-reduce:animate-none",
  {
    variants: {
      variant: {
        sweep:
          "bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.12)_50%,transparent_70%)] bg-[length:250%_250%] animate-[shine-sweep_8s_linear_infinite]",
        glow: "bg-radial-[at_30%_20%,rgba(255,255,255,0.12),transparent_60%] animate-[shine-glow_5s_ease-in-out_infinite]",
        ambient:
          "after:pointer-events-none after:absolute after:inset-0 after:origin-center after:rounded-[inherit] after:bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.08),transparent_30%)] after:content-[''] after:animate-[shine-ambient_12s_linear_infinite]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "sweep",
    },
  }
);

export interface ShineProps extends React.ComponentProps<"div">, VariantProps<typeof shineVariants> {}

export const Shine = React.forwardRef<HTMLDivElement, ShineProps>(function Shine(
  { className, variant, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="device-shine"
      aria-hidden
      className={cn(shineVariants({ variant }), className)}
      {...props}
    />
  );
});
Shine.displayName = "Device.Shine";
