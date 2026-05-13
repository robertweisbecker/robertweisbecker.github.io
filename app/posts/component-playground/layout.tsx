import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Playground",
  description: "Some fun components I made for this site",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
