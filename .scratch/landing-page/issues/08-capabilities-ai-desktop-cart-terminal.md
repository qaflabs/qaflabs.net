# 08: Capabilities: AI, desktop, cart and terminal cards

**What to build:** The remaining four capability cards show their kind of work: AI inputs flowing into the mark and out to an answer, a desktop inbox filling with notifications, a cart with a working quantity stepper and order total, and a terminal typing a build and deploy. Each plays once (the AI beam twice) and holds its end state.

**Blocked by:** 07: Capabilities grid with web and mobile cards

**Status:** ready-for-agent

- [ ] AI products: Magic UI Animated Beam, three inputs (docs, tickets, chat) into a node holding the supplied mark, out to "answer"; plays twice on first view
- [ ] Desktop apps: inbox window with Magic UI Animated List notifications, no loop
- [ ] E-commerce: cart card with Spectrum UI Quantity Stepper (switched to `motion/react`) and Magic UI Number Ticker total; stepper buttons are real, labelled and update the total; placeholder item
- [ ] Engineering and infrastructure: Magic UI Terminal typing `pnpm build` and `pnpm deploy --prod`, ending on the live line
- [ ] All colours mapped to brand tokens
- [ ] Reduced motion: every card shows its end state
- [ ] Tests: stepper increments and decrements the total and is keyboard operable; reduced motion shows end states; axe clean
- [ ] Screenshots next to the capabilities references; Delivery Gate reported
