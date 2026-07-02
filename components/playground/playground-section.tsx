import type * as React from "react";

export function PlaygroundSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="grid w-full scroll-mt-24 gap-4">
      <h2 className="border-b border-border pb-2 font-sans text-base font-[550] tracking-tight text-foreground">{title}</h2>
      <div className="grid gap-4 lg:grid-cols-12">{children}</div>
    </section>
  );
}
