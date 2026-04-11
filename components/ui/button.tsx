"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconClasses = "hover:data-[icon]:opacity-100 [&_svg]:data-[icon]:opacity-80 *:data-[icon]:-mx-0.5";

const buttonVariants = cva(
  [
    "[--button-radius:var(--radius-md)] focus-visible:outline-2 focus-visible:outline-ring aria-invalid:ring-destructive/20  aria-invalid:border-destructive text-sm aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-[color,outline,background,border-color,box-shadow,scale,translate,transform,border-radius] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 group/button select-none relative duration-100 ease px-(--button-x) py-(--button-y) gap-[calc(var(--button-y)*1.25)] has-data-[icon=inline-end]:pe-[calc(var(--button-y)+2px)] has-data-[icon=inline-start]:ps-[calc(var(--button-y)*1.5)] ",
    "disabled:shadow-none disabled:inset-shadow-none disabled:bg-muted disabled:text-muted-foreground font-[475]",
    "not-[.w-full]:active:scale-[0.98] not-[.w-full]:will-change-transform",
    iconClasses,
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-linear-to-b from-primary/80 bg-primary text-primary-foreground hover:bg-[oklch(from_var(--primary)_calc(l_-_.1)_calc(c*1.05)_h)] inset-shadow-button shadow-sm dark:inset-ring-foreground",
          "active:shadow-xs active:inset-shadow-button-pressed",
          "focus-visible:outline-offset-2  disabled:bg-none disabled:bg-muted",
        ],
        outline: [
          "border bg-clip-padding hover:bg-accent text-foreground hover:text-accent-foreground aria-expanded:bg-accent/50 aria-expanded:text-accent-foreground aria-expanded:border-input hover:border-input",
          "disabled:shadow-none disabled:bg-transparent disabled:border-muted",
        ],
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/72 aria-expanded:bg-accent aria-expanded:text-accent-foreground ",
        ghost:
          "hover:bg-accent hover:text-accent-foreground aria-expanded:text-accent-foreground aria-expanded:bg-accent",
        destructive:
          "bg-destructive hover:bg-[oklch(from_var(--destructive)_calc(l*.95)_calc(c*1.05)_h)] focus-visible:outline-destructive focus-visible:outline-offset-2 text-white shadow-[color-mix(in_oklch,var(--destructive),black)]/20 inset-shadow-button shadow-sm active:inset-shadow-button-pressed active:shadow-xs",
        success:
          "bg-success-primary hover:bg-[oklch(from_var(--success-primary)_calc(l*.95)_calc(c*1.05)_h)] focus-visible:outline-success-primary focus-visible:outline-offset-2 text-white shadow-[color-mix(in_oklch,var(--success-primary),black)]/20 inset-shadow-button shadow-sm active:inset-shadow-button-pressed active:shadow-xs",
        link: "bg-transparent disabled:bg-transparent hover:text-accent-foreground underline-offset-4 cursor-pointer decoration-current/20 underline px-0.5 font-normal hover:decoration-current/50 aria-expanded:text-accent-foreground aria-expanded:decoration-current has-data-[icon=inline-start]:ps-0 has-data-[icon=inline-end]:pe-0 has-data-icon:[&_svg]:opacity-50 has-data-icon:hover:[&_svg]:opacity-100 rounded-sm!",
        "elevated-old":
          "text-foreground active:shadow-border-xs bg-card backdrop-blur-xs hover:bg-[color-mix(in_oklch,_var(--accent)_50%,var(--card))] active:bg-muted data-pressed:bg-muted shadow-border-sm data-pressed:inset-shadow-sm data-pressed:inset-ring data-pressed:inset-ring-border data-pressed:shadow-none aria-expanded:text-foreground inset-shadow-none transition-shadows",
        elevated: [
          "bg-linear-to-b text-foreground/92 hover:text-foreground from-foreground/5 from-30% to-foreground/18 text-shadow-xs text-shadow-current/5 dark:outline-[0.5px] dark:bg-linear-to-t dark:outline-black/30 dark:shadow-[inset_0_-1px_0_1px] dark:shadow-black/10",
          // "dark:from-card/50 dark:to-card/10",
          "before:absolute before:inset-px before:rounded-[calc(var(--button-radius)-1px)] before:-z-1 before:bg-linear-to-b before:inset-ring",
          "before:from-card before:to-card/90 before:inset-ring-card ",
          "dark:before:from-popover before:via-smooth dark:before:inset-ring-border/10",
          // "dark:before:from-popover dark:before:to-card dark:before:inset-ring-border/20",
          "hover:before:opacity-80",
          "after:absolute after:inset-px after:rounded-[calc(var(--button-radius)-1px)] after:-z-2 after:shadow-[0_2px_1px_-1px_hsl(0deg_0%_0%_/_5%),var(--shadow-sm)]",
          "active:before:opacity-50 active:after:shadow-xs active:bg-background",
          "focus-visible:outline-offset-2 active:before:inset-[0.5px] active:before:rounded-[inherit]",
        ],
        overlay: [
          "text-background/96 hover:text-background hover:bg-foreground/90 bg-foreground/72 ring-[0.5px] ring-black/50 backdrop-blur-xs",
          "shadow-[0px_0px_2px_--alpha(var(--color-white)_/_6%),0px_2px_5px_--alpha(var(--foreground)_/_12%),inset_1px_1px_1px_-1px_--alpha(var(--color-white)_/_90%),inset_-1px_-1px_1px_-1px_--alpha(var(--background)_/_40%),inset_0_0_.5px_.5px_--alpha(var(--background)_/_20%),var(--shadow-sm)]",
          "hover:shadow-[inset_-1px_0_--alpha(var(--background)_/_12%),inset_0_-1px_--alpha(var(--background)_/_12%),inset_-2px_-2px_2px_-3px_white,inset_0_1px_--alpha(var(--background)_/_24%),inset_1px_0_--alpha(var(--background)_/_16%),inset_4px_4px_1px_-5px_white,inset_0_0_0_2px_--alpha(#000_/_1%),var(--shadow-md)]",
          "focus-visible:outline-offset-2",
        ],
      },
      size: {
        md: "[--button-x:--spacing(3.5)] [--button-y:--spacing(2)] h-button",
        xs: "h-button-xs [--button-x:--spacing(2)] [--button-y:--spacing(1)] text-xs [&_svg:not([class*='size-'])]:size-3.5 [--button-radius:var(--radius-sm)] text-[0.6875rem]/4 ",
        sm: "h-button-sm [--button-x:--spacing(2.5)] [--button-y:--spacing(1.5)] [&_svg:not([class*='size-'])]:size-4 [--button-radius:var(--radius-md)] text-[0.8125rem]  ",
        lg: "h-button-lg [--button-x:--spacing(4)] [--button-y:--spacing(2.5)] [--button-radius:var(--radius-lg)]  text-[0.9375rem]",
        icon: "size-button [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-button-xs [&_svg:not([class*='size-'])]:size-3.5 [--button-radius:var(--radius-xs)]",
        "icon-sm": "size-button-sm [--button-radius:var(--radius-sm)] [&_svg:not([class*='size-'])]:size-3.5",
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
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
