# 01: Foundation and test harness

**What to build:** A visitor opening `/` gets a dark Qaf Labs page shell: brand tokens, Geist type, film grain, a skip link, header/main/footer landmarks, and one stub per section (its real `id` and `h2` from the copy module), so every anchor already lands somewhere. Sharing the link shows the right title, description and logo card. A Playwright + axe harness runs against the production build at 1440 and 390 and is the test seam every later ticket adds to.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] shadcn is initialised; its neutral token set and `.dark` variant are replaced by the brand tokens (`--ink`, `--ink-2`, `--card`, `--paper`, `--vermilion`, `--vermilion-soft`, `--muted`, `--line`, `--line-strong`) as CSS variables and Tailwind v4 `@theme` tokens, defined once
- [ ] `--font-sans` and `--font-mono` resolve to Geist and Geist Mono; the starter's Arial rule is gone
- [ ] `shadcn` is a devDependency; the unused starter button and `@base-ui/react` are removed; every added dependency is listed with its reason
- [ ] Film grain covers the page (SVG turbulence, opacity 0.06, overlay blend) and doesn't block clicks
- [ ] Base layer sets `cursor: pointer` on enabled controls, `cursor: not-allowed` on disabled ones, and a 2px vermilion focus-visible ring with offset
- [ ] Skip link is the first focusable element and moves focus to `main`
- [ ] `<html lang="en">`, one `h1` placeholder slot reserved for the hero, section stubs use `h2`, no skipped levels
- [ ] Copy lives in one content module, with design-added strings marked `TODO copy: owner to approve`; contact email and nav anchors live in one config module
- [ ] Metadata: title `Qaf Labs: Where structure meets craft`, description, Open Graph and Twitter cards with the 2400px on-dark logo PNG, brand-kit favicons, theme colour `#0B0B0F`
- [ ] Playwright and `@axe-core/playwright` installed; tests run against `next build` + `next start` at 1440 x 900 and 390 x 844
- [ ] Tests pass: skip link, `lang`, title and OG tags, landmarks present, axe clean, no horizontal scroll at 390, no console errors
- [ ] TypeScript strict and lint pass
- [ ] Screenshots at 1440 and 390 placed next to `desktop-01-hero.jpg` and `mobile-01-hero.jpg`; antislop Delivery Gate reported

## Comments

- 2026-11-22: Implemented in a184cdc. 16/16 Playwright tests pass at 1440 and 390. Stack keeps its design h3 inside Principles and Manifesto has no heading, as in the reference. `cn` deferred to the first ticket that installs a registry component.
