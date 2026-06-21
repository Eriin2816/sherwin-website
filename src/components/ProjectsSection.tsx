import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Layers, ChevronLeft, ChevronRight, X, CheckCircle2, ExternalLink } from 'lucide-react'
import { projects, type Project } from '@/data/portfolio'
import { Button } from '@/components/ui/button'
import SectionBackground from '@/components/SectionBackground'

const CALENDLY_URL = 'https://calendly.com/marcelo-taweng/30minutes-call'

const categoryColors: Record<string, string> = {
  Automation: 'text-[#0DACC9] bg-[#0DACC9]/10 border-[#0DACC9]/20',
  GoHighLevel: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Web Dev': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'n8n': 'text-[#0DACC9] bg-[#0DACC9]/10 border-[#0DACC9]/20',
  'AI': 'text-[#0DACC9] bg-[#0DACC9]/10 border-[#0DACC9]/20',
  'GHL': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
}

// ── Case Study Modal ──────────────────────────────────────────────────────────

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
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
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto premium-card rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/15 transition-[background,color] duration-200"
          >
            <X size={14} />
          </button>

          {/* Modal image */}
          <div className="w-full aspect-video bg-[hsl(214_44%_7%)] border-b border-white/6 relative overflow-hidden rounded-t-2xl">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0DACC9]/15 border border-[#0DACC9]/25 flex items-center justify-center">
                    <Layers size={22} className="text-[#0DACC9]" />
                  </div>
                  <span className="text-muted-foreground/50 text-xs font-medium uppercase tracking-widest">
                    Preview Coming Soon
                  </span>
                </div>
              </div>
            )}
          </div>

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
            <Button
              variant="hero"
              className="w-full"
              onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
            >
              Book a Call
              <ExternalLink size={14} />
            </Button>
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
      className="group relative premium-card rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Top image or color band */}
      {project.image ? (
        <div className="relative overflow-hidden shrink-0" style={{ height: '168px' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060f18]/70 via-transparent to-transparent" />
        </div>
      ) : (
        <div className="h-1 w-full bg-gradient-to-r from-[#0DACC9]/60 via-[#34D4F0]/80 to-[#0DACC9]/40 shrink-0" />
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
          <button
            onClick={() => onViewCaseStudy(project)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-white/12 bg-white/4 text-foreground/75 hover:bg-white/8 hover:text-foreground hover:border-white/20 transition-[background,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
          >
            View Case Study
            <ArrowUpRight size={12} />
          </button>
          <button
            onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0DACC9]/15 border border-[#0DACC9]/30 text-[#0DACC9] hover:bg-[#0DACC9]/25 hover:border-[#0DACC9]/50 transition-[background,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
          >
            Request Build
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Hover corner indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-7 h-7 rounded-full bg-[#0DACC9]/15 border border-[#0DACC9]/30 flex items-center justify-center">
          <ArrowUpRight size={13} className="text-[#0DACC9]" />
        </div>
      </div>
    </motion.article>
  )
}

// ── Projects Section ──────────────────────────────────────────────────────────

const CARDS_PER_PAGE = 3

export default function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [page, setPage] = useState(0)
  const [activeModal, setActiveModal] = useState<Project | null>(null)

  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE)
  const visibleProjects = projects.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])

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
            className="mb-12"
          >
            <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
              Portfolio & Case Studies
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2
                  className="font-bold text-foreground tracking-tight leading-tight mb-4"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  Projects That Ship
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                  Real systems built for real businesses — not demos, not mockups.
                </p>
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-muted-foreground/50 text-xs tabular-nums">
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={prev}
                  disabled={page === 0}
                  aria-label="Previous page"
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-[background,color,opacity] duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  disabled={page === totalPages - 1}
                  aria-label="Next page"
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-[background,color,opacity] duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {visibleProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onViewCaseStudy={setActiveModal}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dot pagination */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`rounded-full transition-[width,background,opacity] duration-300 ${
                  i === page
                    ? 'w-6 h-2 bg-[#0DACC9]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <CaseStudyModal project={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  )
}
