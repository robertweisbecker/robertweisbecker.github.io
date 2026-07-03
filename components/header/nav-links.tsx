"use client";

import { usePathname } from "next/navigation";

import { PixelEyeIcon, PixelNewspaperIcon, PixelPointerIcon, PixelScribbleIcon } from "@/components/icons-pixel";
import { LinkButton, type LinkButtonProps } from "@/components/ui/link-button";
import { cn } from "@/lib/utils";

type HeaderLinkButtonProps = Omit<Extract<LinkButtonProps, { isExternal?: false }>, "size" | "rounded" | "className" | "children"> & {
  label: string;
  icon?: React.ReactNode;
  mobileIconOnly?: boolean;
  className?: string;
};

function HeaderLinkButton({ label, icon, mobileIconOnly = false, className, ...props }: HeaderLinkButtonProps) {
  return (
    <LinkButton
      variant="ghost"
      rounded={true}
      size="sm"
      className={cn(mobileIconOnly && "max-md:size-button max-md:gap-0", "text-xs font-normal text-muted-foreground", className)}
      {...props}
    >
      {icon && (
        <>
          <span className={cn(mobileIconOnly && "max-md:hidden")}>{icon}</span>
          {mobileIconOnly ? <span className="m-0! md:hidden">{icon}</span> : null}
        </>
      )}
      <span className={cn(mobileIconOnly && "max-md:sr-only")}>{label}</span>
    </LinkButton>
  );
}

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <HeaderLinkButton
        label="Posts"
        icon={<PixelNewspaperIcon scale={1.5} />}
        mobileIconOnly={false}
        href="/posts"
        aria-current={pathname.startsWith("/posts") ? "true" : "false"}
        className="max-md:hidden"
      />
      <HeaderLinkButton
        label="Art"
        icon={<PixelScribbleIcon scale={1.5} />}
        mobileIconOnly={true}
        href="/art"
        aria-current={pathname === "/art" ? "true" : "false"}
        className="max-md:hidden"
      />
      <HeaderLinkButton
        label="Play"
        icon={<PixelPointerIcon scale={1.5} />}
        mobileIconOnly={false}
        href="/playground/motion"
        aria-current={pathname.startsWith("/playground") ? "true" : "false"}
        className="max-md:hidden"
      />

      {process.env.NODE_ENV === "development" && (
        <HeaderLinkButton
          label="Dev"
          icon={<PixelEyeIcon scale={1.5} data-icon="inline-start" />}
          mobileIconOnly={true}
          href="/private"
          aria-current={pathname === "/private" ? "true" : "false"}
        />
      )}
    </>
  );
}
