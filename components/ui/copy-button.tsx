"use client";

import * as React from "react";
import { Toast } from "@base-ui/react/toast";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClipboardIcon } from "@/components/icons";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";

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
  const isIconSize = size?.startsWith("icon");

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
    <LazyMotion features={domAnimation}>
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
          <AnimatePresence mode="wait" initial={false}>
            {/* <m.div
          // key={isCopied ? "check" : "copy"}
          // className="grid-stack"
          // initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)", rotate: -45 }}
          // animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: 0 }}
          // exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)", rotate: 45 }}
          // transition={{
          //   type: "spring",
          //   duration: 0.3,
          //   bounce: 0,
          // }}
          > */}
            {isCopied ? (
              <m.svg
                key="copied-icon"
                className="size-[1.25em]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
                transition={{
                  duration: 0.15,
                }}
              >
                <rect x="1" y="1" width="22" rx="11" height="22" className="fill-border" />
                <path
                  className={cn(isCopied ? "animate-svg-draw" : "")}
                  d="M6.5 13.5L11 17.8C12 14 14 10 16.5 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="100 100"
                  strokeDashoffset="100"
                  pathLength="100"
                />
              </m.svg>
            ) : (
              <m.div
                key="copy-icon"
                initial={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
                transition={{
                  duration: 0.15,
                }}
              >
                <ClipboardIcon className="size-[1.25em]" />
              </m.div>
            )}
            {/* </m.div> */}
          </AnimatePresence>
          {!isIconSize && <span>Copy</span>}
        </Button>
        <CopyButtonToasts />
      </Toast.Provider>
    </LazyMotion>
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
