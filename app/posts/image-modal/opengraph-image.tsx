import { createPostOgCard, getPostById, ogContentType, ogSize } from "@/lib/og";

export const alt = "Image Modal Prototypes | bob.fyi";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export default async function Image() {
  return createPostOgCard(getPostById("image-modal"));
}
