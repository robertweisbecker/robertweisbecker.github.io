export function Image({
	className,
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
		<div data-media className={className}>
			<div className="not-prose relative overflow-hidden rounded-xl">
				<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10" />
				<img {...props} />
			</div>
		</div>
	);
}
