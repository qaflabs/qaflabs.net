# 03: Hero copy and headline

**What to build:** A visitor sees the hero's eyebrow, headline, sub-headline and two buttons on the first paint, even with JavaScript off. With JavaScript, the headline words rise into place once and the eyebrow shines twice.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Eyebrow pill with the supplied mark and Magic UI Animated Shiny Text `Qaf Labs · software company`; shine runs twice, then stops
- [ ] Headline "Where structure meets craft." is the page's only `h1`, rendered on the server, `clamp(3rem, 7.6vw, 7.25rem)`, tracking `-0.048em`, line height 0.95; "craft." carries a soft vermilion glow
- [ ] React Bits Split Text edited in place (ADR 0002): renders as `h1`, no `visibility: hidden`, words animate with movement and a clip mask only, from full opacity; no animation under reduced motion
- [ ] Sub-headline in `--muted`, at most 520px wide
- [ ] Magic UI Shimmer Button (vermilion fill, ink text, glow) for Start a conversation (`mailto:`); Aceternity Hover Border Gradient for See what we build (`#capabilities`), recoloured to brand tokens
- [ ] Ink text on vermilion checked at 5.84:1 with the contrast script
- [ ] Tests: with JS disabled the `h1`, sub-headline and both buttons are visible; See what we build reaches Capabilities; reduced motion shows the end state; axe clean
- [ ] Screenshots at 1440 and 390, reduced motion on and off, next to the hero references; Delivery Gate reported
