"use client";
import React, { useState, useEffect } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Brand edits (ADR 0002): rotates only while hovered (no idle loop), paper and vermilion light on ink-2.
type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const DIRECTIONS: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> & { href?: string; type?: string; ref?: React.Ref<HTMLButtonElement> }
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, rgb(246 245 241 / 0.42) 0%, rgb(246 245 241 / 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgb(246 245 241 / 0.42) 0%, rgb(246 245 241 / 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, rgb(246 245 241 / 0.42) 0%, rgb(246 245 241 / 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.2% at 100% 50%, rgb(246 245 241 / 0.42) 0%, rgb(246 245 241 / 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.16% at 50% 50%, #ff4a1c 0%, rgb(255 74 28 / 0) 100%)";

  useEffect(() => {
    if (!hovered) return;
    const interval = setInterval(() => {
      setDirection((current) => {
        const index = DIRECTIONS.indexOf(current);
        const next = clockwise
          ? (index - 1 + DIRECTIONS.length) % DIRECTIONS.length
          : (index + 1) % DIRECTIONS.length;
        return DIRECTIONS[next];
      });
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [hovered, clockwise, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full border border-line-strong bg-ink-2 p-px no-underline decoration-clone transition duration-500 active:translate-y-px",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-ink-2 px-4 py-2 text-paper",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div aria-hidden="true" className="absolute inset-[2px] z-[1] flex-none rounded-[100px] bg-ink-2" />
    </Tag>
  );
}
