import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface LinkOutProps {
  text: string;
  href: string;
  src?: string;
  icon?: React.ReactNode;
  className?: string;
  linkClass?: string;
}

export function LinkOut({ text, href, src, icon, className, linkClass }: LinkOutProps) {
  return (
    <span
      className={cn(
        "group/link link relative mx-px space-x-1 text-[1em] leading-[inherit] text-foreground",
        src && "ps-[1.25em]",
        className
      )}
    >
      {src && (
        <Avatar className="absolute size-[1em] rounded">
          <AvatarImage src={src} alt={`${text} Logo`} />
          <AvatarFallback>{text.charAt(0)}</AvatarFallback>
        </Avatar>
        // <img
        //   src={src}
        //   alt={`${text} Logo`}
        //   className="-my-[.25em] inline aspect-square size-[1lh] rounded-sm bg-background/50 ring ring-border"
        // />
      )}
      <a
        data-component="link-out"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("relative inline-flex items-center gap-[0.25em] leading-[inherit]", linkClass)}
      >
        {/* <Avatar className="size-[1em]">{icon}</Avatar> */}
        {icon && <span className="-my-1 ms-0.5 size-[1em] opacity-50 group-hover/link:opacity-72">{icon}</span>}
        {text}
        <LinkOutIcon className="absolute -top-[.25em] -right-[.5em] size-[1em] opacity-0 transition-[translate,opacity] group-hover/link:translate-x-[0.125em] group-hover/link:-translate-y-[0.125em] group-hover/link:opacity-100 group-focus-visible:hidden" />
      </a>
    </span>
  );
}

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
