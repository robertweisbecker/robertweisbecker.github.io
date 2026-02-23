import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva(
	['scroll-32 lg:scroll-18 [&+hr]:my-16 [&+[data-slot="separator"]]:my-16 first:mt-0 last:mb-0 [&+p]:mt-2 text-pretty'],
	{
		variants: {
			level: {
				1: [
					"mb-2 text-3xl leading-none font-semibold tracking-tight text-balance [&+section]:mt-6",

					// 'first-of-type:not-only:pb-8 first-of-type:not-only:border-b',
				],
				2: [" mt-20 text-2xl font-medium tracking-tight [&+h3]:mt-6 [&~hr]:mt-16"],
				3: [
					"text-lg font-medium leading-normal tracking-tight text-balance mt-16",
					"has-[+h4]:text-xs has-[+h4]:leading-loose has-[+h4]:font-medium has-[+h4]:font-mono has-[+h4]:tracking-widest has-[+h4]:uppercase has-[+h4]:text-muted-foreground",
				],
				4: " text-base font-medium tracking-snug leading-tight mt-12 opacity-90",
				5: " text-sm font-[450] leading-normal tracking-normal mt-12 ",
				6: "text-xs leading-loose font-medium font-mono tracking-widest uppercase opacity-80",
			},
			defaultVariants: {
				level: 2,
			},
		},
	},
);

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
	level?: HeadingLevel;
	render?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
}

function Heading({ level = 2, render, className, children, ...props }: HeadingProps) {
	const classes = cn(headingVariants({ level }), className);

	if (render && React.isValidElement(render)) {
		return React.cloneElement(render, {
			...props,
			...(render.props as Record<string, unknown>),
			className: cn(classes, (render.props as { className?: string }).className),
			children: (render.props as { children?: React.ReactNode }).children ?? children,
		} as React.HTMLAttributes<HTMLElement>);
	}

	const Tag = `h${level}` as const;

	return (
		<Tag className={classes} {...props}>
			{children}
		</Tag>
	);
}

export { Heading, headingVariants };
