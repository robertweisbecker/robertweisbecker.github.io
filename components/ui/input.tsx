import { Input as InputPrimitive } from "@base-ui/react/input";
import { NumberField as NumberPrimitive } from "@base-ui/react/number-field";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(["transition-colors text-base", "file:bg-card file:inline-flex file:border-0 file:text-sm file:font-medium"], {
  variants: {
    size: {
      md: "h-button rounded-[var(--radius-md)] file:h-button sm:text-sm",
      xs: "h-button-xs rounded-[var(--radius-xs)] text-xs file:h-button-xs sm:[&_input]:text-xs",
      sm: "h-button-sm rounded-[var(--radius-sm)] text-[0.8125rem] file:h-button-sm sm:[&_input]:text-sm",
      lg: "h-button-lg rounded-[var(--radius-lg)] text-[0.9375rem] file:h-button-lg sm:[&_input]:text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

function Input({ className, size = "md", ...props }: Omit<InputPrimitive.Props, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      data-slot="input"
      data-size={size}
      autoComplete="off"
      className={cn(
        inputVariants({ size, className }),
        "ui-input [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
      )}
      {...props}
    />
  );
}

function NumberInput({ className, size = "md", ...props }: NumberPrimitive.Root.Props & VariantProps<typeof inputVariants>) {
  return (
    <NumberPrimitive.Root data-size={size} {...props}>
      <NumberPrimitive.Group className={cn(inputVariants({ size, className }), "ui-input")}>
        <NumberPrimitive.Input />
        <Button variant="ghost" size="icon-xs" render={<NumberPrimitive.Decrement />}>
          <IconMinus />
        </Button>
        <Button variant="ghost" size="icon-xs" render={<NumberPrimitive.Increment />}>
          <IconPlus />
        </Button>
      </NumberPrimitive.Group>
    </NumberPrimitive.Root>
  );
}

export { Input, inputVariants, NumberInput };
