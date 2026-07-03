# Plan 022: Reduce React Doctor export-surface warnings

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 61bf9081..HEAD -- AGENTS.md .scratch/react-doctor/latest-run.md components/animation/MotionText.tsx components/animation/shared.tsx components/animation/dot-matrix.tsx components/demos/pixel-icons-post-hero.tsx components/chrome-tabs.tsx app/private/qa/page.private.tsx components/playground/verisimilitude/chrome-tabs-demo.tsx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, re-baseline React Doctor first and adjust the target counts.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: dx / tech-debt
- **Planned at**: commit `61bf9081`, 2026-07-02

## Why this matters

React Doctor currently reports a warning-only run with a score of 58/100 and
480 diagnostics. The largest actionable group is export-surface hygiene:
`deslop/unused-export` reports 198 warnings in the full stdout and
`react-doctor/only-export-components` reports 152 warnings in the tracked
summary. This is mostly Fast Refresh, module-boundary, and maintainability
work rather than a direct runtime performance fix. It still matters because
mixed component/data export files make edits slower to reason about and keep
React Doctor from surfacing the next tier of more meaningful issues.

This is the first targeted React Doctor batch. It deliberately avoids deleting
custom icons or Dot-Matrix work. `components/icons-pixel.tsx` remains owned by
[plan 018](./018-mdx-registry-splitting.md), because that plan already handles
pixel-icon module splitting and the maintainer explicitly said not to remove
icons.

## Current state

Tracked React Doctor summary:

- `AGENTS.md` React Doctor tracking: score 58/100 at commit `61bf9081a243`,
  checked `2026-07-02T20:36:12-0700`.
- `.scratch/react-doctor/latest-run.md`: 480 warnings, 0 errors.
- Full captured stdout at `/private/tmp/react-doctor.stdout` additionally
  lists `deslop/unused-file ×34` and `deslop/unused-export ×198`.

Representative problem files:

```tsx
// components/animation/MotionText.tsx:612-623
export function TextReveal(props: MotionTextRevealProps) {
  return <MotionTextReveal {...props} />;
}

export const MotionText = {
  Reveal: MotionTextReveal,
  Effect: MotionTextEffect,
  Loop: MotionTextLoop,
  Scramble: MotionTextScramble,
  Wave: MotionTextWave,
  Morph: MotionTextMorph,
};
```

`MotionText.tsx` is a client component module that exports both the component
implementations and a namespace object. React Doctor flags the namespace export
as `only-export-components`; deslop also reports several individually exported
component names as unused.

```ts
// components/animation/shared.tsx
export {
  MotionText,
  MotionTextEffect,
  MotionTextLoop,
  MotionTextMorph,
  MotionTextReveal,
  MotionTextScramble,
  MotionTextWave,
  TextReveal,
} from "./MotionText";
```

The shared animation barrel currently re-exports the namespace from the same
component implementation file, preserving the mixed export surface.

```tsx
// components/animation/dot-matrix.tsx:152+
export const digits: Frame[] = [...]
export const chevronLeft: Frame = [...]
export const chevronRight: Frame = [...]
export const loader: Frame[] = ...
export const pulse: Frame[] = ...
export function vu(columns: number, levels: number[]): Frame { ... }
export const wave: Frame[] = ...
export const snake: Frame[] = ...
export const DotMatrix: DotMatrixComponent = ...
```

`dot-matrix.tsx` is also a client component module that exports frame data,
frame generators, and the component. The only live external component import is
`components/demos/pixel-icons-post-hero.tsx`, which imports `DotMatrix` and
`type Frame` from this file. Do not remove Dot-Matrix; split its data helpers
instead.

```tsx
// components/chrome-tabs.tsx
function ChromeTabsRoot(...) { ... }
function ChromeTabsList(...) { ... }
function ChromeTabsTab(...) { ... }
function ChromeTabsPanel(...) { ... }

export const ChromeTabs = Object.assign(ChromeTabsRoot, {
  List: ChromeTabsList,
  Tab: ChromeTabsTab,
  Panel: ChromeTabsPanel,
});
```

`components/chrome-tabs.tsx` is only 71 lines, but it is React Doctor's top
`no-multi-comp` representative. Its consumers are
`app/private/qa/page.private.tsx` and
`components/playground/verisimilitude/chrome-tabs-demo.tsx`.

Out of scope for this plan:

- `components/icons-pixel.tsx` (1,090 lines; many warnings). Keep it for
  [plan 018](./018-mdx-registry-splitting.md).
- Broad `deslop/unused-file` cleanup. Some files are private QA/prototype
  surfaces or intentionally preserved experiments.
- Deleting commented-out experimental code or custom SVG/icon components.
- React Doctor rules unrelated to export/multi-component hygiene.

## Commands you will need

| Purpose                | Command                                                                                                                                                                                                                                | Expected on success                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Baseline Doctor        | `env PATH=/Users/robertweisbecker/.nvm/versions/node/v24.9.0/bin:/usr/bin:/bin:/usr/sbin:/sbin npm_config_cache=/private/tmp/codex-npm-cache /Users/robertweisbecker/.nvm/versions/node/v24.9.0/bin/npx react-doctor@latest --verbose` | exit 0; capture score and target rule counts |
| All checks             | `npm run check`                                                                                                                                                                                                                        | exit 0                                       |
| Prod build             | `npm run build`                                                                                                                                                                                                                        | exit 0                                       |
| Final React Doctor     | same React Doctor command                                                                                                                                                                                                              | exit 0; score or target rule counts improve  |
| Plan/status validation | `git diff --check`                                                                                                                                                                                                                     | exit 0                                       |

## Scope

**In scope** (the only files you should modify or create):

- `components/animation/MotionText.tsx`
- `components/animation/motion-text-namespace.ts` (create, or `.tsx` if JSX is
  needed)
- `components/animation/shared.tsx`
- `components/index-list.tsx`
- `app/private/qa/component-demos.tsx`
- `components/playground/motion/motion-text-playground-demo.tsx`
- `components/animation/dot-matrix.tsx`
- `components/animation/dot-matrix-frames.ts` (create)
- `components/demos/pixel-icons-post-hero.tsx`
- `components/chrome-tabs/` (create: `index.tsx`, `root.tsx`, `list.tsx`,
  `tab.tsx`, `panel.tsx`)
- `components/chrome-tabs.tsx` (delete only after the directory import path is
  verified by TypeScript)
- `app/private/qa/page.private.tsx`
- `components/playground/verisimilitude/chrome-tabs-demo.tsx`
- `.scratch/react-doctor/latest-run.md`
- `AGENTS.md` React Doctor tracking section
- `plans/README.md`

**Out of scope** (do NOT touch, even though React Doctor may mention them):

- `components/icons-pixel.tsx` and custom SVG/icon exports — [plan 018](./018-mdx-registry-splitting.md) owns that split.
- `app/page.tsx` giant-component work — [plan 017](./017-server-client-boundaries.md) owns the homepage boundary split.
- `components/animation/MotionText.tsx` behavioral warnings such as
  index-keys, render-in-render, derived state, and parent-callback effects.
  They are valid future work but not part of this export-surface pass.
- Private direction prototype pages under `app/private/testing/**`.
- Any package dependency changes.

## Steps

### Step 1: Re-baseline the target rules

Run the React Doctor command from `AGENTS.md` before editing. Save the score,
total warnings, and these rule counts:

- `deslop/unused-export`
- `react-doctor/only-export-components`
- `react-doctor/no-multi-comp`

Use `/private/tmp/react-doctor.stdout` for the full rule list and
`.scratch/react-doctor/latest-run.md` for the tracked top-10 summary. If the
baseline no longer matches the current-state numbers, continue with the live
baseline but update this plan in the final note.

**Verify**: the command exits 0 and the target counts are recorded in your task
notes.

### Step 2: Move the `MotionText` namespace out of the component file

1. Keep the individual component exports in `MotionText.tsx`.
2. Move only the namespace object to `components/animation/motion-text-namespace.ts`.
   It should import `MotionTextReveal`, `MotionTextEffect`,
   `MotionTextLoop`, `MotionTextScramble`, `MotionTextWave`, and
   `MotionTextMorph`, then export `MotionText`.
3. Update `components/animation/shared.tsx` to export `MotionText` from the
   namespace file and the individual components from `MotionText.tsx`.
4. Update direct `MotionText` namespace imports to the shared/namespace module
   as needed. Known current imports:
   `components/index-list.tsx`,
   `app/private/qa/component-demos.tsx`, and
   `components/playground/motion/motion-text-playground-demo.tsx`.

**Verify**:

```bash
rg -n "export const MotionText" components/animation/MotionText.tsx
rg -n 'MotionText"|"./animation/MotionText"' components app
```

