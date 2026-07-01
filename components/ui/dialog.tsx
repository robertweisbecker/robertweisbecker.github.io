"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
      data-slot="dialog-backdrop"
      className={cn(
        "data-ending-style:backdrop-blur-0 data-starting-style:backdrop-blur-0 fixed inset-0 z-50 bg-[linear-gradient(to_bottom,hsl(0_0_0%/50%)_0,hsl(0_0_0%/100%)_50%)] opacity-20 backdrop-blur-[1.5px] transition-[backdrop-filter,opacity] duration-600 ease-out data-ending-style:opacity-0 data-ending-style:duration-350 data-ending-style:ease-[cubic-bezier(0.375,0.015,0.545,0.455)] data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:opacity-70",
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
  unstyled = false,
  ...props
}: DialogPrimitive.Popup.Props & { showCloseButton?: boolean; unstyled?: boolean }) {
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogPrimitive.Popup
      ref={popupRef}
      initialFocus={popupRef}
      data-slot="dialog-content"
      className={cn(
        "relative z-50 grid w-full max-w-dialog overflow-hidden duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",

        unstyled === false && "w-md gap-4 rounded-2xl bg-popover p-4 shadow-border-xl",
        className
      )}
      {...props}
    >
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={<Button variant="ghost" className="absolute inset-e-3 top-3 bg-muted" size="icon-sm" rounded />}
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
  keepMounted = false,
  unstyled = false,
  ...props
}: DialogPrimitive.Viewport.Props & {
  keepMounted?: boolean;
  unstyled?: boolean;
  backdrop?: boolean;
}) {
  // const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogPortal keepMounted={keepMounted}>
      {unstyled ? null : <DialogOverlay />}
      <DialogPrimitive.Viewport
        className={cn(
          "group/dialog fixed inset-0 z-50 supports-[-webkit-touch-callout:none]:absolute",
          unstyled === false && "grid place-items-center px-4 py-6 lg:py-10",
          className
        )}
        {...props}
      >
        {children}
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
  stack = false,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
  variant?: "default" | "muted";
  stack?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex justify-end gap-2 rounded-b-[inherit] ps-2",
        stack && "max-sm:flex-col-reverse max-sm:justify-stretch",
        variant === "muted" && "-mx-6 -mb-6 border-t bg-popover p-3 dark:-mx-[calc(--spacing(6)-1px)] dark:-mb-[calc(--spacing(6)-1px)]",
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
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("pt-1 text-lg font-medium", className)} {...props} />;
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
