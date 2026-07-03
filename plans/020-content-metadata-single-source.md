# Plan 020: Single-source content metadata, gate draft projects, slim the MDX registry

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 61bf9081..HEAD -- mdx-components.tsx lib/projects.ts lib/data/posts.ts lib/og.tsx next.config.ts package.json "app/[slug]" app/posts content/projects`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. Plans [017](./017-server-client-boundaries.md) and [018](./018-mdx-registry-splitting.md) still touch neighboring code; [016](./016-small-correctness-batch.md) is now DONE and its
> project-date/heading-id fixes must be preserved — see "Coordination with other
> plans" below before starting.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (changes which routes exist in production)
- **Depends on**: none. Recommended BEFORE plans [017](./017-server-client-boundaries.md) and [018](./018-mdx-registry-splitting.md) (see
  coordination section). Independent of [plan 016](./016-small-correctness-batch.md) but shares two files with
  it — whichever lands second must re-verify line references.
- **Category**: tech-debt
- **Planned at**: commit `9ed1acd`, 2026-07-01; amended 2026-07-02 against
  the same commit (added Step 5: markdown-image pipeline removal; recorded
  the keep-`remark-gfm` verdict)
- **Reconciled at**: commit `61bf9081`, 2026-07-02 — still TODO. Plan 016 is
  now DONE; preserve `getDedupedHeadingId`/post-date correctness while moving
  metadata.

## Why this matters

The site's content architecture has duplicated sources of truth that have
already drifted, a gate that doesn't gate, and a redundant image pipeline:

1. **Draft projects ship to production.** `lib/data/projects.ts` marks four
   projects `published: false` (including one whose frontmatter subtitle is
   literally `"lorem"`), and every index surface (sitemap, search, nav,
   pagination) filters on that flag — but the route itself doesn't.
   `app/[slug]/page.tsx` builds params from the filesystem, so all 11 MDX
   files become live production URLs. Anyone who guesses or receives
   `/everfi-data-science` sees an unfinished draft.
2. **Post titles/descriptions are hardcoded in three places** — the
   `lib/data/posts.ts` registry, a per-post `layout.tsx` metadata export,
   and (for OG images) `lib/og.tsx` lookups — and they have drifted
   ("28-Pixel Icons" vs "28-pixel Icons", etc.).
3. **The MDX shortcode registry imports eleven components that no MDX file
   uses** (or that the one using file shadows with its own direct import),
   so every project page bundles code it never renders.
4. **A second, broken image pipeline exists for markdown `![]()` syntax.**
   The `img` mapping in `mdx-components.tsx` plus the
   `rehype-unwrap-images` plugin serve exactly one image in all of
   `content/` — in a draft, from a remote host that `next.config.ts`
   doesn't allowlist, so it throws at render. Every published image uses
   the real convention: static imports from `@/public/assets/` into
   `<Image>`/`ImageModal`/carousels.

After this plan: the projects registry is the single gate for what builds,
the posts registry is the single source for post metadata,
`mdx-components.tsx` only registers shortcodes that MDX content actually
uses from the registry, and static-import components are the single image
pipeline (the markdown-image side channel is removed).

## Current state

### Files and their roles

- `lib/data/projects.ts` — client-safe project registry (11 entries): card
  copy (`title`, `nickname`, `description`, `date`), `path`, `icon`,
  `heroImage`, `company`, `categories`, `published`.
- `lib/projects.ts` — server-only fs helpers: `getProjectSlugs()` (reads
  `content/projects/*.mdx` filenames), `getProjectToc(slug)`.
- `content/projects/*.mdx` — 11 files; each exports
  `export const frontmatter = { title, subtitle, role, date, team?, meta? }`
  (page-facing copy — intentionally different wording from registry card copy).
- `app/[slug]/page.tsx` + `app/[slug]/opengraph-image.tsx` — build one route
  per MDX file via `getProjectSlugs()`; `dynamicParams = false`.
- `app/[slug]/layout.tsx` — renders frontmatter; builds pagination from the
  registry filtered by `published` (line 19).
- `lib/data/posts.ts` — client-safe posts registry (6 entries): `id`,
  `title`, `description`, `category`, `date`, `path`, `icon`.
- `app/posts/{theming,clip-path-curve,native-popovers,smooth-gradients,tab-indicator}/layout.tsx`
  — five near-identical pass-through layouts that exist only to export
  hardcoded `metadata` (the pages are `"use client"` and cannot).
- `app/posts/pixel-icons/page.tsx` — server page; exports its own hardcoded
  `metadata` (lines 17–20).
- `lib/og.tsx` — OG card renderer; also hosts `getPostById(id)` (lines
  152–160), consumed by four `app/posts/*/opengraph-image.tsx` files.
- `mdx-components.tsx` — global MDX shortcode registry; statically imports
  and registers ~20 components.

### Excerpt: the ungated project route

```tsx
// app/[slug]/page.tsx:1-7
import { getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;
```

`app/[slug]/opengraph-image.tsx:9-11` has the identical
`generateStaticParams`. `lib/projects.ts:8-14`:

```ts
// lib/projects.ts:8-14
export function getProjectSlugs(): string[] {
  const slugs: string[] = [];
  for (const file of fs.readdirSync(projectsDir)) {
    if (file.endsWith(".mdx")) slugs.push(path.basename(file, ".mdx"));
  }
  return slugs;
}
```

Registry entries with `published: false` (verified at `9ed1acd`):
`/oklch-colors-part-ii`, `/everfi-data-science`, `/elearning`,
`/pixel-icon-studio`. All 11 registry `path` values have a matching
`content/projects/<slug>.mdx` file today.

**The repo's existing dev-drafts convention** (match it): dev-only surfaces
are gated on `NODE_ENV`, e.g.

```tsx
// components/site-search.tsx:208,235-236
const isDev = process.env.NODE_ENV === "development";
        items: projects
          .filter((p) => isDev || p.published !== false)
```

and `next.config.ts:17` enables `.private.tsx` pages only in dev.

### Excerpt: post metadata triplication and drift

```ts
// lib/data/posts.ts:40-47 (registry — canonical)
{
  id: "pixel-icons",
  title: "28-Pixel Icons",
  description: "Creating animated 11x11 icons with Figma + Codex.",
  ...
}
```

```tsx
// app/posts/pixel-icons/page.tsx:17-20 (drifted copy)
export const metadata: Metadata = {
  title: "28-pixel Icons",
  description: "Creating animated 11x11 pixel icons with Figma + Codex",
};
```

The five per-post layouts all look like this:

```tsx
// app/posts/theming/layout.tsx:1-10
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theming Demo",
  description: "How theming works on this site",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Known drift (registry vs hardcoded metadata) to resolve — **registry wins**:

| Post            | Registry                                                       | Hardcoded metadata                                                  |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| pixel-icons     | "28-Pixel Icons" / "…animated 11x11 icons with Figma + Codex." | "28-pixel Icons" / "…animated 11x11 pixel icons with Figma + Codex" |
| native-popovers | "HTML \<popover\>, anchoring, and starting-style"              | "HTML popover, anchoring, and starting-style"                       |

(The others match exactly.)

`lib/og.tsx:152-160` hosts the post lookup:

```tsx
// lib/og.tsx:152-160
export function getPostById(id: string): Post {
  const post = posts.find((candidate) => candidate.id === id);
  if (!post) {
    throw new Error(`Missing post metadata for id: ${id}`);
  }
  return post;
}
```

used by `app/posts/{smooth-gradients,tab-indicator,clip-path-curve,theming}/opengraph-image.tsx`
(each: `createPostOgCard(getPostById("<id>"))`).

### Excerpt: the MDX registry vs actual usage

`mdx-components.tsx:45-70` registers: `ColorPalette, ColorSwatch, ColorRamp,
Alert, AlertContent, AlertDescription, AlertTitle, Badge, ColorCode, Image,
ImageModal, ImageToggle, Demo (DemoContainer), DeviceFrame
(DeviceFrame.Phone), ProjectImageCarousel, ProjectCarousel (alias),
LayoutGrid, LinkOut, Mark, MarkNote, Stats, Video, Separator, TextReveal`
plus `pre`, `h2`–`h4`, `img`, `a`.

Usage across `content/projects/*.mdx`, verified at `9ed1acd` with
`rg -c '<NAME' content/projects`:

- **Used from registry in ≥1 file, keep registered**: `Image`, `ImageModal`
  (6 files), `ImageToggle` (5), `ProjectImageCarousel` (5), `LayoutGrid`
  (6), `LinkOut` (5), `Video` (3), plus `pre`/`h2`–`h4`/`a`. (The `img`
  mapping is removed — see the next subsection.)
- **Used only in `oklch-colors.mdx`, move to direct imports there**:
  `ColorPalette`, `ColorSwatch`, `ColorRamp`, `ColorCode`, `Demo`.
- **Never used in any MDX, or shadowed by a direct import in the only file
  using them — remove from registry**: `Alert`, `AlertContent`,
  `AlertDescription`, `AlertTitle`, `Badge`, `Mark`, `MarkNote`, `Stats`,
  `Separator`, `TextReveal`, `DeviceFrame`. (`oklch-colors.mdx:7-8,24`
  already imports `Alert`, `AlertContent`, `MarkNote`, `Badge` directly,
  which shadows the registry entries.)
- **Alias**: `ProjectCarousel` is used exactly once, in the draft
  `oklch-colors-part-ii.mdx:173`. Rename that usage to
  `ProjectImageCarousel` and drop the alias.

The architecture principle this establishes (put it in a comment at the top
of `useMDXComponents`): _the registry holds shortcodes used across multiple
MDX files plus HTML-element mappings; anything used by a single file is
imported directly in that file_ (the pattern `oklch-colors.mdx` and
`furnace.mdx` already follow for `ColorDiagrams`, `Tabs`, `Collapsible`).

### Excerpt: the MDX plugin chain and the markdown-image side channel

`next.config.ts:27-32` configures two MDX plugins:

```ts
// next.config.ts:27-32
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-unwrap-images"],
  },
});
```

**`remark-gfm` — KEEP (investigated, needed).** GFM syntax is live in
published content: `content/projects/furnace.mdx:287-294` is a GFM pipe
table (the before/after metrics table) whose "Before" column also uses
single-tilde strikethrough (`~1,595~`), and the draft
`oklch-colors-part-ii.mdx:186-195` has more tables. Removing the plugin
would render those as literal pipe-and-tilde text. Do not remove it; do not
convert the tables to JSX.

**Markdown-image pipeline — REMOVE (broken and unused).** Two pieces exist
solely to support markdown `![alt](url)` syntax:

1. The `img` element mapping in `mdx-components.tsx:81-109`, which wraps
   string-src images in `NextImage` with invented fallback dimensions
   (`width={1200} height={800}`).
2. `rehype-unwrap-images` (`next.config.ts:30` + `package.json:51`), which
   unwraps markdown images from their `<p>` wrappers so the block styling
   works. It only affects markdown-syntax images — JSX `<Image>`/`ImageModal`
   usage is untouched by it.

Actual `![alt](url)` usage across all of `content/` (verified at `9ed1acd`):
exactly one, in the draft `oklch-colors-part-ii.mdx:52` —

```md
![Frosty the Snowman](https://m.media-amazon.com/images/I/811RjQaNsIL._AC_UF1000,1000_QL80_.jpg)
```

— and `m.media-amazon.com` is not in `next.config.ts` `remotePatterns`
(lines 8-16), so `next/image` throws an unconfigured-hostname error when
that draft renders. (Line 138 of the same file contains an Obsidian paste
remnant `![[Pasted image ...]]` inside a 4-space-indented block — that's a
code block, renders as text, not an image; leave it.)

The real image convention — used by every published image — is static
imports from `@/public/assets/` passed to `<Image>` (which gets intrinsic
dimensions and blur-placeholder support from the import) or to
`ImageModal`/`ProjectImageCarousel`/`ImageToggle`. See
`components/image.tsx` and any project MDX import block, e.g.
`content/projects/everfi-engage.mdx:14-17`. This plan removes the
markdown-image side channel so that convention is the only pipeline.

### Deliberate two-tier project copy — do NOT unify

Registry `title`/`date` and frontmatter `title`/`date` differ on purpose
(card copy vs page copy): e.g. registry "OkLCH Color System" / "2025" vs
frontmatter "OkLCH Color Palettes" / "2025—2026". Do not merge them; this
plan only makes the _structural_ relationship (slug ↔ file ↔ published)
checked and single-sourced.

### Uncommitted working-tree state at planning time

`git status` showed deletions of `components/device/*` and edits to
`app/private/page.private.tsx` — none of these intersect this plan's scope.
`plans/007-018` exist as untracked files.

## Commands you will need

| Purpose    | Command         | Expected on success                      |
| ---------- | --------------- | ---------------------------------------- |
| Install    | `npm install`   | exit 0                                   |
| All checks | `npm run check` | exit 0 (typecheck + lint + format:check) |
| Prod build | `npm run build` | exit 0; prints the per-route table       |
| Dev server | `npm run dev`   | serves on :3000                          |

## Coordination with other plans (read before starting)

- **[Plan 016](./016-small-correctness-batch.md)** (TODO) edits `lib/projects.ts` (`getProjectToc` id dedup) and
  `mdx-components.tsx` (`createHeading`). Different regions than this plan.
  Whichever executes second: re-verify the other's excerpts, don't assume
  line numbers.
- **[Plan 017](./017-server-client-boundaries.md)** (TODO) restructures `app/posts/` into route groups and
  converts post pages to server components, which will let the per-post
  layouts be deleted entirely (metadata moves into the server pages). This
  plan still pays off first: it removes the drifted strings so [017](./017-server-client-boundaries.md)'s
  executor moves one `postMetadata(...)` call per page instead of
  re-deciding copy. If [017](./017-server-client-boundaries.md) already landed (check `plans/README.md`), put
  `export const metadata = postMetadata("<id>")` in each server `page.tsx`
  instead of the layouts, and skip any layout that no longer exists.
- **[Plan 019](./019-tldr-mode-project-pages.md)** (tl;dr mode, TODO) edits `app/[slug]/layout.tsx`,
  `lib/types.ts`, and `content/projects/forge.mdx` frontmatter — none of
  which this plan touches. No collision; execute in either order.
- **[Plan 018](./018-mdx-registry-splitting.md)** (TODO) lazy-loads heavy MDX shortcodes. This plan removes
  `DeviceFrame` and moves the `ColorPalette` family out of the registry, so
  018's Step 2 list shrinks to `Video`, `ImageModal`,
  `ProjectImageCarousel` — and its "keep the `ProjectCarousel` alias"
  instruction becomes obsolete (alias removed here). After this plan lands,
  add a reconcile note to `plans/README.md` saying exactly that.
- **Plans [010](./010-dead-code-sweep.md)/[011](./011-dependency-manifest-hygiene.md)** (TODO) also edit `package.json` (dead dependencies /
  manifest hygiene). This plan's only manifest change is
  `npm uninstall rehype-unwrap-images` — a trivial merge either way; no
  ordering constraint.

## Scope

**In scope** (the only files you should modify or create):

- `lib/projects.ts`
- `app/[slug]/page.tsx`
- `app/[slug]/opengraph-image.tsx`
- `app/private/og-preview/page.private.tsx` (import update only)
- `lib/data/posts.ts`
- `lib/og.tsx`
- `app/posts/theming/layout.tsx`, `app/posts/clip-path-curve/layout.tsx`,
  `app/posts/native-popovers/layout.tsx`,
  `app/posts/smooth-gradients/layout.tsx`,
  `app/posts/tab-indicator/layout.tsx`
- `app/posts/pixel-icons/page.tsx` (metadata export only)
- `app/posts/smooth-gradients/opengraph-image.tsx`,
  `app/posts/tab-indicator/opengraph-image.tsx`,
  `app/posts/clip-path-curve/opengraph-image.tsx`,
  `app/posts/theming/opengraph-image.tsx` (import path only)
- `mdx-components.tsx`
- `next.config.ts` (remove `rehype-unwrap-images` from `rehypePlugins` only)
- `package.json` + `package-lock.json` (via `npm uninstall rehype-unwrap-images` only)
- `content/projects/oklch-colors.mdx` (add direct imports only)
- `content/projects/oklch-colors-part-ii.mdx` (rename one component usage +
  replace one markdown image with an explicit `<img>` tag)
- `plans/README.md` (status row + the plan-[018](./018-mdx-registry-splitting.md) reconcile note)

**Out of scope** (do NOT touch, even though they look related):

- `app/posts/layout.tsx` and converting `"use client"` post pages — plan
  017's territory.
- Wrapping `Video`/`ImageModal`/`ProjectImageCarousel` in `next/dynamic` —
  [plan 018](./018-mdx-registry-splitting.md)'s territory.
- `lib/parse-post-date.ts` and date semantics — [plan 016](./016-small-correctness-batch.md).
- `app/sitemap.ts` — already filters `published`; [plan 014](./014-discovery-gaps.md) owns its gaps.
- `lib/data/pages.ts` — [plan 010](./010-dead-code-sweep.md) deletes it.
- Unifying registry vs frontmatter `title`/`date` for projects — deliberate
  two-tier copy (see Current state).
- `remark-gfm` — investigated and kept; published content (the
  `furnace.mdx` metrics table) depends on it. Do not remove or replace it.
- Any change to MDX prose/content beyond the three named mechanical edits.
- Creating the missing `opengraph-image.tsx` for `native-popovers` and
  `pixel-icons` — noted as deferred follow-up in Maintenance notes.

## Git workflow

- Branch: `cursor/020-content-metadata-single-source` from `master`.
- Commit per step, imperative messages matching repo style (e.g. "Gate
  draft project routes on the published flag").
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Record the baseline

Run `npm run build`. Save the full route list and First Load JS for
`/everfi-engage`, `/forge`, and `/oklch-colors`. Confirm the four draft
routes ARE currently in the route list: `/oklch-colors-part-ii`,
`/everfi-data-science`, `/elearning`, `/pixel-icon-studio`.

**Verify**: build exits 0; all four draft routes present in the output;
figures recorded.

### Step 2: Make the registry the single gate for project routes

In `lib/projects.ts`:

1. Import `projects` from `@/lib/data/projects`.
2. Add and export:

```ts
const isDev = process.env.NODE_ENV === "development";

export function projectSlugFromPath(projectPath: string): string {
  return projectPath.replace(/^\//, "");
}

/**
 * Slugs that should exist as routes: published projects always, drafts in
 * dev only (matches the site-search and `.private.tsx` dev conventions).
 * Throws when the registry and content/projects/ disagree, so a bad state
 * fails the build instead of 404ing or shipping a draft.
 */
export function getBuildableProjectSlugs(): string[] {
  const fileSlugs = new Set(getProjectSlugs());
  const registrySlugs = projects.map((p) => projectSlugFromPath(p.path));

  for (const slug of registrySlugs) {
    if (!fileSlugs.has(slug)) {
      throw new Error(`lib/data/projects.ts lists "/${slug}" but content/projects/${slug}.mdx does not exist`);
    }
  }
  const registered = new Set(registrySlugs);
  for (const slug of fileSlugs) {
    if (!registered.has(slug)) {
      throw new Error(`content/projects/${slug}.mdx has no entry in lib/data/projects.ts`);
    }
  }

  return projects.filter((p) => isDev || p.published).map((p) => projectSlugFromPath(p.path));
}
```

3. Keep `getProjectSlugs` (now an internal fs read used by the check) —
   remove its `export` only after Step 2.5 confirms no other importer needs
   it.

Then update the three consumers to use `getBuildableProjectSlugs()` instead
of `getProjectSlugs()`:

- `app/[slug]/page.tsx:1-5`
- `app/[slug]/opengraph-image.tsx:2,9-11`
- `app/private/og-preview/page.private.tsx:2` (dev-only page; drafts remain
  visible there because `isDev` is true in dev)

If after this `getProjectSlugs` has no importer outside `lib/projects.ts`
(`rg -n 'getProjectSlugs' --glob '!plans'`), un-export it.

**Verify**:

- `npm run check` → exit 0.
- `npm run build` → exit 0; the route list contains the 7 published project
  routes and NONE of: `/oklch-colors-part-ii`, `/everfi-data-science`,
  `/elearning`, `/pixel-icon-studio`.
- `npm run dev`, then `curl -s -o /dev/null -w "%{http_code}" localhost:3000/pixel-icon-studio`
  → `200` (drafts still reachable in dev).

### Step 3: Single-source post metadata

1. In `lib/data/posts.ts`, add (type-only `next` import is safe in this
   client-imported module):

```ts
import type { Metadata } from "next";

export function getPostById(id: string): Post {
  const post = posts.find((candidate) => candidate.id === id);
  if (!post) {
    throw new Error(`Missing post metadata for id: ${id}`);
  }
  return post;
}

export function postMetadata(id: string): Metadata {
  const post = getPostById(id);
  return { title: post.title, description: post.description };
}
```

2. In `lib/og.tsx`, delete the `getPostById` definition (lines 152–160) and
   its now-unused `posts` import; re-export nothing — instead update the
   four consumers `app/posts/{smooth-gradients,tab-indicator,clip-path-curve,theming}/opengraph-image.tsx`
   to import `getPostById` from `@/lib/data/posts` (keep
   `createPostOgCard`, `ogContentType`, `ogSize` imports from `@/lib/og`).
   Note `lib/og.tsx:146-150` `createPostOgCard(post: Post)` still needs the
   `Post` type — keep `import { type Post } from "@/lib/data/posts"`.
3. Replace the hardcoded `metadata` in each of the five per-post layouts
   with the registry-derived one. Each layout becomes:

```tsx
import { postMetadata } from "@/lib/data/posts";

export const metadata = postMetadata("theming"); // ← per-post id

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Post ids (from `lib/data/posts.ts`): `theming`, `clip-path-curve`,
`via-smooth` (for `smooth-gradients/`), `tab-indicator`,
`native-popovers`. 4. In `app/posts/pixel-icons/page.tsx`, replace the hardcoded `metadata`
object (lines 17–20) with `export const metadata = postMetadata("pixel-icons");`
and drop the unused `Metadata` type import.

The registry strings are canonical — the pixel-icons and native-popovers
`<title>`/description therefore change slightly (see the drift table in
Current state). That is intended.

**Verify**:

- `npm run check` → exit 0.
- `rg -n 'title:.*"' app/posts/*/layout.tsx` → no matches (no hardcoded
  metadata strings remain).
- `npm run dev`, then
  `curl -s localhost:3000/posts/pixel-icons | rg -o '<title>[^<]*'` →
  contains `28-Pixel Icons`;
  `curl -s localhost:3000/posts/theming | rg -o '<title>[^<]*'` → contains
  `Theming Demo`.

### Step 4: Slim the MDX registry

1. In `content/projects/oklch-colors.mdx`, extend the existing import block
   (lines 7–24) with the components it currently gets from the registry:

```js
import { ColorPalette, ColorSwatch, ColorRamp } from "@/components/demos/color-palette";
import { ColorCode } from "@/components/ui/color-code";
import { DemoContainer as Demo } from "@/components/demo";
```

2. In `content/projects/oklch-colors-part-ii.mdx:173`, rename
   `<ProjectCarousel` to `<ProjectImageCarousel` (closing tag too, if any).
3. In `mdx-components.tsx`, delete the registrations AND their imports for:
   `ColorPalette`, `ColorSwatch`, `ColorRamp`, `ColorCode`, `Demo`
   (`DemoContainer`), `Alert`, `AlertContent`, `AlertDescription`,
   `AlertTitle`, `Badge`, `Mark`, `MarkNote`, `Stats`, `Separator`,
   `TextReveal`, `DeviceFrame`, and the `ProjectCarousel` alias line. Keep:
   `Image`, `ImageModal`, `ImageToggle`, `ProjectImageCarousel`,
   `LayoutGrid`, `LinkOut`, `Video`, `CodeBlock` (`pre`), `createHeading`,
   `a`. (The `img` mapping goes in Step 5.) Add the one-line policy comment
   above `useMDXComponents`:
   "Registry = shortcodes used across multiple MDX files + element
   mappings; single-file components are imported directly in that file."
4. Confirm nothing in `content/` still references a removed registry name
   without importing it:
   `rg -n '<(Alert|Badge|Mark|MarkNote|Stats|Separator|TextReveal|DeviceFrame|ProjectCarousel|ColorPalette|ColorSwatch|ColorRamp|ColorCode|Demo)[ />]' content/projects`
   → every match must be in a file whose import block imports that name
   (at `9ed1acd` that means: all matches are in `oklch-colors.mdx`, plus
   zero remaining `ProjectCarousel` matches).

**Verify**:

- `npm run check` → exit 0.
- `npm run build` → exit 0 (an unresolved MDX component would fail the
  draft pages' compile even though their routes aren't generated).
- `npm run dev`; browser QA on `/oklch-colors`: color palettes, swatches,
  ramps, `ColorCode` chips, the `Demo` container, badges, alerts, and the
  carousel all render as before. On dev-only `/oklch-colors-part-ii`: the
  renamed carousel renders. On `/everfi-engage`: videos render.

### Step 5: Remove the markdown-image pipeline

Justification and evidence are in "Current state → the MDX plugin chain and
the markdown-image side channel". Do NOT touch `remarkPlugins` — only
`rehypePlugins`.

1. In `content/projects/oklch-colors-part-ii.mdx:52`, replace the markdown
   image with an explicit plain `<img>` tag (dev-only draft; hotlinking an
   unallowlisted remote host through `next/image` is what's broken today):

```html
<img src="https://m.media-amazon.com/images/I/811RjQaNsIL._AC_UF1000,1000_QL80_.jpg" alt="Frosty the Snowman" />
```

Leave line ~138 (`![[Pasted image ...]]` inside an indented block)
untouched. 2. In `mdx-components.tsx`, delete the `img` mapping (the
`img: (props) => { ... }` entry) and the now-unused `NextImage` import
(`import NextImage from "next/image"`) — but first confirm nothing else
in the file uses `NextImage`. 3. In `next.config.ts`, remove `rehypePlugins: ["rehype-unwrap-images"]`
(keep `remarkPlugins: ["remark-gfm"]` exactly as is). 4. Run `npm uninstall rehype-unwrap-images`.

**Verify**:

- `rg -n '!\[' content` → no matches.
- `rg -n 'rehype-unwrap-images' next.config.ts package.json` → no matches.
- `rg -n 'NextImage|img:' mdx-components.tsx` → no matches.
- `npm run check` → exit 0. `npm run build` → exit 0.
- `npm run dev`; on `/oklch-colors` and `/forge`: all images render inside
  their figure chrome exactly as before (they never used the removed
  pipeline). On dev-only `/oklch-colors-part-ii`: the Frosty image renders
  as a plain image with no `next/image` hostname error.

### Step 6: Final measurement and index update

Run `npm run build`. Compare against Step 1: the four draft routes are
absent; First Load JS for `/everfi-engage` and `/forge` is equal or lower
(they no longer import the color-palette demos through the registry).
Update the plan-020 status row in `plans/README.md` and add the plan-[018](./018-mdx-registry-splitting.md)
reconcile note described in "Coordination with other plans".

**Verify**: build exits 0; before/after route list + JS table in your
report; `git status` shows only in-scope files modified.

## Test plan

No unit test runner by repo policy (`plans/README.md` dependency notes).
Behavioral regression list:

1. All 7 published project pages render with title, subtitle, meta, TOC,
   pagination (spot-check `/oklch-colors`, `/forge`, `/everfi-engage`,
   `/npr-maps`).
2. Draft URLs return 404 in a production build (`npm run preview`, then
   `curl -s -o /dev/null -w "%{http_code}" localhost:3000/elearning` →
   `404`) and 200 in dev.
3. Post `<title>`/description on all six posts match `lib/data/posts.ts`.
4. OG images: `curl -s -o /dev/null -w "%{http_code}" localhost:3000/posts/theming/opengraph-image` →
   `200`; same for one project (`/forge/opengraph-image`).
5. Search, header work menu, homepage index list, sitemap unchanged (they
   already filtered `published`).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0 and its route list contains no
      `/oklch-colors-part-ii`, `/everfi-data-science`, `/elearning`, or
      `/pixel-icon-studio`
- [ ] `rg -n 'getProjectSlugs' app` → no matches (all route params flow
      through `getBuildableProjectSlugs`)
- [ ] `rg -n 'title: "' app/posts` → no matches
- [ ] `rg -n 'getPostById' lib/og.tsx` → no matches
- [ ] `rg -n 'Alert|Badge|MarkNote|Stats|Separator|TextReveal|DeviceFrame|ProjectCarousel|ColorPalette' mdx-components.tsx` → no matches
- [ ] `rg -n '<ProjectCarousel' content` → no matches
- [ ] `rg -n '!\[' content` → no matches
- [ ] `rg -n 'rehype-unwrap-images' next.config.ts package.json` → no matches
- [ ] `rg -n 'NextImage|img:' mdx-components.tsx` → no matches
- [ ] `rg -n 'remark-gfm' next.config.ts` → exactly one match (unchanged)
- [ ] Behavioral regression list passes
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated + plan-[018](./018-mdx-registry-splitting.md) reconcile note added

## STOP conditions

Stop and report back (do not improvise) if:

- The registry↔file consistency check throws on the CURRENT content (a
  registry `path` or MDX filename changed since `9ed1acd`) — report the
  mismatch; do not "fix" content or registry copy yourself.
- [Plan 017](./017-server-client-boundaries.md) landed and `app/posts/*/layout.tsx` files no longer exist AND
  the coordination fallback (metadata in server pages) doesn't apply
  cleanly.
- Removing a registry entry breaks the build because an MDX file uses a
  shortcode this plan's usage table says is unused (content drifted) —
  report which file/shortcode; do not re-add registry entries beyond what
  Step 4 keeps.
- `rg -n '!\[' content` finds MORE than the one `oklch-colors-part-ii.mdx`
  markdown image (new content adopted the syntax since `9ed1acd`) — report
  the list; do not batch-convert images beyond the one named edit.
- Any table or strikethrough in `content/` renders as literal text after
  your changes (means `remarkPlugins` was accidentally touched — revert
  `next.config.ts` and re-check).
- The operator has shared draft URLs publicly and wants drafts reachable in
  production (you cannot know this — it's the one product-behavior change
  in this plan; the maintainer approved it by selecting the plan, but if
  any evidence appears that draft URLs are load-bearing, e.g. a redirect or
  external link references them, stop and ask).
- First Load JS for a measured route INCREASES after Step 4.

## Maintenance notes

- **Adding a project now requires both** the MDX file and a registry entry
  — the build fails loudly (by design) if either is missing. Flipping
  `published: true` is the entire publish action: route, sitemap, search,
  nav, and pagination all follow the flag.
- **Adding a post**: add the registry entry first; layouts/pages derive
  metadata via `postMetadata(id)` — never hardcode title/description again.
- **New MDX shortcodes**: register in `mdx-components.tsx` only when used
  across multiple files; single-file components get imported in that file.
  Heavy multi-file shortcodes (`Video`, `ImageModal`,
  `ProjectImageCarousel`) are [plan 018](./018-mdx-registry-splitting.md)'s lazy-loading targets.
- **Images in MDX**: markdown `![]()` syntax no longer has special
  handling — always static-import from `@/public/assets/` and use
  `<Image>` (or `ImageModal`/carousel/toggle). If markdown-syntax images
  are ever wanted back, both pieces must return together: the `img`
  mapping in `mdx-components.tsx` AND `rehype-unwrap-images` — plus a
  `remotePatterns` entry for any remote host.
- **`remark-gfm` stays**: the `furnace.mdx` metrics table (and its
  single-tilde strikethrough) depend on it. Re-audit only if all GFM
  syntax leaves `content/`.
- Deferred follow-ups: `native-popovers` and `pixel-icons` have no
  `opengraph-image.tsx` (the other four posts do) — creating them is a
  5-minute copy of `app/posts/theming/opengraph-image.tsx`; and [plan 017](./017-server-client-boundaries.md)
  will delete the per-post layouts entirely once pages are server
  components.
- Reviewer: scrutinize the production 404 behavior for drafts (the one
  intentional behavior change) and confirm `oklch-colors.mdx` renders
  identically (its components now come from direct imports, not the
  registry).
- AGENTS.md is unaffected (it doesn't document the MDX registry contents),
  but if the executor's environment maintains it, the "adding a
  project/post" flows above are worth recording.
