import type { MDXComponents } from "mdx/types";
import React from "react";
import Link from "next/link";
import { Image } from "@/components/image";
import { ImageModal } from "@/components/image-modal";
import { ImageToggle } from "@/components/image-toggle";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { Stats } from "@/components/stats";
import { Video } from "@/components/video";

function slugify(str: string) {
	return str
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/&/g, "-and-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
	const HeadingTag = `h${level}` as "h2" | "h3" | "h4";
	const Heading = ({ children }: { children?: React.ReactNode }) => {
		const slug = slugify(String(children));
		return (
			<HeadingTag id={slug}>
				<a href={`#${slug}`} className="anchor">
					{children}
				</a>
			</HeadingTag>
		);
	};
	Heading.displayName = `Heading${level}`;
	return Heading;
}

export function useMDXComponents(): MDXComponents {
	return {
		Image,
		ImageModal,
		ImageToggle,
		LayoutGrid,
		LinkOut,
		Stats,
		Video,
		h2: createHeading(2),
		h3: createHeading(3),
		h4: createHeading(4),
		img: (props) => (
			<Image
				{...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
				className="my-16"
			/>
		),
		a: ({ href, children, ...props }) => {
			if (href?.startsWith("/")) {
				return (
					<Link href={href} {...props}>
						{children}
					</Link>
				);
			}
			if (href?.startsWith("#")) {
				return (
					<a href={href} {...props}>
						{children}
					</a>
				);
			}
			return (
				<LinkOut
					className="not-prose"
					text={String(children)}
					href={href}
					{...props}
				/>
			);
		},
	};
}
