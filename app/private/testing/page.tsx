import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testing",
  robots: "noindex, nofollow",
};

const links = [
  ["/private/testing/explorations", "Explorations (cards)"],
  ["/private/testing/carousel", "Carousel"],
  ["/private/testing/direction-a", "Direction A"],
  ["/private/testing/direction-b", "Direction B"],
  ["/private/testing/direction-c", "Direction C"],
  ["/private/testing/direction-d", "Direction D"],
  ["/private/testing/direction-e", "Direction E"],
] as const;

export default function TestingIndexPage() {
  return (
    <div className="container max-w-md py-12 font-mono text-sm">
      <p className="mb-6">
        <Link className="text-primary underline-offset-4 hover:underline" href="/private">
          ← Private
        </Link>
      </p>
      <h1 className="mb-6 text-base font-normal text-foreground">Testing</h1>
      <ul className="space-y-1.5">
        {links.map(([href, label]) => (
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
