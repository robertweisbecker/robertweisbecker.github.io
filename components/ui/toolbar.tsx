"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import { cn } from "@/lib/utils";

function ToolbarRoot({ className, orientation = "horizontal", ...props }: ToolbarPrimitive.Root.Props) {
	return (
		<ToolbarPrimitive.Root
			data-slot="toolbar"
			orientation={orientation}
			className={cn(
				"inline-flex items-center gap-1 rounded-lg outline outline-border/50 shadow-xs dark:-outline-offset-1 bg-card p-1 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
	return (
		<ToolbarPrimitive.Group
			data-slot="toolbar-group"
			className={cn("inline-flex items-center gap-px data-[orientation=vertical]:flex-col", className)}
			{...props}
		/>
	);
}

function ToolbarButton({ className, ...props }: ToolbarPrimitive.Button.Props) {
	return (
		<ToolbarPrimitive.Button
			data-slot="toolbar-button"
			className={cn(
				"inline-flex h-8 min-w-8 shrink-0 items-center justify-center gap-1.5 rounded-sm px-2 text-sm font-medium",
				"bg-transparent text-foreground hover:bg-muted hover:text-foreground",
				"focus-visible:outline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-ring",
				"disabled:pointer-events-none disabled:opacity-50",
				"data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
				"[&_svg]:size-[1em] [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
	return (
		<ToolbarPrimitive.Link
			data-slot="toolbar-link"
			className={cn(
				"inline-flex shrink-0 items-center justify-center gap-1 px-2 text-sm text-primary underline-offset-4 hover:underline",
				"focus-visible:outline-2 focus-visible:outline-ring focus-visible:-outline-offset-1",
				"data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
				"[&_svg]:size-4 [&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	);
}

function ToolbarSeparator({ className, orientation, ...props }: ToolbarPrimitive.Separator.Props) {
	return (
		<ToolbarPrimitive.Separator
			data-slot="toolbar-separator"
			orientation={orientation}
			className={cn(
				"shrink-0 bg-border",
				"data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-px",
				"data-[orientation=vertical]:my-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
				className,
			)}
			{...props}
		/>
	);
}

function ToolbarInput({ className, ...props }: ToolbarPrimitive.Input.Props) {
	return (
		<ToolbarPrimitive.Input
			data-slot="toolbar-input"
			className={cn(
				"h-8 min-w-24 rounded-sm border border-input bg-background px-2.5 py-1 text-sm",
				"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-ring outline-none",
				"placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-50",
				"data-[orientation=vertical]:w-full",
				className,
			)}
			{...props}
		/>
	);
}

const Toolbar = {
	Root: ToolbarRoot,
	Group: ToolbarGroup,
	Button: ToolbarButton,
	Link: ToolbarLink,
	Separator: ToolbarSeparator,
	Input: ToolbarInput,
};

export { Toolbar, ToolbarRoot, ToolbarGroup, ToolbarButton, ToolbarLink, ToolbarSeparator, ToolbarInput };
