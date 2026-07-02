import type { Metadata } from "next";

import { PlaygroundRouteNav } from "@/components/playground/playground-route-nav";

export const metadata: Metadata = {
  title: "Playground",
  description: "Some fun components I made for this site",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlaygroundRouteNav hideOnRoot className="mb-10 md:mb-16" />
      {children}
    </>
  );
}
