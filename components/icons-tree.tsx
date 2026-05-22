import { cn } from "@/lib/utils";
import * as React from "react";

// Trees c/o Pierre https://trees.software/ | src: https://github.com/pierrecomputer/pierre/blob/main/packages/trees/src/builtInIcons.ts

export function TreeIconFile({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-icon-file"
      viewBox="0 0 16 16"
      {...props}
      className={cn("not-[class^='text-']:text-[#84848a] dark:not-[class^='text-']:text-[#adadb1]", className)}
    >
      <path
        fill="currentColor"
        d="M8 1v3a3 3 0 0 0 3 3h3v5.5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-9A2.5 2.5 0 0 1 4.5 1z"
        className="bg"
        opacity=".5"
      />
      <path fill="currentColor" d="M9.5 1a.5.5 0 0 1 .354.146l4 4A.5.5 0 0 1 14 5.5V6h-3a2 2 0 0 1-2-2V1z" className="fg" />
    </svg>
  );
}

export function TreeSvgIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-svg"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#d47628] dark:not-[class^='text-']:text-[#ffa359]", className)}
      {...props}
    >
      <path fill="currentColor" d="M5 7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
      <path fill="currentColor" d="M6 1a5 5 0 0 1 4.58 3H7a3 3 0 0 0-3 3v3.58A5 5 0 0 1 6 1" opacity=".5" />
    </svg>
  );
}
export function TreeIconTailwind({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-tailwind"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#1ca1c7] dark:not-[class^='text-']:text-[#68cdf2]", className)}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 4Q5.2 4 4.5 6.67q1.05-1.34 2.45-1c.53.12.91.5 1.33.9C8.98 7.23 9.77 8 11.5 8q2.8 0 3.5-2.67-1.05 1.34-2.45 1c-.53-.12-.91-.5-1.33-.9C10.52 4.77 9.73 4 8 4M4.5 8Q1.7 8 1 10.67q1.05-1.34 2.45-1c.53.12.91.5 1.33.9C5.48 11.23 6.26 12 8 12q2.8 0 3.5-2.67-1.05 1.34-2.45 1c-.53-.12-.91-.5-1.33-.9C7.02 8.77 6.24 8 4.5 8"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TreeIconTypescript({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-typescript"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#1a85d4] dark:not-[class^='text-']:text-[#69b1ff]", className)}
      {...props}
    >
      <path fill="currentColor" d="M8 1C2.24 1 1 2.24 1 8s1.24 7 7 7 7-1.24 7-7-1.24-7-7-7" className="bg" opacity=".2" />
      <path
        fill="currentColor"
        d="M8.1 9.64h.95c.04.62.28.76 1.28.76s1.2-.14 1.2-.85c0-.66-.2-.85-1.2-1.07-1.79-.38-2.18-.7-2.18-1.86C8.15 5.3 8.54 5 10.31 5c1.67 0 2.04.26 2.07 1.42h-.95c-.02-.43-.23-.53-1.1-.53-1 0-1.22.14-1.22.74 0 .52.22.7 1.24.92 1.76.38 2.15.73 2.15 2 0 1.44-.4 1.75-2.24 1.75-1.8 0-2.18-.3-2.15-1.66m-3 1.57V5.99H3.5v-.9h4.21v.9H6.1v5.22z"
      />
    </svg>
  );
}

