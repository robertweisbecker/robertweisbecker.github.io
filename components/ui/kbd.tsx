import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

const kbdVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded select-none [&_svg:not([class*='size-'])]:size-3 shrink-0 relative whitespace-nowrap self-center font-sans",
  {
    variants: {
      variant: {
        default:
          "bg-current/5 font-pixel text-[11px] text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 px-1 h-lh w-fit min-w-lh",
        elevated: [
          "align-text-top word-spacing-[-.1em] min-w-[1.75em] text-[.75em] leading-[1.7em] tracking-[inherit] bg-popover  h-fit mx-[.2em] pt-[.01em] px-[.5em] pb-0 transition-[translate,box-shadow] duration-25 ease-in-quad top-[-.02em] shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--card),_inset_0_.25em_.5em_#00000006,_inset_0_-.05em_var(--input),_0_0_0_.05em_var(--border),_0_.08em_.17em_#0003] ease-out",
          "in-[button:active]:translate-y-px in-[button:active]:shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--popover),_inset_0_.25em_.5em_#00000006,_inset_0_-.025em_.05em_var(--muted),_0_0_0_.05em_var(--border),_0_.04em_.05em_#0003]",
          "data-pressed:translate-y-px data-pressed:shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--popover),_inset_0_.25em_.5em_#00000006,_inset_0_-.025em_.05em_var(--muted),_0_0_0_.05em_var(--border),_0_.04em_.05em_#0003] data-pressed:text-foreground data-pressed:bg-background",
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
  return <kbd data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />;
}

export { Kbd, KbdGroup };
