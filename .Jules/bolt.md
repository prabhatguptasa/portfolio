## 2025-05-15 - Component Extraction for Re-render Isolation
**Learning:** Digital clocks with 1Hz updates cause the entire parent component to re-render every second. In components with complex Framer Motion logic or large trees (like a Navigation bar), this leads to unnecessary main-thread work.
**Action:** Extract high-frequency state updates (like clocks or timers) into their own leaf components to isolate re-renders and improve overall UI performance.

## 2025-05-16 - Scroll State Isolation for Tree Performance
**Learning:** Attaching a window scroll listener to the root component (`App.jsx`) to track active sections causes the entire application tree—including expensive Framer Motion sections—to re-render on every scroll event.
**Action:** Move scroll-tracking logic and its associated state into the specific leaf component that needs it (e.g., `Navigation`). This encapsulates re-renders and keeps the heavy content components static during scroll.
