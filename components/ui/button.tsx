"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { PixelLoaderIcon } from "@/components/icons";

const iconClasses =
  "[&_[data-icon]]:opacity-72 [&_[data-icon=inline-start]]:-ms-0.5 [&_[data-icon=inline-end]]:-me-0.5 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const buttonVariants = cva(
  [
    "[--button-radius:var(--radius-md)] focus-visible:outline-2 focus-visible:outline-ring text-sm  inline-flex items-center justify-center whitespace-nowrap transition-[color,outline,background,border-color,box-shadow,scale,translate,transform,border-radius] disabled:pointer-events-none disabled:opacity-50 shrink-0 group/button select-none relative duration-100 ease-out-quad px-(--button-x) py-(--button-y) gap-[calc(var(--button-x)/1.5)] has-data-[icon=inline-end]:pe-[calc(var(--button-y)+2px)] has-data-[icon=inline-start]:ps-[calc(var(--button-y)*1.5)] ",
    "disabled:shadow-none disabled:inset-shadow-none disabled:bg-accent/50 disabled:text-muted-foreground ",
    "not-[.w-full]:active:scale-[0.98] will-change-transform",
    "data-[loading=true]:pointer-events-none data-[loading=true]:text-transparent data-[loading=true]:[&_svg:not([data-slot=loader])]:opacity-0 font-[475]",
    iconClasses,
  ],
  {
    variants: {
      variant: {
        default: [
          "[--button-color:var(--primary-foreground)] [--button-bg:var(--primary)] bg-linear-to-b from-(--button-bg)/90 to-(--button-bg) text-(--button-color) hover:bg-[oklch(from_var(--button-bg)_calc(l_-_.05)_calc(c*1.025)_h)] inset-shadow-button shadow-sm dark:inset-ring-foreground",
          "active:shadow-xs active:inset-shadow-button-pressed",
          "focus-visible:outline-offset-2  disabled:bg-none disabled:bg-muted",
        ],
        outline: [
          "[--button-color:var(--foreground)] border bg-clip-padding hover:bg-accent text-foreground hover:text-accent-foreground aria-expanded:bg-accent/50 aria-expanded:text-accent-foreground aria-expanded:border-input hover:border-input",
          "disabled:shadow-none disabled:bg-transparent disabled:border-muted",
        ],
        secondary:
          "[--button-color:var(--secondary-foreground)] bg-secondary text-secondary-foreground hover:bg-secondary/72 aria-expanded:bg-accent aria-expanded:text-accent-foreground ",
        ghost:
          "[--button-color:var(--foreground)] hover:bg-accent hover:text-accent-foreground aria-expanded:text-accent-foreground aria-expanded:bg-accent disabled:bg-transparent",
        destructive:
          "[--button-color:white] [--button-bg:var(--destructive)] bg-linear-to-b from-current/15 bg-(--button-bg) text-(--button-color) hover:bg-[oklch(from_var(--destructive)_calc(l_-_.05)_calc(c*1.025)_h)] inset-shadow-button shadow-sm dark:inset-ring-foreground active:shadow-xs active:inset-shadow-button-pressed focus-visible:outline-offset-2 disabled:bg-none disabled:bg-muted",
        success:
          "[--button-color:white] bg-success-primary hover:bg-[oklch(from_var(--success-primary)_calc(l*.95)_calc(c*1.05)_h)] focus-visible:outline-success-primary focus-visible:outline-offset-2 text-white shadow-[color-mix(in_oklch,var(--success-primary),black)]/20 inset-shadow-button shadow-sm active:inset-shadow-button-pressed active:shadow-xs",
        link: "[--button-color:var(--foreground)] link disabled:bg-transparent cursor-pointer px-0.5 aria-expanded:text-accent-foreground aria-expanded:decoration-current has-data-[icon=inline-start]:ps-0 has-data-[icon=inline-end]:pe-0 has-data-icon:[&_svg]:opacity-50 has-data-icon:hover:[&_svg]:opacity-100  text-secondary-foreground after:absolute after:inset-y-2 font-normal",
        "elevated-old":
          "[--button-color:var(--foreground)] text-foreground active:shadow-border-xs bg-card backdrop-blur-xs hover:bg-[color-mix(in_oklch,_var(--accent)_50%,var(--card))] active:bg-muted data-pressed:bg-muted shadow-border-sm data-pressed:inset-shadow-sm data-pressed:inset-ring data-pressed:inset-ring-border data-pressed:shadow-none aria-expanded:text-foreground inset-shadow-none transition-shadows",
        elevated: [
          "[--button-color:var(--foreground)] bg-linear-to-b text-foreground/92 hover:text-foreground from-foreground/5 from-30% to-foreground/18 text-shadow-xs text-shadow-current/5 dark:outline-[0.5px] dark:bg-linear-to-t dark:outline-black/30 dark:shadow-[inset_0_-1px_0_1px] dark:shadow-black/10",
          // "dark:from-card/50 dark:to-card/10",
          "before:absolute before:inset-px before:rounded-[calc(var(--button-radius)-1px)] before:-z-1 before:bg-linear-to-b before:inset-ring",
          "before:from-card before:to-card/90 before:inset-ring-card ",
          "dark:before:from-popover before:via-smooth dark:before:inset-ring-border/10",
          // "dark:before:from-popover dark:before:to-card dark:before:inset-ring-border/20",
          "hover:before:opacity-90",
          "after:absolute after:inset-px after:rounded-[calc(var(--button-radius)-1px)] after:-z-2 after:shadow-[0_2px_1px_-1px_hsl(0deg_0%_0%_/_5%),var(--shadow-sm)]",
          "active:before:opacity-80 active:after:shadow-xs ",
          "focus-visible:outline-offset-2 active:before:inset-[0.5px] active:before:rounded-[inherit]",
          "disabled:bg-background disabled:bg-none disabled:border disabled:[--button-color:var(--muted-foreground)]/50 disabled:shadow-none disabled:before:hidden disabled:after:hidden disabled:*:ring-none disabled:*:cursor-not-allowed disabled:opacity-100",
        ],
        glass: [
          "[--button-color:var(--background)] text-background/96 hover:text-background hover:bg-foreground/90 bg-foreground/72 ring-[0.5px] ring-black/50 backdrop-blur-xs",
          "shadow-[0px_0px_2px_--alpha(var(--color-white)_/_6%),0px_2px_5px_--alpha(var(--foreground)_/_12%),inset_1px_1px_1px_-1px_--alpha(var(--color-white)_/_90%),inset_-1px_-1px_1px_-1px_--alpha(var(--background)_/_40%),inset_0_0_.5px_.5px_--alpha(var(--background)_/_20%),var(--shadow-sm)]",
          "hover:shadow-[inset_-1px_0_--alpha(var(--background)_/_12%),inset_0_-1px_--alpha(var(--background)_/_12%),inset_-2px_-2px_2px_-3px_white,inset_0_1px_--alpha(var(--background)_/_24%),inset_1px_0_--alpha(var(--background)_/_16%),inset_4px_4px_1px_-5px_white,inset_0_0_0_2px_--alpha(#000_/_1%),var(--shadow-md)]",
          "focus-visible:outline-offset-2",
        ],
        overlay: [
          "[--button-color:white] bg-neutral-700/60 hover:bg-neutral-700/70 backdrop-blur-xl text-white outline outline-white/10 ring-1 ring-black/60 -outline-offset-1 ",
          "not-disabled:hover:bg-neutral-800/80 active:bg-neutral-700/40 aria-disabled:bg-neutral-700/10! aria-disabled:text-white/50 rounded-full",
        ],
      },
      size: {
        md: "[--button-x:--spacing(3.5)] [--button-y:--spacing(2)] h-button",
        xs: "h-button-xs [--button-x:--spacing(2)] [--button-y:--spacing(1)] text-xs [&_svg:not([class*='size-'])]:size-3.5 [--button-radius:var(--radius-sm)] text-[0.6875rem]/4 gap-1",
        sm: "h-button-sm [--button-x:--spacing(2)] [--button-y:--spacing(1.5)] [&_svg:not([class*='size-'])]:size-4 [--button-radius:var(--radius-md)] text-[0.8125rem]  ",
        lg: "h-button-lg [--button-x:--spacing(4)] [--button-y:--spacing(2.5)] [--button-radius:var(--radius-lg)]  text-base",
        icon: "size-button [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-button-xs [&_svg:not([class*='size-'])]:size-3.5 [--button-radius:var(--radius-xs)]",
        "icon-sm": "size-button-sm [--button-radius:var(--radius-md)] [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-button-lg [--button-radius:var(--radius-lg)] [&_svg:not([class*='size-'])]:size-5",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-(--button-radius)",
      },
    },
    compoundVariants: [
      {
        variant: "elevated",
        rounded: true,
        className: "rounded-full before:rounded-full after:rounded-full",
      },
      {
        variant: "link",
        rounded: true,
        className: "px-2 -ms-2",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: false,
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "md",
  rounded = false,
  disabled,
  focusableWhenDisabled,
  loading,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading}
      disabled={loading || disabled}
      focusableWhenDisabled={loading}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {children}
      {loading && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          data-slot="loader"
          className="absolute animate-spin text-(--button-color)"
        >
          <path d="M9.74524 4.32328L12.0952 1.08728L13.309 1.96869L10.959 5.20469L9.74524 4.32328Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M15.3763 4.8147L11.5723 6.0507L12.0358 7.47728L15.8398 6.24128L15.3763 4.8147Z" fill="currentColor" fillOpacity="0.2" />
          <path
            d="M15.8398 9.75871L12.0358 8.52271L11.5723 9.94929L15.3763 11.1853L15.8398 9.75871Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M13.309 14.0313L10.959 10.7953L9.74524 11.6767L12.0952 14.9127L13.309 14.0313Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M8.75 12V16H7.25V12H8.75Z" fill="currentColor" fillOpacity="0.5" />
          <path
            d="M6.25488 11.6767L3.90488 14.9127L2.69116 14.0313L5.04116 10.7953L6.25488 11.6767Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M4.42781 9.94929L0.623806 11.1853L0.160278 9.75871L3.96428 8.52271L4.42781 9.94929Z"
            fill="currentColor"
            fillOpacity="0.7"
          />
          <path
            d="M3.96428 7.47728L0.160278 6.24128L0.623806 4.8147L4.42781 6.0507L3.96428 7.47728Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M2.69116 1.96869L5.04116 5.20469L6.25488 4.32328L3.90488 1.08728L2.69116 1.96869Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          <path d="M7.25 4V0H8.75V4H7.25Z" fill="currentColor" />
        </svg>
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
