  import { type VariantProps } from "class-variance-authority"
  import Link from "next/link"

  import { buttonVariants } from "@/components/ui/button"
  import { cn } from "@/lib/utils"

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type LinkButtonBaseProps = ButtonVariantProps & {
  className?: string;
  children?: React.ReactNode;
};

type InternalLinkButtonProps = LinkButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, "className"> & {
    isExternal?: false;
  };

type ExternalLinkButtonProps = LinkButtonBaseProps &
  Omit<React.ComponentProps<"a">, "className"> & {
    isExternal: true;
  };

type LinkButtonProps = InternalLinkButtonProps | ExternalLinkButtonProps;

function LinkButton({
  className,
  variant = "default",
  size = "md",
  rounded = false,
  isExternal,
  ...props
}: LinkButtonProps) {
  const classes = cn(buttonVariants({ variant, size, rounded, className }));

  if (isExternal) {
    const { children, ...rest } = props as Omit<
      ExternalLinkButtonProps,
      "className" | "variant" | "size" | "rounded" | "isExternal"
    >;
    return (
      <a data-slot="link-button" className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  const { children, ...rest } = props as Omit<
    InternalLinkButtonProps,
    "className" | "variant" | "size" | "rounded" | "isExternal"
  >;
  return (
    <Link data-slot="link-button" className={classes} {...rest}>
      {children}
    </Link>
  );
}

  export { LinkButton }
