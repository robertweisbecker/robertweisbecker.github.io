import { cn } from "@/lib/utils";

export function Image({
  className,
  caption,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { caption?: string }) {
  return (
    <figure
      data-media
      className={cn("not-prose relative my-0! flex flex-col items-center justify-center gap-2", className)}
    >
      <div className="squircle relative -mx-8 bg-card py-1 shadow-border-sm sm:-mx-1 sm:rounded-xl sm:px-1 dark:bg-muted">
        {/* <div className="bg-muted/50 ring-foreground/10 pointer-events-none absolute inset-0 rounded-xl ring" /> */}
        <img {...props} className="squircle sm:rounded-[calc(var(--radius-xl)---spacing(1))]" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mx-auto max-w-prose text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
