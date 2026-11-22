# 06: Capability band

**What to build:** Between the hero and Capabilities, a visitor sees two rows of capability words that slide in opposite directions as they scroll, and stop when they stop. Screen readers skip it.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] React Bits Scroll Velocity, two rows, opposite directions, driven by scroll only (no autoplay)
- [ ] Words alternate solid and outlined: WEB APPS, MOBILE, DESKTOP, AI PRODUCTS, E-COMMERCE, DESIGN SYSTEMS
- [ ] Separators: small paper square and small glowing vermilion circle
- [ ] Band is `aria-hidden`
- [ ] Reduced motion: band stays still
- [ ] No horizontal page scroll at 390 caused by the band
- [ ] Tests: band hidden from the accessibility tree; position unchanged after scroll under reduced motion; no horizontal scroll
- [ ] Screenshots at 1440 and 390 next to the references; Delivery Gate reported
