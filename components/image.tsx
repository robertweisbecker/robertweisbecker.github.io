  import { cn } from "@/lib/utils"

export function Image({
  className,
  caption,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { caption?: string }) {
  return (
    <figure data-media className={cn("not-prose relative flex flex-col items-center justify-center gap-2", className)}>
      <div className="not-prose relative rounded-xl bg-card p-1 shadow-border-sm">
        {/* <div className="bg-muted/50 ring-foreground/10 pointer-events-none absolute inset-0 rounded-xl ring" /> */}
        <img {...props} className="rounded-[calc(var(--radius-xl)---spacing(1))]" />
      </div>
      {caption && <figcaption className="text-xs text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
