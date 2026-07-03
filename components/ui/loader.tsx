import * as React from "react";

import { cn } from "@/lib/utils";

function Loader({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      data-slot="loader"
      {...props}
      className={cn("animate-spin", className)}
    >
      <path d="M9.75 4.32L12.1 1.09L13.31 1.97L10.96 5.2L9.75 4.32Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M15.38 4.81L11.57 6.05L12.04 7.48L15.84 6.24L15.38 4.81Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M15.84 9.76L12.04 8.52L11.57 9.95L15.38 11.19L15.84 9.76Z" fill="currentColor" fillOpacity="0.3" />
      <path d="M13.31 14.03L10.96 10.8L9.75 11.68L12.1 14.91L13.31 14.03Z" fill="currentColor" fillOpacity="0.4" />
      <path d="M8.75 12V16H7.25V12H8.75Z" fill="currentColor" fillOpacity="0.5" />
      <path d="M6.25 11.68L3.9 14.91L2.69 14.03L5.04 10.8L6.25 11.68Z" fill="currentColor" fillOpacity="0.6" />
      <path d="M4.43 9.95L0.62 11.19L0.16 9.76L3.96 8.52L4.43 9.95Z" fill="currentColor" fillOpacity="0.7" />
      <path d="M3.96 7.48L0.16 6.24L0.62 4.81L4.43 6.05L3.96 7.48Z" fill="currentColor" fillOpacity="0.8" />
      <path d="M2.69 1.97L5.04 5.2L6.25 4.32L3.9 1.09L2.69 1.97Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M7.25 4V0H8.75V4H7.25Z" fill="currentColor" />
    </svg>
  );
}

export { Loader };