export function TreeIconReact({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-react"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#1ca1c7] dark:not-[class^='text-']:text-[#68cdf2]", className)}
      {...props}
    >
      <path fill="currentColor" d="M8 6.65c.73 0 1.31.6 1.31 1.35S8.73 9.35 8 9.35 6.69 8.75 6.69 8 7.27 6.65 8 6.65" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 2.55c1.3-.99 2.59-1.34 3.5-.8.92.55 1.27 1.87 1.08 3.53C14.06 5.94 15 6.9 15 8s-.94 2.06-2.42 2.72c.19 1.65-.16 2.98-1.08 3.52-.91.55-2.2.2-3.5-.8-1.3 1-2.58 1.35-3.5.8-.91-.54-1.27-1.87-1.08-3.52C1.94 10.06 1 9.1 1 8s.94-2.06 2.42-2.72c-.19-1.66.17-2.98 1.08-3.52s2.2-.2 3.5.8M4.26 11.2c-.08 1.34.28 2.03.68 2.26s1.15.22 2.25-.52l.11-.09a12 12 0 0 1-1.24-1.39 11 11 0 0 1-1.8-.41zm7.47-.15q-.83.27-1.79.41-.6.8-1.24 1.4l.11.08c1.1.74 1.86.76 2.25.52.4-.23.76-.92.68-2.26zm-3.04.54a14 14 0 0 1-1.38 0q.34.38.69.7.35-.32.7-.7M8 5.29q-.76 0-1.47.1A13 13 0 0 0 5.07 8a14 14 0 0 0 1.46 2.62 13 13 0 0 0 2.94 0A13 13 0 0 0 10.93 8a14 14 0 0 0-1.46-2.62A13 13 0 0 0 8 5.3M4.64 9.18q-.15.5-.25.96.44.16.94.27a15 15 0 0 1-.7-1.23m6.73 0a15 15 0 0 1-.7 1.23q.5-.11.95-.27a10 10 0 0 0-.25-.96M3.44 6.26C2.27 6.86 1.87 7.53 1.87 8s.4 1.14 1.57 1.74l.13.07q.18-.88.55-1.81a12 12 0 0 1-.55-1.8q-.07.02-.13.06m8.99-.07A12 12 0 0 1 11.88 8q.36.94.55 1.8l.13-.06c1.17-.6 1.56-1.27 1.56-1.74s-.39-1.14-1.56-1.74zm-7.1-.6q-.5.11-.94.27.1.46.25.96a15 15 0 0 1 .69-1.23m5.34 0a15 15 0 0 1 .7 1.23q.14-.5.24-.96-.44-.15-.94-.27M7.18 3.06c-1.09-.74-1.85-.76-2.24-.52s-.76.92-.69 2.26l.01.15a11 11 0 0 1 1.8-.41q.6-.8 1.24-1.4zm3.88-.52c-.4-.24-1.15-.22-2.25.52l-.12.08q.65.6 1.25 1.4.96.15 1.8.41v-.14c.08-1.35-.28-2.04-.68-2.27M8 3.7a10 10 0 0 0-.7.7 14 14 0 0 1 1.4 0 10 10 0 0 0-.7-.7"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function TreeIconClaude({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-claude"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#d47628] dark:not-[class^='text-']:text-[#ffa359]", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.75 10.31 6.5 8.77l.04-.14-.04-.07h-.14l-.46-.03-1.57-.04-1.38-.07-1.33-.07-.34-.07L1 7.86l.03-.21.28-.18.4.03.89.07 1.33.08.97.06 1.43.16h.22l.03-.1-.07-.05-.06-.06-1.39-.92-1.48-.98-.79-.57-.42-.28-.2-.28-.1-.6.39-.41.52.04.12.03.52.4 1.12.86L6.2 6.04l.2.17.09-.06.01-.04-.1-.15-.76-1.46-.85-1.46-.37-.6-.1-.36a1 1 0 0 1-.06-.42l.42-.59.25-.07.6.08.22.2.36.84.58 1.3.9 1.77.29.53.14.47.04.14h.1v-.07l.07-1 .14-1.22.14-1.57.04-.45.23-.53.42-.28.36.15.28.41-.04.25-.16 1.08-.36 1.7-.21 1.14h.12l.14-.15.58-.76.97-1.2.42-.5.5-.51.32-.25h.6l.44.66-.2.68-.61.79-.52.65-.74 1-.45.8.04.05h.1l1.68-.36.9-.16 1.06-.18.5.23.05.22-.2.48-1.15.28-1.34.28-2 .46-.04.01.03.04.9.09.4.03h.94l1.77.14.46.28.27.37-.04.28-.72.37-.95-.23-2.24-.53-.76-.18h-.11v.06l.64.63L12 10.86l1.48 1.35.07.34-.18.28-.2-.03-1.29-.98-.5-.42-1.12-.95h-.07v.1l.25.38 1.37 2.05.07.63-.1.2-.36.14-.38-.08-.8-1.12-.85-1.26-.66-1.15-.07.05-.4 4.23-.19.21-.42.17-.35-.28-.2-.42.2-.87.23-1.12.18-.9.17-1.1.1-.36v-.03h-.1l-.84 1.16-1.27 1.72-1 1.07-.24.1-.42-.22.04-.39.22-.32 1.4-1.8.84-1.1.57-.64-.02-.07h-.04l-3.7 2.4-.66.09-.28-.28.03-.42.14-.14 1.12-.77z"
      />
    </svg>
  );
}

