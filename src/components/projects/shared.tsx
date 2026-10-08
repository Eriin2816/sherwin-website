import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Layers } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import SystemPlaceholder from '@/components/motion/SystemPlaceholder'
import { cn } from '@/lib/utils'

export const CALENDLY_URL = 'https://calendly.com/marcelo-taweng/30minutes-call'

const categoryColors: Record<string, string> = {
  Automation: 'text-[#0DACC9] bg-[#0DACC9]/10 border-[#0DACC9]/20',
  GoHighLevel: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Web Dev': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'n8n': 'text-[#0DACC9] bg-[#0DACC9]/10 border-[#0DACC9]/20',
  'AI': 'text-[#0DACC9] bg-[#0DACC9]/10 border-[#0DACC9]/20',
  'GHL': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'SaaS': 'text-[#34D4F0] bg-[#0DACC9]/12 border-[#0DACC9]/30',
  'Video Editing': 'text-[#F4B860] bg-[#F4B860]/10 border-[#F4B860]/25',
  'AI Video': 'text-[#C9A2FF] bg-[#C9A2FF]/10 border-[#C9A2FF]/25',
  'Web & Shopify': 'text-[#5FE0B7] bg-[#5FE0B7]/10 border-[#5FE0B7]/25',
}

export function CategoryBadge({ category, className }: { category: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        categoryColors[category] ?? 'text-muted-foreground bg-white/5 border-white/10',
        className
      )}
    >
      <Layers size={10} />
      {category}
    </span>
  )
}

/** Video work asks for a video; everything else is a build. */
export function ctaLabelFor(project: Project) {
  return project.filters.some((f) => f === 'video-editing' || f === 'ai-video')
    ? 'Request Video'
    : 'Request Build'
}

/** Returns the ordered screenshots for a project: `images` wins, else the single `image`. */
export function slidesFor(project: Project): string[] {
  if (project.images?.length) return project.images
  return project.image ? [project.image] : []
}

/**
 * Single source of truth for how a screenshot fills its frame, so the card and
 * the case-study hero can never disagree. Explicit `imageFit` wins; otherwise
 * SaaS app shots fill the frame and dense workflow canvases stay fully visible.
 */
export function fitFor(project: Project): 'cover' | 'contain' {
  return project.imageFit ?? (project.type === 'saas' ? 'cover' : 'contain')
}

const SLIDE_INTERVAL_MS = 5000

/** A single screenshot, or an auto-advancing slider for multi-screenshot workflows. */
export function WorkflowMedia({ project, fit }: { project: Project; fit: 'cover' | 'contain' }) {
  const slides = slidesFor(project)
  const isSlider = slides.length > 1
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Reduced motion pins the slider to the first screenshot.
  const active = prefersReducedMotion ? 0 : index

  useEffect(() => {
    if (!isSlider || prefersReducedMotion || paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isSlider, prefersReducedMotion, paused, slides.length])

  if (slides.length === 0) {
    return <SystemPlaceholder className="w-full h-full" />
  }

  const imgClass = cn(
    'shot-soft w-full h-full',
    fit === 'contain' ? 'object-contain object-center' : 'object-cover object-top'
  )

  if (!isSlider) {
    return <img src={slides[0]} alt={`${project.title} workflow`} className={imgClass} />
  }

  return (
    <div
      className="w-full h-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0DACC9]"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${project.title} workflow screenshots`}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div key={src} className="w-full h-full shrink-0">
            <img src={src} alt={`${project.title} workflow, part ${i + 1} of ${slides.length}`} className={imgClass} />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 z-[3] flex gap-1">
        {slides.map((src, i) => (
          <span
            key={src}
            className={cn('h-1 rounded-full bg-[#34D4F0] transition-opacity duration-500', i === active ? 'w-4 opacity-100' : 'w-1.5 opacity-40')}
          />
        ))}
      </div>
    </div>
  )
}
