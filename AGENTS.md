## Learned User Preferences

- Persist browser preview CSS/Tailwind adjustments back into the generator’s TSX (e.g., padding/breathing room).
- Prefer Base UI + existing design-system wrappers (e.g., `Switch`, `Autocomplete`, `FieldSet`) over native inputs in this codebase.
- When a “start corner” changes for clip-path curve generators, apply the full preset set of parameters (`from`, `destX/destY`, `ctrlX/ctrlY`) to avoid degenerate straight-line paths.

## Learned Workspace Facts

- The clip-path curve generator closes the `shape()` using `vline` then `hline` (based on the chosen start corner coords).
- `ToggleGrid` preserves intended toggle styling by extending `ToggleGroup` context with `grid?: boolean`.
- The generator’s “Show annotations” toggle controls only gridlines + axis label overlay, while the curve/handles/start marker remain visible.
