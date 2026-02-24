"use client";

import { useState } from "react";
import { IconZoomIn } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogClose,
	DialogHeader,
} from "@/components/ui/dialog";
import { Image } from "@/components/image";

interface ImageModalProps {
	src: string;
	src2?: string;
	caption?: string;
}

export function ImageModal({ src, src2, caption }: ImageModalProps) {
	const [open, setOpen] = useState(false);

	return (
		<figure className="flex flex-col gap-2 [.prose>*+&]:my-16">
			<div className="relative">
				<Image
					src={src}
					alt={caption ?? ""}
					className="[img]:my-0! dark:brightness-80 relative my-0 w-full overflow-hidden rounded-t-[inherit]"
				/>
				<Button
					variant="default"
					size="icon"
					className="absolute bottom-1 right-1 z-10"
					onClick={() => setOpen(true)}
					aria-label="View fullscreen image"
				>
					<IconZoomIn className="size-4" />
				</Button>
			</div>
			{caption && (
				<figcaption className="text-balance text-center italic opacity-70">
					{caption}
				</figcaption>
			)}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="overflow-hidden sm:max-w-6xl">
					<DialogHeader className="sr-only">
						<DialogTitle>Image</DialogTitle>
					</DialogHeader>
					<div className="-m-4 rounded-xl">
						<img
							src={src2 ?? src}
							alt={caption ?? ""}
							className="w-full rounded-lg object-contain"
						/>
					</div>
					{caption && (
						<p className="text-foreground mx-auto mt-2 text-center text-xs">
							{caption}
						</p>
					)}
				</DialogContent>
			</Dialog>
		</figure>
	);
}
