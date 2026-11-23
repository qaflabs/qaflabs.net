# 13: Contact

**What to build:** A visitor ready to talk sees "Tell us what you're making." under a vermilion lamp, and can either start an email or copy the address. Copying confirms visually and to screen readers; if the clipboard is blocked, the address appears on the page.

**Blocked by:** 01: Foundation and test harness

**Status:** ready-for-agent

- [ ] Aceternity `lamp` (`LampContainer`) recoloured from slate and cyan to ink and vermilion; heading `clamp(2.75rem, 6.8vw, 6rem)`
- [ ] Shimmer Button for Start a conversation (`mailto:` from config)
- [ ] Spectrum UI Morph Button (switched to `motion/react`) for Copy email: turns into "Copied" with a check
- [ ] Result announced in an `aria-live` region; on clipboard failure the address is shown as selectable text
- [ ] Reduced motion: lamp shown in its end state, no morph animation
- [ ] Tests: Copy email with clipboard granted shows "Copied" and announces it; with clipboard denied shows the address; Start a conversation href matches config; axe clean
- [ ] Screenshots next to `desktop-10-contact.jpg` and `mobile-10-contact.jpg`; Delivery Gate reported

## Comments

- 2026-11-23: Implemented. Lamp rewritten in place (vermilion on ink, section-sized, opens once in view, static under reduced motion, demo export removed). Morph Button: motion/react, brand states, `announce` prop so the page's own live region (#copy-status) is the single announcement; on clipboard failure the address shows as selectable text. 136 tests pass.
