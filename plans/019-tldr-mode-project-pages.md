# Plan 019: Add a "tl;dr" mode to project pages

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 61bf9081..HEAD -- "app/[slug]/layout.tsx" lib/types.ts content/projects/forge.mdx components/tldr-mode.tsx components/ui/toggle.tsx components/ui/badge.tsx components/image.tsx components/image-modal.tsx components/image-toggle.tsx components/video.tsx components/project-image-carousel.tsx app/private/qa/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. Known coordination: [plan 006](./006-view-transitions.md)
> (view transitions) also edits `app/[slug]/layout.tsx` — if its `<h1>` no
> longer carries `style={{ viewTransitionName: "title" }}` (line 38), plan
> [006](./006-view-transitions.md) landed first; the wiring in Step 4 still applies, but re-derive line
> numbers from the live file. The drift check is intentionally scoped to the
> new `TldrMode` module, the layout/type/frontmatter files, QA files, and the
> media primitives whose rendered DOM shape the extraction logic relies on;
> unrelated files under `components/**` do not block this plan.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED (touches the shared project-page shell; purely presentational, no data/SEO surface)
- **Depends on**: none (coordinates with [006](./006-view-transitions.md) — see drift check)
- **Category**: direction
- **Planned at**: commit `9ed1acd`, 2026-07-01
- **Reconciled at**: commit `9ed1acd` plus dirty worktree, 2026-07-02 — narrowed the drift check so unrelated `components/device/**` deletion does not stop this plan.
- **Reconciled at**: commit `61bf9081`, 2026-07-02 — still TODO.
  Media primitives changed after Plan 015; re-verify the extraction behavior
  against the live `ImageModal`, `ImageToggle`, `Video`, and carousel DOM
  before implementation.

## Why this matters

Project pages are long-form case studies. A visitor who wants the gist has to
scroll past thousands of words to see the visual work. "tl;dr mode" gives them
a one-tap alternative: the prose animates away, leaving a short summary card
(styled with an "AI-generated" flourish — the copy is actually hand-written by
the site owner) and every image/video from the article re-presented as a
single full-bleed vertical scroll. It is a portfolio feature: it shows off
motion craft while making the work itself more scannable.

Decisions already made by the maintainer (do not relitigate):

- **Scope**: project pages only (`content/projects/*.mdx` rendered by `app/[slug]/`). Posts are out of scope.
- **Summary source**: a `tldr?: string[]` field (3–5 short bullets) in each MDX file's exported `frontmatter`. No runtime AI. The "AI-generated" label is a design flourish.
- **Hide behavior**: **prototype both** — a `remove` variant (prose animates out and leaves the flow) and an `obscure` variant (prose stays, blurred/dimmed, panel renders above it). The maintainer decides later; ship with `remove` as the default and a one-line constant to flip.
- **Gallery**: built by **runtime DOM extraction** — query the rendered article for `img` and `video` elements. Include videos and both frames of `ImageToggle` pairs. Rendered as a single vertical scroll of full-screen-width media. **No interaction** — no lightbox, no click handlers on gallery items.
- **Trigger**: a toggle in the content header near the title. Ephemeral per-visit state — no URL param, no localStorage.
- **Accessibility/SEO posture**: purely presentational client-side toggle. Default state is the full article; prose must remain in the server-rendered HTML. In `remove` mode the article is hidden with CSS (`display: none` after the exit animation), never unmounted.

## Current state

Relevant files:

- `app/[slug]/layout.tsx` — the project detail shell (server component). Renders a 3-column grid: `#toc` aside, content column (`#content-max` → `#content-header` + `#content-body` + `Pagination`), `#meta` aside. This is where the feature wires in.
- `app/[slug]/page.tsx` — imports `content/projects/${slug}.mdx` and renders it as `#content-body` children. Not modified by this plan.
- `lib/types.ts` — `ProjectFrontmatter` (lines 1–8). Gets the new `tldr` field.
- `content/projects/forge.mdx` — the media-richest project (2 `Image`, 14 `ImageModal`, 3 `ImageToggle`, 2 `LayoutGrid`, 1 `ProjectImageCarousel`). Gets seed bullets so the feature is testable.
- `components/tldr-mode.tsx` — **new file**, all client logic lives here.
- `app/private/qa/component-demos.tsx` and `app/private/qa/page.private.tsx` — dev-only QA page (repo rule: every new component gets a QA example + TOC entry).

