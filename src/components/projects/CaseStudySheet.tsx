import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import {
  motion,
  useDragControls,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type PanInfo,
  type Variants,
} from 'framer-motion'
import { ArrowRight, CheckCircle2, ExternalLink, X } from 'lucide-react'
import type { Project } from '@/data/portfolio'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import PortfolioVideo, { pauseAllPortfolioVideos } from '@/components/PortfolioVideo'
import { CALENDLY_URL, CategoryBadge, ctaLabelFor, fitFor, slidesFor, WorkflowMedia } from './shared'
import { cn } from '@/lib/utils'

/*
 * Springs solved for a critical damping ratio (no overshoot). Stiffness = (2π / response)², damping =
 * 2 × (2π / response), mass 1: the sheet rises over ~0.42 s and leaves over ~0.34 s.
 */
const RISE = { type: 'spring', stiffness: 224, damping: 30, mass: 1 } as const
const LEAVE = { type: 'spring', stiffness: 342, damping: 37, mass: 1 } as const
const ITEM_SPRING = { type: 'spring', stiffness: 131, damping: 23, mass: 1 } as const

const reveal: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
}
const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: { opacity: 1, y: 0, transition: ITEM_SPRING },
}
const revealItemReduced: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.2 } },
}

const LABEL = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground'

