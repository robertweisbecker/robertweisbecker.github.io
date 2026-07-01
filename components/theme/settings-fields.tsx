"use client";

import { ColorSwatchGroup, type ColorSwatch } from "@/components/color-swatch-group";
import { PixelResetSmallIcon } from "@/components/icons-pixel";
import { NumberSlider } from "@/components/number-slider";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { isOneOf } from "@/lib/is-one-of";
import { cn } from "@/lib/utils";
import {
  ALL_HUE_OPTIONS,
  COLOR_MAP,
  HUE_OPTIONS,
  NEUTRAL_OPTIONS,
  type HueName,
} from "./model";
import { useTheme } from "./provider";

const hueNames = ALL_HUE_OPTIONS.map((option) => option.value);
const neutralNames = NEUTRAL_OPTIONS.map((option) => option.value);

const ALL_SWATCHES: ColorSwatch[] = ALL_HUE_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label, color: opt.preview }));
const NEUTRAL_SWATCHES: ColorSwatch[] = NEUTRAL_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label, color: opt.preview }));

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
            rounded
            className={cn("-my-1 -ms-1 size-3 shrink-0 text-muted-foreground opacity-100 transition-opacity", !dirty && "pointer-events-none opacity-0!", className)}
            disabled={!dirty}
            onClick={onReset}
            aria-label={ariaLabel}
          />
        }
      >
        <PixelResetSmallIcon />
      </TooltipTrigger>
      <TooltipContent>Reset</TooltipContent>
    </Tooltip>
  );
}

export function ThemeResetAllButton({ variant = "ghost", size = "sm", ...props }: React.ComponentProps<typeof Button>) {
  const { reset, isDirty } = useTheme();

  return (
    <Button variant={variant} size={size} onClick={reset} disabled={!isDirty} {...props}>
      Reset to default
    </Button>
  );
}

export function HueSwatch({ hue }: { hue: HueName }) {
  return <span className="inline-block size-3 shrink-0 rounded-full border ring ring-popover" style={{ backgroundColor: COLOR_MAP.get(hue)?.preview }} />;
}

export type ThemeColorDisplayMode = "select" | "swatches";

type ThemeFieldHeaderProps = {
  label: React.ReactNode;
  value: string;
  dirty: boolean;
  onReset: () => void;
  resetLabel: string;
  showReset?: boolean;
  showValue?: boolean;
};

function ThemeFieldHeader({ label, value, dirty, onReset, resetLabel, showReset = true, showValue = true }: ThemeFieldHeaderProps) {
  return (
    <div className="flex items-center gap-1 pe-1">
      {label !== null && <FieldLabel className="me-auto">{label}</FieldLabel>}
      {showReset && <ThemeFieldReset dirty={dirty} onReset={onReset} aria-label={resetLabel} />}
      {showValue && <span className="text-xs text-muted-foreground capitalize">{value}</span>}
    </div>
  );
}

export type ThemePrimaryColorFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> & {
  display?: ThemeColorDisplayMode;
  label?: React.ReactNode;
  showReset?: boolean;
  showValue?: boolean;
};

export function ThemePrimaryColorField({
  className,
  display = "select",
  label = "Primary color",
  showReset,
  showValue,
  ...props
}: ThemePrimaryColorFieldProps) {
  const { hue, defaultHue, set } = useTheme();
  const hueDirty = hue !== defaultHue;
  const setHue = (value: unknown) => {
    if (isOneOf(value, hueNames)) set({ hue: value });
  };

  return (
    <Field className={className} {...props}>
      <ThemeFieldHeader
        label={label}
        value={hue}
        dirty={hueDirty}
        onReset={() => set({ hue: defaultHue })}
        resetLabel="Reset primary color to default"
        showReset={showReset}
        showValue={showValue}
      />
      {display === "select" ? (
        <Select value={hue} onValueChange={setHue}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <HueSwatch hue={hue} />
              {COLOR_MAP.get(hue)?.label ?? hue}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Grays</SelectLabel>
              {NEUTRAL_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <HueSwatch hue={opt.value} />
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Hues</SelectLabel>
              {HUE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <HueSwatch hue={opt.value} />
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <ColorSwatchGroup colors={ALL_SWATCHES} value={hue} onValueChange={setHue} allowCustomColors={false} />
      )}
    </Field>
  );
}

export type ThemeNeutralColorFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> & {
  display?: ThemeColorDisplayMode;
  label?: React.ReactNode;
  showReset?: boolean;
  showValue?: boolean;
};

export function ThemeNeutralColorField({
  className,
  display = "swatches",
  label = "Neutral color",
  showReset,
  showValue,
  ...props
}: ThemeNeutralColorFieldProps) {
  const { neutral, defaultNeutral, set } = useTheme();
  const neutralDirty = neutral !== defaultNeutral;
  const setNeutral = (value: unknown) => {
    if (isOneOf(value, neutralNames)) set({ neutral: value });
  };

  return (
    <Field className={className} {...props}>
      <ThemeFieldHeader
        label={label}
        value={neutral}
        dirty={neutralDirty}
        onReset={() => set({ neutral: defaultNeutral })}
        resetLabel="Reset neutral color to default"
        showReset={showReset}
        showValue={showValue}
      />

      {display === "swatches" ? (
        <ColorSwatchGroup colors={NEUTRAL_SWATCHES} value={neutral} onValueChange={setNeutral} allowCustomColors={false} />
      ) : (
        <Select value={neutral} onValueChange={setNeutral}>
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
  );
}

export type ThemeRadiusFieldProps = Omit<
  React.ComponentProps<typeof NumberSlider>,
  "label" | "labelAction" | "min" | "max" | "step" | "value" | "onValueChange" | "unit"
> & {
  label?: string;
  max?: number;
  min?: number;
  showReset?: boolean;
  step?: number;
  unit?: string;
};

export function ThemeRadiusField({
  label = "Radius",
  max = 32,
  min = 0,
  showReset = true,
  step = 1,
  unit = "px",
  ...props
}: ThemeRadiusFieldProps) {
  const { radius, defaultRadius, set } = useTheme();
  const radiusDirty = radius !== defaultRadius;

  return (
    <NumberSlider
      label={label}
      labelAction={showReset ? <ThemeFieldReset dirty={radiusDirty} onReset={() => set({ radius: defaultRadius })} aria-label="Reset radius to default" /> : null}
      min={min}
      max={max}
      step={step}
      value={radius}
      onValueChange={(value) => set({ radius: value })}
      unit={unit}
      {...props}
    />
  );
}

export type ThemeSettingsPanelProps = React.ComponentProps<typeof FieldGroup> & {
  hueDisplay?: ThemeColorDisplayMode;
  neutralDisplay?: ThemeColorDisplayMode;
};

export function ThemeSettingsPanel({ className, hueDisplay = "select", neutralDisplay = "swatches", children, ...props }: ThemeSettingsPanelProps) {
  return (
    <FieldGroup className={className} {...props}>
      {children ?? (
        <>
          <FieldSet>
            <FieldLegend>Colors</FieldLegend>
            <FieldGroup>
              <ThemePrimaryColorField display={hueDisplay} />
              <ThemeNeutralColorField display={neutralDisplay} />
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <ThemeRadiusField />
        </>
      )}
    </FieldGroup>
  );
}
