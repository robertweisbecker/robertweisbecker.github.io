import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Principal designer at Everfi — background, work, and contact.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
