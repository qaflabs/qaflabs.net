import React from "react";

import { cn } from "@/lib/utils";

// Brand edits (ADR 0002): rebuilt to the design's outline button. A hairline conic border with a
// vermilion arc that turns only while hovered or keyboard-focused; CSS only, so no Motion or client JS.
// No iOS long-press preview, which snapshots the pill as a square.
interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  href?: string;
  type?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  ...props
}: React.PropsWithChildren<HoverBorderGradientProps>) {
  return (
    <Tag
      className={cn(
        "group relative isolate inline-flex w-fit items-center justify-center rounded-full bg-ink-2 text-paper no-underline transition-transform duration-150 [-webkit-touch-callout:none] active:translate-y-px",
        containerClassName,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] p-px [background:conic-gradient(from_var(--border-angle),var(--line-strong),var(--line-strong)_55%,var(--vermilion)_75%,var(--line-strong)_95%)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] group-hover:animate-border-spin group-focus-visible:animate-border-spin motion-reduce:animate-none!"
      />
      <span className={cn("relative rounded-[inherit]", className)}>{children}</span>
    </Tag>
  );
}
