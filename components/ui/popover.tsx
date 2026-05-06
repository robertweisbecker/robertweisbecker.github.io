"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ArrowSvg } from "../icons";
import { buttonVariants } from "./button";
import { IconX } from "@tabler/icons-react";

interface PopoverContentProps
  extends
    PopoverPrimitive.Popup.Props,
    VariantProps<typeof popoverVariants>,
    Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "sticky"> {
  arrow?: boolean;
}

const popoverVariants = cva(
  "group/popover data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-99 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 data-[side=inline-start]:slide-in-from-end-1 data-[side=inline-end]:slide-in-from-start-1 origin-(--transform-origin) z-50 flex duration-100 flex-col p-(--popover-padding)",
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground shadow-popover w-72 rounded-xl  gap-2.5 [--popover-padding:--spacing(4)]",
        translucent:
          "bg-popover/12 backdrop-blur-xl text-popover-foreground shadow-popover w-72 rounded-xl  gap-2.5 [--popover-padding:--spacing(4)]",
        tooltip:
          "bg-popover text-popover-foreground shadow-border-lg drop-shadow-md/2 dark:shadow-black/50 max-w-3xs gap-1 has-data-[slot=popover-header]:rounded-lg rounded-lg [--popover-padding:--spacing(2)] text-sm",
        annotation: "bg-foreground text-background shadow-border-lg w-72 rounded-2xl gap-2 [--popover-padding:--spacing(3)]",
      },
    },
  }
);

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 4,
  side = "bottom",
  sideOffset = 8,
  variant = "default",
  children,
  sticky = false,
  arrow = true,
  ...props
}: PopoverPrimitive.Popup.Props &
  VariantProps<typeof popoverVariants> &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "sticky"> & {
    arrow?: boolean;
  }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={variant === "tooltip" ? "top" : side}
        sideOffset={sideOffset}
        sticky={sticky}
        className="isolate z-50"
        arrowPadding={20}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          data-variant={variant}
          className={cn(popoverVariants({ variant }), className)}
          {...props}
        >
          {children}
          {arrow && <PopoverArrow />}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn(
        "flex flex-col gap-0 [.border-b]:-mx-(--popover-padding) [.border-b]:px-(--popover-padding) [.border-b]:pb-(--popover-padding)",
        className
      )}
      {...props}
    />
  );
}

function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-footer"
      className={cn(
        "-mx-(--popover-padding) -mb-(--popover-padding) flex items-center gap-1 rounded-b-[inherit] bg-muted px-(--popover-padding) pt-[calc(var(--popover-padding)/1.5)] pb-(--popover-padding) text-current/80",
        className
      )}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("-mt-[0.25em] font-medium tracking-[-.01em] in-group-data-[variant=tooltip]/popover:mt-0", className)}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn(
        "text-sm text-current/80 group-data-[variant=tooltip]/popover:text-[0.8125rem] [p+p]:mt-1 **:[strong,em]:text-current",
        className
      )}
      {...props}
    />
  );
}

const popoverArrowVariants = cva(
  "flex data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
  {
    variants: {
      variant: {
        default:
          "flex data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
      },
    },
  }
);
function PopoverArrow({ className, ...props }: PopoverPrimitive.Arrow.Props) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={cn(
        "flex data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0 data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
        className
      )}
      {...props}
    >
      <ArrowSvg />
    </PopoverPrimitive.Arrow>
  );
}

function PopoverClose({ className, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(buttonVariants({ variant: "ghost", size: "icon-xs" }), className)}
      aria-label="Close"
      {...props}
    >
      <IconX />
    </PopoverPrimitive.Close>
  );
}

export { Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverFooter, PopoverHeader, PopoverTitle, PopoverTrigger };
