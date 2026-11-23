"use client";

import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";

// Lazy so GSAP and ScrollTrigger load after the first paint; the fallback is the same paragraph.
const ScrollReveal = lazy(() => import("@/components/ScrollReveal"));

interface ManifestoTextProps {
  text: string;
}

const outer = "m-0";
const inner = "text-[clamp(1.875rem,4vw,3.75rem)] leading-[1.1] font-semibold tracking-[-0.035em]";

export function ManifestoText({ text }: ManifestoTextProps) {
  return (
    <Suspense
      fallback={
        <p className={outer}>
          <span className={cn("block", inner)}>{text}</span>
        </p>
      }
    >
      {/* Never below 45%: ink at 45% on paper is 3.09:1, the floor for large text. */}
      <ScrollReveal
        as="p"
        baseOpacity={0.45}
        enableBlur={false}
        baseRotation={0}
        effect="fade"
        stagger={0.03}
        containerClassName={outer}
        textClassName={inner}
        wordAnimationEnd="bottom center"
      >
        {text}
      </ScrollReveal>
    </Suspense>
  );
}