export function TreeIconHtml({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-html"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#d47628] dark:not-[class^='text-']:text-[#ffa359]", className)}
      {...props}
    >
      <path fill="currentColor" d="M8 1C2.24 1 1 2.24 1 8s1.24 7 7 7 7-1.24 7-7-1.24-7-7-7" className="bg" opacity=".2" />
      <path
        fill="currentColor"
        d="M10.48 3.76a.5.5 0 0 1 .4.58L10.6 5.8h1.14a.5.5 0 0 1 0 1h-1.32L10 9.2h1.08a.5.5 0 0 1 0 1H9.8l-.3 1.64a.5.5 0 1 1-.98-.18l.27-1.46H6.4l-.3 1.64a.5.5 0 1 1-.98-.18l.27-1.46H4.25a.5.5 0 0 1 0-1h1.32L6 6.8H4.93a.5.5 0 0 1 0-1H6.2l.3-1.64a.5.5 0 1 1 .98.18L7.2 5.8h2.4l.3-1.64a.5.5 0 0 1 .58-.4M6.58 9.2h2.4l.44-2.4h-2.4z"
        className="fg"
      />
    </svg>
  );
}

export function TreeIconImage({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-image"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#d32a61] dark:not-[class^='text-']:text-[#ff678d]", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12.5 2A2.5 2.5 0 0 1 15 4.5v4.67l-4.05-3.54-4.08 4.08-3-2L1 10.6V4.5A2.5 2.5 0 0 1 3.5 2z"
        opacity=".3"
      />
      <path
        fill="currentColor"
        d="M15 10.5v1a2.5 2.5 0 0 1-2.5 2.5h-9a2.5 2.5 0 0 1-2.46-2.04L4 9l3 2 4-4zm-7-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      />
    </svg>
  );
}

export function TreeIconJson({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-json"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#d47628] dark:not-[class^='text-']:text-[#ffa359]", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.25 11.5V9.75a.5.5 0 0 1 .36-.48l.55-.15a1.16 1.16 0 0 0 0-2.24l-.55-.15a.5.5 0 0 1-.36-.48V4.5a2.5 2.5 0 0 0-2.5-2.5h-.25a.5.5 0 0 0 0 1h.25a1.5 1.5 0 0 1 1.5 1.5v1.75a1.5 1.5 0 0 0 1.09 1.44l.54.15a.16.16 0 0 1 0 .32l-.54.15a1.5 1.5 0 0 0-1.09 1.44v1.75a1.5 1.5 0 0 1-1.5 1.5h-.25a.5.5 0 0 0 0 1h.25a2.5 2.5 0 0 0 2.5-2.5m-10.5 0V9.75a.5.5 0 0 0-.36-.48l-.55-.15a1.16 1.16 0 0 1 0-2.24l.55-.15a.5.5 0 0 0 .36-.48V4.5A2.5 2.5 0 0 1 5.25 2h.25a.5.5 0 0 1 0 1h-.25a1.5 1.5 0 0 0-1.5 1.5v1.75a1.5 1.5 0 0 1-1.09 1.44l-.54.15a.16.16 0 0 0 0 .32l.54.15a1.5 1.5 0 0 1 1.09 1.45v1.74a1.5 1.5 0 0 0 1.5 1.5h.25a.5.5 0 0 1 0 1h-.25a2.5 2.5 0 0 1-2.5-2.5"
      />
    </svg>
  );
}

export function TreeIconNextJs({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-nextjs"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#000000] dark:not-[class^='text-']:text-[#ffffff]", className)}
      {...props}
    >
      <defs>
        <linearGradient id="a" x1="4.522" x2="14" y1="3.943" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path fill="currentColor" d="M3 2h1.522v9.09H3z" />
      <path fill="url(#a)" d="M4.903 2 15 15.075q-.565.5-1.195.925L4.522 3.943z" />
      <path fill="url(#a)" d="M12.172 2h-1.508v9.094h1.508z" />
    </svg>
  );
}

