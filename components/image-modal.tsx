"use client";

import { useState } from "react";
import { IconZoomIn } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogHeader } from "@/components/ui/dialog";
import { Image } from "@/components/image";

interface ImageModalProps {
	src: string;
	src2?: string;
	caption?: string;
}

export function ImageModal({ src, src2, caption }: ImageModalProps) {
	const [open, setOpen] = useState(false);

	return (
		<figure className=" flex flex-col gap-2 my-4">
			<div className="relative">
				<Image
					src={src}
					alt={caption ?? ""}
					className="my-0 [img]:my-0! dark:brightness-80 relative w-full overflow-hidden rounded-t-[inherit]"
				/>
				<Button
					variant="elevated"
					size="icon-sm"
					className="absolute top-3 right-2 z-10"
					onClick={() => setOpen(true)}
					aria-label="View fullscreen image">
					<IconZoomIn className="size-4" />
				</Button>
			</div>
			{caption && <figcaption className="text-center text-balance opacity-70 italic">{caption}</figcaption>}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-6xl overflow-hidden">
					<DialogHeader className="sr-only">
						<DialogTitle>Image</DialogTitle>
					</DialogHeader>
					<div className="-m-4 rounded-xl">
						<img src={src2 ?? src} alt={caption ?? ""} className="w-full rounded-lg object-contain" />
					</div>
					{caption && <p className="mx-auto mt-2 text-center text-xs text-foreground">{caption}</p>}
				</DialogContent>
			</Dialog>
		</figure>
	);
}
