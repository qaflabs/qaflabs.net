# 09: Manifesto

**What to build:** A visitor scrolls into the page's one light section. Paper background, ink text, the ink mark on top, and sentences that brighten from 45% to full as they scroll past.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Paper background with a soft gradient edge in and out
- [ ] Supplied ink mark (`qaf-labs-mark.svg`) above the text
- [ ] React Bits Scroll Reveal: sentences rise from 45% to 100% opacity; never below 45% (ink at 45% on paper is 3.09:1)
- [ ] Reduced motion: text at full opacity
- [ ] Copy from the reference, as written
- [ ] Tests: minimum computed opacity is at least 0.45; reduced motion shows full opacity; axe clean
- [ ] Screenshots next to `desktop-05-manifesto.jpg` and `mobile-05-manifesto.jpg`; Delivery Gate reported
