import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CopyButton } from "./copy-button";

const codeVariants = cva(
  "inline-flex not-prose relative w-fit h-fit min-w-lh items-center justify-center [&>svg:not([class*='size-'])]:size-[.9125em] font-pixel [&>svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 [&_svg]:opacity-72 select-all",
  {
    variants: {
      variant: {
        plain:
          "text-current bg-current/10 text-[calc(12/14*1em)] leading-lh px-[0.5ex] gap-[0.25em]  mx-[.25ex] py-0 rounded",
        default:
          "isolate before:rounded before:outline before:outline-popover/50 dark:before:-outline-offset-[0.5px] before:bg-linear-to-b before:from-card before:to-popover dark:before:bg-linear-to-t before:backdrop-blur-xs px-[0.67ex] before:-top-[.0625ex] before:bottom-[0.125ex] -top-px text-popover-foreground before:shadow-[inset_-0_.0625em_hsl(0_0%_100%_/_5%),_0_.0625em_hsl(0_0%_0%_/_5%),inset_0_-0.125em_0.5em_-.0625em_hsl(0_0%_0%_/_5%),var(--shadow-border-xs)] gap-[0.25em] text-[11px] leading-[inherit] before:inset-x-0 before:absolute before:-z-1 mx-px min-h-5",
        inline:
          "before:content-['`'] after:content-['`'] text-[.925em] inline-flex font-mono font-semibold text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Code({
  variant,
  className,
  children,
  value,
  copyValue,
  ...props
}: React.ComponentProps<"code"> & VariantProps<typeof codeVariants> & { copyValue?: boolean; value?: string }) {
  return (
    <code data-slot="code" data-variant={variant} className={cn(codeVariants({ variant }), className)} {...props}>
      {value || children}
      {copyValue && value && (
        <CopyButton
          size="icon-xs"
          className={"-me-[0.4ex] aspect-square size-4.5! min-w-0 rounded opacity-72"}
          value={value}
        />
      )}
    </code>
  );
}

export { Code };
