"use client";

import dynamic from "next/dynamic";
import { DemoContainer } from "@/components/demo";
import { LinkOut } from "@/components/link-out";

const EmojiFeedbackDemo = dynamic(
  () => import("@/components/demos/emoji-feedback").then((module) => ({ default: module.EmojiFeedbackDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading emoji feedback…</p>,
  }
);

export function FeedbackPlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
      <DemoContainer
        title="Emoji Feedback"
        description="A remix of Vercel's Feedback component"
        controls={<LinkOut href="https://vercel.com/geist/feedback" text="View original" />}
        className="lg:col-span-full"
        innerClass="min-h-72"
      >
        <EmojiFeedbackDemo />
      </DemoContainer>
    </div>
  );
}
