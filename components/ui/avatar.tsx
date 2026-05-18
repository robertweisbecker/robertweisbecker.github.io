"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "group/avatar relative flex shrink-0 rounded-(--avatar-radius) bg-card text-card-foreground select-none size-(--avatar-size) [--avatar-radius:var(--radius-sm)] [--avatar-size:--spacing(6)] inset-ring-1 inset-ring-border overflow-hidden flex items-center justify-center",
  {
    variants: {
      size: {
        default: "-my-1 text-[13px]",
        sm: "-my-0.5 [--avatar-radius:var(--radius-xs)] [--avatar-size:--spacing(4)] text-[11px]",
        lg: "-my-2 [--avatar-radius:var(--radius-md)] [--avatar-size:--spacing(8)] text-[15px]",
      },
      defaultVariants: {
        size: "default",
      },
    },
  }
);

function Avatar({ className, size, ...props }: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
  return <AvatarPrimitive.Root data-slot="avatar" data-size={size} className={cn(avatarVariants({ size }), className)} {...props} />;
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-(--avatar-radius) object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("grid-stack size-full overflow-hidden rounded-(--avatar-radius) font-pixel text-[11px] [&_svg]:size-4", className)}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute inset-e-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color shadow-[0_0_1px_1px] shadow-background select-none",
        "group-data-[size=sm]/avatar:size-1 group-data-[size=sm]/avatar:[&_svg]:hidden",
        "group-data-[size=default]/avatar:size-1.5 group-data-[size=default]/avatar:[&_svg]:size-2",
        "group-data-[size=lg]/avatar:size-2 group-data-[size=lg]/avatar:[&_svg]:size-2",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-card", className)}
      {...props}
    />
  );
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-(--avatar-size) shrink-0 items-center justify-center rounded-(--avatar-radius) bg-primary text-xs text-primary-foreground ring-2 ring-background [&_svg]:size-[calc(var(--avatar-size)/2)]",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };
