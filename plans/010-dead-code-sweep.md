# Plan 010: Remove dead files and extract homepage experiments

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- components/animations.tsx components/animation/ components/icons.tsx lib/data/cv.ts lib/data/pages.ts hooks/use-mouse.js components/ui/message-scroller.tsx types/balloons-js.d.ts app/page.tsx components/demos/letterboxd.tsx package.json`
> If any in-scope file changed since this plan was written, re-verify the
> "zero importers" claims below (Step 1 does this anyway); on a mismatch in
> the excerpts, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none (recommended after [009](./009-ci-deploy-gate.md) so CI gates it)
- **Category**: tech-debt
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

The repo carries several hundred lines of code with zero import sites, including a
verbatim duplicate of a live module (`components/animations.tsx` duplicates
`components/animation/shared.tsx` — the next animation edit will drift them),
a broken hook that escapes typecheck (`hooks/use-mouse.js` uses `React`
without importing it and isn't in the TS graph), and two runtime dependencies
(`balloons-js`, `@shadcn/react`) whose only consumers are themselves dead.
Removing the genuinely dead pieces shrinks install size and kills drift traps.
The homepage also contains active experiments and inline SVG assets; this plan
preserves those by promoting them into proper modules instead of deleting them.
That clears the ground for the homepage refactor in [plan 017](./017-server-client-boundaries.md)
without losing scratch work.

## Current state

Every item below was verified to have **zero external importers** at commit
`9ed1acd` (Step 1 re-verifies before deleting):

| Target | What it is |
| ------ | ---------- |
| `components/animations.tsx` (173 lines) | Near-verbatim copy of `components/animation/shared.tsx` (only diffs: a relative import path and a comment). All live imports use `@/components/animation/shared`. |
| `lib/data/cv.ts` (87 lines) | Unused `jobs`/`education` registry; content also drifted from the live CV on the homepage. |
| `lib/data/pages.ts` (12 lines) | Unused `pageData` object. |
| `components/animation/balloons-button.tsx` (24 lines) | `BalloonsButton`; sole consumer of `balloons-js`. |
| `types/balloons-js.d.ts` | Ambient module shim for `balloons-js`. |
| `hooks/use-mouse.js` (49 lines) | Plain-JS hook using `React.*` with no React import (would throw `ReferenceError` if ever used); only reference is a commented-out block in `app/page.tsx:546-581`. |
| `components/ui/message-scroller.tsx` (~105 lines) | Wrapper over `@shadcn/react/message-scroller`; sole consumer of the `@shadcn/react` runtime dep. |
| `GlitchFilter` export in `components/animation/shared.tsx` (line ~152) | Exported, zero import sites. Delete the export (and its implementation if nothing internal uses it). |
| `app/page.tsx` active experiments and inline SVGs | The commented `AxisCursor` block is active scratch work; do **not** delete it. Copy its behavior into a new `components/animation/axis-cursor.tsx` component. The homepage-local SVG components (`GoogleIcon`, `MetaIcon`, `KrogerIcon`, `TruistIcon`, `BeyondMeatIcon`, `LetterboxdLogo`) should move to `components/icons.tsx` and be imported where used. Preserve commented-out JSX blocks. |
| `components/demos/letterboxd.tsx` local `LetterboxdLogo` | Duplicate custom SVG asset kept for a paused header treatment. Move the SVG to `components/icons.tsx`, import it here, and preserve the commented header-treatment block. |

Dependencies to remove from `package.json` once their consumers are gone:

- `"balloons-js": "^0.0.3"` (dependencies)
- `"@shadcn/react": "^0.2.0"` (dependencies) — do NOT touch the separate
  `shadcn` CLI in devDependencies.

Repo conventions that apply:

- AGENTS.md refactoring notes: "Do not spend time preserving old barrel
  exports or backwards-compatible aliases." Deletion without shims is the
  intended style.
- AGENTS.md: unused-asset cleanups here have precedent (2026-07 cleanup);
  git history is the backup — no need to move files aside.

## Commands you will need

| Purpose    | Command         | Expected on success       |
| ---------- | --------------- | ------------------------- |
| Install    | `npm install`   | exit 0, lockfile updated  |
| All checks | `npm run check` | exit 0                    |
| Prod build | `npm run build` | exit 0                    |

## Scope

**In scope** (the only files you should modify or delete):

- Delete: `components/animations.tsx`, `lib/data/cv.ts`, `lib/data/pages.ts`,
  `components/animation/balloons-button.tsx`, `types/balloons-js.d.ts`,
  `hooks/use-mouse.js`, `components/ui/message-scroller.tsx`
- Create: `components/animation/axis-cursor.tsx`
- Edit: `components/animation/shared.tsx` (remove `GlitchFilter` only),
  `components/icons.tsx` (add the homepage SVG icons),
  `app/page.tsx` (import moved SVG icons; preserve commented experiments),
  `components/demos/letterboxd.tsx` (import moved `LetterboxdLogo`; preserve
  the commented header-treatment block),
  `package.json` + `package-lock.json` (dependency removal)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `components/animation/shared.tsx` beyond the `GlitchFilter` removal — it is
  live (MDX `TextReveal`, homepage `PixelReveal`).
- Commented-out experimental JSX or scratch code in `app/page.tsx` and demos.
  The maintainer is actively using those comments while exploring.
- `components/animation/MotionText.tsx`, `pixel-dino.tsx`,
  `pixel-portrait.tsx`, `float.tsx` — all live.
- `components/animation/dot-matrix.tsx` — `DotMatrix` is now live/intentional;
  do not remove it even if an importer scan looks empty in a stale worktree.
- `shadcn` (devDependency CLI), `dither-plugin` (imported by
  `styles/globals.css:4` — its usage is uncertain but it is NOT part of this
  plan), `cambio`, `match-sorter`, `media-chrome` — all have live importers.
- The rest of `app/page.tsx` (sections, `ProjectLink`) — live code, and [plan 017](./017-server-client-boundaries.md)
  restructures it; don't pre-empt that here.
- `app/private/**` — dev-only playground; not dead code.

## Git workflow

- Branch: `cursor/010-dead-code-sweep` from `master`.
- Commit per logical group (duplicates+registries, animation modules+deps,
  homepage experiment/icon extraction), imperative messages, e.g. "Remove duplicate
  animations barrel and unused data registries".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Re-verify zero importers (protects against drift)

For each deletion target, confirm no live import sites:

```bash
rg -n 'components/animations"|from "@/lib/data/cv"|from "@/lib/data/pages"|balloons-button|balloons-js|message-scroller|use-mouse|GlitchFilter' \
  app components lib hooks content mdx-components.tsx --glob '!components/animations.tsx' --glob '!components/animation/balloons-button.tsx' --glob '!components/ui/message-scroller.tsx' --glob '!hooks/use-mouse.js'
```

Expected: matches only inside the files being deleted themselves, the
commented-out `AxisCursor` block in `app/page.tsx`, `types/balloons-js.d.ts`,
and `components/animation/shared.tsx`'s own `GlitchFilter` definition. Any
OTHER match is a STOP condition (something started using the "dead" code).

**Verify**: output matches the expectation above.

### Step 2: Delete the fully dead files

Delete: `components/animations.tsx`, `lib/data/cv.ts`, `lib/data/pages.ts`,
`components/animation/balloons-button.tsx`, `types/balloons-js.d.ts`,
`hooks/use-mouse.js`, `components/ui/message-scroller.tsx`.

**Verify**: `npm run check` → exit 0.

### Step 3: Promote active homepage experiments and SVGs

1. `components/animation/shared.tsx`: delete the `GlitchFilter` component
   and its export. If it references helpers used by nothing else, delete
   those too; if a helper is shared with live exports, leave the helper.
2. Create `components/animation/axis-cursor.tsx` with `"use client"`. Copy the
   behavior from the commented `AxisCursor` block in `app/page.tsx`, but do
   not import the broken `hooks/use-mouse.js`; track pointer coordinates
   locally in the component or with a small internal hook. Keep the visual
   behavior and class names as close to the scratch block as typecheck allows.
   Leave the commented scratch block in `app/page.tsx` intact unless the
   maintainer explicitly asks to delete it.
3. Move the homepage-local SVG components into `components/icons.tsx`:
   `GoogleIcon`, `MetaIcon`, `KrogerIcon`, `TruistIcon`, `BeyondMeatIcon`,
   and the custom `LetterboxdLogo`. Import them from `@/components/icons` in
   `app/page.tsx`.
4. Update `components/demos/letterboxd.tsx` to import the same
   `LetterboxdLogo` from `@/components/icons`. Preserve the comment and
   commented-out header-treatment JSX that reference it.

**Verify**: `npm run check` → exit 0.
`rg -n "function (GoogleIcon|MetaIcon|KrogerIcon|TruistIcon|BeyondMeatIcon|LetterboxdLogo)" app/page.tsx components/demos/letterboxd.tsx` → no matches.
`rg -n "export function (GoogleIcon|MetaIcon|KrogerIcon|TruistIcon|BeyondMeatIcon|LetterboxdLogo)" components/icons.tsx` → all six icons are exported.
`rg -n "function AxisCursor|export function AxisCursor" components/animation/axis-cursor.tsx` → one exported component.

### Step 4: Remove the stranded dependencies

Remove `balloons-js` and `@shadcn/react` from `package.json` dependencies,
then run `npm install` to update `package-lock.json`.

**Verify**: `npm ls balloons-js @shadcn/react` → both report `(empty)` /
not found. `npm run check` → exit 0.

### Step 5: Full build

**Verify**: `npm run build` → exit 0, static generation completes (49 pages
expected as of this plan; the count must not decrease).

## Test plan

No unit test runner by policy. Verification: Step 1's importer re-check, the
grep gates in Steps 3–4, `npm run check`, and `npm run build`. Optional
browser QA: `npm run dev`, load `/` and `/private/qa` — no console errors,
homepage renders all sections.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] All seven files listed in Step 2 no longer exist
- [ ] `components/animation/axis-cursor.tsx` exists and exports `AxisCursor`
- [ ] `components/icons.tsx` exports `GoogleIcon`, `MetaIcon`, `KrogerIcon`, `TruistIcon`, `BeyondMeatIcon`, and `LetterboxdLogo`
- [ ] No local homepage/demo icon definitions remain: `rg -n "function (GoogleIcon|MetaIcon|KrogerIcon|TruistIcon|BeyondMeatIcon|LetterboxdLogo)" app/page.tsx components/demos/letterboxd.tsx` returns no matches
- [ ] `rg -n "GlitchFilter|useMouse" app components hooks` returns no matches outside preserved comments
- [ ] `rg -n "balloons-js|@shadcn/react" package.json` returns no matches
- [ ] `npm run check` exits 0
- [ ] `npm run build` exits 0 with ≥49 static pages
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Step 1 finds a live import of any deletion target (code drifted; the
  target is no longer dead).
- Deleting `GlitchFilter` breaks `npm run check` because a live export in
  `shared.tsx` depends on shared internals — report which helper collides
  rather than restructuring the file.
- A requested change appears to require deleting commented-out experimental
  code. Stop and preserve the comments instead.
- `npm install` produces unrelated lockfile churn beyond removing the two
  packages and their unique transitive deps.
- Removing `@shadcn/react` breaks the `shadcn` CLI devDependency's
  resolution (it should not — they are unrelated packages).

## Maintenance notes

- [Plan 017](./017-server-client-boundaries.md) (homepage server/client split) assumes the
  homepage SVG icons and `AxisCursor` experiment have been moved out of
  `app/page.tsx`; land this plan first.
- `dither-plugin` (imported only by `styles/globals.css`) was deliberately
  left alone — investigating whether its utilities appear in built CSS is a
  separate, uncommitted question (see index "considered and rejected").
- Reviewer: this diff should be almost entirely deletions; scrutinize any
  added or modified line that isn't `package.json`/lockfile.
