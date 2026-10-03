import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Layers, ChevronLeft, ChevronRight, X, CheckCircle2, ExternalLink } from 'lucide-react'
import { projects, projectFilters, type Project } from '@/data/portfolio'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionBackground from '@/components/SectionBackground'
import PortfolioVideo, { pauseAllPortfolioVideos } from '@/components/PortfolioVideo'
import StackedMedia from '@/components/motion/StackedMedia'
import SystemPlaceholder from '@/components/motion/SystemPlaceholder'
import { cn } from '@/lib/utils'
import { trackSpotlight } from '@/lib/motion'

const CALENDLY_URL = 'https://calendly.com/marcelo-taweng/30minutes-call'

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

/** Video work asks for a video; everything else is a build. */
function ctaLabelFor(project: Project) {
  return project.filters.some((f) => f === 'video-editing' || f === 'ai-video')
    ? 'Request Video'
    : 'Request Build'
}

// ── Workflow Media (single image, or auto-advancing multi-screenshot slider) ──

const SLIDE_INTERVAL_MS = 5000

/** Returns the ordered screenshots for a project: `images` wins, else the single `image`. */
function slidesFor(project: Project): string[] {
  if (project.images?.length) return project.images
  return project.image ? [project.image] : []
}

/**
 * Single source of truth for how a screenshot fills its frame, so the card and
 * the case-study hero can never disagree. Explicit `imageFit` wins; otherwise
 * SaaS app shots fill the frame and dense workflow canvases stay fully visible.
 */
function fitFor(project: Project): 'cover' | 'contain' {
  return project.imageFit ?? (project.type === 'saas' ? 'cover' : 'contain')
}

function WorkflowMedia({ project, fit }: { project: Project; fit: 'cover' | 'contain' }) {
  const slides = slidesFor(project)
  const isSlider = slides.length > 1
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Reduced motion pins the slider to the first screenshot.
  const active = prefersReducedMotion ? 0 : index

  useEffect(() => {
    if (!isSlider || prefersReducedMotion || paused) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL_MS
    )
    return () => clearInterval(id)
  }, [isSlider, prefersReducedMotion, paused, slides.length])

  if (slides.length === 0) {
    return <SystemPlaceholder className="w-full h-full" />
  }

  const imgClass =
    fit === 'contain'
      ? 'w-full h-full object-contain object-center'
      : 'w-full h-full object-cover object-top'

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
            <img
              src={src}
              alt={`${project.title} workflow, part ${i + 1} of ${slides.length}`}
              className={imgClass}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Case Study Modal ──────────────────────────────────────────────────────────

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    pauseAllPortfolioVideos()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

        {/* Modal panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-foreground/10 bg-[hsl(var(--card))] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_80px_-24px_rgba(0,0,0,0.75),0_0_0_1px_rgba(13,172,201,0.06)] light:shadow-[0_30px_80px_-28px_rgba(26,44,82,0.45)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button — always sits over the dark media frame */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 active:scale-[0.94] transition-[background-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D4F0]"
          >
            <X size={14} />
          </button>

          {/* Modal hero — video work uses the standard 4:3 player; everything else
              is 16:9, capped by the modal's own content width (max-w-2xl) so it
              never approaches viewport height. SaaS apps fill the frame; dense
              workflow canvases stay fully visible with contain. */}
          {project.video ? (
            <div className="dark-stage w-full border-b border-white/6 relative overflow-hidden rounded-t-2xl">
              <PortfolioVideo video={project.video} title={project.title} />
            </div>
          ) : (
            <div className="dark-stage w-full aspect-video bg-[hsl(214_44%_7%)] border-b border-white/6 relative overflow-hidden rounded-t-2xl">
              <WorkflowMedia project={project} fit={fitFor(project)} />
            </div>
          )}

          {/* Content */}
          <div className="p-7 md:p-8">
            {/* Title + badge */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[project.category] ?? 'text-muted-foreground bg-white/5 border-white/10'}`}
              >
                <Layers size={9} />
                {project.category}
              </span>
            </div>
            <h2 className="font-bold text-foreground text-xl leading-snug mb-1">
              {project.title}
            </h2>
            <p className="text-[#0DACC9] text-sm font-medium mb-7">{project.subtitle}</p>

            {/* Problem */}
            <div className="mb-6">
              <p className="font-semibold text-foreground text-sm mb-2">Problem</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-6">
              <p className="font-semibold text-foreground text-sm mb-3">Solution</p>
              <ul className="space-y-2">
                {project.solution.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <CheckCircle2 size={14} className="text-[#0DACC9] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Platform Capabilities (optional) */}
            {project.capabilities && (
              <div className="mb-6">
                <p className="font-semibold text-foreground text-sm mb-3">Key Platform Capabilities</p>
                <ul className="space-y-2">
                  {project.capabilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-[#0DACC9] shrink-0 mt-0.5 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome */}
            <div className="mb-6">
              <p className="font-semibold text-foreground text-sm mb-3">Outcome</p>
              <ul className="space-y-2">
                {project.outcome.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-[#34D4F0] shrink-0 mt-0.5 font-bold text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="mb-8">
              <p className="font-semibold text-foreground text-sm mb-3">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0DACC9]/10 border border-[#0DACC9]/25 text-[#0DACC9]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <LiquidButton
              size="lg"
              className="w-full"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
              <ExternalLink size={14} />
            </LiquidButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onViewCaseStudy,
}: {
  project: Project
  index: number
  onViewCaseStudy: (p: Project) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={trackSpotlight}
      className="spotlight group relative premium-card rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Top media: video player, stacked screenshot deck, or a live placeholder */}
      {project.video ? (
        <div className="dark-stage relative shrink-0 border-b border-white/6">
          <PortfolioVideo video={project.video} title={project.title} />
        </div>
      ) : slidesFor(project).length > 0 ? (
        <StackedMedia images={slidesFor(project)} title={project.title} className="shrink-0" />
      ) : (
        <SystemPlaceholder className="h-[184px] shrink-0 border-b border-white/6" />
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Category badge */}
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border mb-5 w-fit ${categoryColors[project.category] ?? 'text-muted-foreground bg-white/5 border-white/10'}`}
        >
          <Layers size={10} />
          {project.category}
        </span>

        {/* Title & subtitle */}
        <h3 className="font-bold text-foreground text-lg leading-snug mb-1">
          {project.title}
        </h3>
        <p className="text-[#0DACC9] text-sm font-medium mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlights or Impact callout */}
        {project.highlights ? (
          <ul className="space-y-2 mb-5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-[#0DACC9] shrink-0 mt-0.5 font-bold">•</span>
                {h}
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl bg-[#0DACC9]/5 border border-[#0DACC9]/15 px-4 py-3 mb-5">
            <p className="text-xs font-semibold text-[#0DACC9] uppercase tracking-wide mb-1">Impact</p>
            <p className="text-foreground/80 text-sm leading-relaxed">{project.impact}</p>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full text-xs border border-white/8 bg-white/3 text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Spacer pushes buttons to bottom */}
        <div className="flex-1" />

        {/* Action buttons */}
        <div className="flex gap-2 pt-4 border-t border-white/6">
          <LiquidButton variant="glass" size="sm" className="flex-1 px-3" onClick={() => onViewCaseStudy(project)}>
            View Case Study
            <ArrowUpRight size={12} />
          </LiquidButton>
          <LiquidButton
            variant="electric"
            size="sm"
            className="flex-1 px-3"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {ctaLabelFor(project)}
            <ExternalLink size={12} />
          </LiquidButton>
        </div>
      </div>
    </motion.article>
  )
}

