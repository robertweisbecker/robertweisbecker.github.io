import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface LinkOutProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  text?: React.ReactNode;
  href: string;
  src?: string;
  icon?: React.ReactNode;
  className?: string;
  linkClass?: string;
  children?: React.ReactNode;
}

export const LinkOut = React.forwardRef<HTMLAnchorElement, LinkOutProps>(function LinkOut(
  { text, href, src, icon, className, linkClass, children, ...props },
  ref
) {
  return (
    <a
      ref={ref}
      data-component="link-out"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/link link relative mx-px inline-flex items-center gap-[0.25em] space-x-1 text-[1em] leading-[inherit]",
        src && "ps-[1.25em]",
        className,
        linkClass
      )}
      {...props}
    >
      {src && (
        <Avatar className="absolute size-[1em] rounded">
          <AvatarImage src={src} alt={`${text} Logo`} />
          <AvatarFallback>{text?.toString().charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      {icon && <span className="-my-1 ms-0.5 size-[1em] opacity-50 group-hover/link:opacity-72">{icon}</span>}
      {text || children}
      <LinkOutIcon className="absolute -top-[.25em] -right-[.5em] size-[1em] opacity-0 transition-[translate,opacity] group-hover/link:translate-x-[0.125em] group-hover/link:-translate-y-[0.125em] group-hover/link:opacity-100 group-focus-visible:hidden" />
    </a>
  );
});

function LinkOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      // strokeLinecap="round"
      // strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M17 7l-10 10"
        className="transition-[stroke-dashoffset,stroke-dasharray] duration-200 ease-out [stroke-dasharray:20] [stroke-dashoffset:20] group-hover/link:[stroke-dasharray:10] group-hover/link:[stroke-dashoffset:initial]"
      />
      <path d="M8 7l9 0l0 9" />
    </svg>
  );
}