export function TreeIconCss({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-css"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#693acf] dark:not-[class^='text-']:text-[#9d6afb]", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M8 15c-5.76 0-7-1.24-7-7V2a1 1 0 0 1 1-1h6c5.77 0 7 1.24 7 7s-1.24 7-7 7"
        className="vector"
        opacity=".2"
      />
      <path
        fill="currentColor"
        d="M10.1 9.19h.73c.03.49.22.6 1 .6.76 0 .93-.12.93-.68 0-.52-.17-.67-.94-.85-1.38-.3-1.68-.56-1.68-1.47 0-1.05.3-1.29 1.67-1.29 1.29 0 1.57.2 1.6 1.13h-.74c-.01-.34-.17-.42-.85-.42-.77 0-.94.1-.94.58 0 .42.17.55.96.73 1.36.3 1.66.58 1.66 1.59 0 1.14-.31 1.39-1.73 1.39-1.39 0-1.69-.24-1.67-1.31m-3.9 0h.74c.03.49.21.6.99.6.76 0 .93-.12.93-.68 0-.52-.17-.67-.93-.85-1.39-.3-1.69-.56-1.69-1.47 0-1.05.3-1.29 1.67-1.29 1.3 0 1.58.2 1.6 1.13h-.73c-.02-.34-.18-.42-.85-.42-.78 0-.95.1-.95.58 0 .42.17.55.96.73 1.37.3 1.67.58 1.67 1.59 0 1.14-.32 1.39-1.74 1.39-1.38 0-1.68-.24-1.66-1.31m-1.22 0h.75c-.09 1.07-.37 1.31-1.56 1.31-1.37 0-1.68-.45-1.68-2.5 0-1.96.36-2.5 1.68-2.5 1.16 0 1.44.25 1.52 1.35h-.76c-.08-.52-.22-.64-.76-.64-.74 0-.9.33-.9 1.78 0 1.47.16 1.8.9 1.8.58 0 .74-.11.8-.6"
      />
    </svg>
  );
}

export function TreeIconMarkdown({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      id="file-tree-builtin-markdown"
      viewBox="0 0 16 16"
      className={cn("not-[class^='text-']:text-[#199f43] dark:not-[class^='text-']:text-[#5ecc71]", className)}
      {...props}
    >
      <path fill="currentColor" d="M1 12V4h2l2 2.5L7 4h2v8H7V7.5l-2 2-2-2V12zm9-3 3 3.5L16 9h-2V4h-2v5z" />
    </svg>
  );
}

export function TreeIconRichText({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M7.25 4C7.66421 4 8 4.33579 8 4.75C8 5.16421 7.66421 5.5 7.25 5.5H4.75C4.33579 5.5 4 5.16421 4 4.75C4 4.33579 4.33579 4 4.75 4H7.25Z" />
      <path d="M11.25 11.5C11.6642 11.5 12 11.8358 12 12.25C12 12.6642 11.6642 13 11.25 13H4.75C4.33579 13 4 12.6642 4 12.25C4 11.8358 4.33579 11.5 4.75 11.5H11.25Z" />
      <path d="M4 7.5C4 6.94772 4.44772 6.5 5 6.5H11C11.5523 6.5 12 6.94772 12 7.5V9.5C12 10.0523 11.5523 10.5 11 10.5H5C4.44772 10.5 4 10.0523 4 9.5V7.5Z" />
      <path d="M10.75 0C10.9489 0 11.1396 0.0790743 11.2803 0.219727L14.7803 3.71973C14.9209 3.86038 15 4.05109 15 4.25V13.25C15 14.7688 13.7688 16 12.25 16H3.75C2.23122 16 1 14.7688 1 13.25V2.75C1 1.23122 2.23122 0 3.75 0H10.75ZM3.75 1.5C3.05964 1.5 2.5 2.05964 2.5 2.75V13.25C2.5 13.9404 3.05964 14.5 3.75 14.5H12.25C12.9404 14.5 13.5 13.9404 13.5 13.25V5H12.25C11.0074 5 10 3.99264 10 2.75V1.5H3.75Z" />
    </svg>
  );
}