Excerpt — the layout as it exists today (`app/[slug]/layout.tsx:24-67`, abridged):

```tsx
return (
  <div className="mx-auto max-w-7xl gap-8 max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem]">
    <aside id="toc" className="not-prose @container-[scroll-state] self-start max-lg:hidden lg:sticky lg:top-32">
      <BackButton href="/#projects">Back</BackButton>
      <TableOfContents toc={toc} title={fm.title} />
    </aside>

    <div id="content-max" className="col-start-2 min-w-0">
      <div id="content-header" className="mx-auto flex max-w-xl flex-col items-start gap-4">
        <BackButton href="/#projects" className="mb-8 lg:hidden">Projects</BackButton>
        <h1 style={{ viewTransitionName: "title" }} className="scroll-mt-16 text-h1 text-balance">{fm.title}</h1>
        <p className="mb-4 max-w-prose text-base leading-tight text-balance text-muted-foreground">{fm.subtitle}</p>
        <ProjectMeta ... className="mb-2 lg:hidden" ... />
      </div>

      <div id="content-body" className="prose group/article col-start-2 max-w-full min-w-0 overflow-visible sm:mb-96"
           style={{ anchorName: "--article" }}>
        {children}
      </div>
      <Pagination {...neighbors} backHref="/#projects" backLabel="Projects" />
    </div>

    <aside id="meta" className="not-prose max-lg:hidden max-md:order-2" style={{ anchorName: "--meta" }}>
      <ProjectMeta ... className="mt-auto" />
    </aside>
  </div>
);
```

Excerpt — the frontmatter type (`lib/types.ts:1-8`):

```ts
export type ProjectFrontmatter = {
  title: string;
  subtitle?: string;
  role?: string;
  date?: string;
  team?: { name?: string; role?: string; url?: string }[];
  meta?: { label: string; value: string }[];
};
```

Excerpt — project MDX frontmatter is a JS export, not YAML (`content/projects/forge.mdx:1-10`):

```ts
export const frontmatter = {
  title: "Everfi Forge",
  subtitle: "Refreshing our internal learning content creation & management app",
  role: "Design Systems Lead",
  date: "Winter - Spring 2017",
  team: [ ... ],
};
```

Why runtime `img, video` extraction is sufficient (verified against every
media component registered in `mdx-components.tsx`):

- `components/image.tsx` → `<figure data-media>` wrapping a `next/image` `<img>`.
- `components/image-modal.tsx` (`ImageModal`) → thumbnail is a `next/image` `<img>` inside a Cambio trigger; the modal popup only mounts on open.
- `components/image-toggle.tsx` (`ImageToggle`) → `tabs` mode renders **both** frames via `<TabsContent keepMounted>` (both `<img>`s are in the DOM); `slider` and `comparison` modes render both raw `<img>`s. So "include both ImageToggle frames" falls out of the query for free.
- `components/video.tsx` (`Video`) → a native `<video slot="media" src=...>` inside `media-chrome`'s `MediaController`.
- `components/project-image-carousel.tsx` → all slides render `<img>`s in the DOM (embla does not virtualize).
- Raw markdown `![...]()` → the `img` override in `mdx-components.tsx:81-109` renders `next/image`.

No project MDX uses `DeviceFrame` (verified by grep across `content/projects/*.mdx`), so iframe/frame extraction is not needed.

Conventions to match:

