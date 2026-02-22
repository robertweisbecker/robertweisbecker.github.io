"use client";

import { useState } from "react";
import { ImageModal } from "@/components/image-modal";
import { cn } from "@/lib/utils";

interface ImageToggleProps {
	before: string;
	after: string;
	tab1?: string;
	tab2?: string;
}

export function ImageToggle({ before, after, tab1 = "Before", tab2 = "After" }: ImageToggleProps) {
	const [active, setActive] = useState<"after" | "before">("after");

	return (
		<div>
			<div className="mb-2 flex gap-1">
				<button
					onClick={() => setActive("after")}
					className={cn(
						"rounded-md px-3 py-1.5 text-sm transition-colors",
						active === "after" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
					)}>
					{tab2}
				</button>
				<button
					onClick={() => setActive("before")}
					className={cn(
						"rounded-md px-3 py-1.5 text-sm transition-colors",
						active === "before" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
					)}>
					{tab1}
				</button>
			</div>
			<ImageModal src={active === "after" ? after : before} />
		</div>
	);
}
