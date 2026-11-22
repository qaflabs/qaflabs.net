# 02: Navbar, mobile menu, footer

**What to build:** A visitor can move around the page from the top bar and the footer. On desktop the navbar sits full width and transparent, then shrinks to a compact pill after 40px of scroll. On a phone a labelled Menu button opens a full-screen menu. The footer gives the large logo, the email, three section links and the year.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Aceternity Resizable Navbar: logo (on-dark logo file, 24px tall), four anchors (Capabilities, Approach, Principles, Contact), Start a conversation button (`mailto:` from config)
- [ ] After 40px of scroll: 880px pill, ink at 72%, hairline border, shadow; Magic UI Progressive Blur under it only after scroll
- [ ] `@tabler/icons-react` import removed from the installed navbar; no undeclared dependency left
- [ ] Below 860px: Menu button (text label) opens a full-screen React Bits Staggered Menu
- [ ] Menu keeps focus inside, closes on Escape, returns focus to the Menu button, and resets to closed when the page is hidden by Activity
- [ ] Footer: large on-dark logo, email link, links to Capabilities, Approach and Principles, `© 2026 Qaf Labs`, low vermilion glow at the bottom edge
- [ ] Every link lands on a section that exists; tap targets at least 44px
- [ ] Reduced motion: menu opens without staggered movement
- [ ] Tests: each anchor scrolls to its section; menu open, focus trap, Escape, focus return; Start a conversation href matches config; axe clean at both widths
- [ ] Screenshots at 1440 and 390 next to the hero references; Delivery Gate reported

## Comments

- 2026-11-22: Implemented. Navbar pill, Staggered Menu (controlled, focus trap, Escape, inert when closed, reduced motion), footer. 29 tests pass. Library edits listed in each file header (ADR 0002).
