"use client";

import type { ReactNode } from "react";
import SplitText from "@/components/SplitText";

interface HeroHeadlineProps {
  id: string;
  text: string;
  children: ReactNode;
}

// After this point the visitor has already read the headline, so moving it would be noise.
const LATEST_START_MS = 1000;

export function HeroHeadline({ id, text, children }: HeroHeadlineProps) {
  return (
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
      className="mt-7 block max-w-[820px] text-[clamp(3rem,7.6vw,7.25rem)] leading-[0.95] font-semibold tracking-[-0.048em]"
    >
      {children}
    </SplitText>
  );
}
