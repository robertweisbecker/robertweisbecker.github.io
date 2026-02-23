"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			className={cn("gap-2 group/tabs flex data-horizontal:flex-col", className)}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	"relative z-0 rounded-lg p-0.5 group-data-horizontal/tabs:h-10 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
	{
		variants: {
			variant: {
				default: "bg-muted gap-0.5",
				line: "gap-1 bg-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function TabsList({
	className,
	variant = "default",
	children,
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}>
			{children}
			<TabsPrimitive.Indicator
				data-slot="tabs-indicator"
				className={cn(
					"-translate-y-(--active-tab-bottom) absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) transition-[width,translate] duration-200 ease-in-out",
					variant === "line"
						? "data-[orientation=vertical]:-translate-x-px z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=horizontal]:translate-y-px"
						: "-z-1 rounded-md bg-popover shadow-sm/5 outline outline-border dark:-outline-offset-1",
				)}
			/>
		</TabsPrimitive.List>
	);
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				"gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium [&_svg:not([class*='size-'])]:size-4  focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground hover:not-data-active:bg-accent hover:not-data-active:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-[color,background-color,box-shadow] group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
				"data-active:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
