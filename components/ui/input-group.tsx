"use client";

  import { cva,type VariantProps } from "class-variance-authority"
  import * as React from "react"

  import { Button } from "@/components/ui/button"
  import { Input,inputVariants } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
  import { cn } from "@/lib/utils"

function InputGroup({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputVariants>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      data-size={size}
      className={cn(
        inputVariants({ size }),
        "group/input-group relative flex ui-input w-full min-w-0 shrink-0 gap-0 p-0 in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-aria-disabled:bg-input/50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible:not(:read-only)]:ring has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>*:read-only]:bg-transparent! has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1 has-[>[data-align=inline-start]]:[&>input]:ps-1",

        className
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground relative self-stretch gap-1 py-1.5 font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none",
  {
    variants: {
      align: {
        "inline-start": "ps-[0.5em] has-[>button]:ms-[-0.25em] has-[>kbd]:ms-[-0.125em] order-first",
        "inline-end": "pe-[0.5em] has-[>button]:me-[-0.25em] has-[>kbd]:me-[-0.125em] order-last",
        "block-start":
          "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-1 order-first w-full justify-start text-sm",
        "block-end":
          "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-1 order-last w-full justify-start text-sm",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("gap-1 text-sm shadow-none flex items-center", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-xs px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "",
      "icon-xs": "size-6",
      "icon-sm": "size-button-sm p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "sm",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      data-slot="input-group-button"
      data-size={size}
      type={type}
      size={size}
      variant={variant}
      className={cn(
        size === "icon-xs" && "size-button-xs rounded-xs [--button-xs:--spacing(5)]",
        size === "icon-sm" && "size-button-xs p-0 has-[>svg]:p-0",
        size === "xs" && "gap-1 rounded px-1.5 [&>svg:not([class*='size-'])]:size-3",
        size === "sm" && "gap-1 px-2 text-sm [--button-sm:--spacing(6)] [&>svg:not([class*='size-'])]:size-3.5",
        className
      )}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "pointer-events-none flex items-center gap-2 text-[size:inherit] font-normal text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, size = "md", ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      data-size={size}
      className={cn(
        "shadow-0! h-full flex-1 rounded-none border-0! bg-transparent! py-0! pe-0 shadow-none! ring-0! focus-visible:ring-0! disabled:bg-transparent! aria-invalid:ring-0 dark:bg-transparent! dark:disabled:bg-transparent!",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0! bg-transparent! py-2 shadow-none! ring-0! focus-visible:ring-0! disabled:bg-transparent! aria-invalid:ring-0 dark:bg-transparent! dark:disabled:bg-transparent!",
        className
      )}
      {...props}
    />
  );
}

  export { InputGroup,InputGroupAddon,InputGroupButton,InputGroupInput,InputGroupText,InputGroupTextarea }
