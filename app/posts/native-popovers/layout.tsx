import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Native Popover Experiments",
  description: "HTML popover, anchoring, and starting-style",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
