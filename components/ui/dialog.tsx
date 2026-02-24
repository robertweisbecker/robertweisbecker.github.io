"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IconX } from "@tabler/icons-react";
import { ScrollArea } from "./scroll-area";

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

function DialogOverlay({
	className,
	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			className={cn(
				"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50 bg-black/10 duration-100 dark:bg-black/60",
				className
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Viewport className="fixed inset-0 z-50">
				<ScrollArea
					className="mx-auto box-border size-full overscroll-contain"
					style={{ position: undefined }}
				>
					<DialogPrimitive.Popup
						data-slot="dialog-content"
						className={cn(
							"bg-popover data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 outline-border relative z-50 mx-auto my-12 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-2xl p-4 text-sm shadow-xl outline ring-1 duration-100 sm:max-w-2xl dark:-outline-offset-1",
							className
						)}
						{...props}
					>
						{children}
						{showCloseButton && (
							<DialogPrimitive.Close
								data-slot="dialog-close"
								render={
									<Button
										variant="secondary"
										className="inset-e-2 absolute top-2"
										size="icon-sm"
									/>
								}
							>
								<IconX />
								<span className="sr-only">Close</span>
							</DialogPrimitive.Close>
						)}
					</DialogPrimitive.Popup>
				</ScrollArea>
			</DialogPrimitive.Viewport>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"bg-muted -mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end",
				className
			)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant="outline" />}>
					Close
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("text-base font-medium leading-none", className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				"text-muted-foreground *:[a]:hover:text-foreground *:[a]:underline *:[a]:underline-offset-3 text-sm",
				className
			)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
