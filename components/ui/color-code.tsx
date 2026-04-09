"use client";

  import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
  import { cn } from "@/lib/utils"
  import { AnimatePresence,motion } from "motion/react"
  import * as React from "react"

function ColorCode({
  value,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & { value: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 1000 });

  return (
    <button
      type="button"
      className={cn(
        "focus-visible:outline-focus inline-flex cursor-pointer items-center gap-1 rounded-sm bg-foreground/8 px-1 py-0.5 align-baseline font-pixel text-[11px] leading-none uppercase transition-colors hover:bg-foreground/12 focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-foreground/16 dark:hover:bg-foreground/24",
        className
      )}
      aria-label={`Copy color ${value}`}
      onClick={() => copyToClipboard(value)}
      {...props}
    >
      <span
        data-slot="swatch"
        className="-ms-px inline-block size-[0.9em] shrink-0 rounded-xs ring-1 ring-black/10 ring-inset"
        aria-hidden="true"
        style={{ backgroundColor: value }}
      />

      <span data-slot="value" className="relative inline-flex">
        <AnimatePresence initial={false} mode="popLayout">
          {isCopied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.15 }}
            >
              Copied!
            </motion.span>
          ) : (
            <motion.span
              key="value"
              initial={{ opacity: 0, filter: "blur(3px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.15 }}
            >
              {value}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}

  export { ColorCode }
