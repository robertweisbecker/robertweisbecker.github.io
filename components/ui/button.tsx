"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"focus-visible:outline focus-visible:outline-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 group/button select-none relative",
	{
		variants: {
			variant: {
				default: [
					"bg-primary text-primary-foreground hover:bg-primary/90",
					"shadow-sm inset-shadow-[0_1px_0_1px_--alpha(var(--color-white)/10%)] dark:ring dark:ring-black/40 outline -outline-offset-1 outline-[color-mix(in_oklch,_var(--primary)_90%,var(--foreground))]",
				],
				outline:
					"border bg-card hover:bg-accent text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-accent aria-expanded:bg-accent aria-expanded:text-accent-foreground",
				ghost:
					"text-foreground hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground",
				destructive:
					"bg-destructive hover:bg-destructive-foreground/10 focus-visible:ring-destructive text-destructive-foreground focus-visible:border-destructive-foreground shadow-sm inset-shadow-[0_1px_--alpha(var(--color-white)/5%)] dark:ring dark:ring-black/40 outline outline-destructive-foreground/10 hover:outline-destructive-foreground/20 dark:-outline-offset-1 active:shadow-none hover:shadow-xs ",
				link: "hover:text-accent-foreground underline-offset-4 hover:underline px-1! -ms-1! font-[450]! transition-colors font-normal gap-[0.25em]!",
				elevated:
					"outline text-foreground active:shadow-none hover:shadow-xs outline-border dark:-outline-offset-1 bg-card hover:bg-sidebar aria-expanded:bg-accent aria-expanded:text-accent-foreground shadow-sm inset-shadow-[0_1px_--alpha(var(--color-white)/5%)] dark:ring dark:ring-black/40",
			},
			size: {
				default:
					"h-button gap-1.5 px-3 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg]:opacity-64",
				xs: "h-6 gap-1 rounded-sm px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&_svg:not([class*='size-'])]:size-3 [&_svg]:opacity-64",
				sm: "h-8 gap-1 rounded-sm px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-2 [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:opacity-64",
				lg: "h-10 gap-2 px-4 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2 [&_svg]:opacity-64",
				icon: "size-button [&_svg:not([class*='size-'])]:size-4.5 rounded-sm",
				"icon-xs":
					"size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
				"icon-sm":
					"size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
