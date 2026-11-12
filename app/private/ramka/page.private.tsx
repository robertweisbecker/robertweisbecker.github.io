import type { Metadata } from "next";

import { RamkaPrototypeReview } from "@/components/prototypes/ramka/review";

// Development-only exploration: excluded from the sitemap. No dedicated social
// image is needed for a local, non-indexable review surface.
export const metadata: Metadata = {
  title: "Ramka explorations",
  description: "Four ways to explore work without losing your place.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Ramka explorations · Private review",
    description: "A local prototype review for bob.fyi.",
    images: [],
  },
  twitter: { title: "Ramka explorations · Private review", images: [] },
};

export default function RamkaPrototypePage() {
  return <RamkaPrototypeReview />;
}