- Client components start with `"use client"`; animation uses `motion/react` (`motion`, `AnimatePresence`) — see `components/image-modal.tsx` as the exemplar (spring config at line 21: `{ type: "spring", damping: 28, stiffness: 220 }`).
- UI primitives are Base UI wrappers in `components/ui/` — use `Toggle` from `components/ui/toggle.tsx` (Base UI `Toggle`, manages `data-pressed` and `aria-pressed` itself; variants `default | outline | elevated`, sizes `xs | sm | default | lg`) and `Badge` from `components/ui/badge.tsx`.
- Icons come from `@tabler/icons-react` (e.g. `IconSparkles`).
- `cn` from `@/lib/utils` for class merging. Imports always at the top of the module (workspace rule — no inline imports).
- Prettier is enforced (`npm run format:check` is part of `npm run check`); run `npx prettier --write <changed files>` before finishing.

## Commands you will need

| Purpose          | Command                        | Expected on success                        |
| ---------------- | ------------------------------ | ------------------------------------------ |
| Dev server       | `npm run dev`                  | serves on localhost:3000                   |
| Typecheck        | `npm run typecheck`            | exit 0                                     |
| Full check       | `npm run check`                | exit 0 (typecheck + lint + format:check)   |
| Production build | `npm run build`                | exit 0; 49+ static pages; no `/private/**` |
| Format           | `npx prettier --write <files>` | exit 0                                     |

There is no test runner in this repo (deliberate policy — see `plans/README.md`). Verification is typecheck + lint + build + browser QA.

## Suggested executor toolkit

- If available, read the `web-animation-design` and/or `transitions-dev` skills before writing the enter/exit animations in Step 3.
- Browser tooling (if available) to QA `http://localhost:3000/forge` per the Test plan.

## Scope

**In scope** (the only files you should modify or create):

- `lib/types.ts` (add one field)
- `content/projects/forge.mdx` (frontmatter only — add `tldr` bullets)
- `components/tldr-mode.tsx` (create)
- `app/[slug]/layout.tsx` (wire in provider/toggle/panel)
- `app/private/qa/component-demos.tsx` and `app/private/qa/page.private.tsx` (QA demo + TOC entry)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `app/posts/**` — posts do not get tl;dr mode.
- `components/image.tsx`, `components/image-modal.tsx`, `components/image-toggle.tsx`, `components/video.tsx`, `components/project-image-carousel.tsx` — extraction is read-only DOM querying; do not add props, markers, or `data-` attributes to these components.
- `app/[slug]/page.tsx`, `lib/projects.ts`, `components/table-of-contents.tsx` — no changes needed.
- The other 10 project MDX files — the maintainer writes their `tldr` bullets later. The feature must no-op (no toggle rendered) when `tldr` is absent.
- Anything involving actual AI/LLM calls, URL state, or localStorage persistence.
- `mdx-components.tsx` — no new MDX shortcodes.

## Git workflow

- Branch: `advisor/019-tldr-mode` (repo convention from prior plan executions).
- Commit per step or logical unit; plain imperative messages matching `git log` style (e.g. "Add tldr frontmatter field and forge seed bullets").
- Do NOT push or open a PR unless the operator instructed it.

## Design (read fully before Step 1)

One new client module, `components/tldr-mode.tsx`, exporting four pieces that
share a React context:

```tsx
type TldrVariant = "remove" | "obscure";

type TldrContextValue = {
  active: boolean;
  setActive: (next: boolean) => void;
  tldr: string[];
  variant: TldrVariant;
};
```

1. **`TldrProvider`** — `{ tldr?: string[]; variant?: TldrVariant; className?: string; children }`.
   Owns `active` state (plain `useState`, ephemeral). Renders
   `<div className={className} data-tldr-active={active || undefined}>` so the
   server layout can pass its existing grid classes through unchanged. When
   `tldr` is missing or empty, it still renders the div but the context exposes
   `tldr: []` and consumers no-op.
2. **`TldrToggle`** — renders `null` when `tldr` is empty. Otherwise a
   `Toggle` (from `components/ui/toggle.tsx`, `variant="outline"`, `size="sm"`)
   whose `pressed`/`onPressedChange` bind to context, containing
   `<IconSparkles />` and the label `tl;dr`. On activation, scroll to the top
   of the page: `window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })`
   (use `useReducedMotion()` from `motion/react`).
