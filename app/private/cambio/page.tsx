import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ExampleBasic,
  ExampleBouncy,
  ExampleDismissible,
  ExampleDismissibleAdvanced,
  ExampleOverrides,
  ExampleReduced,
  ExampleSmooth,
  ExampleSnappy,
  ExampleVariants,
} from "./cambio-examples";

export const metadata: Metadata = {
  title: "Cambio examples (private)",
  robots: "noindex, nofollow",
};

type DemoSection = {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
};

function Section({ id, title, description, children }: DemoSection) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-border py-12 last:border-b-0">
      <h2 className="mb-2 font-heading text-lg font-medium text-foreground">{title}</h2>
      <p className="mb-6 max-w-2xl text-sm text-muted-foreground">{description}</p>
      <div className="max-w-xl">{children}</div>
    </section>
  );
}

export default function PrivateCambioPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-mono text-xs text-muted-foreground">
        <Link href="/private" className="text-primary underline-offset-4 hover:underline">
          private
        </Link>
        <span aria-hidden="true"> / </span>cambio
      </p>
      <h1 className="mt-2 font-heading text-2xl font-medium tracking-tight text-foreground">Cambio</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Demos ported from the{" "}
        <a
          href="https://github.com/raphaelsalaja/cambio/tree/main/website/components/examples"
          className="text-primary underline-offset-4 hover:underline"
        >
          Cambio docs examples
        </a>{" "}
        (
        <a href="https://cambio.raphaelsalaja.com/" className="text-primary underline-offset-4 hover:underline">
          site
        </a>
        ). Click the image to open the shared layout; drag down on the expanded view when dismissible.
      </p>

      <Section
        id="basic"
        title="Basic"
        description="Default shared animation with dismissible drag (matches the upstream basic example component)."
      >
        <ExampleBasic />
      </Section>

      <Section id="dismissible" title="Dismissible" description="Popup can be dismissed by dragging, using the default sensitivity.">
        <ExampleDismissible />
      </Section>

      <Section
        id="dismissible-advanced"
        title="Dismissible (advanced)"
        description="Custom dismissal threshold and velocity from the dismissible-advanced example."
      >
        <ExampleDismissibleAdvanced />
      </Section>

      <Section id="reduced" title="Reduced motion" description="reduceMotion forces minimal motion for testing or accessibility overrides.">
        <ExampleReduced />
      </Section>

      <Section id="snappy" title="Snappy" description="Fast ease-out preset (240ms) for responsive interactions.">
        <ExampleSnappy />
      </Section>

      <Section id="smooth" title="Smooth" description="Balanced ease-in-out preset (300ms), general-purpose modals.">
        <ExampleSmooth />
      </Section>

      <Section id="bouncy" title="Bouncy" description="Spring motion with overshoot for playful transitions.">
        <ExampleBouncy />
      </Section>

      <Section id="variants" title="Variants" description="Per-part presets: snappy trigger, bouncy popup, smooth backdrop.">
        <ExampleVariants />
      </Section>

      <Section
        id="overrides"
        title="Overrides"
        description="Global smooth motion with per-component overrides (snappy trigger, reduced backdrop, bouncy popup)."
      >
        <ExampleOverrides />
      </Section>
    </div>
  );
}
