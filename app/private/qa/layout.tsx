import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QA",
  description: "Private QA surface for UI components and demos.",
  robots: "noindex, nofollow",
};

export default function QaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
