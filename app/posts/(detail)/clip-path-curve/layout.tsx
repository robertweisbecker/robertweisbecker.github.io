import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clip-Path Playground",
  description: "A little UI for concave clip-path curves",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
