import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theming Demo",
  description: "How theming works on this site",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
