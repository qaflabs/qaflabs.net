# 14: Polish and audit

**What to build:** The finished page matches the reference at 1440 and 390, moves with the reference's timings, and passes every measured and manual check. The owner gets a final report backed by evidence.

**Blocked by:** 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13

**Status:** ready-for-agent

- [ ] Timings tuned against the reference page (intro, shine, beams, reveals, menu)
- [ ] Screenshot comparison of every section at 1440 and 390 against `docs/design/landing/screenshots/`, with every visible difference listed
- [ ] Colour sampling: only ink, paper, vermilion and their alphas (white only inside supplied brand files and the light's core)
- [ ] Lighthouse mobile and desktop, median of 3 local production runs; targets: mobile Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100, LCP under 2.5s, CLS under 0.05; measured numbers only
- [ ] axe clean at both widths; keyboard-only pass; reduced-motion pass; 200% zoom pass
- [ ] TypeScript strict, lint and console clean
- [ ] Final report: scores table (measured only), one-line click-through of every interactive element, each installed component with its section and what changed, every installed-file edit (ADR 0002), new dependencies and why, open items (copy approval, contact inbox, tools list)
- [ ] antislop Delivery Gate passes in full with evidence

## Comments

- 2026-11-23: Audit done. 147 Playwright tests pass at 1440 and 390 (axe page-wide, keyboard focus ring on every control, 44px tap targets, 200% zoom at 720px, brand-hue sampling of the full page, no console errors on load, reduced-motion load and click-through). Lighthouse, local production build, median of 3: mobile Performance 94 / Accessibility 100 / Best Practices 100 / SEO 100, LCP 3.08s, CLS 0, TBT 48ms; desktop 100/100/100/100, LCP 0.65s, CLS 0. Mobile LCP misses the 2.5s target: observed LCP is the h1 at ~125ms, but the simulated mobile run counts the ~240KB of framework and navbar JS requested before it. Lazy-loading the below-fold sections did not move it and was reverted. Both code-review axes ran; findings fixed in 4e24b46. Not done: pixel-diff screenshot tests against the reference (screenshots compared by eye instead).