Expected: no namespace export remains in `MotionText.tsx`; no stale direct
namespace import points at the implementation file.

### Step 3: Split Dot-Matrix frame data from the component module

1. Create `components/animation/dot-matrix-frames.ts`.
2. Move `Frame`, `digits`, `chevronLeft`, `chevronRight`, `loader`, `pulse`,
   `vu`, `wave`, `snake`, and private helper functions they need into it.
3. Import `type Frame` and any needed presets/generators back into
   `dot-matrix.tsx`.
4. Update `components/demos/pixel-icons-post-hero.tsx` so `DotMatrix` comes
   from `dot-matrix` and `type Frame` comes from `dot-matrix-frames`.
5. Preserve and update any Dot-Matrix comments/examples. Do not remove the
   component or frame presets.

If React Doctor still reports `deslop/unused-export` for exported frame
presets after this split, do not delete them in this plan. The intended win is
separating data/helpers from the component module for Fast Refresh. A later
API-pruning pass can decide whether public frame preset exports should become
internal.

**Verify**:

```bash
rg -n "export const digits|export const chevron|export const loader|export const pulse|export function vu|export const wave|export const snake" components/animation/dot-matrix.tsx
rg -n "from \"@/components/animation/dot-matrix\"" components app
```

Expected: frame exports are gone from `dot-matrix.tsx`; component imports still
resolve intentionally.

### Step 4: Split ChromeTabs into small implementation files

1. Create `components/chrome-tabs/` with `root.tsx`, `list.tsx`, `tab.tsx`,
   `panel.tsx`, and `index.tsx`.
2. Move each ChromeTabs primitive into its own file.
3. Rebuild the same public `ChromeTabs` compound object in `index.tsx`.
4. Delete `components/chrome-tabs.tsx` only after `npm run typecheck` proves
   imports resolve through the directory index.
5. Keep the consumer import path stable unless TypeScript cannot resolve the
   file-to-directory change. Known consumers:
   `app/private/qa/page.private.tsx` and
   `components/playground/verisimilitude/chrome-tabs-demo.tsx`.

**Verify**:

```bash
npm run typecheck
rg -n "from \"@/components/chrome-tabs\"" app components
```

Expected: typecheck passes and consumers still import from the stable path.

### Step 5: Run full verification

Run:

```bash
npm run check
npm run build
```

Then rerun the React Doctor command from `AGENTS.md`.

**Verify**:

- `npm run check` exits 0.
- `npm run build` exits 0.
- React Doctor exits 0.
- At least one of these is true:
  - score is higher than 58/100,
  - `react-doctor/only-export-components` count is lower than 152,
  - `react-doctor/no-multi-comp` count is lower than 13.

If the source checks pass but React Doctor score does not move, report the
rule-count deltas explicitly. If none of the target counts improve, STOP and
do not mark the plan done.

### Step 6: Update tracking docs

Update `.scratch/react-doctor/latest-run.md` and the React Doctor section in
`AGENTS.md` exactly per the repo policy. For a warning-only run, list the top
10 warning rule groups by count. Keep the explicit absolute `PATH` in the
React Doctor command.

Update `plans/README.md` status for this plan.

## Done criteria

- [ ] `MotionText.tsx` no longer exports the namespace object.
- [ ] Dot-Matrix frame data/helpers are split out of `dot-matrix.tsx`.
- [ ] `ChromeTabs` primitives live in separate implementation files while the
      compound import remains stable for existing consumers.
- [ ] `npm run check` exits 0.
- [ ] `npm run build` exits 0.
- [ ] React Doctor exits 0 and improves either score or target rule counts.
- [ ] `.scratch/react-doctor/latest-run.md` and `AGENTS.md` reflect the latest
      React Doctor run.
- [ ] `plans/README.md` status row is updated.

## STOP conditions

- React Doctor baseline has severity `error` diagnostics. Follow the AGENTS
  policy and address/list major issues before continuing this warning plan.
- TypeScript cannot resolve the `components/chrome-tabs` directory import after
  deleting `components/chrome-tabs.tsx`. Restore the stable import path and
  report the resolver issue.
- Any requested change requires deleting Dot-Matrix, custom icons, or commented
  experimental code.
- Any React Doctor target count fails to improve after the code changes.

## Notes for the final report

Include:

- baseline and final React Doctor score/count deltas,
- whether the score moved or only rule counts moved,
- any target warnings intentionally left for [plan 018](./018-mdx-registry-splitting.md),
- `npm run check` and `npm run build` results.
