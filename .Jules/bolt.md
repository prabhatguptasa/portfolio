## 2025-05-15 - Component Extraction for Re-render Isolation
**Learning:** Digital clocks with 1Hz updates cause the entire parent component to re-render every second. In components with complex Framer Motion logic or large trees (like a Navigation bar), this leads to unnecessary main-thread work.
**Action:** Extract high-frequency state updates (like clocks or timers) into their own leaf components to isolate re-renders and improve overall UI performance.
