"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Form, TooltipPositionerProps } from "@base-ui/react";
import { IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import * as React from "react";
import { Field, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "./ui/item";
import { Kbd } from "./ui/kbd";
import { ScrollArea } from "./ui/scroll-area";

export type ColorSwatch = {
  value: string;
  label: string;
  color: string;
};

type ColorSwatchGroupProps = {
  tooltipSide?: TooltipPositionerProps["side"];
  colors: ColorSwatch[];
  value: string;
  columns?: number;
  className?: string;
  allowCustomColors?: boolean;
  onValueChange: (value: string) => void;
};

export function ColorSwatchGroup({
  colors,
  value,
  columns = colors.length,
  className,
  allowCustomColors = true,
  onValueChange,
  tooltipSide = "top",
}: ColorSwatchGroupProps) {
  const [customColors, setCustomColors] = React.useState<ColorSwatch[]>([]);
  const [isCustomOpen, setIsCustomOpen] = React.useState(false);
  const [customColorInput, setCustomColorInput] = React.useState("");
  const customColorInputRef = React.useRef<HTMLInputElement>(null);
  const selected = React.useMemo(() => [value], [value]);
  const allColors = React.useMemo(() => [...colors, ...customColors], [colors, customColors]);

  const isCustomColorValid = React.useMemo(() => {
    const nextValue = customColorInput.trim();
    return nextValue.length > 0 && CSS.supports("color", nextValue);
  }, [customColorInput]);

  const addCustomColor = React.useCallback(() => {
    const nextValue = customColorInput.trim();
    if (!nextValue || !CSS.supports("color", nextValue)) return;
    if (allColors.some((swatch) => swatch.value === nextValue)) {
      onValueChange(nextValue);
      setCustomColorInput("");
      setIsCustomOpen(false);
      return;
    }

    const customSwatch: ColorSwatch = {
      value: nextValue,
      label: `Custom ${customColors.length + 1}`,
      color: nextValue,
    };

    setCustomColors((prev) => [...prev, customSwatch]);
    onValueChange(nextValue);
    setCustomColorInput("");
    setIsCustomOpen(false);
  }, [allColors, customColorInput, customColors.length, onValueChange]);

  const removeCustomColor = React.useCallback(
    (swatchValue: string) => {
      setCustomColors((prev) => prev.filter((customColor) => customColor.value !== swatchValue));
      if (value === swatchValue && colors[0]) {
        onValueChange(colors[0].value);
      }
    },
    [colors, onValueChange, value]
  );

  React.useEffect(() => {
    if (!isCustomOpen) return;
    requestAnimationFrame(() => {
      customColorInputRef.current?.focus({ preventScroll: true });
    });
  }, [isCustomOpen]);

  return (
    // <TooltipProvider delay={0}>
    <div className="my-0">
      <TooltipGroup side={tooltipSide} sideOffset={6}>
        <ToggleGroup
          value={selected}
          onValueChange={(next) => {
            const nextValue = Array.isArray(next) ? next[0] : undefined;
            if (nextValue) onValueChange(nextValue);
          }}
          size="sm"
          spacing={1}
          className={cn("flex-wrap rounded-full py-1", className)}
          aria-label="Choose a swatch color"
        >
          {allColors.map((swatch) => (
            <TooltipTrigger
              key={swatch.value}
              tooltip={swatch.label}
              render={
                <ToggleGroupItem
                  value={swatch.value}
                  aria-label={swatch.label}
                  className={cn(
                    "aspect-square h-8 w-8 rounded-full border p-0.5",
                    "group data-pressed:border-primary data-pressed:bg-muted data-pressed:ring-1 data-pressed:ring-primary"
                  )}
                  style={{ touchAction: "manipulation", color: swatch.color }}
                />
              }
            >
              <span
                className="peer block aspect-square size-full shrink-0 origin-center rounded-full bg-current inset-shadow-xs inset-shadow-black/20 outline -outline-offset-1 outline-foreground/20 transition-[transform,scale,outline,box-shadow,width,height] group-hover:outline-foreground/50 group-data-pressed:size-[calc(100%-4px)]"
                aria-hidden
              />
            </TooltipTrigger>
          ))}
          {allowCustomColors ? (
            <>
              <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
                <PopoverTrigger
                  render={
                    <TooltipTrigger
                      tooltip="Add…"
                      render={
                        <Button
                          variant="elevated"
                          size="icon-sm"
                          aria-label="Add color option"
                          rounded
                          className="my-1"
                        >
                          <IconPlus />
                        </Button>
                      }
                    />
                  }
                />
                <PopoverContent initialFocus={false} className="container w-96">
                  <PopoverHeader>
                    <PopoverTitle className="text-xs text-muted-foreground">
                      Enter a new color in CSS format
                    </PopoverTitle>
                  </PopoverHeader>
                  <Form
                    onSubmit={(event) => {
                      event.preventDefault();
                      addCustomColor();
                    }}
                  >
                    <Field>
                      <FieldLabel>Color</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          ref={customColorInputRef}
                          value={customColorInput}
                          onChange={(event) => setCustomColorInput(event.target.value)}
                          placeholder="#b0b0b0"
                          aria-label="Custom color value"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="submit"
                            variant="ghost"
                            // disabled={!isCustomColorValid}
                          >
                            Add{" "}
                            <Kbd data-icon="inline-end" className="translate-x-0.5">
                              ↲
                            </Kbd>
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  </Form>

                  {customColors.length > 0 ? (
                    <ScrollArea className="max-h-36" showScrollbar scrollFade>
                      <ItemGroup>
                        {customColors.map((swatch) => (
                          <Item key={swatch.value} variant="muted" size="xs" className="rounded-md">
                            <ItemMedia>
                              <span
                                className="size-3 rounded-full inset-ring inset-ring-input"
                                style={{ backgroundColor: swatch.color }}
                                aria-hidden
                              />
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle>{swatch.label} </ItemTitle>
                            </ItemContent>
                            <ItemDescription className="flex-1 truncate text-end font-mono text-xs text-muted-foreground">
                              {swatch.value}
                            </ItemDescription>
                            <ItemActions>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                className="text-destructive"
                                onClick={() => removeCustomColor(swatch.value)}
                                aria-label={`Remove ${swatch.label}`}
                              >
                                <IconTrash />
                              </Button>
                            </ItemActions>
                          </Item>
                        ))}
                      </ItemGroup>
                    </ScrollArea>
                  ) : null}
                </PopoverContent>
              </Popover>
            </>
          ) : null}
        </ToggleGroup>
      </TooltipGroup>
    </div>
    // </TooltipProvider>
  );
}
