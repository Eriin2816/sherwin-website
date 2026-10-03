import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { SPRING_EASE } from '@/lib/motion'

/**
 * Counts a stat up from zero the first time it scrolls into view. Text is
 * written straight to the node, so the count never re-renders React.
 */
export default function CountUp({
  value,
  suffix = '',
  duration = 1.6,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduced) {
      node.textContent = `${value}${suffix}`
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: SPRING_EASE,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value, suffix, duration])

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      {`0${suffix}`}
    </span>
  )
}
