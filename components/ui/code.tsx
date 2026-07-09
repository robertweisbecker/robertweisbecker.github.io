import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CopyButton } from "./copy-button";

const codeVariants = cva(
  "not-prose relative w-fit h-fit min-w-lh items-center justify-center [&>svg:not([class*='size-'])]:size-[.75em] [&>svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 [&_svg]:opacity-72 select-all box-decoration-clone",
  {
    variants: {
      variant: {
        plain:
          "inline-flex text-current bg-current/7.5 max-h-[1.25em] text-[0.925em] px-[0.5ex] gap-[0.25em] py-0 rounded in-[mark]:bg-card in-[mark]:outline in-[mark]:outline-current/10 text-shadow-none",
        default:
          "inline-flex isolate before:rounded before:outline before:outline-popover before:-outline-offset-[0.5px] before:bg-linear-to-b before:from-card before:to-popover dark:before:bg-linear-to-t px-[0.67ex] before:top-0 before:bottom-[0.125ex] -top-px text-foreground before:shadow-[inset_-0_.0625em_hsl(0_0%_100%_/_5%),_0_.0625em_hsl(0_0%_0%_/_5%),inset_0_-0.125em_0.5em_-.0625em_hsl(0_0%_0%_/_5%),var(--shadow-border-xs),var(--shadow-xs)] gap-[0.25em] text-[.875em] leading-[inherit] before:inset-x-0 before:absolute before:-z-1 mx-px min-h-5",
        inline:
          "inline wrap-anywhere break-all before:content-['`'] after:content-['`'] text-[.925em] inline-flex font-mono font-semibold text-foreground translate-y-[-0.0625ex]",
        "inline-component":
          "inline wrap-anywhere break-all before:content-['<'] after:content-['>'] text-[.925em] inline-flex font-mono font-semibold text-foreground translate-y-[-0.0625ex]",
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
      {copyValue && value && <CopyButton size="icon-xs" className={"-me-[0.4ex] aspect-square size-4.5! min-w-0 rounded"} value={value} />}
    </code>
  );
}

export { Code };