3. **`TldrArticle`** — wraps the MDX children. Holds the article `ref` used
   for extraction. Behavior by variant:
   - `remove`: wrap children in a `motion.div` animated with
     `animate={active ? { opacity: 0, filter: "blur(8px)", transitionEnd: { display: "none" } } : { display: "block", opacity: 1, filter: "blur(0px)" }}`
     — motion's `transitionEnd` applies `display: none` only after the exit
     finishes, and the article is **never unmounted** (SEO posture + repeat
     extraction both depend on this). Also set `aria-hidden` and `inert` on the
     wrapper while active.
   - `obscure`: article stays rendered; while active apply
     `opacity-40 blur-[6px] pointer-events-none select-none` (animate
     opacity/filter with the same motion.div; no `display` change) plus
     `aria-hidden`/`inert`.
   - When `active` flips on for the first time, run extraction (below) against
     the ref **before** the exit animation starts (same render tick is fine —
     read the DOM in the event handler/effect, then animate). Cache the result
     in state; re-use on subsequent toggles.
4. **`TldrPanel`** — renders inside `AnimatePresence` only while active:
   a summary card, then the media scroll. Entrance: fade + small y-translate
   with a subtle stagger between card and gallery; use the repo spring
   `{ type: "spring", damping: 28, stiffness: 220 }`; respect
   `useReducedMotion()` (skip transforms, keep opacity).
   - **Summary card**: `not-prose` card (`bg-card`, `rounded-2xl`,
     `shadow-border-sm` — match the surface treatment used by
     `components/image.tsx:41`). Header row: `<Badge variant="outline">` with
     `<IconSparkles />` and the text `AI-generated`, next to a small
     `tl;dr` heading. Body: `<ul>` of the 3–5 bullets, `text-base`,
     `text-muted-foreground` with `text-foreground` first sentence emphasis
     optional. Keep it restrained.
   - **Gallery**: for each extracted item, a full-bleed block using the
     classic breakout: container `relative start-1/2 w-screen max-w-none -translate-x-1/2`
     inside a parent with `overflow-x-clip` (add `overflow-x-clip` to the
     panel wrapper so no horizontal scrollbar appears). Images render as
     `<img src srcSet sizes="100vw" alt loading="lazy" decoding="async">`
     (plain `img`, not `next/image` — the srcset was already generated by
     next/image on the article side; add
     `/* eslint-disable @next/next/no-img-element */` at the top of the file,
     matching `components/image-modal.tsx:3`). Set `width`/`height` from
     `naturalWidth`/`naturalHeight` when non-zero to avoid layout shift.
     Videos render as `<video src poster playsInline muted loop autoPlay preload="metadata">`.
     **No click handlers, no lightbox** — display only. Vertical rhythm:
     `flex flex-col gap-2` (tight — it should read as a reel, not an article).

**Extraction** (module-scope helper in the same file):

```tsx
type TldrMedia =
  | { kind: "image"; key: string; src: string; srcset?: string; alt: string; width?: number; height?: number }
  | { kind: "video"; key: string; src: string; poster?: string };

function extractMedia(root: HTMLElement): TldrMedia[] {
  const seen = new Set<string>();
  const out: TldrMedia[] = [];
  for (const el of Array.from(root.querySelectorAll<HTMLImageElement | HTMLVideoElement>("img, video"))) {
    if (el instanceof HTMLImageElement) {
      const src = el.getAttribute("src") ?? "";
      if (!src || seen.has(src)) continue;
      seen.add(src);
      out.push({
        kind: "image",
        key: src,
        src,
        srcset: el.getAttribute("srcset") ?? undefined,
        alt: el.alt,
        width: el.naturalWidth || undefined,
        height: el.naturalHeight || undefined,
      });
    } else {
      const src = el.currentSrc || el.getAttribute("src") || "";
      if (!src || seen.has(src)) continue;
      seen.add(src);
      out.push({ kind: "video", key: src, src, poster: el.getAttribute("poster") ?? undefined });
    }
  }
  return out;
}
```

