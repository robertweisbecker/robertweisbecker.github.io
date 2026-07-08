"use client";

import { cn } from "@/lib/utils";
import { LinkButton } from "./ui/link-button";
import { IconChevronLeft } from "@tabler/icons-react";

export function BackButton({
  className,
  size = "xs",
  children,
  href = "/#projects",
  pixel = false,
  ...rest
}: React.ComponentProps<typeof LinkButton> & { href?: string; pixel?: boolean }) {
  return (
    <LinkButton
      variant="link"
      href={href}
      size={size}
      className={cn("group/back-button self-start no-underline", pixel && "font-pixel text-[11px] uppercase", className)}
      {...rest}
    >
      {pixel ? (
        <span className="transition-transform group-hover/back-button:-translate-x-0.5">↰</span>
      ) : (
        <IconChevronLeft
          className="mt-px grid-stack rounded-full bg-muted transition-transform group-hover/back-button:-translate-x-0.5"
          data-icon="inline-start"
          strokeWidth={2}
        />
      )}
      {children ?? "Back"}
    </LinkButton>
  );
}
