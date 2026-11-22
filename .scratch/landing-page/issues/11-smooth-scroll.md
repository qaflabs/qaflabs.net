# 11: Smooth scroll

**What to build:** A visitor scrolls the page with Lenis smoothing, and the pinned Approach section, scroll-driven band and reveals stay in step. Anchor links glide to their sections without hiding under the navbar. Reduced-motion visitors get native scroll.

**Blocked by:** 02: Navbar, mobile menu, footer; 10: Approach

**Status:** ready-for-agent

- [ ] Lenis driven by GSAP's ticker, ScrollTrigger updated on each Lenis scroll
- [ ] Anchor links (navbar, menu, footer, See what we build) scroll through Lenis with a navbar-height offset
- [ ] Lenis stops while the mobile menu is open and resumes on close
- [ ] Off under reduced motion; destroyed in effect cleanup (Activity)
- [ ] Verified against Sticky Scroll Reveal: Approach pins and steps correctly at 1440; if it doesn't, Lenis is removed and the finding reported
- [ ] Tests: anchor lands with the section heading visible below the navbar; page doesn't scroll while the menu is open; reduced motion uses native scroll; Approach reaches its last step
- [ ] Delivery Gate reported, with the keep-or-remove decision and its evidence

## Comments

- 2026-11-23: Implemented and kept. Lenis loads after hydration with autoRaf (not the GSAP ticker: GSAP is lazy, and Lenis moves native scroll so ScrollTrigger and Motion read it directly), anchors offset 96px, stopped while the menu is open, off under reduced motion. Approach still pins at 120px and reaches step 5. Also: the Laser Flow clock now counts wall time, fixing a slow-machine overrun found in the ticket 10 run. 116 tests pass.
