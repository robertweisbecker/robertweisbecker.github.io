import { RiExternalLinkLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface LinkOutProps {
	text: string;
	href: string;
	src?: string;
	className?: string;
}

export function LinkOut({ text, href, src, className }: LinkOutProps) {
	return (
		<span className={cn("group/link inline-flex items-center gap-1", className)}>
			{src && (
				<img
					src={src}
					alt={`${text} Logo`}
					className="inline-block h-[1.25em] w-auto rounded-lg ring ring-border bg-background/50"
				/>
			)}
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-0.5 underline underline-offset-2 decoration-1 font-medium text-primary">
				{text}
				<RiExternalLinkLine className="inline size-[1em] transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-0.5" />
			</a>
		</span>
	);
}
