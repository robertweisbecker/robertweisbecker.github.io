import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

export type ImageProps = Omit<NextImageProps, "alt"> & {
  alt?: string;
  caption?: string;
  className?: string;
};

export function Image({ className, caption, alt = "", width = 576, height = 324, ...props }: ImageProps) {
  return (
    <figure
      data-media
      className={cn("not-prose relative my-4 flex flex-col items-center justify-center gap-1", className)}
    >
      <div className="squircle relative -mx-8 overflow-hidden bg-card py-1 shadow-border-sm sm:-mx-1 sm:rounded-xl sm:px-1 dark:bg-muted">
        <NextImage
          {...props}
          width={width}
          height={height}
          alt={alt}
          className="squircle sm:rounded-[calc(var(--radius-xl)---spacing(1))]"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {caption && (
        <figcaption className="mx-auto max-w-prose text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
