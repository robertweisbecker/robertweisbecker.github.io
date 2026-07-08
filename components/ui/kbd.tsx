import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

const kbdVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-[5px] select-none [&_svg:not([class*='size-'])]:size-3 shrink-0 relative whitespace-nowrap self-center font-sans",
  {
    variants: {
      variant: {
        default:
          "outline outline-current/10 font-sans font-medium text-2xs text-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 px-1 py-0.5 max-h-lh w-fit min-w-lh",
        elevated: [
          "align-text-top word-spacing-[-.1em] min-w-[1.75em] text-[.75em] leading-[1.7em] tracking-[inherit] bg-popover  h-fit mx-[.2em] pt-[.01em] px-[.5em] pb-0 transition-[translate,box-shadow] duration-25 ease-in-quad top-[-.02em] shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--card),_inset_0_.25em_.5em_#00000006,_inset_0_-.05em_var(--input),_0_0_0_.05em_var(--border),_0_.08em_.17em_#0003]",
          "in-[button:active]:translate-y-px in-[button:active]:shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--popover),_inset_0_.25em_.5em_#00000006,_inset_0_-.025em_.05em_var(--muted),_0_0_0_.05em_var(--border),_0_.04em_.05em_#0003] data-pressed:ease-out",
          "data-pressed:translate-y-px data-pressed:shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--popover),_inset_0_.25em_.5em_#00000006,_inset_0_-.025em_.05em_var(--muted),_0_0_0_.05em_var(--border),_0_.04em_.05em_#0003] data-pressed:text-foreground data-pressed:bg-background",
        ],
        big: [
          "bg-linear-to-b from-black-alpha-700 to-black-alpha-400 text-white rounded-lg size-16 aspect-square",
          "before:absolute before:top-px before:inset-x-px before:-z-1 before:bottom-0.5 before:rounded-[calc(var(--radius-lg)-1px)] before:from-neutral-950 before:to-red-700 bg-radial-[at_50%_100%] bg-size-[200%]",
          "before:shadow-[inset_1px_.5px_1px_-1px_white,inset_-1px_.5px_1px_-1px_white,inset_0_.5px_0_.5px_var(--color-white-alpha-200),0_2px_1px_.5px_var(--color-black-alpha-400)]",
          "relative isolate  text-shadow-xs text-shadow-black ring-border ring-2 shadow-[inset_0_-1px_0_.5px_var(--color-black-alpha-500)] text-xl",
        ],
      },
      pressed: {
        true: "translate-y-px",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      pressed: false,
    },
  }
);

function Kbd({ className, variant, pressed, render, ...props }: useRender.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return useRender({
    defaultTagName: "kbd",
    props: mergeProps<"kbd">(
      {
        className: cn(kbdVariants({ variant, pressed }), className),
      },
      props
    ),
    render,
    state: {
      slot: "kbd",
      variant,
      pressed: pressed,
    },
  });
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd data-slot="kbd-group" className={cn("inline-flex items-center gap-1 has-data-[variant=elevated]:gap-2.5", className)} {...props} />
  );
}

export { Kbd, KbdGroup };
