"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button-variants";
import { Loader } from "@/components/ui/loader";
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
      {loading && <Loader className="absolute text-(--button-color)" />}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
