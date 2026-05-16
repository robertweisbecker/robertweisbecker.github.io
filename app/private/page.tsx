import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private",
  robots: "noindex, nofollow",
};

const privateLinks = [
  ["/private/device", "Device"],
  ["/private/image-modal", "Image modal"],
  ["/private/og-preview", "OG preview"],
  ["/private/cambio", "Cambio examples"],
] as const;

const testingLinks = [
  ["/private/testing", "Testing"],
  ["/private/testing/explorations", "Testing — explorations (cards)"],
  ["/private/testing/carousel", "Testing — carousel"],
  ["/private/testing/direction-a", "Testing — direction A"],
  ["/private/testing/direction-b", "Testing — direction B"],
  ["/private/testing/direction-c", "Testing — direction C"],
  ["/private/testing/direction-d", "Testing — direction D"],
  ["/private/testing/direction-e", "Testing — direction E"],
] as const;

export default function PrivateIndexPage() {
  return (
    <div className="container max-w-md py-12 font-mono text-sm">
      <h1 className="mb-6 text-base font-normal text-foreground">Private</h1>
      <ul className="mb-10 space-y-1.5">
        {privateLinks.map(([href, label]) => (
          <li key={href}>
            <Link className="text-primary underline-offset-4 hover:underline" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="mb-6 text-base font-normal text-foreground">Testing</h2>
      <ul className="space-y-1.5">
        {testingLinks.map(([href, label]) => (
          <li key={href}>
            <Link className="text-primary underline-offset-4 hover:underline" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
