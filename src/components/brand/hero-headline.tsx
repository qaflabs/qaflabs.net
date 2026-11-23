"use client";

import { lazy, Suspense, type ReactNode } from "react";

// Lazy so GSAP stays off the critical path; the fallback is the same h1 the server sends.
const SplitText = lazy(() => import("@/components/SplitText"));

interface HeroHeadlineProps {
  id: string;
  text: string;
  children: ReactNode;
}

// After this point the visitor has already read the headline, so moving it would be noise.
const LATEST_START_MS = 300;
const className =
  "block max-w-[820px] text-display leading-[0.95] font-semibold tracking-[-0.045em] md:mt-7";

export function HeroHeadline({ id, text, children }: HeroHeadlineProps) {
  return (
    <Suspense
      fallback={
        <h1 id={id} className={className}>
          {children}
        </h1>
      }
    >
      <SplitText
        tag="h1"
        id={id}
        text={text}
        splitType="words"
        mask
        from={{ yPercent: 110 }}
        to={{ yPercent: 0 }}
        ease="power3.out"
        duration={0.9}
        delay={80}
        trigger="load"
        textAlign="left"
        latestStartMs={LATEST_START_MS}
        revertOnComplete
        className={className}
      >
        {children}
      </SplitText>
    </Suspense>
  );
}
