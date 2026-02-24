import * as React from "react";

import { cn } from "@/lib/utils";

function DataList({ className, ...props }: React.ComponentProps<"dl">) {
	return (
		<dl
			data-slot="data-list"
			className={cn(
				"grid grid-cols-1 text-sm sm:grid-cols-[min(50%,--spacing(80))_auto]",
				className
			)}
			{...props}
		/>
	);
}

function DataListLabel({ className, ...props }: React.ComponentProps<"dt">) {
	return (
		<dt
			data-slot="data-list-label"
			className={cn(
				"text-muted-foreground col-start-1 border-t pt-3 first:border-none first:pt-0 sm:border-t sm:py-3",
				className
			)}
			{...props}
		/>
	);
}

function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
	return (
		<dd
			data-slot="data-list-value"
			className={cn(
				"sm:border-border/50 text-foreground sm:nth-2:border-none nth-2:pt-0 pb-3 pt-1 sm:border-t sm:py-3",
				className
			)}
			{...props}
		/>
	);
}

export { DataList, DataListLabel, DataListValue };
