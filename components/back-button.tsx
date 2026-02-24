"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function BackButton({
	className,
	...rest
}: React.ComponentProps<typeof Button>) {
	return (
		<Button
			variant="link"
			render={<Link href="/#projects" />}
			nativeButton={false}
			className={cn("text-muted-foreground group/back-button", className)}
			{...rest}
		>
			<IconArrowLeft
				className="transition-transform group-hover/back-button:-translate-x-0.5"
				data-icon="inline-start"
			/>
			Back
		</Button>
	);
}