Notes: `querySelectorAll` returns document order, which preserves the article's
narrative sequence. Deduping by `src` collapses `keepMounted` duplicates.
Attribute-based reads (not `currentSrc` for images) work even for lazy images
that never loaded because the user toggled before scrolling.

**TOC fade**: while active, the TOC's anchor targets are hidden (in `remove`
mode `:target` elements are `display: none`), so the TOC must fade out. Do it
with CSS only: `TldrProvider`'s div already carries `data-tldr-active`; give it
`group/tldr` and add to the `#toc` aside's className:
`transition-opacity duration-300 group-data-[tldr-active]/tldr:pointer-events-none group-data-[tldr-active]/tldr:opacity-0`.
Leave the `#meta` aside and `Pagination` untouched — they remain useful in
tl;dr mode.

**Variant flip switch**: in `app/[slug]/layout.tsx`, a module-level constant:

```tsx
// Prototype switch — "remove" animates the prose out of the flow;
// "obscure" keeps it dimmed in place behind the panel. Decision pending.
const TLDR_VARIANT: "remove" | "obscure" = "remove";
```

passed as `<TldrProvider variant={TLDR_VARIANT} ...>`. Both variants must be
QA'd (Test plan); the maintainer flips this one line later.

## Steps

### Step 1: Add the `tldr` frontmatter field and seed forge

1. In `lib/types.ts`, add to `ProjectFrontmatter` (after `date`):

```ts
/** 3–5 hand-written summary bullets shown in tl;dr mode (labeled "AI-generated" as a design flourish). */
tldr?: string[];
```

2. In `content/projects/forge.mdx`, add to the `export const frontmatter`
   object (after `date`) placeholder bullets clearly marked for the maintainer
   to rewrite:

```ts
tldr: [
  "[PLACEHOLDER — maintainer rewrites] Refreshed Forge, Everfi's internal course-authoring app, with new color, type, and density foundations.",
  "[PLACEHOLDER] Rebuilt the neutral and primary color scales (100–900) to fix contrast failures in nested editor views.",
  "[PLACEHOLDER] Introduced compact spacing and consistent component states across buttons, fields, nav, and dialogs.",
  "[PLACEHOLDER] Shipped dark mode and a theme picker on top of the expanded palette.",
],
```

**Verify**: `npm run typecheck` → exit 0.

### Step 2: Create `components/tldr-mode.tsx`

Create `components/tldr-mode.tsx` implementing `TldrProvider`, `TldrToggle`,
`TldrArticle`, `TldrPanel`, and `extractMedia` exactly per the **Design**
section. File starts with `"use client"` and the eslint disable comment for
`no-img-element`. All imports at the top.

**Verify**: `npm run typecheck` → exit 0. `npm run lint` → exit 0.

### Step 3: Wire into `app/[slug]/layout.tsx`

1. Import `{ TldrProvider, TldrToggle, TldrArticle, TldrPanel }` and add the
   `TLDR_VARIANT` constant (Design section).
2. Replace the root `<div className="mx-auto max-w-7xl ...">` with
   `<TldrProvider tldr={fm.tldr} variant={TLDR_VARIANT} className="group/tldr mx-auto max-w-7xl gap-8 max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem]">`
   (same classes plus `group/tldr`). The closing tag changes accordingly.
   `fm.tldr` is a plain string array — serializable across the server→client
   boundary; the MDX `children` stay server-rendered as provider children.
3. Add the TOC fade classes to the `#toc` aside (Design section).
4. In `#content-header`, after the `<p>` subtitle and before `ProjectMeta`,
   add `<TldrToggle />`.
5. In `#content-body`, replace `{children}` with:

```tsx
<TldrPanel />
<TldrArticle>{children}</TldrArticle>
```