// ── SaaS Project Card (flagship: one per row, 16:9 hero) ──────────────────────

function SaaSProjectCard({
  project,
  index,
  onViewCaseStudy,
}: {
  project: Project
  index: number
  onViewCaseStudy: (p: Project) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={trackSpotlight}
      className="spotlight group relative premium-card rounded-2xl overflow-hidden col-span-full"
    >
      {/* Horizontal split on desktop, stacked below lg. Card height is driven by
          content only: no min-height, no viewport units, no stretch. */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] gap-5 lg:gap-7 p-6 pt-8">
        {/* 16:9 image on a small stack of panes that fan out on hover */}
        <div className="relative self-start lg:self-center">
          <span
            aria-hidden="true"
            className="stack-card absolute inset-0 rounded-xl border border-foreground/10 bg-[hsl(var(--card))]"
            data-pos="2"
          />
          <span
            aria-hidden="true"
            className="stack-card absolute inset-0 rounded-xl border border-foreground/10 bg-[hsl(var(--card))]"
            data-pos="1"
          />
        <div
          className={cn(
            'stack-card dark-stage relative w-full aspect-video overflow-hidden rounded-xl border border-white/8 bg-[hsl(214_44%_7%)]',
            'shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] light:shadow-[0_18px_40px_-20px_rgba(26,44,82,0.4)]',
            fitFor(project) === 'contain' && 'p-2'
          )}
          data-pos="0"
        >
          <img
            src={project.image}
            alt={`${project.title} application interface`}
            className={
              fitFor(project) === 'contain'
                ? 'w-full h-full object-contain object-center'
                : 'w-full h-full object-cover object-top'
            }
          />
          {/* Gradient only over edge-to-edge shots; it would tint the letterboxing. */}
          {fitFor(project) === 'cover' && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#060f18]/45 via-transparent to-transparent pointer-events-none" />
          )}
        </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border mb-2.5 w-fit ${categoryColors[project.category] ?? 'text-muted-foreground bg-white/5 border-white/10'}`}
          >
            <Layers size={10} />
            {project.category}
          </span>

          <h3 className="font-bold text-foreground text-lg md:text-xl leading-snug tracking-tight mb-1">
            {project.title}
          </h3>
          <p className="text-[#0DACC9] text-sm font-medium mb-2.5">{project.subtitle}</p>

          <p className="text-muted-foreground text-sm leading-relaxed mb-3.5">
            {project.description}
          </p>

          {project.highlights && (
            <ul className="space-y-1.5 mb-3.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-[#0DACC9] shrink-0 mt-0.5 font-bold">•</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded-full text-xs border border-white/8 bg-white/3 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-auto pt-3.5 border-t border-white/6">
            <LiquidButton variant="glass" size="sm" onClick={() => onViewCaseStudy(project)}>
              View Case Study
              <ArrowUpRight size={12} />
            </LiquidButton>
            <LiquidButton
              variant="electric"
              size="sm"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Build
              <ExternalLink size={12} />
            </LiquidButton>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// ── Projects Section ──────────────────────────────────────────────────────────

// 2 rows × 3 columns on desktop; flagship SaaS cards are full width, 2 per page.
const CARDS_PER_PAGE = 6
const SAAS_CARDS_PER_PAGE = 2

// The default "All" tab leads with visual work; everything else keeps data order.
const ALL_TAB_LEAD = ['ai-video', 'video-editing']

function allTabRank(project: Project) {
  const rank = ALL_TAB_LEAD.findIndex((id) => project.filters.includes(id))
  return rank === -1 ? ALL_TAB_LEAD.length : rank
}

const allTabProjects = [...projects].sort((a, b) => allTabRank(a) - allTabRank(b))

export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [activeModal, setActiveModal] = useState<Project | null>(null)

  const filtered = filter === 'all' ? allTabProjects : projects.filter((p) => p.filters.includes(filter))
  const perPage = filter === 'saas' ? SAAS_CARDS_PER_PAGE : CARDS_PER_PAGE
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const visibleProjects = filtered.slice(page * perPage, page * perPage + perPage)

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])

  const selectFilter = useCallback((id: string) => {
    setFilter(id)
    setPage(0)
  }, [])

  return (
    <>
      <section id="projects" className="py-20 relative overflow-hidden">
        <SectionBackground variant="grid-fade" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0DACC9]/3 blur-[120px] pointer-events-none" />

        <div className="section-shell relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
              Portfolio & Case Studies
            </p>
            <h2
              className="font-bold text-foreground tracking-tight leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Projects That Ship
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Real systems built for real businesses — not demos, not mockups.
            </p>
          </motion.div>

          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectFilters.map(({ id, label }) => {
              const count = id === 'all' ? projects.length : projects.filter((p) => p.filters.includes(id)).length
              const active = filter === id
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectFilter(id)}
                  className={cn(
                    'relative isolate inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
                    active
                      ? 'border-transparent text-[#34D4F0]'
                      : 'bg-white/4 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/8 hover:border-white/20'
                  )}
                >
                  {/* Active pill glides between tabs */}
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.8 }}
                      className="absolute inset-0 -z-10 rounded-full border border-[#0DACC9]/45 bg-[#0DACC9]/[0.16] shadow-[0_4px_20px_-6px_rgba(13,172,201,0.55)]"
                    />
                  )}
                  {label}
                  <span className={`text-[11px] tabular-nums ${active ? 'text-[#34D4F0]/70' : 'text-muted-foreground/50'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </motion.div>

          {/* Cards grid — 3 across, 2 rows per page */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${page}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {visibleProjects.map((project, i) =>
                project.type === 'saas' ? (
                  <SaaSProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    onViewCaseStudy={setActiveModal}
                  />
                ) : (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i}
                    onViewCaseStudy={setActiveModal}
                  />
                )
              )}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {visibleProjects.length === 0 && (
            <div className="premium-card rounded-2xl py-16 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0DACC9]/15 border border-[#0DACC9]/25 flex items-center justify-center">
                <Layers size={22} className="text-[#0DACC9]" />
              </div>
              <p className="text-foreground font-semibold">Case studies coming soon</p>
              <p className="text-muted-foreground text-sm max-w-sm">
                New builds in this category are being documented. Book a call to see the work in progress.
              </p>
            </div>
          )}

          {/* Pagination: arrows + dots */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                disabled={page === 0}
                aria-label="Previous page"
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-[0.96] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 transition-[background,color,opacity,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={i === page}
                    className={`rounded-full transition-[width,background,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9] ${
                      i === page
                        ? 'w-6 h-2 bg-[#0DACC9]'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={page === totalPages - 1}
                aria-label="Next page"
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-[0.96] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 transition-[background,color,opacity,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <CaseStudyModal project={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  )
}
