"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useSpring } from "motion/react"
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

// Brand edits (ADR 0002): renders the final value in the server HTML, counts up from the start value
// only once in view, and under reduced motion shows each value without counting.
export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const target = direction === "down" ? startValue : value
  const origin = direction === "down" ? value : startValue
  const motionValue = useMotionValue(target)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const reduced = usePrefersReducedMotion()
  const countedRef = useRef(false)
  const format = (n: number) =>
    Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(n.toFixed(decimalPlaces)))

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest)
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- format only depends on decimalPlaces
    [springValue, decimalPlaces]
  )

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null

    if (reduced) {
      motionValue.jump(target)
      springValue.jump(target)
      if (ref.current) ref.current.textContent = format(target)
    } else if (isInView) {
      if (!countedRef.current) {
        countedRef.current = true
        motionValue.jump(origin)
        springValue.jump(origin)
      }
      timer = setTimeout(() => motionValue.set(target), delay * 1000)
    }

    return () => {
      if (timer !== null) clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- format only depends on decimalPlaces
  }, [motionValue, springValue, reduced, isInView, delay, target, origin])

  return (
    <span
      ref={ref}
      className={cn("inline-block text-paper tabular-nums", className)}
      {...props}
    >
      {format(target)}
    </span>
  )
}
