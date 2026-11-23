import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

// Brand edits (ADR 0002): renders a link when given href, paper highlights, sheen runs twice then stops.
export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  href?: string
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ShimmerButtonProps
>(
  (
    {
      href,
      shimmerColor = "#f6f5f1",
      shimmerSize = "0.05em",
      shimmerDuration = "2.4s",
      borderRadius = "999px",
      background = "var(--vermilion)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const style = {
      "--spread": "90deg",
      "--shimmer-color": shimmerColor,
      "--radius": borderRadius,
      "--speed": shimmerDuration,
      "--cut": shimmerSize,
      "--bg": background,
    } as CSSProperties
    const classes = cn(
      "group relative z-0 flex items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-paper/10 px-6 py-3 whitespace-nowrap text-ink no-underline [background:var(--bg)]",
      "shadow-[0_10px_40px_-10px_rgb(255_74_28/0.85)] hover:shadow-[0_14px_56px_-8px_rgb(255_74_28/1)]",
      "transform-gpu transition-[transform,box-shadow] duration-300 ease-in-out active:translate-y-px",
      className
    )
    const inner = (
      <>
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "@container-[size] absolute inset-0 overflow-visible"
          )}
        >
          {/* spark */}
          <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none] motion-reduce:hidden">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>
        <span className="relative z-10">{children}</span>

        {/* Highlight */}
        <div
          className={cn(
            "absolute inset-0 size-full",

            "rounded-[inherit] shadow-[inset_0_1px_0_rgb(246_245_241/0.35),inset_0_-8px_14px_rgb(11_11_15/0.2)]",

            // transition
            "transform-gpu transition-shadow duration-300 ease-in-out",

            // on hover
            "group-hover:shadow-[inset_0_1px_0_rgb(246_245_241/0.45),inset_0_-6px_14px_rgb(11_11_15/0.15)]",

            // on click
            "group-active:shadow-[inset_0_-10px_10px_rgb(11_11_15/0.25)]"
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]"
          )}
        />
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          style={style}
          className={classes}
          ref={ref}
          {...(props as ComponentPropsWithoutRef<"a">)}
        >
          {inner}
        </a>
      )
    }

    return (
      <button style={style} className={classes} ref={ref} {...props}>
        {inner}
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"
