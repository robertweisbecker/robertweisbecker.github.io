import type { ReactNode } from "react";
import { PageViewTransition } from "@/components/view-transitions";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <PageViewTransition>
      <div className="root isolate">{children}</div>
    </PageViewTransition>
  );
}
