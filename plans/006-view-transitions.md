# Plan 006: Implement React View Transitions — title morphs, evergreen page fade, playground card grid

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat a3f9fa1..HEAD -- next.config.ts app/layout.tsx app/page.tsx "app/[slug]/layout.tsx" app/posts app/playground components/index-list.tsx components/header.tsx components/footer.tsx components/back-button.tsx components/ui/link-button.tsx styles/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none (plans 001–004 are DONE)
- **Category**: direction (feature / motion design)
- **Planned at**: commit `a3f9fa1`, 2026-07-02

## Why this matters

Route changes currently swap content with no visual connection: index list titles and their destination page titles are the same text, but nothing communicates continuity. The repo already enables `experimental.viewTransition` and has two half-wired attempts that silently do nothing (invalid `view-transition-name` idents, mismatched names). This plan lands three behaviors using React's `<ViewTransition>` per the [Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions): (1) list titles morph into page `<h1>`s, (2) an evergreen gentle fade/stagger for route body content with the site chrome anchored, and (3) a `/playground` grid of card-links that animates in the fashion of [Vercel's react-view-transitions-demo](https://github.com/vercel-labs/react-view-transitions-demo) (hover-reveal cards, `nav-forward`/`nav-back` directional slides, shared-element morph).

## Current state

Relevant files and their roles:

- `next.config.ts` — `experimental.viewTransition: true` already set (line 23). No config change needed.
- `components/index-list.tsx` — shared list for homepage projects and posts; sets a **broken** inline `viewTransitionName` (line 89).
- `app/[slug]/layout.tsx` — project detail shell; hardcodes `viewTransitionName: "title"` on the `<h1>` (line 38), which never matches the list side.
- `app/posts/page.tsx` — `/posts` index; `ItemTitle` per post (line 44), no transition name.
- `app/posts/layout.tsx` — client layout; renders the post `<h1>` (line 43) resolved from `usePathname()`.
- `app/playground/page.tsx` — hub page; hardcoded `PLAYGROUND_ROUTES` (lines 5–12) rendered as `LinkButton`s (lines 57–63).
- `app/playground/{motion-systems,pixel-demos,interaction-components,media-comparison,buttons,visual-details}/page.tsx` — six child pages, each with `<h1 className="w-full text-h1">` on line 6 (titles: Motion, Pixels, Controls, Frames, Buttons, Visual details).
- `app/layout.tsx` — root layout; route slot is `<div className="root isolate">{children}</div>` inside `<main id="main">`; imports `Header` from `@/components/header` and `Footer` from `@/components/footer`.
- `components/header.tsx`, `components/footer.tsx` — site chrome roots to freeze during transitions.
- `components/back-button.tsx` — `BackButton` wraps `LinkButton` (`components/ui/link-button.tsx`), which wraps `next/link`; spreads `...rest`, so `transitionTypes` passes through if `LinkButton` forwards props to `Link`.
- `styles/globals.css` — CSS entry; imports `./animations.css` (line 8); contains a commented-out `@view-transition` TODO block (lines 141–146) to delete.
- `styles/animations.css` — defines `--animate-stagger-enter` (line 358) and a global reduced-motion rule (lines 362–366) that does **not** reach `::view-transition-*` pseudo-elements.
- `components/scroll-reset.tsx` — already resets scroll on pathname change for the viewTransition scroll-preservation quirk. No change needed.
- `lib/data/posts.ts`, `lib/data/projects.ts` — registries with `id`, `title`, `path`. Playground has no registry (hardcoded in its page).
- `app/private/qa/component-demos.tsx` — dev-only QA demo page (see AGENTS.md preference: new components get a QA example here).

Key excerpts as of `a3f9fa1`:

```tsx
// components/index-list.tsx:89 — BROKEN: item.title contains spaces, which is
// an invalid <custom-ident>, so the browser drops the property silently.
<ItemTitle style={{ viewTransitionName: item.viewTransitionName ?? item.title }}>{item.title} </ItemTitle>
```

```tsx
// app/[slug]/layout.tsx:38 — never matches the list side's name
<h1 style={{ viewTransitionName: "title" }} className="scroll-mt-16 text-h1 text-balance">
```

```css
/* styles/globals.css:141-146 — delete; React drives same-document transitions */
/* TODO: figure out why this errors
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
} */
```

```tsx
// app/layout.tsx (route slot inside <main id="main">)
<div className="root isolate">{children}</div>
```

```css
/* styles/animations.css:358 — existing stagger utility; --stagger set per
   element via arbitrary property, e.g. [--stagger:1] (see app/page.tsx:61-63) */
--animate-stagger-enter: stagger-enter 400ms var(--ease-out-quad) calc(var(--delay, 150ms) * var(--stagger, 0)) both;
```

```tsx
// app/playground/page.tsx:5-12 — registry to extract in Step 7
const PLAYGROUND_ROUTES = [
  { href: "/playground/motion-systems", label: "Motion" },
  ...
] as const;
```

Conventions to honor:

- Naming convention introduced by this plan: `view-transition-name` = `<kind>-title-<slug>` (`project-title-forge`, `post-title-pixel-icons`, `playground-title-buttons`). Slugs come from route paths / registry ids, never display strings. Names must be unique per rendered page; the homepage renders both project and post lists, so the distinct prefixes are load-bearing.
- Reference animation values from the Vercel demo's CSS (mirror them): exit 150ms, enter 210ms delayed by exit, move 400ms; `fade` keyframe = opacity + 3px blur; directional slides use ±60px `--slide-offset`; `.morph` share class = 400ms group duration + `via-blur` keyframe (30% blur midpoint) on the image pair; frozen chrome = `animation: none; z-index: 100` on the group, `display: none` on old, `animation: none` on new.
- Type shim precedent: `types/static-asset-imports.d.ts` (plan 001) — follow that pattern if React types lack `ViewTransition`.
- AGENTS.md preference: add a QA example to the dev-only QA route for new visual components (here: `app/private/qa/component-demos.tsx`).
- AGENTS.md Known Bugs: Turbopack + Tailwind v4 stale-CSS bug — if dev CSS edits appear stuck, `touch styles/globals.css` or run `npm run dev:fresh`. Do not remove valid Tailwind syntax as a workaround.

## Commands you will need

| Purpose        | Command                     | Expected on success                    |
| -------------- | --------------------------- | -------------------------------------- |
| Install        | `npm install`               | exit 0                                 |
| Typecheck      | `npm run typecheck`         | exit 0, no errors                      |
| Lint           | `npm run lint`              | exit 0                                 |
| Format check   | `npm run format:check`      | exit 0 (run `npm run format` to fix)   |
| All checks     | `npm run check`             | exit 0 (typecheck + lint + format)     |
| Prod build     | `npm run build`             | exit 0, static generation completes    |
| Dev server     | `npm run dev`               | serves on http://localhost:3000        |
| Fresh dev      | `npm run dev:fresh`         | clears `.next`, then serves            |

## Suggested executor toolkit

- Read before starting: [Next.js view transitions guide](https://nextjs.org/docs/app/guides/view-transitions) and the demo source at [vercel-labs/react-view-transitions-demo](https://github.com/vercel-labs/react-view-transitions-demo) — especially `src/app/globals.css`, `src/components/photo-grid.tsx`, `src/app/photo/[id]/page.tsx`, `src/components/header.tsx`.
- Browser QA requires Chrome (View Transitions API); use a computer-use/browser tool if available. Firefox degrades gracefully (no animation) — that is expected, not a failure.

## Scope

**In scope** (the only files you should modify or create):

- `styles/view-transitions.css` (create)
- `styles/globals.css` (add one `@import`, delete lines 141–146 block)
- `components/view-transitions.tsx` (create)
- `types/react-view-transitions.d.ts` (create only if needed, Step 2)
- `app/layout.tsx`
- `components/header.tsx`, `components/footer.tsx` (add `viewTransitionName` style only)
- `components/index-list.tsx`
- `app/page.tsx` (post items mapping only)
- `app/[slug]/layout.tsx`
- `app/posts/page.tsx`, `app/posts/layout.tsx`
- `lib/data/playground.ts` (create)
- `components/playground/playground-card.tsx` (create)
- `components/playground/playground-page.tsx` (create)
- `app/playground/page.tsx` and the six `app/playground/*/page.tsx` child pages
- `components/back-button.tsx`, `components/ui/link-button.tsx` (only if `transitionTypes` doesn't already forward)
- `app/private/qa/component-demos.tsx` (QA example)
- `AGENTS.md`, `plans/README.md` (docs)

**Out of scope** (do NOT touch, even though they look related):

- `components/scroll-reset.tsx` — already correct for viewTransition scroll behavior.
- `next.config.ts` — flag already enabled.
- `components/header/work-menu.tsx`, `components/site-search.tsx` — additional entry points to projects/posts; giving their items transition names would duplicate names or add noise. Navigations from them get the evergreen fade only.
- `app/private/**` prototypes other than the QA demo file.
- `styles/animations.css` — reuse `--animate-stagger-enter` as-is; VT reduced-motion rules go in the new file.
- Post/project content bodies (MDX, post page bodies).

## Git workflow

- Branch: `cursor/view-transitions-plan-ba0a` already exists for this plan's authoring; implement on `cursor/implement-view-transitions-ba0a` branched from `master` (repo convention: `cursor/<slug>-ba0a`).
- Commit per phase (Steps 1–2, 3, 4, 5–8, 9–10), descriptive imperative messages (match `git log` style, e.g. "Add view-transition CSS and helpers").
- Push and open a draft PR against `master` when the executor's operator instructions say to; otherwise commit locally.

## Steps

### Step 1: Create view-transition CSS and wire it into the graph

Create `styles/view-transitions.css` containing, in this order:

1. `:root` tokens: `--vt-exit: 150ms; --vt-enter: 210ms; --vt-move: 400ms;`
2. Keyframes: `vt-fade` (from `opacity: 0; filter: blur(3px)` to `opacity: 1; filter: blur(0)`), `vt-rise` (from `transform: translateY(10px)`), `vt-slide` (from `translate: var(--slide-offset)`), `via-blur` (`30% { filter: blur(3px) }`).
3. `.morph` share class: `::view-transition-group(.morph) { animation-duration: var(--vt-move); }` and `::view-transition-image-pair(.morph) { animation-name: via-blur; }`.
4. `.vt-page` update class (evergreen fade): `::view-transition-old(.vt-page)` = `var(--vt-exit) ease-in vt-fade reverse`; `::view-transition-new(.vt-page)` = `var(--vt-enter) ease-out var(--vt-exit) both vt-fade, var(--vt-move) ease-out both vt-rise`.
5. `.nav-forward` / `.nav-back` old/new rules copied from the demo pattern: old = fast fade reverse + `var(--vt-move)` slide reverse; new = delayed fade + slide; `--slide-offset` is `-60px`/`60px` for forward old/new and `60px`/`-60px` for back old/new.
6. Frozen chrome for names `site-header` and `site-footer`: `::view-transition-group(site-header), ::view-transition-group(site-footer) { animation: none; z-index: 100; }`; `::view-transition-old(...) { display: none; }`; `::view-transition-new(...) { animation: none; }`.
7. Reduced motion: `@media (prefers-reduced-motion: reduce) { ::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) { animation-duration: 0s !important; animation-delay: 0s !important; } }`.

In `styles/globals.css`: add `@import "./view-transitions.css";` next to the existing `@import "./animations.css" layer(utilities);` (line 8) — import it **without** a layer (VT pseudo-elements target the document root, not utilities), and delete the commented `@view-transition` block (lines 141–146).

**Verify**: `npm run build` → exit 0. `rg -n "view-transition" styles/globals.css` → only the new `@import` line.

### Step 2: Create shared helpers and confirm typings

Create `components/view-transitions.tsx` (no `"use client"` — must be importable from both server and client components):

- `import { ViewTransition } from "react";`
- `export function pageTitleTransitionName(kind: "project" | "post" | "playground", slug: string): string` — returns `` `${kind}-title-${slug}` `` after sanitizing `slug` to a valid CSS custom-ident (lowercase; replace any char outside `[a-z0-9-]` with `-`; collapse repeats; trim leading digits/hyphens).
- `export function TitleMorph({ name, children }: { name: string; children: React.ReactNode })` — returns `<ViewTransition name={name} share="morph" default="none">{children}</ViewTransition>`.

Typing check: run `npm run typecheck`. If it fails on the `ViewTransition` import (types lag the React canary that App Router vendors) or on `Link`'s `transitionTypes` prop, add `types/react-view-transitions.d.ts` with minimal module augmentation, following the `types/static-asset-imports.d.ts` precedent. Do not `@ts-ignore` at call sites.

**Verify**: `npm run typecheck` → exit 0.

### Step 3: Evergreen page fade + frozen chrome

1. `app/layout.tsx`: import `ViewTransition` from `react`; wrap the route slot: `<ViewTransition update="vt-page" default="none"><div className="root isolate">{children}</div></ViewTransition>`. The boundary persists across navigations while its children swap, activating the `update` class; nested named groups (title morphs) are layered out automatically.
2. `components/header.tsx`: add `style={{ viewTransitionName: "site-header" }}` to the root `<header>` element.
3. `components/footer.tsx`: add `style={{ viewTransitionName: "site-footer" }}` to the root `<footer>` element.

**Verify**: `npm run check` → exit 0. Then with `npm run dev` running, in Chrome navigate `/` → `/posts`: body content cross-fades with a slight rise; header and footer do not flash or move. (The `::view-transition-new` snapshot is live, so the homepage's existing `animate-stagger-enter` still plays inside it.)

### Step 4: Title morphs — projects and posts

1. `components/index-list.tsx`: replace the inline style on `ItemTitle` (line 89) with the `TitleMorph` wrapper. Compute the default name from the item path: `pageTitleTransitionName("project", item.path.replace(/^\//, ""))`. Keep the `viewTransitionName` field on `IndexListItem` as a full-name override; update its JSDoc to say it must be a valid custom-ident produced by `pageTitleTransitionName`.
2. `app/page.tsx`: in the `postItems` mapping (around line 33), set `viewTransitionName: pageTitleTransitionName("post", post.id)`.
3. `app/[slug]/layout.tsx`: remove `style={{ viewTransitionName: "title" }}` from the `<h1>` (line 38) and wrap the `<h1>` in `<TitleMorph name={pageTitleTransitionName("project", slug)}>`.
4. `app/posts/page.tsx`: wrap each `ItemTitle` (line 44) in `<TitleMorph name={pageTitleTransitionName("post", post.id)}>`.
5. `app/posts/layout.tsx`: wrap the `<h1>` (line 43) in `<TitleMorph name={pageTitleTransitionName("post", post.id)}>` where `post` is already resolved from the pathname; render the bare `<h1>` unwrapped if `post` is undefined.

**Verify**: `npm run check` → exit 0. `rg -n 'viewTransitionName: "title"' app/` → no matches. `rg -n "item.viewTransitionName \?\? item.title" components/` → no matches. In Chrome: homepage project item → project page morphs the title text (and back); `/posts` item → post page morphs the title into the layout `<h1>`; homepage post item → post page also morphs.

### Step 5: Playground registry

Create `lib/data/playground.ts` exporting `playgroundRoutes`: one entry per child route with `slug` (e.g. `"motion-systems"`), `href`, `title` (**exactly** the child page's `<h1>` text: Motion, Pixels, Controls, Frames, Buttons, Visual details), `description` (one sentence, write from each page's content), and `icon` (reuse an existing icon component from `components/icons-pixel.tsx` or `@tabler/icons-react` per item). Update `app/playground/page.tsx` to import from the registry and delete the local `PLAYGROUND_ROUTES`.

**Verify**: `npm run typecheck` → exit 0. `rg -n "PLAYGROUND_ROUTES" app/` → no matches.

### Step 6: Playground card grid

Create `components/playground/playground-card.tsx`, modeled on the demo's `photo-grid.tsx`:

- `PlaygroundCardGrid` renders `<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">` over `playgroundRoutes`.
- Each card: outer `<ViewTransition key={slug}>`; inside it a `<Link href={href} transitionTypes={["nav-forward"]} className="group relative block overflow-hidden rounded-lg aspect-[4/3] ...">` using existing design tokens (`bg-card`, `border`, etc. — match repo card styling, not the demo's raw colors); a preview area rendering the registry `icon`; the card title wrapped in `<TitleMorph name={pageTitleTransitionName("playground", slug)}>`; a hover overlay in the demo's fashion (`bg-black/0 group-hover:bg-black/50 transition-colors`, description block `translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all`).

In `app/playground/page.tsx`, replace the `LinkButton` nav (lines 57–63) with `<PlaygroundCardGrid />`. Keep `FoldedCardDemo` and the tab-bar demo.

**Verify**: `npm run check` → exit 0. In Chrome, `/playground` shows the card grid; hover reveals the description overlay.

### Step 7: Playground child pages — directional slides + title morph + back link

1. Check `components/ui/link-button.tsx`: if it forwards arbitrary props to `next/link`, `BackButton` already supports `transitionTypes` via `...rest`; otherwise add explicit forwarding.
2. Create `components/playground/playground-page.tsx` exporting `PlaygroundPage({ slug, title, children })`, which renders the demo's directional wrapper:

```tsx
<ViewTransition
  enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
  exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
  default="none"
>
  <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
    <BackButton href="/playground" transitionTypes={["nav-back"]}>Playground</BackButton>
    <TitleMorph name={pageTitleTransitionName("playground", slug)}>
      <h1 className="w-full text-h1">{title}</h1>
    </TitleMorph>
    {children}
  </div>
</ViewTransition>
```

3. Update all six `app/playground/*/page.tsx` to use `PlaygroundPage`, preserving each page's existing `<h1>` text and body. Match each page's current outer container classes when they differ from the shared wrapper (inspect before replacing).

**Verify**: `npm run check` → exit 0. In Chrome: card → child page slides content left with the card title morphing into the `<h1>`; the back link slides right; browser-back (no transition type) still morphs the title without a directional slide — expected.

### Step 8: Stagger on index pages

Apply the homepage's existing pattern to the two index pages, using `animate-stagger-enter` with incrementing `[--stagger:n]` on top-level sections:

- `app/posts/page.tsx`: heading block `[--stagger:0]`, alert `[--stagger:1]`, `ItemGroup` `[--stagger:2]`.
- `app/playground/page.tsx`: `<h1>` `[--stagger:0]`, demos `[--stagger:1]`, card grid `[--stagger:2]`.

Do NOT attempt per-element stagger with nested named ViewTransition groups.

**Verify**: `npm run check` → exit 0. In Chrome, loading `/posts` and `/playground` staggers sections top-to-bottom.

### Step 9: QA example and docs

1. Add a `PlaygroundCardGrid` (or single `PlaygroundCard`) example to `app/private/qa/component-demos.tsx`, following that file's existing section structure (appearance/hover only — morphs are route-level and can't demo in the QA grid).
2. `AGENTS.md`: under Learned Workspace Facts, record: the VT naming convention (`<kind>-title-<slug>` via `pageTitleTransitionName`), `styles/view-transitions.css` as the home of all `::view-transition-*` rules, the frozen `site-header`/`site-footer` groups, and that `components/scroll-reset.tsx` remains required.
3. `plans/README.md`: add plan 006 to the execution table with its status.

**Verify**: `npm run check` → exit 0. QA page renders the new example at `/private/qa` (dev server only).

### Step 10: Full verification pass

Run the complete test plan below, record demo videos, and confirm all done criteria.

**Verify**: `npm run check` → exit 0. `npm run build` → exit 0, all static pages generate.

## Test plan

No unit test runner exists in this repo by policy (plans/README.md dependency notes) — verification is typecheck/lint/build plus manual browser QA in Chrome (`npm run dev`):

1. Homepage project item (e.g. first item in "I. Work") → project page: title morphs, body fades/rises, header/footer static. Back button reverses the morph.
2. Homepage post item ("II. Posts") → post page: title morphs into the posts-layout `<h1>`.
3. `/posts` list item → post page: same morph; post → adjacent post via pagination cross-morphs the two titles (acceptable; note anything jarring).
4. `/playground`: card grid renders; hover overlay works; card → child slides forward with title morph; back link slides back; browser-back morphs without slide.
5. DevTools → Rendering → emulate `prefers-reduced-motion: reduce`: all transitions swap instantly.
6. Firefox (or any non-supporting browser) smoke check: navigation works with no animation and no console errors.

Record screen captures of flows 1, 4, and 5 as walkthrough artifacts.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] `rg -n 'viewTransitionName: "title"' app/` returns no matches
- [ ] `rg -n 'item\.title' components/index-list.tsx` shows `item.title` only as rendered text, never as a `viewTransitionName` value
- [ ] `rg -n "@view-transition" styles/globals.css` returns no matches
- [ ] `rg -n "PLAYGROUND_ROUTES" app/` returns no matches
- [ ] `styles/view-transitions.css`, `components/view-transitions.tsx`, `lib/data/playground.ts`, `components/playground/playground-card.tsx`, `components/playground/playground-page.tsx` all exist
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] Browser QA flows 1–6 pass in Chrome
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The drift check shows in-scope files changed and the "Current state" excerpts no longer match (especially `components/index-list.tsx:89`, `app/[slug]/layout.tsx:38`, or the playground page structure).
- `import { ViewTransition } from "react"` fails at **runtime** in `npm run dev` / `npm run build` (not just types) — the assumption "Next 16.2 App Router vendors a React canary exposing `ViewTransition`" is false; do not fall back to `unstable_ViewTransition` without reporting.
- `Link`'s `transitionTypes` prop is rejected at runtime or has no effect — the assumption "Next `^16.2.9` supports `transitionTypes`" is false.
- Title morphs do nothing in Chrome after Steps 3–4 and 15 minutes of debugging (check for duplicate `view-transition-name`s on one page via DevTools console errors first).
- A fix appears to require touching `components/scroll-reset.tsx`, `next.config.ts`, or other out-of-scope files.
- The Turbopack stale-CSS bug persists after both `touch styles/globals.css` and `npm run dev:fresh` (see AGENTS.md Known Bugs — do not delete valid CSS to work around it).

## Maintenance notes

- Any new index/list surface that should morph into a page title must use `pageTitleTransitionName` and keep names unique per rendered page; duplicated names break the whole transition for that navigation.
- If a post/project detail ever renders on the same page as its list item (e.g. a preview modal), the shared name will collide — scope names or drop one side.
- Post→post pagination cross-morphs adjacent titles because `app/posts/layout.tsx` persists; if this reads poorly, key the `TitleMorph` by pathname or gate it by transition type.
- If `/playground` children gain hero media, consider morphing the card preview → hero (the demo's primary pattern) in addition to the title.
- Reviewer scrutiny: the root-layout `ViewTransition update` boundary (wrong `default`/`update` values make every navigation animate twice or not at all), custom-ident sanitization in `pageTitleTransitionName`, and that reduced-motion disables VT pseudo-element animations (the `animations.css` global rule does not).
- Deferred: directional slides outside `/playground`; morphs from the header Work menu and site search; per-element stagger via nested VT groups.
