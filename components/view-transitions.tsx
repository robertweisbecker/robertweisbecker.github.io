import type { ReactNode } from "react";
import { ViewTransition } from "react";

export const NAV_FORWARD_TRANSITION = ["nav-forward"];
export const NAV_BACK_TRANSITION = ["nav-back"];

export function pageTitleTransitionName(kind: "project" | "post", slug: string): string {
  const sanitizedSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  const validSlug = sanitizedSlug === "" || /^\d/.test(sanitizedSlug) ? `x-${sanitizedSlug}` : sanitizedSlug;

  return `${kind}-title-${validSlug}`;
}

export function PageViewTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

export function TitleMorph({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
