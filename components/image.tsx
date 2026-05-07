import NextImage, { type ImageProps as NextImageProps, type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type Common = {
  alt?: string;
  caption?: React.ReactNode;
  className?: string;
} & Pick<NextImageProps, "priority" | "sizes" | "quality" | "placeholder" | "loading">;

export type ImageProps =
  | (Common & { src: StaticImageData; width?: number; height?: number })
  | (Common & { src: string; width: number; height: number });

const imgClassName = "sm:squircle h-auto w-full sm:rounded-[calc(var(--radius-xl)---spacing(1))]";

export function Image(props: ImageProps) {
  const { src, alt = "", caption, className, priority, sizes: sizesProp, quality, placeholder, loading } = props;

  const sizes = sizesProp ?? "(max-width: 768px) 100vw, 720px";

  const intrinsicDims =
    typeof src === "string"
      ? {
          width: (props as Extract<ImageProps, { src: string }>).width,
          height: (props as Extract<ImageProps, { src: string }>).height,
        }
      : (() => {
          const p = props as Extract<ImageProps, { src: StaticImageData }>;
          return p.width != null && p.height != null ? { width: p.width, height: p.height } : {};
        })();

  return (
    <figure data-media className={cn("relative my-10 flex flex-col items-center justify-center gap-1.5", className)}>
      <div className="sm:squircle relative -mx-8 bg-card py-1 shadow-border-sm sm:-mx-1 sm:rounded-xl sm:px-1 dark:bg-muted">
        <NextImage
          src={src}
          alt={alt}
          className={imgClassName}
          sizes={sizes}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          loading={loading}
          {...intrinsicDims}
        />
      </div>
      {caption && <figcaption className="mx-auto text-center text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
