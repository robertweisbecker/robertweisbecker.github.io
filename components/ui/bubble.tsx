import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="bubble-group" className={cn("flex min-w-0 flex-col gap-2", className)} {...props} />;
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full text-sm/4.5 isolate",
  {
    variants: {
      variant: {
        default:
          "[--message-bg:var(--info-500)] *:data-[slot=bubble-content]:bg-(--message-bg) *:data-[slot=bubble-content]:text-white [&>[data-slot=bubble-content]:is(button,a):hover]:bg-info-primary/80",
        secondary:
          "[--message-bg:var(--secondary)] *:data-[slot=bubble-content]:bg-(--message-bg) *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        muted:
          "[--message-bg:var(--sidebar)] *:data-[slot=bubble-content]:bg-(--message-bg) dark:[--message-bg:var(--popover)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-accent",
        tinted:
          "*:data-[slot=bubble-content]:bg-(--message-bg) [--message-bg]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] *:data-[slot=bubble-content]:text-foreground dark:[--message-bg]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]",
        outline:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
        destructive:
          "[--message-bg:var(--error)] *:data-[slot=bubble-content]:bg-(--message-bg) *:data-[slot=bubble-content]:text-destructive  [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Bubble({
  variant = "default",
  align = "start",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end";
  }) {
  return (
    <div data-slot="bubble" data-variant={variant} data-align={align} className={cn(bubbleVariants({ variant }), className)} {...props}>
      {children}
      <svg
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "absolute bottom-0 -z-1 fill-(--message-bg)",
          align === "start" && "-left-1.5 rotate-y-180",
          align === "end" && "-right-1.5"
        )}
      >
        <path d="M14.03 0C14.11 4.43 14.4 7.14 15.53 9.36C16.45 11.17 17.76 12.75 19.34 14H14C6.27 14 0 7.73 0 0H14.03Z" />
      </svg>
    </div>
  );
}

function BubbleContent({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 overflow-hidden rounded-xl squircle border border-transparent px-3 py-2 wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/50",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  });
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-sidebar px-1.5 py-0.5 text-xs shadow-border-sm ring-3 ring-background has-[button]:p-0 text-muted-foreground",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "start-3",
        end: "end-3",
      },
    },
    defaultVariants: {
      side: "bottom",
      align: "end",
    },
  }
);

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  );
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions };
