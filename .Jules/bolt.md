## 2025-05-15 - Component Extraction for Re-render Isolation
**Learning:** Digital clocks with 1Hz updates cause the entire parent component to re-render every second. In components with complex Framer Motion logic or large trees (like a Navigation bar), this leads to unnecessary main-thread work.
**Action:** Extract high-frequency state updates (like clocks or timers) into their own leaf components to isolate re-renders and improve overall UI performance.

## 2025-05-15 - Scroll State Isolation for Global Navigation
**Learning:** Tracking active sections during scroll at the root level (`App.jsx`) causes the entire application to re-render on every section change. While `framer-motion` handles some optimizations, frequent React reconciliations for the full tree (Hero, About, Experience) can introduce jank.
**Action:** Create a dedicated `ScrollManagedNavigation` wrapper to localize scroll-listening state. This ensures section transitions only trigger re-renders in the navigation UI, leaving the main content sections stable.
