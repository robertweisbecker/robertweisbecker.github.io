"use client";

import { ColorSwatchGroup, type ColorSwatch } from "@/components/color-swatch-group";
import { NumberSlider } from "@/components/number-slider";
import {
  ALL_HUE_OPTIONS,
  COLOR_MAP,
  HUE_OPTIONS,
  NEUTRAL_OPTIONS,
  useTheme,
  type HueName,
  type NeutralName,
} from "@/components/theme";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IconRotate2, IconWheel } from "@tabler/icons-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";

const ALL_SWATCHES: ColorSwatch[] = ALL_HUE_OPTIONS.map((opt) => ({
  value: opt.value,
  label: opt.label,
  color: opt.preview,
}));

const NEUTRAL_SWATCHES: ColorSwatch[] = NEUTRAL_OPTIONS.map((opt) => ({
  value: opt.value,
  label: opt.label,
  color: opt.preview,
}));

function ThemeFieldReset({
  className,
  dirty,
  onReset,
  "aria-label": ariaLabel,
}: {
  className?: string;
  dirty: boolean;
  onReset: () => void;
  "aria-label": string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className={cn(
              "-my-1 shrink-0 text-muted-foreground opacity-100 transition-opacity starting:opacity-0",
              !dirty && "pointer-events-none hidden opacity-0",
              className
            )}
            disabled={!dirty}
            onClick={onReset}
            aria-label={ariaLabel}
          />
        }
      >
        <IconRotate2 />
      </TooltipTrigger>
      <TooltipContent>Reset</TooltipContent>
    </Tooltip>
  );
}

export function ThemeResetAllButton({ variant = "ghost", size = "sm", ...props }: React.ComponentProps<typeof Button>) {
  const { reset, isDirty } = useTheme();

  return (
    <Button variant={variant} size={size} onClick={reset} disabled={!isDirty} {...props}>
      Reset theme
    </Button>
  );
}

export function HueSwatch({ hue }: { hue: HueName }) {
  return (
    <span
      className="inline-block size-3 shrink-0 rounded-full border ring ring-popover"
      style={{ backgroundColor: COLOR_MAP.get(hue)?.preview }}
    />
  );
}

export function ThemeSettings({ className }: { className?: string }) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label="Theme settings" />}
        className={cn("text-muted-foreground", className)}
      >
        <IconWheel
          strokeWidth={1.5}
          className="size-4 shrink-0 rounded-full bg-conic/longer from-red-400 to-pink-400 text-background inset-ring inset-ring-border transition-[rotate] duration-400 ease-in-out-quad in-data-popup-open:rotate-720"
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-xs flex-col gap-0 overflow-hidden p-0">
        <PopoverHeader className="px-4 pt-4 pb-2">
          <div className="flex w-full items-start justify-between gap-2">
            <PopoverTitle>Theme</PopoverTitle>
          </div>
          <PopoverDescription>Adjust the theme to your heart&apos;s content.</PopoverDescription>
        </PopoverHeader>
        <ThemeSettingsPanel className="px-4 pb-2" />
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border px-4 py-3 text-sm">
          <Link href="/posts/theming" className="link text-secondary-foreground">
            Learn more
          </Link>
          <span className="text-muted-foreground" aria-hidden>
            ∙
          </span>
          <ThemeResetAllButton variant="link" size="md" className="h-auto min-h-0 p-0" />
        </div>
      </PopoverContent>
    </Popover>
  );
}

type ColorDisplayMode = "select" | "swatches";

export function ThemeSettingsPanel({
  className,
  hueDisplay = "select",
  neutralDisplay = "swatches",
}: {
  className?: string;
  hueDisplay?: ColorDisplayMode;
  neutralDisplay?: ColorDisplayMode;
}) {
  const { hue, neutral, radius, defaultHue, defaultNeutral, defaultRadius, set } = useTheme();

  const hueDirty = hue !== defaultHue;
  const neutralDirty = neutral !== defaultNeutral;
  const radiusDirty = radius !== defaultRadius;

  return (
    <FieldGroup className={className}>
      <FieldSet>
        <FieldLegend>Colors</FieldLegend>
        <FieldGroup>
          <Field>
            <div className="flex items-center gap-1">
              <FieldLabel className="me-auto">Primary hue</FieldLabel>

              <span className="text-xs text-muted-foreground capitalize">{hue}</span>
              <ThemeFieldReset
                dirty={hueDirty}
                onReset={() => set({ hue: defaultHue })}
                aria-label="Reset hue to default"
              />
            </div>
            {hueDisplay === "select" ? (
              <Select value={hue} onValueChange={(v) => set({ hue: v as HueName })}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <HueSwatch hue={hue} />
                    {COLOR_MAP.get(hue)?.label ?? hue}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Hues</SelectLabel>
                    {HUE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <HueSwatch hue={opt.value} />
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Grays</SelectLabel>
                    {NEUTRAL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <HueSwatch hue={opt.value} />
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <ColorSwatchGroup
                colors={ALL_SWATCHES}
                value={hue}
                onValueChange={(v) => set({ hue: v as HueName })}
                allowCustomColors={false}
              />
            )}
          </Field>

          <Field>
            <div className="flex items-center gap-2">
              <FieldLabel>Neutral hue</FieldLabel>
              <span className="ms-auto text-xs text-muted-foreground capitalize">{neutral}</span>
              <ThemeFieldReset
                dirty={neutralDirty}
                onReset={() => set({ neutral: defaultNeutral })}
                aria-label="Reset neutral palette to default"
              />
            </div>

            {neutralDisplay === "swatches" ? (
              <ColorSwatchGroup
                colors={NEUTRAL_SWATCHES}
                value={neutral}
                onValueChange={(v) => set({ neutral: v as NeutralName })}
                allowCustomColors={false}
              />
            ) : (
              <Select value={neutral} onValueChange={(v) => set({ neutral: v as NeutralName })}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <HueSwatch hue={neutral} />
                    {COLOR_MAP.get(neutral)?.label ?? neutral}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Neutrals</SelectLabel>
                    {NEUTRAL_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <HueSwatch hue={opt.value} />
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <NumberSlider
        label="Radius"
        labelAction={
          <>
            <ThemeFieldReset
              dirty={radiusDirty}
              onReset={() => set({ radius: defaultRadius })}
              aria-label="Reset radius to default"
            />
          </>
        }
        min={0}
        max={32}
        step={1}
        value={radius}
        onValueChange={(v) => set({ radius: v })}
        unit="px"
      />
    </FieldGroup>
  );
}
