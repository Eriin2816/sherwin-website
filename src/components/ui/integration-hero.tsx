import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInViewport } from '@/lib/motion'

export interface IntegrationTool {
  name: string
  /** SVG path on a 24×24 viewBox; tools without one show their monogram. */
  path?: string
  monogram?: string
}

interface IntegrationHeroProps {
  eyebrow: string
  title: ReactNode
  description: ReactNode
  action?: ReactNode
  rows: IntegrationTool[][]
  className?: string
}

// Four copies keep each row wider than any viewport; the marquee shifts by half.
const COPIES = 4

function ToolTile({ tool, className }: { tool: IntegrationTool; className?: string }) {
  return (
    <li className={cn('flex min-w-16 shrink-0 flex-col items-center gap-2.5', className)}>
      <span className="premium-card flex h-16 w-16 items-center justify-center rounded-full shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_10px_28px_-12px_rgba(13,172,201,0.35),0_2px_6px_rgba(13,172,201,0.08)]">
        {tool.path ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current text-foreground/80">
            <path d={tool.path} />
          </svg>
        ) : (
          <span aria-hidden="true" className="text-sm font-bold tracking-tight text-foreground/80">
            {tool.monogram}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap text-[11px] font-medium tracking-wide text-muted-foreground">
        {tool.name}
      </span>
    </li>
  )
}

function ToolRow({ tools, reverse }: { tools: IntegrationTool[]; reverse?: boolean }) {
  return (
    <ul
      className={cn(
        'flex w-max gap-10 pr-10 animate-marquee [animation-duration:55s]',
        reverse && '[animation-direction:reverse]',
        // Reduced motion: one static, wrapped copy instead of a moving strip.
        'motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-6 motion-reduce:pr-0',
      )}
    >
      {Array.from({ length: COPIES }).flatMap((_, copy) =>
        tools.map((tool) => (
          <ToolTile key={`${copy}-${tool.name}`} tool={tool} className={copy > 0 ? 'motion-reduce:hidden' : undefined} />
        )),
      )}
    </ul>
  )
}

export default function IntegrationHero({ eyebrow, title, description, action, rows, className }: IntegrationHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [stripRef, stripVisible] = useInViewport<HTMLDivElement>()

  return (
    <div className={cn('relative', className)}>
      {/* Cyan dot grid, faded toward the edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,172,201,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0DACC9]/30 bg-[#0DACC9]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0DACC9]">
          <Zap size={13} aria-hidden="true" />
          {eyebrow}
        </span>
        <h2
          className="font-bold leading-tight tracking-tight text-foreground"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
        >
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        {action && <div className="mt-8 flex justify-center">{action}</div>}
      </motion.div>

      {/* Logo strip: decorative motion, so the readable list lives in sr-only below */}
      <div
        ref={stripRef}
        aria-hidden="true"
        className={cn(
          'relative mt-12 overflow-hidden pb-2',
          // Mask the edges rather than painting a fade, so it blends over any section background.
          '[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]',
          !stripVisible && 'motion-paused',
        )}
      >
        {rows.map((tools, i) => (
          <div key={i} className={cn(i > 0 && 'mt-6')}>
            <ToolRow tools={tools} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {rows.flat().map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>
    </div>
  )
}
