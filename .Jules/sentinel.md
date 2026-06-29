## 2025-05-15 - PII Redaction in Documentation
**Vulnerability:** Personal email and phone number exposed in the project's README.md.
**Learning:** Developer portfolios often contain PII in README files for easy contact, but this exposes them to scrapers and potential privacy risks if the repository is public.
**Prevention:** Use placeholder tokens like `[REDACTED]` or point to secure, moderated communication channels (like LinkedIn) for initial contact in public-facing documentation.

## 2025-05-15 - Defense-in-depth via Security Headers
**Vulnerability:** Missing Content Security Policy (CSP) and Referrer Policy increases risk of Cross-Site Scripting (XSS) and accidental data leakage via referrers.
**Learning:** Even for static or simple React applications, security headers provide a critical layer of defense against modern web vulnerabilities.
**Prevention:** Implement strict CSP meta tags in `index.html` to whitelist trusted origins for scripts, styles, and fonts. Set a robust Referrer Policy (e.g., `strict-origin-when-cross-origin`) to protect user privacy.
