import { useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react'

/** Spring-style ease shared by every entrance and hover in the site. */
export const SPRING_EASE = [0.16, 1, 0.3, 1] as const

/**
 * True while the element is on (or within `rootMargin` of) the screen.
 * Unlike framer-motion's `useInView({ once })`, this keeps updating, so
 * decorative loops can pause whenever their section scrolls away.
 */
export function useInViewport<T extends Element>(rootMargin = '120px') {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, visible] as const
}

/**
 * SMIL (`<animateMotion>`, `<animate>`) ignores CSS animation-play-state, so
 * SVG diagrams are paused through the SVG timeline API instead.
 */
export function useSmilPlayback(svgRef: RefObject<SVGSVGElement>, active: boolean) {
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || typeof svg.pauseAnimations !== 'function') return
    if (active) svg.unpauseAnimations()
    else svg.pauseAnimations()
  }, [svgRef, active])
}

/** Writes the pointer position into --spot-x/--spot-y for `.spotlight` cards. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}
