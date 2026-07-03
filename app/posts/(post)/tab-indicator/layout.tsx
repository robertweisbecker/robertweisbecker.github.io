import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSS Pseudo-indicators",
  description: "Faking animated tab indicators with CSS",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
