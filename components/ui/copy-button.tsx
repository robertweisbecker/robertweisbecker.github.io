"use client";

import * as React from "react";
import { Toast } from "@base-ui/react/toast";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IconClipboard } from "@tabler/icons-react";
import { CheckIcon2 } from "../icons";
import { AnimatePresence, motion } from "motion/react";

interface CopyButtonProps extends Omit<React.ComponentProps<typeof Button>, "children"> {
  value: string;
}

const COPY_TOAST_ID = "copy-button-feedback";
const copyToastPopupClassName =
  "origin-(--transform-origin) rounded-md bg-popover px-1.5 py-1 text-[0.8125rem] text-popover-foreground shadow-border-lg drop-shadow-md/2 transition-[transform,opacity] data-ending-style:[transform:scale(.96)] data-ending-style:opacity-0 data-instant:transition-none data-starting-style:[transform:scale(.96)] data-starting-style:opacity-0 dark:shadow-black/50";

export function CopyButton({ value, className, size = "icon-xs", variant = "ghost", onClick, ...props }: CopyButtonProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 1500 });
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const toastManager = React.useMemo(() => Toast.createToastManager(), []);

  const showToast = React.useCallback(
    (title: string, type: "success" | "error") => {
      toastManager.add({
        id: COPY_TOAST_ID,
        title,
        type,
        timeout: 1500,
        priority: type === "error" ? "high" : "low",
        positionerProps: {
          anchor: buttonRef.current,
          align: "center",
          side: "top",
          sideOffset: 6,
        },
      });
    },
    [toastManager]
  );

  async function handleClick(event: Parameters<NonNullable<React.ComponentProps<typeof Button>["onClick"]>>[0]) {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }
    const didCopy = await copyToClipboard(value);
    if (didCopy) {
      showToast("Copied!", "success");
      return;
    }
    showToast("Copy failed. Try again.", "error");
  }

  return (
    <Toast.Provider toastManager={toastManager} limit={1}>
      <Button
        ref={buttonRef}
        type="button"
        size={size}
        variant={variant}
        className={cn(className)}
        onClick={handleClick}
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
            {isCopied ? <CheckIcon2 className="size-[.75em]" /> : <IconClipboard className="size-[1em] *:fill-current/5" />}
          </motion.div>
        </AnimatePresence>
      </Button>
      <CopyButtonToasts />
    </Toast.Provider>
  );
}

function CopyButtonToasts() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport>
        {toasts.map((toast) => (
          <Toast.Positioner
            key={toast.id}
            toast={toast}
            className="isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)"
          >
            <Toast.Root
              toast={toast}
              className={cn(
                copyToastPopupClassName,
                "pointer-events-none min-w-10 text-center data-[type=error]:text-error-foreground",
                typeof toast.updateKey === "number" &&
                  toast.updateKey > 0 &&
                  (toast.updateKey % 2 === 0 ? "animate-toast-pulse-even" : "animate-toast-pulse-odd")
              )}
            >
              <Toast.Title />
            </Toast.Root>
          </Toast.Positioner>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}
