import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useInViewport } from '@/lib/motion'

const CYCLE_MS = 4800
const DECK_DEPTH = 3

/**
 * Card media as a deck of windows. Screenshots sit in a framed window with
 * panes stacked behind it (base → elevated → floating); hovering the parent
 * `.group` fans the deck. Multi-screenshot workflows cycle the front window
 * to the back on a timer, paused on hover, off-screen, and for reduced motion.
 */
export default function StackedMedia({
  images,
  title,
  className,
}: {
  images: string[]
  title: string
  className?: string
}) {
  const [frameRef, visible] = useInViewport<HTMLDivElement>('0px')
  const reduced = useReducedMotion()
  const [front, setFront] = useState(0)
  const [hovered, setHovered] = useState(false)
  const count = images.length

  useEffect(() => {
    if (count < 2 || !visible || hovered || reduced) return
    const id = setInterval(() => setFront((f) => (f + 1) % count), CYCLE_MS)
    return () => clearInterval(id)
  }, [count, visible, hovered, reduced])

  // Real screenshots rotate through the top positions; decorative panes
  // fill the rest of the deck so every card shows the same depth.
  const deck: Array<string | null> = [...images.slice(0, DECK_DEPTH)]
  while (deck.length < DECK_DEPTH) deck.push(null)
  const realCount = Math.min(count, DECK_DEPTH)

  return (
    <div
      ref={frameRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn('relative h-[184px] overflow-hidden border-b border-white/6 px-6 pt-8', className)}
    >
      {/* Blueprint grid + top glow */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.045)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.045)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,rgba(13,172,201,0.18),transparent_70%)]" />

      <div className="relative h-full">
        {deck.map((src, i) => {
          const pos = i < realCount ? (i - front + realCount) % realCount : i
          return (
            <div
              key={src ?? `pane-${i}`}
              data-pos={pos}
              aria-hidden={pos !== 0}
              className={cn(
                'stack-card absolute inset-x-0 top-0 h-[calc(100%+24px)] overflow-hidden rounded-t-xl border border-foreground/10',
                'bg-[hsl(var(--card))]',
                'shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_18px_40px_-18px_rgba(0,0,0,0.75)]',
                'light:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_18px_40px_-20px_rgba(26,44,82,0.35)]'
              )}
            >
              {/* Window chrome */}
              <div className="flex h-6 items-center gap-1.5 border-b border-foreground/[0.07] bg-foreground/[0.035] px-3">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                <span className="ml-2 h-2 w-24 rounded-full bg-foreground/[0.07]" />
                {src && count > 1 && (
                  <span className="ml-auto flex gap-1" aria-hidden="true">
                    {images.map((dot, d) => (
                      <span
                        key={dot}
                        className={cn('h-1 rounded-full bg-[#0DACC9]', d === i ? 'w-3.5' : 'w-1 opacity-35')}
                      />
                    ))}
                  </span>
                )}
              </div>
              {src ? (
                <img
                  src={src}
                  alt={count > 1 ? `${title} workflow, part ${i + 1} of ${count}` : `${title} workflow`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(180deg,hsl(var(--foreground)/0.04),transparent)]" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
