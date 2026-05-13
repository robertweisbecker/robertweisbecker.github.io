import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description: "Kitchen sink of UI components and demos used on bob.fyi.",
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
