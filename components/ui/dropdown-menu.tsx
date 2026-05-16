"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import * as React from "react";

import { cn } from "@/lib/utils";
import { IconArrowUpRight, IconCheck, IconChevronRight } from "@tabler/icons-react";
import { cva, VariantProps } from "class-variance-authority";
import { CheckIcon } from "../icons";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = "center",
  alignOffset = -4,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) w-fit min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto ui-popup py-2 text-card-foreground outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-start-2 data-[side=inline-start]:slide-in-from-end-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            // "inset-shadow-[0_1px_--alpha(var(--color-white)/10%)]",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "flex min-h-7 items-center gap-2 px-3 pt-1 pb-2 text-2xs font-medium text-popover-foreground/67 data-inset:ps-4",
        className
      )}
      {...props}
    />
  );
}

const menuItemVariants = cva(
  "group/dropdown-menu-item data-inset:ps-10 outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 relative select-none flex items-center gap-2 rounded-md py-1.5 pe-4 ps-5 text-sm [&_svg]:opacity-64 [&_svg:not([class*='size-'])]:size-4 [&>svg:not([class*='ms-'])]:-ms-0.5 [&>svg:not([class*='me-'])]:-me-0.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 relative before:absolute before:inset-y-0 before:inset-x-2 before:rounded-md data-disabled:before:hidden aria-current:before:bg-accent aria-current:before:text-accent-foreground",

  {
    variants: {
      variant: {
        default: [
          "text-popover-foreground/92",
          "data-highlighted:before:bg-current/5 data-highlighted:text-popover-foreground data-highlighted:**:text-inherit ",
        ],
        destructive:
          "text-destructive data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:before:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive data-[variant=destructive]:*:[svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props &
  VariantProps<typeof menuItemVariants> & {
    inset?: boolean;
  }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(menuItemVariants({ variant, className }))}
      {...props}
    />
  );
}

function DropdownMenuLink({
  className,
  inset,
  children,
  newTab = false,
  ...props
}: MenuPrimitive.LinkItem.Props &
  VariantProps<typeof menuItemVariants> & {
    inset?: boolean;
    newTab?: boolean;
  }) {
  return (
    <MenuPrimitive.LinkItem
      data-slot="dropdown-menu-link"
      data-inset={inset}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(menuItemVariants({ variant: "default", className }), "group/dropdown-menu-link", className)}
      {...props}
    >
      {children}
      {newTab ? (
        <IconArrowUpRight className="ease ms-auto opacity-64 transition-[opacity,translate] duration-100 group-hover/dropdown-menu-link:translate-x-px group-hover/dropdown-menu-link:-translate-y-0.5 group-hover/dropdown-menu-link:opacity-100 rtl:rotate-180" />
      ) : undefined}
    </MenuPrimitive.LinkItem>
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props &
  VariantProps<typeof menuItemVariants> & {
    inset?: boolean;
  }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(menuItemVariants({ variant: "default", className }), "group/dropdown-menu-sub-trigger")}
      {...props}
    >
      {children}
      <IconChevronRight className="ms-auto rtl:rotate-180" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "w-auto min-w-[96px] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props &
  VariantProps<typeof menuItemVariants> & {
    inset?: boolean;
  }) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(menuItemVariants({ variant: "default", className }), "group/dropdown-menu-checkbox-item")}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-e-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <IconCheck />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props &
  VariantProps<typeof menuItemVariants> & {
    inset?: boolean;
  }) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(menuItemVariants({ variant: "default", className }), "group/dropdown-menu-radio-item")}
      {...props}
    >
      <div className="size-3">
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon className="size-3" />
        </MenuPrimitive.RadioItemIndicator>
      </div>
      <span
        className="pointer-events-none absolute inset-e-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      ></span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  inset,
  ...props
}: MenuPrimitive.Separator.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("mx-3 my-1 h-px bg-border", inset && "ms-4", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd data-slot="dropdown-menu-shortcut" className={cn("ms-auto font-mono text-xs text-popover-foreground/60", className)} {...props} />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenu as Menu,
  DropdownMenuCheckboxItem as MenuCheckbox,
  DropdownMenuGroup as MenuGroup,
  DropdownMenuLabel as MenuGroupLabel,
  DropdownMenuItem as MenuItem,
  DropdownMenuLink as MenuLink,
  DropdownMenuContent as MenuPopup,
  DropdownMenuPortal as MenuPortal,
  DropdownMenuRadioItem as MenuRadio,
  DropdownMenuRadioGroup as MenuRadioGroup,
  DropdownMenuSeparator as MenuSeparator,
  DropdownMenuShortcut as MenuShortcut,
  DropdownMenuSub as MenuSub,
  DropdownMenuSubContent as MenuSubPopup,
  DropdownMenuSubTrigger as MenuSubTrigger,
  DropdownMenuTrigger as MenuTrigger,
};
