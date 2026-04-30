import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "group/item-group grid w-full min-w-0 gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-1 has-data-[variant=default]:gap-0",
        // 'bg-muted rounded-2xl p-1 -m-1',
        className
      )}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn(
        "peer my-0 opacity-50 transition-opacity duration-100 has-[+_a[data-slot=item]:hover]:opacity-0",
        className
      )}
      {...props}
    />
  );
}

const itemVariants = cva(
  "[a]:hover:after:bg-accent [a]:after:transition-all [a]:hover:after:scale-100 [a]:after:scale-95 [a]:after:absolute [a]:after:inset-0 [a]:after:duration-200 [a]:after:ease [a]:after:rounded-[inherit] [a]:after:-z-1 isolate relative rounded-xl border border-border/50 text-sm flex-1 group/item focus-visible:border-ring focus-visible:ring-ring/50 flex items-center flex-wrap outline-none transition-colors duration-100 focus-visible:ring-[3px] [a]:transition-colors [data-slot=card-content]>:where(&):py-0 squircle [a]:hover:[&_+[data-slot=item-separator]]:opacity-0 ",
  {
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "bg-accent border-transparent",
        elevated: "shadow-border-sm border-transparent bg-card [a]:hover:after:bg-sidebar",
      },
      size: {
        lg: "gap-4 p-5 rounded-2xl data-[variant=default]:-mx-5",
        default: "gap-4 px-4 py-3 data-[variant=default]:-mx-4",
        sm: "gap-3 px-3 py-2.5 has-data-[variant=default]:-mx-3 ",
        xs: "gap-2.5 p-1.5 in-data-[slot=dropdown-menu-content]:p-0  data-[variant=default]:-mx-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(itemVariants({ variant, size, className })),
      },
      props
    ),
    render,
    state: {
      slot: "item",
      variant,
      size,
    },
  });
}

const itemMediaVariants = cva("gap-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none squircle", {
  variants: {
    variant: {
      default: "bg-transparent min-h-lh min-w-lh",
      icon: " [&_svg:not([class*='size-'])]:size-3.5 grid-stack min-h-5 grid-stack min-w-5 bg-current/5 text-primary rounded-xs self-center",
      image:
        "size-10 bg-card overflow-hidden shadow-border-xs rounded-md group-data-[size=sm]/item:size-9 group-data-[size=sm]/item:rounded-md group-data-[size=xs]/item:size-7 [&_img]:size-full [&_img]:object-contain [&_svg]:size-6 in-group-data-[variant=muted]/item:bg-muted in-group-data-[variant=muted]/item:shadow-none group-has-data-[slot=item-description]/item:self-start group-has-data-[slot=item-description]/item:translate-y-0.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "line-clamp-1 flex w-fit items-center gap-2 text-base leading-tight font-medium group-data-[size=sm]/item:text-sm/none",
        "group-data-[size=xs]/item:text-sm",
        className
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "line-clamp-2 text-start font-normal text-muted-foreground group-data-[size=sm]/item:text-sm group-data-[size=xs]/item:text-xs [&>a]:link [&>a:hover]:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />;
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
};
