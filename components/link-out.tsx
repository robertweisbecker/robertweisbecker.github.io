import { IconChevronUpRight, IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface LinkOutProps {
	text: string;
	href: string;
	src?: string;
	className?: string;
}

export function LinkOut({ text, href, src, className }: LinkOutProps) {
	return (
		<span
			className={cn(
				"group/link relative inline-flex items-center gap-1",
				className
			)}
		>
			{src && (
				<img
					src={src}
					alt={`${text} Logo`}
					className="ring-border bg-background/50 inline-block h-[1.25em] w-auto rounded-lg ring"
				/>
			)}
			<a
				data-component="link-out"
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="link inline-flex items-center gap-[0.25em]"
			>
				{text}
				<LinkOutIcon className="absolute -right-[.25em] top-[.25em] -my-1 -me-1 size-[1em] opacity-0 transition-[translate,opacity] group-hover/link:-translate-y-[0.125em] group-hover/link:translate-x-[0.125em] group-hover/link:opacity-100" />
			</a>
		</span>
	);
}

function LinkOutIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path
				d="M17 7l-10 10"
				className="transition-[stroke-dashoffset,stroke-dasharray] duration-150 ease-out [stroke-dasharray:20] [stroke-dashoffset:20] group-hover/link:[stroke-dasharray:10] group-hover/link:[stroke-dashoffset:initial]"
			/>
			<path d="M8 7l9 0l0 9" />
		</svg>
	);
}
