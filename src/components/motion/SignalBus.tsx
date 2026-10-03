import { cn } from '@/lib/utils'

/**
 * A hairline "data bus" with endpoint nodes and packets travelling along it,
 * used to frame groups of integrations. Pure CSS (see .signal-* in index.css).
 */
export default function SignalBus({
  reverse = false,
  duration = 7,
  delay = 0,
  className,
}: {
  reverse?: boolean
  duration?: number
  delay?: number
  className?: string
}) {
  return (
    <div aria-hidden="true" className={cn('flex items-center gap-3', className)}>
      <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-[#0DACC9]/80">
        <span className="status-ping absolute inset-0 rounded-full bg-[#0DACC9]" />
      </span>
      <div className="signal-track flex-1">
        {[0, 0.5].map((offset) => (
          <div
            key={offset}
            className="signal-runner"
            style={{
              animationDuration: `${duration}s`,
              animationDelay: `${delay - offset * duration}s`,
              animationDirection: reverse ? 'reverse' : 'normal',
            }}
          >
            <span className={cn('signal-packet', reverse && 'signal-packet-reverse')} />
          </div>
        ))}
      </div>
      <span className="relative h-1.5 w-1.5 shrink-0 rounded-full bg-[#0DACC9]/80">
        <span className="status-ping absolute inset-0 rounded-full bg-[#0DACC9]" style={{ animationDelay: '1.1s' }} />
      </span>
    </div>
  )
}
