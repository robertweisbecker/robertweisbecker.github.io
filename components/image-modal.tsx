"use client";

import { useState } from "react";
import { IconZoomIn } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogHeader } from "@/components/ui/dialog";

interface ImageModalProps {
	src: string;
	src2?: string;
	caption?: string;
}

export function ImageModal({ src, src2, caption }: ImageModalProps) {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className="relative overflow-hidden rounded-xl outline outline-border -outline-offset-1 bg-muted">
				<img src={src} alt={caption ?? ""} className="w-full" />
				<Button
					variant="outline"
					size="icon-sm"
					className="absolute bottom-3 right-3 z-10 shadow-md"
					onClick={() => setOpen(true)}
					aria-label="View fullscreen image">
					<IconZoomIn className="size-4" />
				</Button>
			</div>
			{caption && <p className="mt-1 text-center text-xs text-muted-foreground">{caption}</p>}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-6xl">
					<DialogHeader className="sr-only">
						<DialogTitle>Image</DialogTitle>
					</DialogHeader>
					<div className="-m-4">
						<img src={src2 ?? src} alt={caption ?? ""} className="w-full rounded-lg object-contain" />
					</div>
					{caption && <p className="mx-auto mt-2 text-center text-xs text-foreground">{caption}</p>}
				</DialogContent>
			</Dialog>
		</div>
	);
}
