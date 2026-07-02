# Plan 016: Small correctness batch — dates, TOC ids, reducer exhaustiveness, carousel progress

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- lib/parse-post-date.ts lib/projects.ts components/demos/clip-path-editor/state.ts components/ui/carousel.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat the affected fix as a STOP condition (the others may
> proceed).

## Status

- **Priority**: P3
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug / perf
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

Four small, independent latent bugs, batched because each is a few lines:
(A) the post-date parser accepts impossible dates like `02/31/2026` and
silently rolls them into March; (B) the project TOC builder emits duplicate
anchor ids when two headings share text, so sidebar clicks jump to the wrong
section; (C) the clip-path editor reducer has no exhaustive default, so a
future action variant returns `undefined` state and corrupts the demo;
(D) autoplaying carousels call `setState` ~60×/sec to animate a progress
meter, reconciling React every frame for a visual that a CSS variable can
drive for free.

## Current state

**(A)** `lib/parse-post-date.ts` — parses `MM/DD/YYYY` frontmatter dates
deterministically (used by `app/posts/layout.tsx:62` for display):

```ts
// lib/parse-post-date.ts:8-14
if (us) {
  const month = Number(us[1]) - 1;
  const day = Number(us[2]);
  const year = Number(us[3]);
  if (month >= 0 && month <= 11 && day >= 1 && day <= 31 && year >= 1) {
    return new Date(Date.UTC(year, month, day, 12, 0, 0));
  }
}
```

`Date.UTC(2026, 1, 31)` rolls to March 3 — no month-length validation.

**(B)** `lib/projects.ts` — builds the TOC for project MDX pages (consumed
by `app/[slug]/layout.tsx`):

```ts
// lib/projects.ts:19-23
return [...cleaned.matchAll(/^(#{2,4})\s+(.+)$/gm)].map((m) => ({
  depth: m[1].length,
  text: m[2].trim(),
  id: slugify(m[2].trim()),
}));
```

No dedup — two "## Results" headings produce two `#results` ids. Contrast
with the client-side post TOC (`components/post-table-of-contents.tsx:33-46`)
which suffixes duplicates; and note the anchor ids in the rendered DOM come
from `mdx-components.tsx:26-43` (`createHeading` → `slugify(children)`),
which ALSO does not dedup — so the DOM itself has duplicate ids. Fixing only
`lib/projects.ts` would desync TOC ids from DOM ids; both sides must share
the dedup rule (see Step 2).

**(C)** `components/demos/clip-path-editor/state.ts` — reducer over a
discriminated union (`ClipPathEditorAction` in `./types`):

```ts
// components/demos/clip-path-editor/state.ts:27-52
export function clipPathEditorReducer(state: ClipPathEditorState, action: ClipPathEditorAction): ClipPathEditorState {
  switch (action.type) {
    case "set-start":
      ...
    case "reset":
      return DEFAULT_CLIP_PATH_EDITOR_STATE;
  }
}
```

All current variants are handled, but there is no `never`-checked default.
Workspace rule (typescript-exhaustive-switch): "In switch statements over
discriminated unions or enums, use a `never` check in the default case so
newly added variants cause compile-time failures until handled."

**(D)** `components/ui/carousel.tsx` — autoplay progress loop:

```tsx
// components/ui/carousel.tsx:202-214
React.useEffect(() => {
  if (!isPlaying) return;
  const plug = getAutoplay();
  if (!plug) return;
  let rafId = 0;
  const tick = () => {
    const t = plug.timeUntilNext();
    setAutoplayProgress(t !== null ? ((delay - t) / delay) * 100 : 0);
    rafId = requestAnimationFrame(tick);
  };
  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
}, [delay, getAutoplay, isPlaying]);
```

Find where `autoplayProgress` state is declared and consumed in the same
file (a progress meter in the carousel toolbar) before changing anything —
the consumer determines the exact CSS-variable target.

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Prod build | `npm run build` | exit 0              |
| Dev server | `npm run dev`   | serves on :3000     |

## Scope

**In scope** (the only files you should modify):

