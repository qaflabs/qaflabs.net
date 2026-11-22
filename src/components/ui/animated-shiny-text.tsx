import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from "react"

import { cn } from "@/lib/utils"

// Brand edits (ADR 0002): muted base with a paper shine, runs twice, still under reduced motion.
export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "text-muted",

        // Shine effect
        "animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat motion-reduce:animate-none motion-reduce:bg-none",

        // Shine gradient
        "bg-linear-to-r from-transparent via-paper via-50% to-transparent",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
