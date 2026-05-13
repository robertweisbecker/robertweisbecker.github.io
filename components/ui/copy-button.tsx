"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { IconClipboard } from "@tabler/icons-react";
import { CheckIcon2 } from "../icons";
import { AnimatePresence, motion } from "motion/react";

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
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={isCopied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
        >
          {isCopied ? <CheckIcon2 className="size-[.725em]" /> : <IconClipboard className="size-[1em]" />}
        </motion.div>
      </AnimatePresence>
      {/* <div className="relative">
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out",
            isCopied ? "scale-100 opacity-100" : "hidden scale-25 opacity-0"
          )}
        >
          
        </span>
        <span className={cn("transition-all duration-300 ease-in-out", isCopied ? "hidden scale-25 opacity-0" : "scale-100 opacity-100")}>
          
        </span>
      </div> */}
    </Button>
  );
}
