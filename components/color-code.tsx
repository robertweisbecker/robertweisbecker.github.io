"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

function ColorCode({
  value,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & { value: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 1500 });

  return (
    <button
      type="button"
      onClick={() => copyToClipboard(value)}
      aria-label={isCopied ? "Copied" : `Copy ${value} to clipboard`}
      className={cn(
        "not-prose min-w-lh relative isolate inline-flex w-[7.5ch] shrink-0 cursor-pointer items-center justify-center font-mono",
        "mx-[.25ex] px-[0.5ex] text-[0.875em] leading-[inherit] text-current before:absolute before:inset-x-0 before:-top-[.0625ex] before:-bottom-[0.125ex] before:-z-1 before:rounded-[0.25em] before:bg-sidebar before:shadow-[inset_0_.0625em_hsl(0_0%_100%_/_10%),_0_.0625em_hsl(0_0%_0%_/_5%),inset_0_-0.125em_0.125em_-.0625em_hsl(0_0%_0%_/_5%),var(--shadow-border-xs)] before:outline-[0.5px] before:outline-background/10 dark:-outline-offset-[0.5px]",
        "transition-colors hover:before:bg-sidebar/80 active:before:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "transition-[opacity,filter] duration-200 ease-in-out",
          isCopied ? "opacity-0 blur-xs" : "blur-0 opacity-100"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-[opacity,filter] duration-200 ease-in-out",
          isCopied ? "blur-0 opacity-100" : "opacity-0 blur-xs"
        )}
      >
        Copied
      </span>
    </button>
  );
}

export { ColorCode };
