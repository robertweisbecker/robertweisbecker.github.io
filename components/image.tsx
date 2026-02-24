export function Image({
	className,
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<div data-media className={className}>
			<div className="not-prose relative overflow-hidden rounded-lg">
				<div className="pointer-events-none absolute inset-0 rounded-[inherit] dark:ring-1 dark:ring-inset dark:ring-white/10" />
				<img {...props} />
			</div>
		</div>
	);
}
