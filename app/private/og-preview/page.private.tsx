import { Heading } from "@/components/ui/heading";
import { getProjectSlugs } from "@/lib/projects";
import fs from "fs";
import type { Metadata } from "next";
import Image from "next/image";
import path from "path";

export const metadata: Metadata = {
  title: "OG image preview",
  robots: "noindex, nofollow",
};

const appDir = path.join(process.cwd(), "app");

function collectOgPreviewItems(): { key: string; src: string; label: string }[] {
  const out: { key: string; src: string; label: string }[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "private") continue;
        walk(full);
      } else if (entry.name === "opengraph-image.tsx") {
        const relDir = path.relative(appDir, path.dirname(full));
        const segments = relDir === "" ? [] : relDir.split(path.sep);

        if (segments.includes("[slug]")) {
          for (const slug of getProjectSlugs()) {
            const urlSegments = segments.map((s) => (s === "[slug]" ? slug : s));
            const href = `/${urlSegments.join("/")}/opengraph-image`;
            out.push({ key: href, src: href, label: href });
          }
        } else {
          const href = segments.length === 0 ? "/opengraph-image" : `/${segments.join("/")}/opengraph-image`;
          out.push({ key: href, src: href, label: href });
        }
      }
    }
  }

  walk(appDir);
  return out.sort((a, b) => a.label.localeCompare(b.label));
}

export default function OgPreviewPage() {
  const items = collectOgPreviewItems();

  return (
    <div className="container max-w-6xl py-10">
      <Heading level={1} className="mb-2">
        Open Graph preview
      </Heading>
      <p className="mb-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Each route below is served by an <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">opengraph-image.tsx</code>{" "}
        file. In dev or production you can also paste the URL in a new tab to inspect only the PNG.
      </p>
      <ul className="mb-10 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        <li>
          <strong className="font-medium text-foreground">Home:</strong> <code className="font-mono text-[0.85em]">/opengraph-image</code>
        </li>
        <li>
          <strong className="font-medium text-foreground">Post:</strong>{" "}
          <code className="font-mono text-[0.85em]">/posts/&lt;segment&gt;/opengraph-image</code>
        </li>
        <li>
          <strong className="font-medium text-foreground">Project:</strong>{" "}
          <code className="font-mono text-[0.85em]">/&lt;slug&gt;/opengraph-image</code>
        </li>
      </ul>

      <div className="grid gap-12 lg:grid-cols-2">
        {items.map((item) => (
          <figure key={item.key} className="grid gap-3">
            <figcaption className="font-mono text-xs break-all text-muted-foreground">{item.label}</figcaption>
            <div className="overflow-hidden rounded-md border border-border bg-muted/30">
              <Image src={item.src} alt="" width={1200} height={630} className="h-auto w-full" unoptimized />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
