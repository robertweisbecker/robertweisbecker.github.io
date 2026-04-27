"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@base-ui/react/scroll-area";
import { IconX } from "@tabler/icons-react";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-ending-style:backdrop-blur-0 data-starting-style:backdrop-blur-0 fixed inset-0 z-50 bg-[linear-gradient(to_bottom,rgb(0_0_0/5%)_0,rgb(0_0_0/10%)_50%)] opacity-100 backdrop-blur-[1.5px] transition-[backdrop-filter,opacity] duration-600 ease-out data-ending-style:opacity-0 data-ending-style:duration-350 data-ending-style:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:opacity-70",
        className
      )}
      {...props}
    />
  );
}

function DialogPopup({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogPrimitive.Popup
      ref={popupRef}
      initialFocus={popupRef}
      data-slot="dialog-content"
      className={cn(
        "relative z-50 grid w-full max-w-dialog gap-4 overflow-hidden rounded-2xl bg-card p-4 text-sm shadow-border-xl duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    >
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={<Button variant="ghost" className="absolute inset-e-3 top-3 rounded-full bg-muted" size="icon-sm" />}
        >
          <IconX strokeWidth={2} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
      {children}
    </DialogPrimitive.Popup>
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  keepMounted = false,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  keepMounted?: boolean;
}) {
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogPortal keepMounted={keepMounted}>
      <DialogOverlay />
      <DialogPrimitive.Viewport className="group/dialog fixed inset-0 z-50">
        <ScrollArea.Root
          className="flex h-full w-full flex-col items-start justify-center overscroll-contain group-data-ending-style/dialog:pointer-events-none"
          style={{ position: undefined }}
        >
          <ScrollArea.Viewport
            className={cn(
              "size-full overscroll-contain group-data-ending-style/dialog:pointer-events-none",
              "before:pointer-events-none before:absolute before:top-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:rounded-[inherit] before:bg-linear-to-b before:from-popover before:to-transparent before:transition-[height] before:duration-100 before:ease-out before:[--scroll-area-overflow-y-start:inherit]",
              "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:rounded-[inherit] after:bg-linear-to-t after:from-popover after:to-transparent after:transition-[height] after:duration-100 after:ease-out after:[--scroll-area-overflow-y-end:inherit]"
            )}
          >
            <ScrollArea.Content className="flex min-h-full">{children}</ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea.Root>
      </DialogPrimitive.Viewport>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5 px-2", className)} {...props} />;
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("flex flex-col items-start justify-start gap-2 px-2 pb-2 text-base", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
  variant?: "default" | "muted";
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 rounded-b-[inherit] ps-2 sm:flex-row sm:justify-end",
        variant === "muted" &&
          "-mx-6 -mb-6 border-t bg-popover p-3 dark:-mx-[calc(--spacing(6)-1px)] dark:-mb-[calc(--spacing(6)-1px)]",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title data-slot="dialog-title" className={cn("pt-1 text-lg font-medium", className)} {...props} />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground *:[a]:link", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
