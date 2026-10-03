import { useId, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Bot, CalendarCheck, Check, Inbox, Workflow, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useInViewport, useSmilPlayback } from '@/lib/motion'

/**
 * A live lead-to-booking workflow: signals leave the intake node, travel
 * through the CRM pipeline or the AI agent, and land on the booked node.
 * Connectors and packets are SVG (SMIL motion along the curves); nodes are
 * HTML so they share the site's type, glass and theme tokens.
 */

const W = 520
const H = 300
const NODE_W = 150
const NODE_H = 58

interface FlowNode {
  id: string
  x: number
  y: number
  label: string
  detail: string
  icon: LucideIcon
}

const NODES: FlowNode[] = [
  { id: 'lead', x: 0, y: 121, label: 'New lead', detail: 'Form · Ad · Call', icon: Inbox },
  { id: 'crm', x: 185, y: 36, label: 'CRM pipeline', detail: 'Stage updated', icon: Workflow },
  { id: 'ai', x: 185, y: 206, label: 'AI agent', detail: 'Intent qualified', icon: Bot },
  { id: 'booked', x: 370, y: 121, label: 'Booked', detail: 'Calendar synced', icon: CalendarCheck },
]

// Visible connector curves (the straight runs sit under the node cards).
const CONNECTORS = [
  'M150,150 C167.5,150 167.5,65 185,65',
  'M150,150 C167.5,150 167.5,235 185,235',
  'M335,65 C352.5,65 352.5,150 370,150',
  'M335,235 C352.5,235 352.5,150 370,150',
]

// Full routes the packets follow, passing behind each node they visit.
const ROUTE_CRM = 'M150,150 C167.5,150 167.5,65 185,65 L335,65 C352.5,65 352.5,150 370,150'
const ROUTE_AI = 'M150,150 C167.5,150 167.5,235 185,235 L335,235 C352.5,235 352.5,150 370,150'
const SYNC = 'M260,94 L260,206'

// Two packets 1.8s apart on 3.6s routes: a departure and an arrival every 1.8s,
// which the emitter and receiver rings below are timed to.
const CYCLE = 3.6
const HALF = CYCLE / 2

function FlowNodeCard({ node }: { node: FlowNode }) {
  const Icon = node.icon
  return (
    <div
      className={cn(
        'absolute flex items-center gap-2.5 rounded-xl border border-foreground/10 pl-3 pr-3.5',
        'bg-[hsl(var(--card)/0.78)] backdrop-blur-md',
        'shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_16px_36px_-18px_rgba(0,0,0,0.8)]',
        'light:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_16px_32px_-18px_rgba(26,44,82,0.35)]'
      )}
      style={{ left: node.x, top: node.y, width: NODE_W, height: NODE_H }}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0DACC9]/12 text-[#0DACC9] ring-1 ring-inset ring-[#0DACC9]/25">
        <Icon size={15} strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12px] font-semibold leading-tight text-foreground">{node.label}</span>
        <span className="mt-0.5 block truncate text-[10px] leading-tight text-muted-foreground">{node.detail}</span>
      </span>
      <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#3DDC97]">
        <span className="status-ping absolute inset-0 rounded-full bg-[#3DDC97]" />
      </span>
    </div>
  )
}

function Packet({ route, begin, glowId }: { route: string; begin: number; glowId: string }) {
  return (
    <g>
      <circle r="9" fill={`url(#${glowId})`} />
      <circle r="2.6" fill="#7DE8F5" />
      <animateMotion
        dur={`${CYCLE}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        path={route}
        calcMode="spline"
        keyTimes="0;1"
        keyPoints="0;1"
        keySplines="0.45 0 0.25 1"
      />
    </g>
  )
}

/** Ring that bursts from a node at each departure/arrival. */
function Ring({ cx, cy }: { cx: number; cy: number }) {
  return (
    <circle cx={cx} cy={cy} r="4" fill="none" stroke="#34D4F0" strokeWidth="1.4" opacity="0">
      <animate attributeName="r" values="4;18;18" keyTimes="0;0.4;1" dur={`${HALF}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.9;0;0" keyTimes="0;0.4;1" dur={`${HALF}s`} repeatCount="indefinite" />
    </circle>
  )
}

export default function AutomationFlow({ className }: { className?: string }) {
  const [frameRef, visible] = useInViewport<HTMLDivElement>()
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const glowId = `flow-glow-${useId().replace(/:/g, '')}`

  useSmilPlayback(svgRef, visible && !reduced)

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      className={cn('relative shrink-0', !visible && 'motion-paused', className)}
      style={{ width: W, height: H }}
    >
      {/* Dot grid, faded toward the edges */}
      <div className="absolute -inset-6 bg-[radial-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_72%)]" />

      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="absolute inset-0 overflow-visible">
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor="#34D4F0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#34D4F0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {CONNECTORS.map((d) => (
          <path key={d} d={d} fill="none" className="stroke-[hsl(var(--foreground)/0.16)]" strokeWidth="1.4" />
        ))}
        <path d={SYNC} fill="none" className="stroke-[#0DACC9]/40" strokeWidth="1.2" strokeDasharray="3 5" />

        {!reduced && (
          <>
            <Packet route={ROUTE_CRM} begin={0} glowId={glowId} />
            <Packet route={ROUTE_AI} begin={-HALF} glowId={glowId} />
            {/* Data syncing between CRM and the AI agent */}
            <circle r="2.2" fill="#0DACC9">
              <animateMotion dur="2.6s" repeatCount="indefinite" path={SYNC} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
            </circle>
            <Ring cx={150} cy={150} />
            <Ring cx={370} cy={150} />
          </>
        )}
      </svg>

      {NODES.map((node) => (
        <FlowNodeCard key={node.id} node={node} />
      ))}

      {/* Live status chip */}
      <div className="absolute left-0 top-10 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-[hsl(var(--card)/0.6)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-md">
        <span className="relative h-1.5 w-1.5 rounded-full bg-[#3DDC97]">
          <span className="status-ping absolute inset-0 rounded-full bg-[#3DDC97]" />
        </span>
        Workflow live
      </div>

      {/* Event toast that surfaces when a booking lands */}
      <div className="flow-toast absolute right-0 top-[58px] inline-flex items-center gap-2 rounded-lg border border-[#3DDC97]/25 bg-[hsl(var(--card)/0.85)] px-2.5 py-1.5 text-[10.5px] font-medium text-foreground shadow-[0_14px_30px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md light:shadow-[0_14px_30px_-16px_rgba(26,44,82,0.35)]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3DDC97]/15 text-[#3DDC97]">
          <Check size={10} strokeWidth={3} />
        </span>
        Appointment booked
      </div>
    </div>
  )
}
