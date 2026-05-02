"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { IconClipboard } from "@tabler/icons-react";
import { CheckIcon2 } from "../icons";

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "children"> {
  value: string;
}

export function CopyButton({ value, className, size = "icon-xs", variant = "ghost", ...props }: CopyButtonProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 1500 });

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      className={cn(className)}
      onClick={() => copyToClipboard(value)}
      aria-label={isCopied ? "Copied" : "Copy to clipboard"}
      {...props}
    >
      <div className="relative">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-[opacity,filter,scale] duration-300 ease-in-out will-change-[opacity,filter,scale]",
            isCopied ? "blur-0 scale-100 opacity-100" : "scale-25 opacity-0 blur-xs"
          )}
        >
          <CheckIcon2 className="size-[.75em]" />
        </span>
        <span
          className={cn(
            "transition-[opacity,filter,scale] duration-300 ease-in-out will-change-[opacity,filter,scale]",
            isCopied ? "scale-25 opacity-0 blur-xs" : "blur-0 scale-100 opacity-100"
          )}
        >
          <IconClipboard className="size-[1em]" />
        </span>
      </div>
    </Button>
  );
}
