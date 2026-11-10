import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const buttonGroupVariants = cva(
  "has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-(--button-radius) flex w-fit items-stretch *:focus-visible:z-10 *:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 **:[--button-radius:var(--radius-md)] [&>*]:first:origin-right [&>*]:last:origin-left ",
  {
    variants: {
      orientation: {
        horizontal: [
          // "*:data-slot:rounded-e-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-(--button-radius)! [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0",
          " [&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-(--button-radius)!",
        ],
        vertical:
          "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-(--button-radius)! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
      variant: {
        default: "",
        glass: [
          "overflow-hidden rounded-full!",
          "bg-popover/5 [backdrop-filter:blur(1.5px)_saturate(1.5)_contrast(.8)_brightness(1.1)]",
          "shadow-[1.25px_0px_0px_-0.75px_rgba(0,0,0,0.2),-1.25px_0px_0px_-0.75px_rgba(0,0,0,0.2),0px_0px_0px_0.5px_rgba(0,0,0,0.14),0px_12px_5px_-6px_color-mix(in_srgb,canvas_10%,transparent),0px_9px_6px_-2px_rgba(0,0,0,0.1),inset_0px_-1px_0px_-0.5px_rgba(255,255,255,0.4),inset_0px_1px_0px_-0.5px_rgba(255,255,255,0.4),inset_0px_1px_1px_rgba(255,255,255,0.2),inset_0px_-1px_1px_rgba(255,255,255,0.2),inset_0px_6px_6px_4px_rgba(0,0,0,0.07)]",
          "dark:bg-popover/60 dark:ring-[0.5px] dark:ring-background",
          "[&>button]:rounded-none! [&>button]:bg-transparent [&>button]:shadow-none [&>button]:[backdrop-filter:none]",
          "[&>button]:before:hidden [&>button]:after:hidden",
          "[&>button]:hover:scale-100 [&>button]:active:scale-100",
          "[&>button]:hover:bg-foreground/8 [&>button]:active:bg-foreground/12",
          "[&>button]:focus-visible:outline-offset-[-2px]",
          "[&>button:disabled]:bg-transparent",
        ],
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        variant: "glass",
        className: "[&>button:not(:first-child)]:border-s! [&>button:not(:first-child)]:border-foreground/20",
      },
      {
        orientation: "vertical",
        variant: "glass",
        className: "[&>button:not(:first-child)]:border-t! [&>button:not(:first-child)]:border-foreground/20",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
);

function ButtonGroup({
  className,
  orientation,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-variant={variant}
      className={cn(buttonGroupVariants({ orientation, variant }), "rounded-(--button-radius)", className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "bg-muted gap-2 rounded-(--button-radius) border px-2.5 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "button-group-text",
    },
  });
}

function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
