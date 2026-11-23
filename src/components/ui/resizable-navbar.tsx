"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

// Brand edits (ADR 0002): 40px threshold, 1240px to 880px pill, ink colours, no @tabler icons or demo parts.
const SCROLL_THRESHOLD = 40;

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItem {
  name: string;
  link: string;
}

interface NavItemsProps {
  items: readonly NavItem[];
  className?: string;
  onItemClick?: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > SCROLL_THRESHOLD);
  });

  return (
    <motion.div
      ref={ref}
      data-scrolled={visible || undefined}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={false}
      animate={{
        maxWidth: visible ? 880 : 1240,
        y: visible ? 12 : 16,
        backgroundColor: visible ? "rgb(11 11 15 / 0.72)" : "rgb(11 11 15 / 0)",
        borderColor: visible ? "rgb(246 245 241 / 0.12)" : "rgb(246 245 241 / 0)",
        boxShadow: visible
          ? "0 10px 40px -12px rgb(11 11 15 / 0.5)"
          : "0 10px 40px -12px rgb(11 11 15 / 0)",
      }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(
        "relative mx-auto flex w-[calc(100%-32px)] flex-row items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-5",
        // Blur only behind the pill: at the top it would smear the hero light around the bar.
        { "backdrop-blur-[16px]": visible },
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-row items-center gap-1 text-[15px]",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative inline-flex min-h-11 items-center px-3 text-muted transition-colors duration-200 hover:text-paper"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-x-0 inset-y-1.5 rounded-full bg-paper/[0.06]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};