- `lib/parse-post-date.ts`
- `lib/projects.ts`
- `mdx-components.tsx` (heading-id dedup, part B only)
- `components/demos/clip-path-editor/state.ts`
- `components/ui/carousel.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `components/post-table-of-contents.tsx` — its dedup works; it's the
  pattern source, not a target.
- `lib/data/posts.ts` frontmatter dates — all currently valid.
- Carousel autoplay event handling (`autoplay:play`/`stop`/`select` wiring,
  lines 190–199) and the in-view gating.
- ISO-datetime timezone semantics in `parse-post-date.ts` (latent, LOW
  priority — recorded in the index as not-planned).

## Git workflow

- Branch: `cursor/016-correctness-batch` from `master`.
- One commit per fix (A–D), imperative messages, e.g. "Reject impossible
  calendar dates in post date parser".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step A: Validate calendar dates in `parsePostDateString`

After constructing the UTC date in the `MM/DD/YYYY` branch, confirm it
round-trips; return `null` when it doesn't:

```ts
const date = new Date(Date.UTC(year, month, day, 12, 0, 0));
if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
  return null;
}
return date;
```

(`formatPostDateForDisplay` already falls back to the raw string on `null`.)

**Verify**:
`node -e "const{parsePostDateString:p}=require('./lib/parse-post-date.ts')"`
won't run TS directly — instead verify by inspection plus:
`npm run check` → exit 0. Then a quick runtime check via the dev server is
unnecessary; add a temporary assertion script ONLY if you can run TS
directly (e.g. `npx tsx -e "..."` if tsx is available — do not install it).

### Step B: Dedup heading ids in both the TOC builder and the MDX renderer

The dedup rule (shared by both sides, matching the existing
`post-table-of-contents.tsx` behavior): first occurrence keeps `slug`,
subsequent occurrences get `slug-2`, `slug-3`, ….

1. `lib/projects.ts` — in `getProjectToc`, track used ids in a
   `Map<string, number>` and suffix repeats.
2. `mdx-components.tsx` — `createHeading` is stateless per-render and cannot
   see sibling headings. Give the ids the same dedup by moving the counting
   into module scope is WRONG (leaks across pages/renders). Instead: keep
   `createHeading` as-is and accept the constraint the other direction —
   i.e. if implementing a render-scoped dedup is not achievable without
   restructuring MDX rendering, apply dedup ONLY in `lib/projects.ts` and
   make the suffixed TOC entries link to the first DOM occurrence, which is
   where the browser scrolls for duplicate ids anyway. In that case ALSO
   add a comment in `getProjectToc` noting the limitation.
   Decision rule: attempt a render-scoped solution only if it fits in
   `useMDXComponents` (which is called per-MDX-render — a `usedIds` map
   created inside `useMDXComponents()` and closed over by the heading
   components IS render-scoped and correct). That is the preferred fix:

```ts
export function useMDXComponents(): MDXComponents {
  const usedIds = new Map<string, number>();
  // pass usedIds into createHeading(level, usedIds) and suffix inside
  ...
}
```

**Verify**: `npm run check` → exit 0. With `npm run dev`, open a project
page with a duplicated heading if one exists (`rg -c "^## " content/projects/*.mdx`
and eyeball duplicates); if none exists in real content, temporarily
duplicate a heading in a local-only edit to confirm the suffix appears in
the sidebar TOC and the DOM id, then revert the content change.

### Step C: Exhaustive default in the clip-path reducer

Add to the switch, per the workspace convention:

```ts
default: {
  const _exhaustive: never = action;
  return state;
}
```

(If ESLint flags the unused variable, use `void (action satisfies never)`
in the default instead — whichever passes both typecheck and lint.)

**Verify**: `npm run check` → exit 0. The clip-path editor on
`/posts/clip-path-curve` still drags/presets correctly (quick manual check).

### Step D: Drive the carousel progress meter without per-frame setState

1. Locate the `autoplayProgress` state declaration and its consumer in
   `components/ui/carousel.tsx` (a meter/progress element in the toolbar).
2. Replace the state with a ref to the meter's DOM element (or its wrapper)
   plus a CSS custom property: inside `tick`, write
   `el.style.setProperty("--autoplay-progress", String(progress))` instead
   of `setAutoplayProgress(progress)`.
3. Update the consumer to render from the CSS variable (e.g. a width or
   `transform: scaleX(calc(var(--autoplay-progress, 0) / 100))` on the
   meter's fill element). Match how the meter is currently styled — if it
   uses a Base UI `Meter` with a `value` prop, replace it with a simple
   styled div driven by the variable, keeping `role="progressbar"` +
   `aria-hidden` semantics equivalent to what exists.
4. Reset the variable to 0 on `autoplay:stop`/pause so the meter doesn't
   freeze mid-fill.

**Verify**: `npm run check` → exit 0. On a page with an autoplaying carousel
(e.g. `/oklch-colors` project carousel or `/private/testing/carousel` in
dev), the progress meter animates while playing, resets on pause, and React
DevTools' highlight-updates shows the carousel no longer re-rendering every
frame.

### Final: full build

**Verify**: `npm run build` → exit 0.

## Test plan

No unit test runner by policy. Per-fix verification is inline above; the
named regressions: (A) valid dates still format identically on `/posts/*`
headers; (B) single-occurrence heading ids are unchanged (no gratuitous
suffixes); (C) all editor actions still work; (D) meter animates and the
play/pause toggle still works.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n "getUTCMonth" lib/parse-post-date.ts` → ≥1 match
- [ ] `rg -n "never" components/demos/clip-path-editor/state.ts` → ≥1 match
- [ ] `rg -n "setAutoplayProgress" components/ui/carousel.tsx` → no matches inside the rAF tick
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- (B) the render-scoped `usedIds` approach conflicts with how `@next/mdx`
  invokes `useMDXComponents` (e.g. it's called once per module, not per
  render) — fall back to the `lib/projects.ts`-only dedup described in
  Step B and say so in the report; if even that mismatches the DOM behavior,
  stop.
- (D) the progress meter is consumed somewhere that genuinely needs React
  state (e.g. announced value for a11y that must re-render) — report the
  consumer instead of forcing the CSS approach.
- Any excerpt no longer matches the live code (drift) — skip that lettered
  fix, do the rest, and report.

## Maintenance notes

- (A) If ISO datetimes are ever adopted in frontmatter, revisit the ISO
  branch's local-time parsing (known latent issue, deliberately unplanned).
- (B) New heading-rendering surfaces must reuse the same dedup rule or
  anchors will desync again.
- (D) If a future design needs the progress value in React (e.g. numeric
  display), lift it back to state at a throttled cadence, not per frame.
- Reviewer: each lettered fix should be a small, isolated diff; flag any
  fix that grew beyond ~30 lines.
