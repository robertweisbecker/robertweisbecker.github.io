"use client";

import { cn } from "@/lib/utils";
import {
  IconArrowsDiagonal,
  IconArrowsDiagonalMinimize2,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolume2,
  IconVolumeOff,
} from "@tabler/icons-react";
import {
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  // MediaMuteButton,
  MediaPlayButton,
  // MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
} from "media-chrome/react";
import { Button } from "./ui/button";
import { Toolbar } from "./ui/toolbar";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
  caption?: string;
  unmuted?: boolean;
}

export function Video({ src, caption, className, children, unmuted = false, ...props }: VideoProps) {
  const wrapper = (
    <div
      className={cn(
        "not-prose content-visibility-auto relative mx-auto my-4 overflow-hidden rounded-xl outline -outline-offset-1 outline-border/50",
        className
      )}
    >
      <MediaController
        className="group/media block w-full rounded-[calc(var(--radius-xl)-var(--spacing)*2)]"
        autohide={"3"}
        style={
          {
            // "--media-cursor": "initial",
            // "--media-primary-color": "var(--color-primary)",
            // "--media-background-color": "var(--color-primary-foreground)",
            "--media-button-icon-height": "calc(var(--spacing) * 6)",
            "--media-button-icon-width": "calc(var(--spacing) * 6)",
            "--media-control-background": "var(--background)",
            "--media-object-fit": "contain",
            "--media-object-position": "center",
            // "--media-control-hover-background": "var(--color-accent)",
            // "--media-control-padding": "0",
            "--media-font-family": "var(--font-pixel)",
            "--media-font-size": "10px",
            "--media-range-bar-color": "color-mix(in srgb, var(--foreground) 64%, transparent)",
            "--media-range-track-background": "color-mix(in srgb, var(--foreground) 10%, transparent)",
            "--media-time-range-buffered-color": "color-mix(in srgb, var(--foreground) 10%, transparent)",
            "--media-range-thumb-background": "var(--color-white)",
            "--media-range-thumb-box-shadow": "var(--shadow-border-xs)",
            "--media-text-color": "var(--foreground)",
            "--media-icon-color": "var(--foreground)",
            "--media-tooltip-arrow-display": "none",
            "--media-tooltip-filter": "var(--drop-shadow-xs)",
            "--media-tooltip-distance": "6px",
            // "--media-tooltip-background": "var(--color-black)",
            "--media-tooltip-border-radius": "var(--radius-md)",
            "--media-tooltip-box-shadow": "var(--drop-shadow-sm)",

            // "--media-preview-time-background": "var(--muted)",
            "--media-preview-time-box-shadow": "var(--shadow-sm)",
            // "--media-preview-time-color": "var(--color-background)",
            "--media-preview-time-border-radius": "var(--radius-sm)",
            // "--media-secondary-color": "var(--color-white)",
            // "--media-tooltip-display": "none",
            "--media-text-background": "transparent",
            "--media-preview-time-text-shadow": "none",
            "--media-preview-time-margin": "0",
            "--media-button-padding": "0",
            "--media-range-thumb-opacity": "1",
          } as React.CSSProperties
        }
      >
        <video
          suppressHydrationWarning={true}
          width="100%"
          // height="auto"
          slot="media"
          playsInline
          autoPlay
          muted={!unmuted}
          preload="auto"
          src={src}
          {...props}
        >
          {children}
        </video>
        <Button
          aria-label="Play / Pause"
          render={<MediaPlayButton noTooltip />}
          variant="overlay"
          nativeButton={false}
          slot="centered-chrome"
          className={cn(
            "isolate -mt-6 aspect-square! size-18! rounded-full bg-black/70! opacity-0 outline outline-black/90 backdrop-blur-sm transition-[opacity,transform] duration-150 ease-out hover:bg-black! [&_svg]:fill-white! [[mediapaused]]:opacity-100"
            // "before:absolute before:-inset-200 before:-z-1"
          )}
        >
          <IconPlayerPlayFilled slot="play" className="size-8" />
          <IconPlayerPauseFilled slot="pause" className="size-8" />
        </Button>
        <Toolbar.Root
          data-slot="controlbar"
          render={<MediaControlBar />}
          className={cn(
            "relative isolate m-2 transform-gpu overflow-visible rounded-full bg-background/50 p-1 shadow-border-xl backdrop-blur-sm transition-opacity duration-150 ease-out group-has-[[mediaisfullscreen]]:mx-auto group-has-[[mediaisfullscreen]]:max-w-sm"
            // "has-[[mediapaused]]:invisible"
            // "translate-y-1/2 opacity-0 transition-[translate,opacity] duration-150 ease-out group-hover/media:translate-y-0 group-hover/media:opacity-100"
          )}
        >
          <Toolbar.Group className="w-full">
            <Toolbar.Button
              nativeButton={false}
              render={<MediaPlayButton noTooltip />}
              size="icon-xs"
              className="rounded-full! bg-transparent"
            >
              <IconPlayerPlayFilled slot="play" className="size-4" />
              <IconPlayerPauseFilled slot="pause" className="size-4" />
            </Toolbar.Button>
            <MediaTimeRange className="h-4 max-w-full grow rounded-full! bg-transparent"></MediaTimeRange>
            <MediaTimeDisplay noToggle={true} showDuration />
          </Toolbar.Group>

          <Toolbar.Separator />

          <Toolbar.Group>
            {unmuted && (
              <Toolbar.Button
                data-slot="button"
                className="rounded-full! bg-transparent [&_svg]:fill-none"
                render={<MediaMuteButton noTooltip />}
              >
                <IconVolume slot="high" />
                <IconVolume2 slot="medium" />
                <IconVolume2 slot="low" />
                <IconVolumeOff slot="off" />
              </Toolbar.Button>
            )}

            <Toolbar.Button
              render={<MediaFullscreenButton noTooltip className="rounded-full! bg-transparent [&_svg]:fill-none" />}
              nativeButton={false}
              size="icon-xs"
            >
              <IconArrowsDiagonal slot="enter" />
              <IconArrowsDiagonalMinimize2 slot="exit" />
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar.Root>
      </MediaController>
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

// export function Video2({
// 	className,
// 	videoClasses,
// 	...props
// }: React.VideoHTMLAttributes<HTMLVideoElement> & { videoClasses?: string }) {
// 	return (
// 		<div data-media className={className}>
// 			<div className="not-prose relative overflow-hidden rounded-xl">
// 				<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
// 				<video autoPlay playsInline loop muted className={videoClasses} {...props} />
// 			</div>
// 		</div>
// 	);
// }