function SheetMedia({ project }: { project: Project }) {
  if (project.video) {
    return (
      <div className="dark-stage proj-frame rounded-2xl">
        <PortfolioVideo video={project.video} title={project.title} />
      </div>
    )
  }
  // Screenshots sit on a pale ground in the light theme; a placeholder keeps the navy stage.
  return (
    <div
      className={cn(
        'dark-stage proj-frame relative aspect-video rounded-2xl bg-[hsl(214_44%_7%)]',
        slidesFor(project).length > 0 && 'light:bg-[#E9EFF5]'
      )}
    >
      <WorkflowMedia project={project} fit={fitFor(project)} />
    </div>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          <CheckCircle2 size={15} className="mt-[3px] shrink-0 text-[#0DACC9]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * A case study as a sheet that rises over the page on a spring. A native modal <dialog> (top layer,
 * focus trap, Escape). Grab the handle or the header and pull down to dismiss; a flick is enough.
 * "Next case study" walks the visitor's current list without closing.
 */
export default function CaseStudySheet({
  project,
  list,
  onNavigate,
  onClose,
}: {
  project: Project
  /** The visitor's current filtered list, for the index and "Next". */
  list: Project[]
  onNavigate: (project: Project) => void
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const dragControls = useDragControls()
  const y = useMotionValue(0)
  const [panelHeight, setPanelHeight] = useState(800)
  const [scrolled, setScrolled] = useState(false)
  // The scrim thins out as the sheet is pulled down, so the page shows through the gesture.
  const scrimOpacity = useTransform(y, (v) => 1 - Math.min(1, Math.max(0, v) / panelHeight) * 0.85)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const opener = document.activeElement as HTMLElement | null
    dialog.showModal()
    // Focus the panel itself, so no focus ring flashes on the close button.
    panelRef.current?.focus({ preventScroll: true })
    setPanelHeight(panelRef.current?.offsetHeight ?? 800)
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = ''
      opener?.focus?.({ preventScroll: true })
    }
  }, [])

  // Opened, or moved on with "Next": back to the top, and no video keeps playing behind.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
    setScrolled(false)
    pauseAllPortfolioVideos()
  }, [project.id])

  const startDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduced || event.button !== 0 || (event.target as Element).closest('button, a')) return
    dragControls.start(event)
  }

  const onDragEnd = (_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const height = panelRef.current?.offsetHeight ?? panelHeight
    // Where a flick would carry the sheet: past a third of its height, it closes.
    if (info.offset.y + info.velocity.y * 0.2 > height / 3) onClose()
  }

  const index = list.findIndex((p) => p.id === project.id)
  const next = list.length > 1 && index !== -1 ? list[(index + 1) % list.length] : null
  const item = reduced ? revealItemReduced : revealItem
  const pad2 = (n: number) => String(n).padStart(2, '0')
  const offscreen = typeof window === 'undefined' ? 900 : window.innerHeight

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="case-study-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground outline-none backdrop:bg-transparent"
    >
      {/* Scrim: fades with the sheet, thins while it is dragged. A click on it closes. */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-[rgb(2_6_12/0.72)] light:bg-[rgb(14_27_42/0.38)]"
          style={{ opacity: scrimOpacity }}
        />
      </motion.div>

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        style={{ y }}
        initial={reduced ? { opacity: 0 } : { y: offscreen }}
        animate={reduced ? { opacity: 1 } : { y: 0 }}
        exit={reduced ? { opacity: 0, transition: { duration: 0.18 } } : { y: offscreen, transition: LEAVE }}
        transition={reduced ? { duration: 0.2 } : RISE}
        drag={reduced ? false : 'y'}
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.9 }}
        dragSnapToOrigin
        onDragEnd={onDragEnd}
        className={cn(
          'absolute inset-x-0 bottom-0 top-3 mx-auto flex w-full flex-col overflow-clip outline-none will-change-transform',
          'rounded-t-[24px] bg-[hsl(var(--card))] border border-foreground/10',
          'shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_-20px_60px_-20px_rgba(0,0,0,0.7)]',
          'light:shadow-[0_-20px_60px_-24px_rgba(26,44,82,0.4)]',
          'md:inset-y-7 md:w-[min(1120px,calc(100%-64px))] md:rounded-[24px]',
          'md:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_80px_-24px_rgba(0,0,0,0.8),0_0_0_1px_rgba(13,172,201,0.06)]',
          'light:md:shadow-[0_30px_80px_-28px_rgba(26,44,82,0.45)]'
        )}
      >
        {/* Grab bar */}
        <div
          onPointerDown={startDrag}
          aria-hidden="true"
          className="grid h-7 shrink-0 cursor-grab touch-none select-none place-items-center active:cursor-grabbing"
        >
          <span className="h-[5px] w-10 rounded-full bg-foreground/15" />
        </div>

        {/* Header, also a drag handle */}
        <header
          onPointerDown={startDrag}
          className={cn(
            'flex shrink-0 touch-none select-none items-start justify-between gap-6 px-5 pb-5 transition-shadow duration-200 md:px-12 md:pb-6',
            scrolled && 'shadow-[0_1px_0_hsl(var(--foreground)/0.08)]'
          )}
        >
          <div className="min-w-0">
            <p className={cn(LABEL, 'flex flex-wrap items-center gap-x-3 gap-y-1')}>
              <span>{project.category} · Case study</span>
              {index !== -1 && (
                <span className="tabular-nums text-muted-foreground/70">
                  {pad2(index + 1)} / {pad2(list.length)}
                </span>
              )}
            </p>
            <h2
              id="case-study-title"
              className="mt-2.5 max-w-[24ch] text-balance text-[1.6rem] font-bold leading-[1.05] tracking-[-0.035em] text-foreground md:text-[2.4rem]"
            >
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-foreground/[0.06] text-foreground transition-[background-color,transform] duration-150 hover:bg-[#0DACC9]/15 active:scale-[0.92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
          >
            <X size={19} />
          </button>
        </header>

        <div
          ref={bodyRef}
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-12 pt-2 md:px-12 md:pb-16"
        >
          <motion.div key={project.id} variants={reveal} initial="hidden" animate="shown" className="grid gap-10">
            {/* Lead: the work itself, the summary beside it */}
            <motion.div variants={item} className="grid gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center lg:gap-9">
              <SheetMedia project={project} />
              <div className="grid content-center gap-3.5">
                <CategoryBadge category={project.category} />
                <p className="font-semibold leading-snug text-[#0DACC9]">{project.subtitle}</p>
                <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{project.description}</p>
                {project.highlights && (
                  <ul className="mt-1 grid gap-2 border-t border-foreground/[0.08] pt-4">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0DACC9]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            {/* Problem and Solution side by side */}
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-12">
              <motion.section variants={item}>
                <h3 className={cn(LABEL, 'mb-3.5')}>Problem</h3>
                <p className="text-[15px] leading-[1.75] text-muted-foreground md:text-base">{project.problem}</p>
              </motion.section>
              <motion.section variants={item}>
                <h3 className={cn(LABEL, 'mb-3.5')}>Solution</h3>
                <CheckList items={project.solution} />
              </motion.section>
            </div>

            {project.capabilities && (
              <motion.section variants={item}>
                <h3 className={cn(LABEL, 'mb-3.5')}>Key Platform Capabilities</h3>
                <CheckList items={project.capabilities} />
              </motion.section>
            )}

            <motion.section variants={item}>
              <h3 className={cn(LABEL, 'mb-3.5')}>Outcome</h3>
              <CheckList items={project.outcome} />
            </motion.section>

            <motion.section variants={item}>
              <h3 className={cn(LABEL, 'mb-3.5')}>Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-[#0DACC9]/25 bg-[#0DACC9]/10 px-3 py-1.5 text-xs font-semibold text-[#0DACC9]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <LiquidButton size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
                <ExternalLink size={14} />
              </LiquidButton>
              <LiquidButton variant="electric" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {ctaLabelFor(project)}
                <ExternalLink size={14} />
              </LiquidButton>
            </motion.div>

            {next && (
              <motion.nav variants={item} aria-label="More case studies" className="border-t border-foreground/[0.08]">
                <button
                  type="button"
                  onClick={() => onNavigate(next)}
                  className="group/next grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 rounded-sm pb-1 pt-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
                >
                  <span className={cn(LABEL, 'col-span-2')}>Next case study</span>
                  <span className="text-balance text-xl font-bold leading-tight tracking-[-0.03em] text-foreground md:text-[1.75rem]">
                    {next.title}
                  </span>
                  <ArrowRight
                    size={24}
                    className="text-muted-foreground transition-[transform,color] duration-[440ms] ease-[var(--ease-spring)] group-hover/next:translate-x-1.5 group-hover/next:text-[#0DACC9]"
                  />
                </button>
              </motion.nav>
            )}
          </motion.div>
        </div>
      </motion.div>
    </dialog>
  )
}
