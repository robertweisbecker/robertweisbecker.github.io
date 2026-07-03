import type { ReactNode } from "react";
import { ViewTransition } from "react";

export function pageTitleTransitionName(kind: "project" | "post", slug: string): string {
  const sanitizedSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const validSlug = sanitizedSlug === "" || /^\d/.test(sanitizedSlug) ? `x-${sanitizedSlug}` : sanitizedSlug;

  return `${kind}-title-${validSlug}`;
}

export function TitleMorph({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
