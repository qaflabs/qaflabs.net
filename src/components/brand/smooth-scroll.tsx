"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { registerSmoothScroll } from "@/lib/smooth-scroll";

export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let lenis: import("lenis").default | null = null;
    let cancelled = false;
    // Loaded after hydration so it never weighs on the first paint.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      // Lenis reads the page's scroll-padding-top, so anchors already clear the navbar.
      lenis = new Lenis({ autoRaf: true, anchors: true });
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
