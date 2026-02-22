"use client";

import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

export function BackButton() {
  return (
    <Link
      href="/#projects"
      className="group inline-flex items-center gap-2 text-sm text-primary no-underline"
    >
      <RiArrowLeftLine className="size-3.5 transition-transform group-hover:-translate-x-1" />
      Back
    </Link>
  );
}
