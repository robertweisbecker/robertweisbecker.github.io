"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Form, TooltipPositionerProps } from "@base-ui/react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import * as React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";

export type ColorSwatch = {
  value: string;
  label: string;
  color: string;
  preview?: string;
};

type ColorSwatchGroupProps = {
  tooltipSide?: TooltipPositionerProps["side"];
  colors: ColorSwatch[];
  value: string;
  columns?: number;
  className?: string;
  allowCustomColors?: boolean;
  allowDeselect?: boolean;
  onValueChange: (value: string) => void;
};

export function ColorSwatchGroup({
  colors,
  value,
  columns = colors.length,
  className,
  allowCustomColors = true,
  allowDeselect = false,
  onValueChange,
  tooltipSide = "top",
}: ColorSwatchGroupProps) {
  const [customColors, setCustomColors] = React.useState<ColorSwatch[]>([]);
  const [isCustomOpen, setIsCustomOpen] = React.useState(false);
  const [customColorInput, setCustomColorInput] = React.useState("");
  const customColorInputRef = React.useRef<HTMLInputElement>(null);
  const selected = React.useMemo(() => (value ? [value] : []), [value]);
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
        onValueChange(allowDeselect ? "" : colors[0].value);
      }
    },
    [allowDeselect, colors, onValueChange, value]
  );

  React.useEffect(() => {
    if (!isCustomOpen) return;
    requestAnimationFrame(() => {
      customColorInputRef.current?.focus({ preventScroll: true });
    });
  }, [isCustomOpen]);

  return (
    // <TooltipProvider delay={0}>
    <LazyMotion features={domAnimation}>
      <div className="my-0">
        <TooltipGroup side={tooltipSide} sideOffset={6} delay={100}>
          <ToggleGroup
            value={selected}
            onValueChange={(next) => {
              const nextValue = Array.isArray(next) ? next[0] : undefined;
              if (nextValue) {
                onValueChange(nextValue);
                return;
              }

              if (allowDeselect) {
                onValueChange("");
              }
            }}
            size="sm"
            spacing={0.5}
            variant="outline"
            shape="round"
            data-columns={columns}
            className={cn("flex-wrap", className)}
            aria-label="Choose a swatch color"
            render={<m.div />}
          >
            {allColors.map((swatch) => (
              <TooltipTrigger
                key={swatch.value}
                tooltip={swatch.label}
                closeOnClick={false}
                render={
                  <ToggleGroupItem
                    value={swatch.value}
                    aria-label={swatch.label}
                    className={cn(
                      "relative aspect-square h-8 w-8 rounded-full p-1",
                      "group ease cursor-pointer border-transparent transition-[border,background,outline-width,outline-offset] duration-200 hover:border-border data-pressed:border-3 data-pressed:border-current data-pressed:bg-current/20"
                    )}
                    style={{ touchAction: "manipulation", color: swatch.color }}
                  />
                }
              >
                <m.span
                  className={cn(
                    "peer pointer-events-none block aspect-square size-full shrink-0 origin-center rounded-full inset-shadow-xs inset-ring inset-shadow-black/20 inset-ring-foreground/20 group-hover:inset-ring-foreground/50 group-data-pressed:size-[calc(100%-4px)]"
                  )}
                  aria-hidden
                  style={{ background: swatch.preview ?? swatch.color }}
                  animate={{
                    scale: selected.includes(swatch.value) ? 0.98 : 1,
                    outlineWidth: 4,
                    outlineOffset: 2,
                    outlineColor: selected.includes(swatch.value) ? swatch.color : undefined,
                  }}
                  transition={{ type: "spring", visualDuration: 200 }}
                />
                {/* {selected.includes(swatch.value) ? (
                <m.span
                  key={`color-swatch-group-ring-${swatch.value}`}
                  className="absolute inset-0 rounded-full border-transparent opacity-0"
                  initial={{ borderWidth: 0, borderColor: "transparent", inset: 0, opacity: 0 }}
                  animate={{ borderWidth: 4, borderColor: swatch.color, inset: -4, opacity: 1 }}
                  layoutId="selected-color-ring"
                  transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                />
              ) : null} */}
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
                          <Button variant="elevated" size="icon-sm" aria-label="Add color option" rounded className="my-1">
                            <IconPlus />
                          </Button>
                        }
                      />
                    }
                  />
                  <PopoverContent initialFocus={false} className="container w-96">
                    <PopoverHeader>
                      <PopoverTitle className="text-xs text-muted-foreground">Enter a new color in CSS format</PopoverTitle>
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
                            <InputGroupButton type="submit" variant="ghost" disabled={!isCustomColorValid}>
                              Add{" "}
                              <Kbd data-icon="inline-end" className="translate-x-0.5">
                                ⏎
                              </Kbd>
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                      </Field>
                    </Form>

                    {customColors.length > 0 ? (
                      <ScrollArea className="max-h-36" showScrollbar scrollFade orientation="vertical">
                        <ItemGroup className="gap-1">
                          {customColors.map((swatch) => (
                            <Item key={swatch.value} size="xs" className="font-mono text-xs">
                              <ItemMedia>
                                <div
                                  className="ms-1 size-4 rounded inset-ring inset-ring-input"
                                  style={{ backgroundColor: swatch.color }}
                                  aria-hidden
                                />
                              </ItemMedia>
                              <ItemContent>
                                <ItemTitle>{swatch.value}</ItemTitle>
                                {/* <ItemDescription className="font-mono text-xs text-muted-foreground">{swatch.label}</ItemDescription> */}
                              </ItemContent>
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
    </LazyMotion>
    // </TooltipProvider>
  );
}
