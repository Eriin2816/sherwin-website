import { useRef, useState, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Images, Layers } from 'lucide-react'
import { projects, projectFilters, type Project } from '@/data/portfolio'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionBackground from '@/components/SectionBackground'
import PortfolioVideo from '@/components/PortfolioVideo'
import SystemPlaceholder from '@/components/motion/SystemPlaceholder'
import CaseStudySheet from '@/components/projects/CaseStudySheet'
import { CALENDLY_URL, CategoryBadge, ctaLabelFor, fitFor, slidesFor } from '@/components/projects/shared'
import { cn } from '@/lib/utils'
import { trackSpotlight } from '@/lib/motion'

type OpenCaseStudy = (project: Project) => void

// ── Card media: the work inset in a clean frame ───────────────────────────────

/**
 * The picture sits inset in its card with matching corners and a hairline drawn over it. Screenshots
 * are the deeper layer: they drift inside the frame while the card crosses the screen and zoom on hover
 * (both in index.css: .proj-shot). Video keeps the standard 4:3 player.
 */
function CardMedia({ project, lead, onOpen }: { project: Project; lead: boolean; onOpen: OpenCaseStudy }) {
  if (project.video) {
    return (
      <div className={cn('dark-stage proj-frame shrink-0', lead && 'lg:self-center')}>
        <PortfolioVideo video={project.video} title={project.title} />
      </div>
    )
  }

  const slides = slidesFor(project)
  const frame = cn(
    'dark-stage proj-frame relative block w-full shrink-0 bg-[hsl(214_44%_7%)] aspect-[16/10]',
    lead && 'aspect-video lg:aspect-auto lg:h-full lg:min-h-[340px]'
  )

  if (slides.length === 0) {
    return (
      <div className={frame}>
        <SystemPlaceholder className="absolute inset-0" />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Open the ${project.title} case study`}
      className={cn(frame, 'cursor-zoom-in light:bg-[#E9EFF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#34D4F0]')}
    >
      <img src={slides[0]} alt="" loading="lazy" decoding="async" className="proj-shot shot-soft" />
      {slides.length > 1 && (
        <span className="absolute left-3 top-3 z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/85 backdrop-blur-md">
          <Images size={11} className="text-[#34D4F0]" />
          {slides.length} screens
        </span>
      )}
    </button>
  )
}

/** The lift-on-hover shadow, faded in with opacity so only opacity animates. */
function FloatShadow() {
  return <span aria-hidden="true" className="proj-float" />
}

function CardActions({ project, onOpen, className }: { project: Project; onOpen: OpenCaseStudy; className?: string }) {
  return (
    <div className={cn('flex gap-2 border-t border-white/6 pt-4', className)}>
      <LiquidButton variant="glass" size="sm" className="flex-1 px-3" onClick={() => onOpen(project)}>
        View Case Study
        <ArrowUpRight size={12} className="transition-transform duration-[440ms] ease-[var(--ease-spring)] group-hover/liquid:translate-x-0.5 group-hover/liquid:-translate-y-0.5" />
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
  )
}

// ── Project Card (the first card on a page leads as a featured row) ──────────

function ProjectCard({ project, lead, onOpen }: { project: Project; lead: boolean; onOpen: OpenCaseStudy }) {
  return (
    <article
      onPointerMove={trackSpotlight}
      className={cn(
        'proj-card spotlight premium-card group relative flex h-full flex-col rounded-[22px] p-2',
        lead && 'lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-stretch'
      )}
    >
      <FloatShadow />
      <CardMedia project={project} lead={lead} onOpen={onOpen} />

      <div className={cn('relative z-[1] flex flex-1 flex-col px-5 pb-5 pt-6', lead && 'lg:px-8 lg:py-7')}>
        <CategoryBadge category={project.category} className="mb-4" />

        <h3 className={cn('mb-1 font-bold leading-snug tracking-[-0.015em] text-foreground', lead ? 'text-xl md:text-[1.7rem] md:leading-tight' : 'text-lg')}>
          {project.title}
        </h3>
        <p className="mb-4 text-sm font-medium text-[#0DACC9]">{project.subtitle}</p>

        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {project.highlights ? (
          <ul className="mb-5 space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-0.5 shrink-0 font-bold text-[#0DACC9]">•</span>
                {h}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mb-5 rounded-xl border border-[#0DACC9]/15 bg-[#0DACC9]/5 px-4 py-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0DACC9]">Impact</p>
            <p className="text-sm leading-relaxed text-foreground/80">{project.impact}</p>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <CardActions project={project} onOpen={onOpen} className={cn('mt-auto', lead && 'lg:max-w-md')} />
      </div>
    </article>
  )
}

// ── SaaS Project Card (flagship: a full row, picture beside the words) ────────

function SaaSProjectCard({ project, onOpen }: { project: Project; onOpen: OpenCaseStudy }) {
  const fit = fitFor(project)
  return (
    <article
      onPointerMove={trackSpotlight}
      className="proj-card spotlight premium-card group relative rounded-[22px] p-2"
    >
      <FloatShadow />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-7">
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open the ${project.title} case study`}
          className="dark-stage proj-frame relative block aspect-video w-full cursor-zoom-in self-start bg-[hsl(214_44%_7%)] light:bg-[#E9EFF5] lg:self-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#34D4F0]"
        >
          <img
            src={project.image}
            alt={`${project.title} application interface`}
            loading="lazy"
            decoding="async"
            className={cn('shot-soft proj-shot', fit === 'cover' ? 'proj-shot--app' : 'proj-shot--contain')}
          />
        </button>

        <div className="relative z-[1] flex min-w-0 flex-col px-4 pb-4 pt-2 lg:py-5 lg:pr-6">
          <CategoryBadge category={project.category} className="mb-3" />
          <h3 className="mb-1 text-lg font-bold leading-snug tracking-tight text-foreground md:text-xl">{project.title}</h3>
          <p className="mb-2.5 text-sm font-medium text-[#0DACC9]">{project.subtitle}</p>
          <p className="mb-3.5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

          {project.highlights && (
            <ul className="mb-3.5 space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-0.5 shrink-0 font-bold text-[#0DACC9]">•</span>
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-white/8 bg-white/3 px-2.5 py-0.5 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          <CardActions project={project} onOpen={onOpen} className="mt-auto max-w-md pt-3.5" />
        </div>
      </div>
    </article>
  )
}

// ── Pages ─────────────────────────────────────────────────────────────────────

/** A desktop page is three rows of three cells: a featured row, then two rows of cards. */
const PAGE_CELLS = 9

type Slot = { project: Project; lead: boolean }

/**
 * Packs a list into pages of three rows: the first regular card on each page leads as a featured row,
 * flagship SaaS cards also take a full row, every other card one cell. A card that would overflow the
 * page starts the next one.
 */
function paginate(list: Project[]): Slot[][] {
  const pages: Slot[][] = []
  let page: Slot[] = []
  let cells = 0
  let hasLead = false

  for (const project of list) {
    const saas = project.type === 'saas'
    let lead = !saas && !hasLead
    let width = saas || lead ? 3 : 1
    if (page.length && cells + width > PAGE_CELLS) {
      pages.push(page)
      page = []
      cells = 0
      hasLead = false
      lead = !saas
      width = saas || lead ? 3 : 1
    }
    page.push({ project, lead })
    cells += width
    if (lead) hasLead = true
  }
  if (page.length) pages.push(page)
  return pages
}

// The default "All" tab leads with visual work; everything else keeps data order.
const ALL_TAB_LEAD = ['ai-video', 'video-editing']

function allTabRank(project: Project) {
  const rank = ALL_TAB_LEAD.findIndex((id) => project.filters.includes(id))
  return rank === -1 ? ALL_TAB_LEAD.length : rank
}

const allTabProjects = [...projects].sort((a, b) => allTabRank(a) - allTabRank(b))

// ── Projects Section ──────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(0)
  const [activeCase, setActiveCase] = useState<Project | null>(null)

  const filtered = useMemo(
    () => (filter === 'all' ? allTabProjects : projects.filter((p) => p.filters.includes(filter))),
    [filter]
  )
  const pages = useMemo(() => paginate(filtered), [filtered])
  const totalPages = Math.max(1, pages.length)
  const current = Math.min(page, totalPages - 1)
  const slots = pages[current] ?? []

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])

  const selectFilter = useCallback((id: string) => {
    setFilter(id)
    setPage(0)
  }, [])

  return (
    <>
      <section id="projects" className="projects-timeline relative overflow-hidden py-20">
        <SectionBackground variant="grid-fade" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0DACC9]/3 blur-[120px]" />

        <div className="section-shell relative z-10">
          {/* Header: a light-and-bold title, the eyebrow's rules fill as you scroll the section */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="mb-4 flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-widest text-[#0DACC9]">
              <span className="section-rule section-rule--start" aria-hidden="true" />
              Portfolio & Case Studies
              <span className="section-rule" aria-hidden="true" />
            </p>
            <h2
              className="mb-4 leading-[1.05] tracking-[-0.035em] text-foreground"
              style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.6rem)' }}
            >
              <span className="font-light">Projects That</span> <span className="font-bold">Ship</span>
            </h2>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
              Real systems built for real businesses — not demos, not mockups.
            </p>
          </motion.div>

          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-2"
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

          {/* Cards: a featured row, then two rows of cards. Cells rise in as they scroll into view. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${current}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-flow-row-dense grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {slots.map(({ project, lead }) => {
                const saas = project.type === 'saas'
                return (
                  <div key={project.id} className={cn('scroll-rise min-w-0', (saas || lead) && 'col-span-full')}>
                    {saas ? (
                      <SaaSProjectCard project={project} onOpen={setActiveCase} />
                    ) : (
                      <ProjectCard project={project} lead={lead} onOpen={setActiveCase} />
                    )}
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {slots.length === 0 && (
            <div className="premium-card flex flex-col items-center gap-3 rounded-2xl py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#0DACC9]/25 bg-[#0DACC9]/15">
                <Layers size={22} className="text-[#0DACC9]" />
              </div>
              <p className="font-semibold text-foreground">Case studies coming soon</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                New builds in this category are being documented. Book a call to see the work in progress.
              </p>
            </div>
          )}

          {/* Pagination: arrows + dots */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                disabled={current === 0}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-muted-foreground transition-[background,color,opacity,transform] duration-200 hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30 disabled:active:scale-100"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={i === current}
                    className={`rounded-full transition-[width,background,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9] ${
                      i === current ? 'h-2 w-6 bg-[#0DACC9]' : 'h-2 w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                disabled={current === totalPages - 1}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-muted-foreground transition-[background,color,opacity,transform] duration-200 hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-30 disabled:active:scale-100"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Case study sheet */}
      <AnimatePresence>
        {activeCase && (
          <CaseStudySheet
            key="case-study-sheet"
            project={activeCase}
            list={filtered}
            onNavigate={setActiveCase}
            onClose={() => setActiveCase(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
