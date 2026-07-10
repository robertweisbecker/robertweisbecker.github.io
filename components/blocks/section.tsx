import * as React from "react";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  title: React.ReactNode;
  children: React.ReactNode;
  description?: React.ReactNode;
  contentClassName?: string;
  descriptionClassName?: string;
  headingClassName?: string;
  level?: 2 | 3 | 4 | 5 | 6;
};

export function Section({
  title,
  className,
  contentClassName,
  description,
  descriptionClassName,
  headingClassName,
  id,
  level = 2,
  children,
  ...props
}: SectionProps) {
  const sectionId =
    id ??
    (typeof title === "string"
      ? title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : undefined);

  return (
    <section className={cn("not-prose flex w-full min-w-0 flex-col items-start gap-2 not-last:mb-10", className)} {...props}>
      <Heading id={sectionId} level={level} className={cn("w-full", headingClassName)}>
        {title}
      </Heading>
      {description ? <p className={cn("max-w-2xl text-sm text-muted-foreground", descriptionClassName)}>{description}</p> : null}
      <div
        className={cn(
          "flex w-full min-w-0 flex-col items-start gap-4 rounded-2xl bg-muted/50 p-4 inset-shadow-border squircle",
          contentClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
