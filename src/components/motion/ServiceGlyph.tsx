import { useId, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Tiny live diagrams for the service cards. Each one sketches what the service
 * does: a GHL pipeline advancing, a voice agent speaking, a page assembling, a
 * workflow branching, a dashboard updating, rankings climbing. Animation
 * classes live in index.css (transform/opacity only); the SVG renders at its
 * intrinsic 96×40 so CSS pixel offsets match user units.
 */

const TRACK = 'stroke-[hsl(var(--foreground)/0.16)]'
const HOLLOW = 'fill-[hsl(var(--background))]'
const PACKET = 'fill-[#7DE8F5]'

function Pipeline() {
  return (
    <>
      <line x1="14" y1="20" x2="86" y2="20" className={TRACK} strokeWidth="1.4" strokeDasharray="2 3" />
      {[14, 38, 62, 86].map((cx, i) => (
        <g key={cx}>
          <rect x={cx - 6} y="14" width="12" height="12" rx="3.5" className={cn(HOLLOW, 'stroke-current')} strokeOpacity="0.5" strokeWidth="1.2" />
          <rect
            x={cx - 6}
            y="14"
            width="12"
            height="12"
            rx="3.5"
            className="g-stage-flash fill-current"
            style={{ animationDelay: `${i * 1.2}s` }}
          />
        </g>
      ))}
      <circle cx="14" cy="20" r="2.8" className={cn('g-pipe-packet', PACKET)} />
    </>
  )
}

const EQ_DURATIONS = [1.1, 1.4, 0.9, 1.6, 1.2, 1.0, 1.5, 0.95, 1.3, 1.15, 1.45]

function Voice() {
  return (
    <>
      <line x1="2" y1="20" x2="94" y2="20" className={TRACK} strokeWidth="1" />
      {EQ_DURATIONS.map((dur, i) => (
        <rect
          key={i}
          x={6 + i * 8}
          y="8"
          width="3"
          height="24"
          rx="1.5"
          className="g-eq fill-current"
          style={{ animationDuration: `${dur}s`, animationDelay: `${-i * 0.13}s`, opacity: 0.45 + (i % 4) * 0.15 }}
        />
      ))}
    </>
  )
}

function Website() {
  return (
    <>
      <rect x="2" y="2" width="92" height="36" rx="6" className={cn('fill-[hsl(var(--background)/0.6)]', TRACK)} strokeWidth="1.2" />
      <line x1="2" y1="10" x2="94" y2="10" className={TRACK} strokeWidth="1" />
      {[8, 12, 16].map((cx) => (
        <circle key={cx} cx={cx} cy="6" r="1.3" className="fill-current" opacity="0.55" />
      ))}
      <rect x="8" y="15" width="40" height="3.5" rx="1.75" className="g-line-draw fill-current" />
      <rect x="8" y="22" width="56" height="2.2" rx="1.1" className="g-line-draw fill-[hsl(var(--foreground)/0.35)]" style={{ animationDelay: '0.25s' }} />
      <rect x="8" y="27.5" width="46" height="2.2" rx="1.1" className="g-line-draw fill-[hsl(var(--foreground)/0.25)]" style={{ animationDelay: '0.45s' }} />
      <rect x="68" y="25" width="20" height="8" rx="4" className="g-cta fill-current" />
      <rect x="68" y="25" width="20" height="8" rx="4" className="g-ripple fill-none stroke-current" strokeWidth="1" />
    </>
  )
}

function Automation() {
  return (
    <>
      <line x1="14.5" y1="20" x2="39.5" y2="20" className={TRACK} strokeWidth="1.4" />
      <path d="M52.5 20 L80 9.5" className={TRACK} strokeWidth="1.4" fill="none" />
      <path d="M52.5 20 L80 30.5" className={TRACK} strokeWidth="1.4" fill="none" />
      <circle cx="10" cy="20" r="4.5" className={cn(HOLLOW, 'stroke-current')} strokeWidth="1.3" />
      <polygon points="46,13.5 52.5,20 46,26.5 39.5,20" className={cn(HOLLOW, 'stroke-current')} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="84" cy="9" r="4" className={cn(HOLLOW, 'stroke-current')} strokeWidth="1.3" />
      <circle cx="84" cy="31" r="4" className={cn(HOLLOW, 'stroke-current')} strokeWidth="1.3" />
      <circle cx="84" cy="9" r="1.8" className="g-node-blink fill-current" style={{ animationDelay: '1.6s' }} />
      <circle cx="84" cy="31" r="1.8" className="g-node-blink fill-current" style={{ animationDelay: '0.5s' }} />
      <circle cx="10" cy="20" r="2.4" className={cn('g-branch-up', PACKET)} />
      <circle cx="10" cy="20" r="2.4" className={cn('g-branch-down', PACKET)} />
    </>
  )
}

const BAR_RANGES: Array<[number, number]> = [
  [0.35, 0.8],
  [0.6, 0.4],
  [0.45, 0.95],
  [0.8, 0.55],
  [0.5, 0.85],
  [0.7, 1],
]

function Dashboard() {
  return (
    <>
      <line x1="4" y1="35.5" x2="92" y2="35.5" className={TRACK} strokeWidth="1" />
      {BAR_RANGES.map(([from, to], i) => (
        <rect
          key={i}
          x={8 + i * 14}
          y="6"
          width="8"
          height="29"
          rx="2"
          className="g-bar fill-current"
          style={{ '--from': from, '--to': to, animationDelay: `${-i * 0.45}s`, opacity: 0.35 + i * 0.12 } as CSSProperties}
        />
      ))}
    </>
  )
}

const TREND = '6,34 24,28 40,30 58,18 74,20 90,6'

function Growth() {
  // React ids contain colons, which some engines mis-parse inside url(#…).
  const fillId = `g-fill-${useId().replace(/:/g, '')}`
  return (
    <>
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`M${TREND.replace(/ /g, ' L')} L90,38 L6,38 Z`} fill={`url(#${fillId})`} />
      <polyline points={TREND} className="fill-none stroke-current" strokeOpacity="0.55" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="90" cy="6" r="3" className="g-peak-ping fill-none stroke-current" strokeWidth="1.2" />
      <circle cx="6" cy="34" r="2.6" className={cn('g-climb', PACKET)} />
    </>
  )
}

const GLYPHS: Record<string, () => JSX.Element> = {
  ghl: Pipeline,
  ai: Voice,
  web: Website,
  automation: Automation,
  dashboard: Dashboard,
  seo: Growth,
}

export default function ServiceGlyph({ kind, className }: { kind: string; className?: string }) {
  const Glyph = GLYPHS[kind]
  if (!Glyph) return null
  return (
    <svg
      viewBox="0 0 96 40"
      width="96"
      height="40"
      aria-hidden="true"
      focusable="false"
      className={cn('glyph overflow-visible text-[#0DACC9]', className)}
    >
      <Glyph />
    </svg>
  )
}
