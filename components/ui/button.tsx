"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

function Button({
  className,
  variant = "default",
  size = "md",
  rounded = false,
  disabled,
  focusableWhenDisabled,
  loading,
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-loading={loading}
      disabled={loading || disabled}
      focusableWhenDisabled={focusableWhenDisabled ?? loading}
      className={cn(buttonVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {children}
      {loading && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          data-slot="loader"
          className="absolute animate-spin text-(--button-color)"
        >
          <path d="M9.74524 4.32328L12.0952 1.08728L13.309 1.96869L10.959 5.20469L9.74524 4.32328Z" fill="currentColor" fillOpacity="0.1" />
          <path d="M15.3763 4.8147L11.5723 6.0507L12.0358 7.47728L15.8398 6.24128L15.3763 4.8147Z" fill="currentColor" fillOpacity="0.2" />
          <path
            d="M15.8398 9.75871L12.0358 8.52271L11.5723 9.94929L15.3763 11.1853L15.8398 9.75871Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path d="M13.309 14.0313L10.959 10.7953L9.74524 11.6767L12.0952 14.9127L13.309 14.0313Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M8.75 12V16H7.25V12H8.75Z" fill="currentColor" fillOpacity="0.5" />
          <path
            d="M6.25488 11.6767L3.90488 14.9127L2.69116 14.0313L5.04116 10.7953L6.25488 11.6767Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M4.42781 9.94929L0.623806 11.1853L0.160278 9.75871L3.96428 8.52271L4.42781 9.94929Z"
            fill="currentColor"
            fillOpacity="0.7"
          />
          <path
            d="M3.96428 7.47728L0.160278 6.24128L0.623806 4.8147L4.42781 6.0507L3.96428 7.47728Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M2.69116 1.96869L5.04116 5.20469L6.25488 4.32328L3.90488 1.08728L2.69116 1.96869Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          <path d="M7.25 4V0H8.75V4H7.25Z" fill="currentColor" />
        </svg>
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
