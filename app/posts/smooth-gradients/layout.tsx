import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smooth Gradients",
  description: "Adding easing curves to Tailwind gradients",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