(`TldrPanel` first so the summary/gallery sit where the article was; it
renders `null` when inactive. Both render `null`-equivalent no-ops when
`tldr` is empty — every other project page must be byte-for-byte visually
unchanged.)

**Verify**: `npm run check` → exit 0. Then `npm run dev`, open
`http://localhost:3000/furnace` (a page with **no** `tldr`) → no toggle
appears, page renders as before. Open `http://localhost:3000/forge` → toggle
appears in the header.

### Step 4: Browser QA both variants

With the dev server running, on `http://localhost:3000/forge`:

1. `remove` variant (default): activate the toggle → page scrolls to top,
   prose animates out (opacity + blur), TOC fades, summary card with the
   "AI-generated" badge and 4 bullets appears, followed by a vertical scroll
   of full-viewport-width media in article order. Expect roughly 20+ images
   (14 ImageModal thumbs + 2 Image + both frames of 3 ImageToggles + carousel
   slides, deduped) and no `<video>` (forge has none). No horizontal
   scrollbar. Toggle off → prose animates back, TOC returns, no layout jump.
2. Toggle on/off three times → no duplicate gallery items (dedupe cache works).
3. Flip `TLDR_VARIANT` to `"obscure"` in `app/[slug]/layout.tsx`, reload:
   prose stays visible but blurred/dimmed and non-interactive behind/below
   the panel. Toggle off restores it. Flip the constant back to `"remove"`.
4. Check a video page: temporarily add a 2-bullet `tldr` to
   `content/projects/npr-maps.mdx` frontmatter, visit `/npr-maps`, activate →
   2 videos appear in the gallery and autoplay muted. **Then remove that
   temporary frontmatter change** (`git diff content/projects/npr-maps.mdx`
   must be empty afterward).
5. Keyboard: the toggle is reachable by Tab and flips with Space/Enter; with
   tl;dr active, Tab does not land inside the hidden article (inert works).
6. OS "reduce motion" enabled (macOS: System Settings → Accessibility →
   Display → Reduce motion): transitions become opacity-only, scroll jump is
   instant.

**Verify**: all six observations hold; `git status` shows only in-scope files modified.

### Step 5: QA page entries (repo rule — mandatory)

1. In `app/private/qa/component-demos.tsx`, add an exported demo component
   (e.g. `TldrModeDemo`) modeled on the existing demo sections: a bordered
   mini-article (two short paragraphs + two images — reuse the already-imported
   `forgeBeforeDemo` asset and one more forge asset import) wrapped in
   `TldrProvider` with a fixed 3-bullet `tldr`, showing `TldrToggle`,
   `TldrPanel`, and `TldrArticle` working in miniature. Render two labeled
   sub-examples, one per variant (`remove`, `obscure`), following the
   "labeled sub-example per variant" convention.
2. In `app/private/qa/page.private.tsx`, add `{ id: "tldr-mode", text: "TL;DR Mode" }`
   to `CUSTOM_TOC_ITEMS` (line ~591) and render the demo in the matching
   section, following how neighboring entries (e.g. `animate-height`) are
   wired.

**Verify**: `npm run check` → exit 0; `http://localhost:3000/private/qa#tldr-mode` shows both variant demos and the sidebar entry.

### Step 6: Final gates

1. `npx prettier --write` on all changed files.
2. `npm run check` → exit 0.
3. `npm run build` → exit 0; static generation succeeds; `/private/**` absent
   from the production route list (unchanged behavior).
4. Update the 019 row in `plans/README.md` to DONE (or your dispatch's convention).

## Test plan

No test runner exists in this repo by policy; the verification gates are:

- `npm run check` (typecheck + eslint + prettier) at Steps 1, 2, 3, 5, 6.
- `npm run build` at Step 6 (catches RSC/client boundary violations — e.g. if
  `TldrProvider` were accidentally given non-serializable props).
- The scripted browser QA in Step 4 is the behavioral test suite; every
  observation listed there must hold. Cover both variants, a no-`tldr` page
  (`/furnace`), a video page (`/npr-maps`, temporary), keyboard, and reduced
  motion.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] `rg -n "tldr" lib/types.ts` shows the `tldr?: string[]` field
