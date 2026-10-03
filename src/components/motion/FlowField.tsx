import { useId, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useInViewport, useSmilPlayback } from '@/lib/motion'

/**
 * Faint technical backdrop: gently curved signal lines with data packets
 * drifting along them, masked away from the centre so copy stays clean.
 */

const LINES = [
  { d: 'M-40 70 C 220 30, 420 110, 640 70 S 900 40, 1040 80', dur: 9, begin: -2 },
  { d: 'M-40 145 C 200 115, 460 185, 700 135 S 940 125, 1040 155', dur: 11, begin: -6 },
  { d: 'M-40 235 C 260 265, 480 195, 720 245 S 920 265, 1040 225', dur: 10, begin: -4 },
  { d: 'M-40 315 C 240 285, 520 345, 760 305 S 960 295, 1040 325', dur: 12, begin: -9 },
]

const NODES = [
  { cx: 180, cy: 52 },
  { cx: 830, cy: 66 },
  { cx: 120, cy: 128 },
  { cx: 900, cy: 140 },
  { cx: 160, cy: 255 },
  { cx: 860, cy: 238 },
  { cx: 240, cy: 300 },
  { cx: 800, cy: 312 },
]

export default function FlowField({ className }: { className?: string }) {
  const [frameRef, visible] = useInViewport<HTMLDivElement>()
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const glowId = `field-glow-${useId().replace(/:/g, '')}`

  useSmilPlayback(svgRef, visible && !reduced)

  return (
    <div ref={frameRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 380"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full [mask-image:radial-gradient(ellipse_62%_58%_at_50%_50%,transparent_38%,#000_88%)]"
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor="#34D4F0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#34D4F0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {LINES.map(({ d }) => (
          <path key={d} d={d} fill="none" className="stroke-[hsl(var(--foreground)/0.1)]" strokeWidth="1" />
        ))}

        {NODES.map(({ cx, cy }, i) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="3" className="fill-[hsl(var(--background))] stroke-[#0DACC9]/60" strokeWidth="1.2" />
            {!reduced && (
              <circle cx={cx} cy={cy} r="3" fill="none" stroke="#34D4F0" strokeWidth="1" opacity="0">
                <animate attributeName="r" values="3;12" dur="3.2s" begin={`${-i * 0.7}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0" dur="3.2s" begin={`${-i * 0.7}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {!reduced &&
          LINES.map(({ d, dur, begin }) => (
            <g key={`p-${d}`}>
              <circle r="10" fill={`url(#${glowId})`} />
              <circle r="2.4" fill="#7DE8F5" />
              <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
            </g>
          ))}
      </svg>
    </div>
  )
}
