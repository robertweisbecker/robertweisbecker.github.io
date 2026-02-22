import { cn } from "@/lib/utils";

type Variant =
  | "two"
  | "three"
  | "twoUp"
  | "threeUp"
  | "fourUp"
  | "fit"
  | "oneThird"
  | "twoThirds";

const variantClasses: Record<Variant, string> = {
  two: "grid-cols-2",
  three: "grid-cols-1 sm:grid-cols-3",
  twoUp: "grid-cols-1 md:grid-cols-2",
  threeUp: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  fourUp: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  fit: "grid-cols-1 sm:grid-cols-[auto_1fr]",
  oneThird: "grid-cols-1 md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr]",
  twoThirds: "grid-cols-1 md:grid-cols-[2fr_1fr]",
};

interface LayoutGridProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export function LayoutGrid({
  variant = "twoUp",
  className,
  children,
}: LayoutGridProps) {
  return (
    <div
      className={cn(
        "grid items-start gap-4 sm:gap-10 md:gap-12",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
