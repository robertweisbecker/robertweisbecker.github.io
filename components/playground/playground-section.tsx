import type * as React from "react";

export function PlaygroundSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="grid w-full scroll-mt-28 gap-6 md:gap-8">
      <h1 className="border-b border-border pb-3 font-sans text-base font-[550] tracking-tight text-foreground">{title}</h1>
      <div className="grid gap-8 md:gap-10 lg:grid-cols-12">{children}</div>
    </section>
  );
}
