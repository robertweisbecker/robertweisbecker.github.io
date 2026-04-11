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
      className={cn("group/back-button -ms-0.5 self-start text-[13px] text-muted-foreground", className)}
      {...rest}
    >
      {/* <IconArrowNarrowLeft
        className="transition-transform group-hover/back-button:-translate-x-0.5"
        data-icon="inline-start"
        strokeWidth={1.5}
      /> */}
      <span className="font-pixel text-[11px] transition-transform group-hover/back-button:-translate-x-0.5">↰</span>
      {children ?? "Back"}
    </LinkButton>
  );
}
