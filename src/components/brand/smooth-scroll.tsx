"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { registerSmoothScroll } from "@/lib/smooth-scroll";

// Clears the fixed navbar when Lenis scrolls to an anchor.
const NAV_OFFSET = -96;

export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;
    // Loaded after hydration so it never weighs on the first paint.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ autoRaf: true, anchors: { offset: NAV_OFFSET } });
      registerSmoothScroll(lenis);
    });
    return () => {
      cancelled = true;
      registerSmoothScroll(null);
      lenis?.destroy();
    };
  }, [reduced]);

  return null;
}
