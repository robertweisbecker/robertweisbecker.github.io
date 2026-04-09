  import { cn } from "@/lib/utils"
  import { cva,VariantProps } from "class-variance-authority"

const kbdVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded select-none [&_svg:not([class*='size-'])]:size-3 shrink-0 relative whitespace-nowrap font-mono",
  {
    variants: {
      variant: {
        default:
          "bg-muted font-pixel text-[11px] font-medium text-muted-foreground in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 px-1 h-lh w-fit min-w-lh",
        elevated: [
          "align-text-top word-spacing-[-.1em] min-w-[1.75em] text-[.75em] leading-[1.7em] tracking-[inherit] bg-background h-fit mx-[.2em] pt-[.01em] px-[.5em] pb-0 transition-[translate,box-shadow] duration-60 top-[-.02em] shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_var(--card),_inset_0_.25em_.5em_#00000006,_inset_0_-.05em_var(--input),_0_0_0_.05em_var(--border),_0_.08em_.17em_#0003] ease",
          "active:translate-y-px active:shadow-[inset_0_-.05em_.5em_#00000006,_inset_0_.05em_#fffffff2,_inset_0_.25em_.5em_#00000006,_inset_0_-.025em_.05em_var(--input),_0_0_0_.05em_var(--border),_0_.04em_.05em_#0003]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Kbd({ variant, className, ...props }: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return <kbd data-slot="kbd" className={cn(kbdVariants({ variant }), className)} {...props} />;
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <kbd data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />;
}

  export { Kbd,KbdGroup }
