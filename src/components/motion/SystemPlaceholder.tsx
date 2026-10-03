import { cn } from '@/lib/utils'
import { useInViewport } from '@/lib/motion'
import ServiceGlyph from '@/components/motion/ServiceGlyph'

/**
 * Stand-in media for projects without screenshots yet: a live workflow sketch
 * on the blueprint grid, instead of an empty frame.
 */
export default function SystemPlaceholder({ className, label = 'Preview Coming Soon' }: { className?: string; label?: string }) {
  const [frameRef, visible] = useInViewport<HTMLDivElement>()

  return (
    <div
      ref={frameRef}
      className={cn(
        'relative flex flex-col items-center justify-center gap-4 overflow-hidden',
        !visible && 'motion-paused',
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--foreground)/0.045)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.045)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,172,201,0.14),transparent_65%)]" />
      <div className="relative rounded-2xl border border-foreground/10 bg-[hsl(var(--card)/0.7)] px-6 py-5 backdrop-blur-sm">
        <ServiceGlyph kind="automation" className="h-16 w-[154px]" />
      </div>
      <span className="relative text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">{label}</span>
    </div>
  )
}
