"use client";

import {
	MediaController,
	MediaControlBar,
	// MediaMuteButton,
	MediaPlayButton,
	MediaSeekBackwardButton,
	// MediaSeekForwardButton,
	MediaTimeDisplay,
	MediaTimeRange,
	// MediaVolumeRange,
} from "media-chrome/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
	src?: string;
	caption?: string;
}

export function Video({ src, caption, className, children, ...props }: VideoProps) {
	const wrapper = (
		<div
			className={cn("not-prose relative overflow-hidden rounded-xl bg-muted my-4 shadow-inner", className)}
			style={
				{
					// "--media-button-icon-width": "var(--spacing-button)",
				} as React.CSSProperties
			}>
			<MediaController className="w-full block" autohide={"2"}>
				<video width="100%" height="auto" slot="media" playsInline preload="auto" src={src} {...props}>
					{children}
				</video>
				<MediaPlayButton slot="centered-chrome" className="w-16 h-16! rounded-full" />
				<MediaControlBar className="rounded-none">
					{/* <MediaPlayButton /> */}
					{/* <MediaSeekBackwardButton seekOffset={10} /> */}
					{/* <MediaSeekForwardButton seekOffset={10} /> */}
					<MediaTimeRange className="px-1 h-6" />
					{/* <MediaTimeDisplay showDuration /> */}
				</MediaControlBar>
			</MediaController>
			<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
		</div>
	);
	return caption ? (
		<figure>
			{wrapper}
			<figcaption>{caption}</figcaption>
		</figure>
	) : (
		wrapper
	);
}

export function Video2({
	className,
	videoClasses,
	...props
}: React.VideoHTMLAttributes<HTMLVideoElement> & { videoClasses?: string }) {
	return (
		<div data-media className={className}>
			<div className="not-prose relative overflow-hidden rounded-xl">
				<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
				<video autoPlay playsInline loop muted className={videoClasses} {...props} />
			</div>
		</div>
	);
}
