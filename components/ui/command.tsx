"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { Dialog as CommandDialogPrimitive } from "@base-ui/react/dialog";
import { IconSearch } from "@tabler/icons-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from "@/components/ui/autocomplete";
import { Kbd } from "./kbd";

export const CommandDialog: typeof CommandDialogPrimitive.Root = CommandDialogPrimitive.Root;

export const CommandDialogPortal: typeof CommandDialogPrimitive.Portal = CommandDialogPrimitive.Portal;

export const CommandCreateHandle: typeof CommandDialogPrimitive.createHandle = CommandDialogPrimitive.createHandle;

export function CommandDialogTrigger(props: CommandDialogPrimitive.Trigger.Props): React.ReactElement {
  return <CommandDialogPrimitive.Trigger data-slot="command-dialog-trigger" {...props} />;
}

export function CommandDialogBackdrop({ className, ...props }: CommandDialogPrimitive.Backdrop.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 bg-background opacity-10 transition-opacity duration-150 ease-[cubic-bezier(0.45,1.005,0,1.005)] data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:opacity-30",
        className
      )}
      data-slot="command-dialog-backdrop"
      {...props}
    />
  );
}

export function CommandDialogViewport({ className, ...props }: CommandDialogPrimitive.Viewport.Props): React.ReactElement {
  return (
    <CommandDialogPrimitive.Viewport
      className={cn("fixed inset-0 z-100 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]", className)}
      data-slot="command-dialog-viewport"
      {...props}
    />
  );
}

export function CommandDialogPopup({
  className,
  children,
  portalProps,
  ...props
}: CommandDialogPrimitive.Popup.Props & {
  portalProps?: CommandDialogPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <CommandDialogPortal {...portalProps}>
      {/* <CommandDialogBackdrop /> */}
      <CommandDialogViewport>
        <CommandDialogPrimitive.Popup
          className={cn(
            "squircle relative row-start-2 flex max-h-120 min-h-0 w-full max-w-3xl min-w-0 flex-col overflow-hidden ui-popup rounded-3xl transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform outline-none data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0 **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1",
            className
          )}
          data-slot="command-dialog-popup"
          {...props}
        >
          {children}
        </CommandDialogPrimitive.Popup>
      </CommandDialogViewport>
    </CommandDialogPortal>
  );
}

type CommandGroupedProps<Items extends readonly { items: readonly unknown[] }[]> = Omit<
  AutocompletePrimitive.Root.Props<Items[number]["items"][number]>,
  "items"
> & { items: Items };

type CommandFlatProps<ItemValue> = Omit<AutocompletePrimitive.Root.Props<ItemValue>, "items"> & {
  items?: readonly ItemValue[] | undefined;
};

export function Command<Items extends readonly { items: readonly unknown[] }[]>(props: CommandGroupedProps<Items>): React.ReactElement;
export function Command<ItemValue>(props: CommandFlatProps<ItemValue>): React.ReactElement;
export function Command(props: CommandFlatProps<unknown>): React.ReactElement {
  const { autoHighlight = "always", keepHighlight = true, ...rest } = props;
  return <Autocomplete autoHighlight={autoHighlight} inline keepHighlight={keepHighlight} open {...rest} />;
}

export function CommandInput({
  className,
  placeholder = undefined,
  ...props
}: React.ComponentProps<typeof AutocompleteInput>): React.ReactElement {
  return (
    <div className="border-b border-border/50 px-2.5 pt-1.5">
      <AutocompleteInput
        autoFocus
        className={cn("border-none! bg-transparent! shadow-none! outline-none! focus-visible:ring-0", className)}
        placeholder={placeholder}
        size="lg"
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, ...props }: React.ComponentProps<typeof AutocompleteList>): React.ReactElement {
  return <AutocompleteList className={cn("not-empty:scroll-py-2 not-empty:p-2", className)} data-slot="command-list" {...props} />;
}

export function CommandEmpty({ className, ...props }: React.ComponentProps<typeof AutocompleteEmpty>): React.ReactElement {
  return <AutocompleteEmpty className={cn("not-empty:py-6", className)} data-slot="command-empty" {...props} />;
}

export function CommandPanel({ className, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "squircle relative flex min-h-0 flex-1 flex-col rounded-lg bg-card shadow-border-xs **:data-[slot=scroll-area-scrollbar]:mt-2",
        className
      )}
      {...props}
    />
  );
}

export function CommandGroup({ className, ...props }: React.ComponentProps<typeof AutocompleteGroup>): React.ReactElement {
  return <AutocompleteGroup className={className} data-slot="command-group" {...props} />;
}

export function CommandGroupLabel({ className, ...props }: React.ComponentProps<typeof AutocompleteGroupLabel>): React.ReactElement {
  return (
    <AutocompleteGroupLabel
      className={cn("text-2xs font-medium text-popover-foreground/64", className)}
      data-slot="command-group-label"
      {...props}
    />
  );
}

export function CommandCollection({ ...props }: React.ComponentProps<typeof AutocompleteCollection>): React.ReactElement {
  return <AutocompleteCollection data-slot="command-collection" {...props} />;
}

export function CommandItem({ className, ...props }: React.ComponentProps<typeof AutocompleteItem>): React.ReactElement {
  return (
    <AutocompleteItem className={cn("group/command-item squircle gap-2 rounded-lg py-2", className)} data-slot="command-item" {...props} />
  );
}

export function CommandSeparator({ className, ...props }: React.ComponentProps<typeof AutocompleteSeparator>): React.ReactElement {
  return <AutocompleteSeparator className={cn("my-2", className)} data-slot="command-separator" {...props} />;
}

export function CommandShortcut({ className, ...props }: React.ComponentProps<"kbd">): React.ReactElement {
  return <Kbd className={cn("ms-auto", className)} data-slot="command-shortcut" {...props} />;
}

export function CommandFooter({ className, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "squircle flex items-center justify-between gap-2 rounded-b-xl px-5 pt-3 pb-4 text-xs text-muted-foreground shadow-[0_-1px_0_0] shadow-border/50",
        className
      )}
      data-slot="command-footer"
      {...props}
    />
  );
}

export { CommandDialogPrimitive };
