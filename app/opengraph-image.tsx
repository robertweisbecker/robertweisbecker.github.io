import { createOgCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "Bob Weisbecker | bob.fyi";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default async function Image() {
  return createOgCard({
    title: "Robert Weisbecker",
  });
}
