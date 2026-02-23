import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface LinkOutProps {
	text: string;
	href: string;
	src?: string;
	className?: string;
}

export function LinkOut({ text, href, src, className }: LinkOutProps) {
	return (
		<span className={cn("group/link inline-flex items-center gap-1 relative", className)}>
			{src && (
				<img
					src={src}
					alt={`${text} Logo`}
					className="inline-block h-[1.25em] w-auto rounded-lg ring ring-border bg-background/50"
				/>
			)}
			<a
				data-component="link-out"
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-0.5 font-medium text-primary relative after:absolute after:bottom-px after:left-0 after:h-px after:transition-width after:duration-150 after:ease-out group-hover/link:after:w-full group-hover/link:after:right-0 after:bg-primary after:w-0">
				{text}
				<IconExternalLink className="size-[1em] transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-0.5  relative -top-px opacity-64 group-hover/link:opacity-100" />
			</a>
		</span>
	);
}
