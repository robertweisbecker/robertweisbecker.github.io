"use client";

import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import * as React from "react";

export function Section({
  title,
  className,
  id,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: string;
  children: React.ReactNode;
}) {
  const sectionId =
    id ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <section id={sectionId} className={cn("not-prose flex w-full flex-col items-start gap-2 not-last:mb-10", className)} {...props}>
      <Heading level={2} className="w-full">
        {title}
      </Heading>
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-background p-4">{children}</div>
    </section>
  );
}
