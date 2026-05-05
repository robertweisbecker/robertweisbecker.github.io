import NextImage, { type ImageProps as NextImageProps } from "next/image";
import { cn } from "@/lib/utils";

export type ImageProps = Omit<NextImageProps, "alt" | "src"> & {
  alt?: string;
  caption?: React.ReactNode;
  className?: string;
  src: string;
};

export function Image({ className, caption, alt = "", width = 576, height = 324, src, ...props }: ImageProps) {
  const isExternal = src.startsWith("https://");
  return (
    <figure
      data-media
      className={cn("not-prose relative my-10 flex flex-col items-center justify-center gap-1.5", className)}
    >
      <div className="sm:squircle relative -mx-8 overflow-hidden bg-card py-1 shadow-border-sm sm:-mx-1 sm:rounded-xl sm:px-1 dark:bg-muted">
        {isExternal ? (
          <img
            src={src}
            alt={alt}
            className="sm:squircle h-auto w-full sm:rounded-[calc(var(--radius-xl)---spacing(1))]"
          />
        ) : (
          <NextImage
            src={src}
            {...props}
            width={width ? width : 576}
            height={height ? height : 324}
            alt={alt}
            className="sm:squircle h-auto w-full sm:rounded-[calc(var(--radius-xl)---spacing(1))]"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        )}
      </div>
      {caption && <figcaption className="mx-auto text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