- [ ] `rg -c "PLACEHOLDER" content/projects/forge.mdx` returns 4 (seed bullets present, still marked for maintainer rewrite)
- [ ] `rg -n "tldr" content/projects/*.mdx --files-with-matches` returns **only** `forge.mdx`
- [ ] `components/tldr-mode.tsx` exists, starts with `"use client"`, and exports `TldrProvider`, `TldrToggle`, `TldrArticle`, `TldrPanel`
- [ ] `rg -n "TldrProvider|TldrToggle|TldrArticle|TldrPanel|TLDR_VARIANT" "app/[slug]/layout.tsx"` shows all five wired
- [ ] `rg -n "data-media|tldr" components/image.tsx components/image-modal.tsx components/image-toggle.tsx components/video.tsx components/project-image-carousel.tsx` shows **no new markers** (extraction stayed read-only)
- [ ] `rg -n "tldr-mode" app/private/qa/page.private.tsx` shows the TOC entry
- [ ] `git status` shows no modifications outside the in-scope list (in particular `git diff content/projects/npr-maps.mdx` is empty)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows `app/[slug]/layout.tsx` changed and the excerpt in
  "Current state" no longer matches — especially if [plan 006](./006-view-transitions.md) or [plan 017](./017-server-client-boundaries.md)
  landed and restructured the shell.
- `motion/react`'s `transitionEnd: { display: "none" }` does not apply after
  the exit animation (API drift in the installed motion version) — report
  rather than switching to unmounting, which would break the "prose stays in
  the DOM" requirement.
- Wrapping the grid in `TldrProvider` breaks server rendering of the MDX
  children (e.g. build error about client components receiving non-serializable
  props) — do not convert the layout to a client component; report.
- Extraction on `/forge` yields fewer than 15 items or items out of article
  order — do not add `data-` markers to media components (out of scope);
  report what the DOM actually contained.
- The Turbopack stale-CSS bug bites while iterating on Tailwind classes
  (symptoms: a CSS error persists after you fixed the source). Per
  `AGENTS.md`: touch `styles/globals.css` or run `npm run dev:fresh`; if it
  still persists, report rather than rewriting valid Tailwind syntax.

## Maintenance notes

- **The forge bullets are placeholders.** The maintainer must rewrite the four
  `[PLACEHOLDER]` strings before this deploys, then add `tldr` arrays to the
  other project MDX files at their leisure — the toggle appears automatically
  wherever the field exists.
- **The variant decision is open.** `TLDR_VARIANT` in `app/[slug]/layout.tsx`
  is the one-line flip between `remove` and `obscure`. Once decided, delete
  the losing branch from `components/tldr-mode.tsx` and remove the constant.
- **Coordination with [plan 006](./006-view-transitions.md) (view transitions)**: both edit
  `app/[slug]/layout.tsx`; [006](./006-view-transitions.md) replaces the `<h1>`'s hardcoded
  `viewTransitionName`. Whichever lands second reconciles line numbers. The
  features are behaviorally independent.
- **Coordination with [plan 017](./017-server-client-boundaries.md) (server/client boundaries)**: [017](./017-server-client-boundaries.md)'s audit
  should note that `TldrProvider` intentionally wraps the project grid as a
  client boundary with RSC children — that is the designed pattern, not a
  regression.
- **Extraction fragility**: the gallery depends on media components bottoming
  out in `img`/`video` elements. If a future media component renders into an
  iframe, canvas, or shadow DOM, it will silently not appear in tl;dr mode —
  reviewers of new MDX shortcodes should check this.
- **Reviewer scrutiny**: the `inert` attribute on the hidden article (keyboard
  trap prevention), no horizontal overflow from the `w-screen` breakout at
  narrow viewports, and that `/furnace` (no `tldr`) renders identically to
  production today.
