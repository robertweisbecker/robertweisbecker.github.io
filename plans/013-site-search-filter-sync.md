# Plan 013: Make the site-search filter toggle group controlled

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat 9ed1acd..HEAD -- components/site-search.tsx components/ui/toggle-group.tsx`
> If either file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `9ed1acd`, 2026-07-02

## Why this matters

The command-palette search (`⌘/`) has a filter bar (All / Projects / Posts /
Private-in-dev). The filter results are driven by React state `activeTab`,
which is reset to `"All"` when the dialog closes — but the visual selection
lives in an **uncontrolled** Base UI `ToggleGroup` (`defaultValue={["All"]}`)
that only hears about clicks. Filter to "Posts", close, reopen, open the
filter bar: results show all groups while the toggle can still show "Posts"
pressed. The animated active-tab indicator reads `activeTab` and disagrees
with the pressed state too. Making the group controlled from `activeTab`
fixes the desync with a few lines.

## Current state

- `components/site-search.tsx` — the site search command dialog (production
  header surface). Relevant pieces:
  - Line 69: `type FilterTab = "All" | "Projects" | "Posts" | "Private";`
  - Line 71: `FILTER_TABS` array of `{ value, icon? }`.
  - Line 224: `const [activeTab, setActiveTab] = useState<FilterTab>("All");`
  - Lines 288–291: dialog `onOpenChange` resets state on close:
    `if (!next) setActiveTab("All");`
  - Lines 367–388: the filter UI (inside an `AnimatePresence` that mounts
    only while `showFilters` is true).
- `components/ui/toggle-group.tsx` — repo wrapper over Base UI ToggleGroup;
  accepts `value` and `onValueChange` (Base UI controlled API: `value` is an
  array; `onValueChange(groupValue, eventDetails)`).

Excerpt as of `9ed1acd`:

```tsx
// components/site-search.tsx:367-378
<Toolbar.Group render={<ToggleGroup spacing={1} size="xs" defaultValue={["All"]} />} id="site-search-filters">
  <Label htmlFor="site-search-filters" className="sr-only">
    Filter by:
  </Label>
  {FILTER_TABS.filter((tab) => isDev || tab.value !== "Private").map((tab) => (
    <Toolbar.Button
      key={`command-tab-${String(tab.value)}`}
      render={<ToggleGroupItem value={tab.value} className="bg-transparent! font-normal!" />}
      onClick={() => setActiveTab(tab.value)}
    >
```

Convention (AGENTS.md): prefer Base UI + existing design-system wrappers —
keep using the `ToggleGroup` wrapper, just switch it to controlled mode.

## Commands you will need

| Purpose    | Command         | Expected on success |
| ---------- | --------------- | ------------------- |
| Install    | `npm install`   | exit 0              |
| All checks | `npm run check` | exit 0              |
| Dev server | `npm run dev`   | serves on :3000     |

## Scope

**In scope** (the only files you should modify):

- `components/site-search.tsx`
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):

- `components/ui/toggle-group.tsx` — the wrapper already forwards Base UI
  props; if it turns out not to forward `value`/`onValueChange`, that is a
  STOP condition, not a license to refactor the wrapper.
- The `showFilters` open/close animation, the `filterActive` indicator dot,
  and the `layoutId` tab indicator — all should keep working as-is; they
  read `activeTab` and benefit automatically.
- Filtering logic (`groupedItems`, `fuzzyFilter`).

## Git workflow

- Branch: `cursor/013-search-filter-sync` from `master`.
- One commit, e.g. "Control site-search filter group from activeTab state".
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Switch the ToggleGroup to controlled

In `components/site-search.tsx` (line 367), replace
`defaultValue={["All"]}` with:

```tsx
<Toolbar.Group
  render={
    <ToggleGroup
      spacing={1}
      size="xs"
      value={[activeTab]}
      onValueChange={(value) => {
        const next = value[0] as FilterTab | undefined;
        setActiveTab(next ?? "All");
      }}
    />
  }
  id="site-search-filters"
>
```

Then remove the per-item `onClick={() => setActiveTab(tab.value)}` on the
`Toolbar.Button`s (line 375) — selection now flows through `onValueChange`.
The `next ?? "All"` branch handles Base UI's deselect-on-reclick (clicking
the pressed item yields an empty array), which previously left `activeTab`
stuck — treat deselect as "All".

If TypeScript complains about the `onValueChange` signature, check the
wrapper's prop types in `components/ui/toggle-group.tsx` and match Base UI's
actual signature (`(groupValue: any[], eventDetails) => void`) — do not cast
through `any`.

**Verify**: `npm run check` → exit 0.

### Step 2: Browser QA the full state matrix

With `npm run dev` running, open the site and press `⌘/`:

1. Open filters (funnel button), click "Posts" → only Posts group listed;
   "Posts" visually pressed; indicator dot appears when filters collapse.
2. Close the dialog (Esc), reopen, expand filters → "All" is pressed and all
   groups are listed (previously: stale "Posts" pressed).
3. Click the currently pressed tab ("All") → stays/returns on "All" (no
   empty-selection dead state).
4. Keyboard: arrow keys + Enter within the toolbar still toggle tabs
   (Toolbar + ToggleGroup composition).

**Verify**: all four behaviors as described; no console errors.

## Test plan

No unit test runner by policy. The Step 2 matrix is the regression test;
record the reopen case (state 2) as the specific bug this plan fixes.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `rg -n 'defaultValue=\{\["All"\]\}' components/site-search.tsx` → no matches
- [ ] `rg -n 'onClick=\{\(\) => setActiveTab' components/site-search.tsx` → no matches
- [ ] `npm run check` exits 0
- [ ] Browser QA matrix (Step 2) passes
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The `ToggleGroup` wrapper does not forward `value`/`onValueChange` to Base
  UI (fixing the wrapper affects every toggle group in the repo — out of
  scope).
- Controlled mode breaks the `Toolbar.Group`/`render` composition (Base UI
  render-prop plumbing) after one reasonable fix attempt.
- The `layoutId="filter-tab-indicator"` animation stops tracking the active
  tab after the change.

## Maintenance notes

- Any future filter tab added to `FILTER_TABS` now needs no wiring beyond
  the array entry — selection is fully driven by `activeTab`.
- Reviewer: confirm deselect-on-reclick lands on "All" rather than an empty
  selection, and that the dev-only "Private" tab still appears only in dev.
