"use client";

import { cn } from "@/lib/utils";
import { LinkButton } from "./ui/link-button";

export function BackButton({
  className,
  size = "sm",
  children,
  href = "/#projects",
  ...rest
}: React.ComponentProps<typeof LinkButton> & { href?: string }) {
  return (
    <LinkButton
      variant="link"
      href={href}
      size={size}
      className={cn("group/back-button self-start font-pixel text-[11px] text-muted-foreground uppercase no-underline", className)}
      {...rest}
    >
      {/* <IconArrowNarrowLeft
        className="transition-transform group-hover/back-button:-translate-x-0.5"
        data-icon="inline-start"
        strokeWidth={1.5}
      /> */}
      <span className="transition-transform group-hover/back-button:-translate-x-0.5">↰</span>
      {children ?? "Back"}
    </LinkButton>
  );
}
