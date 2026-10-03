import { cn } from '@/lib/utils'

/**
 * A point of light that travels around the edge of its (positioned, rounded)
 * parent. A rotating conic gradient is masked down to a 1px ring, so the only
 * animated property is transform.
 */
export default function BorderBeam({ className, duration }: { className?: string; duration?: number }) {
  return (
    <span aria-hidden="true" className={cn('border-beam', className)}>
      <span className="border-beam-spinner" style={duration ? { animationDuration: `${duration}s` } : undefined} />
    </span>
  )
}
