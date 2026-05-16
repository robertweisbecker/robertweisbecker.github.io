"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/ui/number-field";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import * as React from "react";
import { InputGroupAddon, InputGroupText } from "./ui/input-group";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const PERCENT_FORMAT: Intl.NumberFormatOptions = {
  style: "unit",
  unit: "percent",
  maximumFractionDigits: 0,
};

const DEFAULT_FORMAT: Intl.NumberFormatOptions = {
  maximumFractionDigits: 0,
};

type NumberSliderProps = {
  id?: string;
  label?: string;
  /** Renders at the end of the label row (e.g. per-field reset). */
  labelAction?: React.ReactNode;
  min: number;
  max: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  /** "percent" appends a % suffix. Otherwise pass Intl options. */
  format?: "percent" | Intl.NumberFormatOptions;
  className?: string;
  "aria-label"?: string;
  showButtons?: boolean;
  unit?: string;
};

export function NumberSlider({
  id,
  label,
  labelAction,
  min,
  max,
  step = 1,
  value,
  onValueChange,
  disabled,
  format,
  className,
  showButtons,
  unit,
  "aria-label": ariaLabel,
}: NumberSliderProps) {
  const numberFieldFormat = format === "percent" ? PERCENT_FORMAT : typeof format === "object" ? format : DEFAULT_FORMAT;

  const handleSliderChange = React.useCallback(
    (next: number | readonly number[]) => {
      if (disabled) return;
      const raw = Array.isArray(next) ? next[0] : next;
      if (typeof raw !== "number") return;
      onValueChange(clamp(raw, min, max));
    },
    [disabled, min, max, onValueChange]
  );

  const handleNumberFieldChange = React.useCallback(
    (next: number | null) => {
      if (disabled) return;
      if (next == null) return;
      onValueChange(clamp(next, min, max));
    },
    [disabled, min, max, onValueChange]
  );

  const slider = (
    <Slider
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      value={[value]}
      format={DEFAULT_FORMAT}
      onValueChange={handleSliderChange}
      disabled={disabled}
    />
  );

  const numberField = (
    <NumberField
      data-slot="number-field"
      id={id}
      allowWheelScrub
      min={min}
      max={max}
      step={step}
      value={value}
      size="sm"
      onValueChange={handleNumberFieldChange}
      format={numberFieldFormat}
      aria-label={ariaLabel ?? label}
      className="w-fit"
      disabled={disabled}
    >
      <NumberFieldGroup className="w-[8ch]">
        {showButtons && <NumberFieldDecrement />}
        <NumberFieldInput className={cn("text-end", unit && "pe-0.5")} />
        {showButtons && <NumberFieldIncrement />}
        {unit && (
          <InputGroupAddon align="inline-end">
            <NumberFieldScrubArea />
            <InputGroupText>{unit}</InputGroupText>
          </InputGroupAddon>
        )}
      </NumberFieldGroup>
    </NumberField>
  );

  if (!label) {
    return (
      <div className={className}>
        {slider}
        {numberField}
      </div>
    );
  }

  return (
    <Field orientation="horizontal" className={cn(className)}>
      <div className="flex items-center gap-2">
        <FieldLabel
          htmlFor={id}
          // className={
          //   labelAction
          //     ? "w-full min-w-0 flex-row flex-wrap items-center justify-between gap-2 [&>span:first-child]:flex [&>span:first-child]:min-w-0 [&>span:first-child]:items-center [&>span:first-child]:gap-1"
          //     : undefined
          // }
        >
          {label}
        </FieldLabel>
        {labelAction}
      </div>
      {slider}
      {numberField}
    </Field>
  );
}
