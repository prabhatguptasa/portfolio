## 2024-05-23 - Initial
**Learning:** Accessibility review identified missing ARIA labels and focus outlines for icon-only links.
**Action:** Add aria labels and focus-visible styling to icon-only links across application components.

## 2025-01-24 - Accessibility: Skip to Content
**Learning:** Keyboard-only users face high friction when forced to navigate through a dense global navigation bar on every page load.
**Action:** Implement a visually-hidden "Skip to Content" link as the first focusable element in the application to jump directly to main content.

## 2025-05-15 - Semantic Interactive Elements
**Learning:** Non-semantic scroll indicators (e.g., using a `div` for a scroll-down arrow) are invisible to screen readers and inaccessible via keyboard. This breaks the user flow for accessibility-reliant users.
**Action:** Always use `<button>` for interactive UI elements that trigger actions like scrolling. Add descriptive `aria-label` and ensure `focus-visible` styles are consistent with the design system.
