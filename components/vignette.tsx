// https://expensive.toys/blog/blur-vignette

import * as React from "react";
import NextImage, { type ImageProps } from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type CssLength = number | string;

interface VignetteProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: CssLength;
  inset?: CssLength;
  transitionLength?: CssLength;
  blur?: CssLength;
}

const blurVignette = {
  root: cva("relative isolate overflow-hidden rounded-(--blur-radius)"),
  content: cva("relative"),
  image: cva("h-full w-full object-cover rounded-(--blur-radius) pointer-events-none"),
  overlay: cva("pointer-events-none absolute inset-0 z-10 rounded-(--blur-radius)"),
};

function cssLength(value: CssLength): string {
  return typeof value === "number" ? `${value}px` : value;
}

function Root({
  radius = "var(--radius-lg)",
  inset = 8,
  transitionLength = 32,
  blur = "var(--blur-xl)",
  className,
  style,
  children,
}: VignetteProps) {
  const overlayStyle = {
    "--r": "max(var(--transition-length), calc(var(--blur-radius) - var(--inset)))",
    "--corner-size": "calc(var(--r) + var(--inset)) calc(var(--r) + var(--inset))",
    "--corner-gradient": "transparent 0px, transparent calc(var(--r) - var(--transition-length)), black var(--r)",
    "--fill-gradient":
      "black, black var(--inset), transparent calc(var(--inset) + var(--transition-length)), transparent calc(100% - var(--transition-length) - var(--inset)), black calc(100% - var(--inset))",
    "--fill-narrow-size": "calc(100% - (var(--inset) + var(--r)) * 2)",
    "--fill-farther-position": "calc(var(--inset) + var(--r))",
    backdropFilter: "blur(var(--blur-size))",
    maskImage:
      "linear-gradient(to right, var(--fill-gradient)), linear-gradient(to bottom, var(--fill-gradient)), radial-gradient(at bottom right, var(--corner-gradient)), radial-gradient(at bottom left, var(--corner-gradient)), radial-gradient(at top left, var(--corner-gradient)), radial-gradient(at top right, var(--corner-gradient))",
    maskSize:
      "100% var(--fill-narrow-size), var(--fill-narrow-size) 100%, var(--corner-size), var(--corner-size), var(--corner-size), var(--corner-size)",
    maskPosition: "0 var(--fill-farther-position), var(--fill-farther-position) 0, 0 0, 100% 0, 100% 100%, 0 100%",
    maskRepeat: "no-repeat",
  };

  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-(--blur-radius)", className)}
      style={
        {
          "--blur-radius": cssLength(radius),
          "--inset": cssLength(inset),
          "--transition-length": cssLength(transitionLength),
          "--blur-size": cssLength(blur),
          ...style,
        } as React.CSSProperties
      }
    >
      {children}
      <div aria-hidden="true" className={cn(blurVignette.overlay())} style={overlayStyle as React.CSSProperties} />
    </div>
  );
}

function Image({ src, alt = "", className, ...props }: ImageProps) {
  return <NextImage src={src} alt={alt} className={cn(blurVignette.image(), className)} {...props} />;
}

function Content({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn(blurVignette.content(), className)} {...props}>
      {children}
    </div>
  );
}

export const Vignette = {
  Root,
  Content,
  Image,
};
