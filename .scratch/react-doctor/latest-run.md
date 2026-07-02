# React Doctor Latest Run

- Checked commit: `f41eb75431d3`
- Checked at: 2026-07-02T16:26:55-07:00
- Command: `env npm_config_cache=/private/tmp/codex-npm-cache /Users/robertweisbecker/.nvm/versions/node/v24.9.0/bin/npx react-doctor@latest --verbose`
- Exit code: 0
- Score: 56/100
- Total diagnostics: 590
- Error count: 0
- Warning count: 590
- Share: https://react.doctor/share?p=bob-fyi&s=56&w=590&f=109

## Next Actionable Items

No major issues found. The previous top 20 warnings were addressed; listing the current top 20 remaining warnings in React Doctor priority order.

1. `react-doctor/exhaustive-deps` - Missing effect dependencies
   [app/private/testing/direction-e/page.private.tsx:188](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/app/private/testing/direction-e/page.private.tsx:188)
   Docs: https://react.doctor/docs/rules/react-doctor/exhaustive-deps
   Action: read the effect callback first, then add stable dependencies or move recreated values inside the hook.

2. `react-doctor/exhaustive-deps` - Missing effect dependencies
   [components/animation/dvd-animation.tsx:413](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/dvd-animation.tsx:413)
   Docs: https://react.doctor/docs/rules/react-doctor/exhaustive-deps
   Action: read the effect callback first, then add stable dependencies or move recreated values inside the hook.

3. `react-doctor/exhaustive-deps` - Missing effect dependencies
   [components/animation/pixel-dino.tsx:34](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/pixel-dino.tsx:34)
   Docs: https://react.doctor/docs/rules/react-doctor/exhaustive-deps
   Action: read the effect callback first, then add stable dependencies or move recreated values inside the hook.

4. `react-doctor/exhaustive-deps` - Missing effect dependencies
   [hooks/use-copy-to-clipboard.ts:55](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/hooks/use-copy-to-clipboard.ts:55)
   Docs: https://react.doctor/docs/rules/react-doctor/exhaustive-deps
   Action: read the effect callback first, then add stable dependencies or move recreated values inside the hook.

5. `react-doctor/no-array-index-as-key` - Array index used as a key
   [components/animation/MotionText.tsx:185](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:185)
   Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
   Action: use a stable segment id instead of the array index when the list can reorder or filter.

6. `react-doctor/no-array-index-as-key` - Array index used as a key
   [components/animation/MotionText.tsx:329](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:329)
   Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
   Action: use a stable segment id instead of the array index when the list can reorder or filter.

7. `react-doctor/no-array-index-as-key` - Array index used as a key
   [components/animation/MotionText.tsx:393](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:393)
   Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
   Action: use a stable segment id instead of the array index when the list can reorder or filter.

8. `react-doctor/no-array-index-as-key` - Array index used as a key
   [components/demos/color-slider.tsx:57](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/demos/color-slider.tsx:57)
   Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
   Action: use a stable item id instead of the array index when the list can reorder or filter.

9. `react-doctor/no-array-index-as-key` - Array index used as a key
   [components/morph-icon.tsx:49](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/morph-icon.tsx:49)
   Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
   Action: use a stable item id instead of the array index when the list can reorder or filter.

10. `react-doctor/no-array-index-as-key` - Array index used as a key
    [components/ui/carousel.tsx:443](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:443)
    Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
    Action: use a stable item id instead of the array index when the list can reorder or filter.

11. `react-doctor/no-array-index-as-key` - Array index used as a key
    [components/ui/field.tsx:208](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/field.tsx:208)
    Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
    Action: use a stable item id instead of the array index when the list can reorder or filter.

12. `react-doctor/no-array-index-as-key` - Array index used as a key
    [components/ui/slider.tsx:69](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/slider.tsx:69)
    Docs: https://react.doctor/docs/rules/react-doctor/no-array-index-as-key
    Action: use a stable item id instead of the array index when the list can reorder or filter.

13. `react-doctor/no-derived-useState` - Prop derived into useState
    [components/animation/MotionText.tsx:432](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:432)
    Docs: https://react.doctor/docs/rules/react-doctor/no-derived-useState
    Action: compute from props during render so `children` changes cannot leave stale copied state.

14. `react-doctor/no-fetch-in-effect` - Data fetching inside an effect
    [components/demos/letterboxd.tsx:37](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/demos/letterboxd.tsx:37)
    Docs: https://react.doctor/docs/rules/react-doctor/no-fetch-in-effect
    Action: move the fetch into a server/data-fetching layer or a hook that handles races and cleanup explicitly.

15. `react-doctor/prefer-use-effect-event` - Effect re-subscribes on a changing callback
    [components/animation/dvd-animation.tsx:325](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/dvd-animation.tsx:325)
    Docs: https://react.doctor/docs/rules/react-doctor/prefer-use-effect-event
    Action: use `useEffectEvent` for the callback used inside the subscription or animation loop.

16. `react-doctor/prefer-use-effect-event` - Effect re-subscribes on a changing callback
    [components/ui/carousel.tsx:217](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:217)
    Docs: https://react.doctor/docs/rules/react-doctor/prefer-use-effect-event
    Action: use `useEffectEvent` for the callback used inside the subscription or animation loop.

17. `react-doctor/prefer-use-effect-event` - Effect re-subscribes on a changing callback
    [components/ui/carousel.tsx:232](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:232)
    Docs: https://react.doctor/docs/rules/react-doctor/prefer-use-effect-event
    Action: use `useEffectEvent` for the callback used inside the subscription or animation loop.

18. `react-doctor/no-prop-callback-in-effect` - Parent kept in sync with a callback effect
    [components/animation/MotionText.tsx:307](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/MotionText.tsx:307)
    Docs: https://react.doctor/docs/rules/react-doctor/no-prop-callback-in-effect
    Action: move the shared state into a common owner or provider instead of syncing the parent from an effect.

19. `react-doctor/no-prop-callback-in-effect` - Parent kept in sync with a callback effect
    [components/animation/dvd-animation.tsx:259](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/animation/dvd-animation.tsx:259)
    Docs: https://react.doctor/docs/rules/react-doctor/no-prop-callback-in-effect
    Action: move the shared state into a common owner or provider instead of syncing the parent from an effect.

20. `react-doctor/no-prop-callback-in-effect` - Parent kept in sync with a callback effect
    [components/ui/carousel.tsx:174](/Users/robertweisbecker/Desktop/robertweisbecker.github.io/components/ui/carousel.tsx:174)
    Docs: https://react.doctor/docs/rules/react-doctor/no-prop-callback-in-effect
    Action: move the shared state into a common owner or provider instead of syncing the parent from an effect.

## Diagnostic Counts

- Bugs: 45 warnings
- Accessibility: 22 warnings
- Performance: 100 warnings
- Maintainability: 423 warnings
