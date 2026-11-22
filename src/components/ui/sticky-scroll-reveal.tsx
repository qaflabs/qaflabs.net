"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

// Brand edits (ADR 0002): tracks page scroll instead of an inner scroll box, drops the demo
// colours and gradients, and lets the caller render each step and the sticky panel.
export interface StickyScrollItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export interface StickyScrollStep {
  item: StickyScrollItem;
  index: number;
  active: boolean;
}

export interface StickyScrollProps {
  content: StickyScrollItem[];
  renderItem: (step: StickyScrollStep) => React.ReactNode;
  panel: (activeIndex: number) => React.ReactNode;
  onActiveChange?: (index: number) => void;
  wrapList?: (list: React.ReactNode) => React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const StickyScroll = ({
  content,
  renderItem,
  panel,
  onActiveChange,
  wrapList = (list) => list,
  className,
  contentClassName,
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    if (closestBreakpointIndex !== activeCard) {
      setActiveCard(closestBreakpointIndex);
      onActiveChange?.(closestBreakpointIndex);
    }
  });

  return (
    <div ref={ref} className={cn("relative grid", className)}>
      {wrapList(
        <ol className="m-0 list-none p-0">
          {content.map((item, index) => (
            <li key={item.title + index}>{renderItem({ item, index, active: activeCard === index })}</li>
          ))}
        </ol>,
      )}
      <div className={cn("sticky top-[120px] self-start", contentClassName)}>{panel(activeCard)}</div>
    </div>
  );
};
