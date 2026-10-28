import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, CheckCircle2, ExternalLink } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { projects, type Project } from '@/data/portfolio'
import { ctaLabelFor } from '@/components/projects/shared'

const CALENDLY_URL = 'https://calendly.com/marcelo-taweng/30minutes-call'

/** Everything the detail-page template shows. The markup is shared; only this content differs. */
interface CaseStudyContent {
  metaTitle: string
  metaDescription: string
  videoSrc: string
  poster?: string
  chromeLabel: string
  playLabel: string
  badges: string[]
  title: string
  titleAccent: string
  lede: string
  overview: { label: string; text: string }
  goal: { label: string; text: string }
  solution?: { label: string; paragraphs: string[] }
  built: { label: string; items: string[] }
  challenges?: { label: string; items: string[] }
  results: { label: string; items: string[] }
  tech: string[]
  details: { label: string; value: string }[]
  cta: { title: string; body: string; button: string }
  banner: { eyebrow: string; title: string; body: string }
}

/** The original Remotion commercial at /case-study (claims limited to what the build itself shows). */
const AD_CASE_STUDY: CaseStudyContent = {
  metaTitle: 'AI-Driven Remotion YouTube Ad Commercial | Sherwin Marcelo',
  metaDescription:
    'A Remotion, TypeScript, and Claude Code pipeline that produces branded YouTube and Meta ad variants from reusable templates.',
  videoSrc: '/videos/featured.mp4',
  chromeLabel: 'Case Study Demo — AI Remotion Ad',
  playLabel: 'Play Demo',
  badges: ['Video Automation', 'Client Project'],
  title: 'AI-Driven Remotion YouTube',
  titleAccent: 'Ad Commercial',
  lede: 'A video production pipeline built with Remotion, TypeScript, and Claude Code for producing branded YouTube and Meta ads from reusable templates.',
  overview: {
    label: 'Overview',
    text: 'This project delivers a brand-locked video production system for a client running YouTube and Meta ad campaigns. Using Remotion (React-based video renderer), TypeScript, and Claude Code as the AI coding layer, we built a pipeline that generates 15s, 30s, and 60s video ads from a single configuration file — without a video editor or external agency.',
  },
  goal: {
    label: 'Goal',
    text: 'The client needed a repeatable, brand-safe video production system that could produce multiple ad variations — consistent in pacing, typography, and visual identity — without relying on a full creative studio or per-project freelancer costs.',
  },
  solution: {
    label: 'Solution',
    paragraphs: [
      'Built a modular Remotion template system with a brand-locked design system. Claude Code accelerated the development of scene components, transition logic, and the export pipeline. All brand decisions (colors, fonts, spacing, motion timing) are encoded in a single design token file, so every output follows the same visual rules.',
      'New ad variants are created by modifying a config file: swap the hook, offer text, CTA, and background — Remotion handles the rendering and export.',
    ],
  },
  built: {
    label: 'What We Built',
    items: [
      'Modular scene system: Intro, Problem, Solution, CTA — each independently editable',
      'Brand-locked design system: locked typography scale, color tokens, and spacing',
      'Transition library: smooth cuts, fade-to-black, zoom punches — all on-brand',
      'Audio-reactive accent overlays synced to music beats',
      'Automated export pipeline: renders multiple lengths (15s, 30s, 60s) in one command',
      'Variant system: swap hooks, offers, and CTAs by changing a single config file',
    ],
  },
  results: {
    label: 'Results / Outcomes',
    items: [
      'New ad variants come from editing one configuration file instead of a manual re-edit',
      'Multiple lengths (15s, 30s, 60s) render from the same template',
      'Consistent brand look across all formats — no freelancer guesswork',
      'A repeatable pipeline for seasonal campaign refreshes',
    ],
  },
  tech: ['Remotion', 'TypeScript', 'Claude Code', 'FFmpeg', 'Brand Asset Kit'],
  details: [
    { label: 'Category', value: 'Video Automation' },
    { label: 'Type', value: 'Client Project' },
    { label: 'Stack', value: 'Remotion + Claude Code' },
    { label: 'Deliverable', value: 'Automated Ad Pipeline' },
  ],
  cta: {
    title: 'Want this for your brand?',
    body: "Book a discovery call and I'll outline exactly how to build this for your ad workflow.",
    button: 'Request Build',
  },
  banner: {
    eyebrow: 'Ready to Build?',
    title: "Let's automate your ad production.",
    body: "Tell me what you're trying to build and I'll outline the fastest path to production.",
  },
}

const formatDuration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`

/** A featured portfolio record rendered through the same template (e.g. /case-study/skull-key). */
function projectCaseStudy(project: Project): CaseStudyContent | null {
  if (!project.video) return null
  const [title, titleAccent = ''] = project.title.split(' — ')
  const [kind, state] = project.subtitle.split(' · ')
  return {
    metaTitle: `${project.title} | Sherwin Marcelo`,
    metaDescription: project.description,
    videoSrc: project.video.src,
    poster: project.video.poster,
    chromeLabel: `${title} — Music Video`,
    playLabel: 'Play Video',
    badges: [project.category, kind].filter(Boolean),
    title,
    titleAccent,
    lede: project.description,
    overview: { label: 'My Role', text: project.role ?? project.impact },
    goal: { label: 'The Challenge', text: project.problem },
    built: { label: 'What I Built', items: project.solution },
    challenges: project.challenges ? { label: 'What Made It Hard', items: project.challenges } : undefined,
    results: { label: 'Outcome', items: project.outcome },
    tech: project.tech,
    details: [
      { label: 'Category', value: project.category },
      { label: 'Type', value: kind ?? '' },
      { label: 'Length', value: formatDuration(project.video.duration) },
      ...(state ? [{ label: 'Status', value: state }] : []),
    ],
    cta: {
      title: 'Want a video like this?',
      body: "Book a discovery call and I'll outline how to plan and build a concept-led video for your project.",
      button: ctaLabelFor(project),
    },
    banner: {
      eyebrow: 'Ready to Build?',
      title: "Let's plan your next video.",
      body: "Tell me what you're trying to make and I'll outline a realistic production path.",
    },
  }
}

/** Sets this page's title and description, restoring the previous values on the way out. */
function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previous = { title: document.title, description: meta?.content ?? '' }
    document.title = title
    meta?.setAttribute('content', description)
    return () => {
      document.title = previous.title
      meta?.setAttribute('content', previous.description)
    }
  }, [title, description])
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

function CaseVideoPlayer({ content }: { content: CaseStudyContent }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <div className="dark-stage relative premium-card rounded-2xl overflow-hidden">
      <div className="h-8 bg-[hsl(214_44%_8%)] border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="mx-auto text-[10px] text-muted-foreground/40">{content.chromeLabel}</span>
      </div>
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={content.videoSrc}
          poster={content.poster}
          className="w-full h-full object-cover"
          playsInline
          preload={content.poster ? 'none' : 'metadata'}
          controls={playing}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label={`${content.playLabel}: ${content.title} ${content.titleAccent}`}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/25 transition-colors duration-200 group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#0DACC9] flex items-center justify-center shadow-electric group-hover:scale-105 transition-transform duration-200">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/75 text-sm font-medium">{content.playLabel}</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  if (!slug) return <CaseStudyTemplate content={AD_CASE_STUDY} />
  const project = projects.find((p) => p.id === slug && p.featured)
  const content = project ? projectCaseStudy(project) : null
  if (!content) return <Navigate to="/" replace />
  return <CaseStudyTemplate content={content} />
}

function CaseStudyTemplate({ content }: { content: CaseStudyContent }) {
  const navigate = useNavigate()
  usePageMeta(content.metaTitle, content.metaDescription)

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Background glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#0DACC9]/4 blur-[120px] pointer-events-none" />

      <div className="section-shell relative">
        {/* Back button */}
        <motion.div {...fadeUp(0)} className="mb-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Portfolio
          </button>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {content.badges.map((badge, i) => (
              <span
                key={badge}
                className={
                  i === 0
                    ? 'px-3 py-1 rounded-full text-xs font-semibold bg-[#0DACC9]/10 border border-[#0DACC9]/25 text-[#0DACC9] uppercase tracking-wide'
                    : 'px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-muted-foreground uppercase tracking-wide'
                }
              >
                {badge}
              </span>
            ))}
          </div>
          <h1
            className="font-bold text-foreground tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {content.title}
            <br />
            <span className="gradient-text">{content.titleAccent}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">{content.lede}</p>
        </motion.div>

        {/* Demo Video */}
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <CaseVideoPlayer content={content} />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.div {...fadeUp(0.15)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
                {content.overview.label}
              </p>
              <p className="text-foreground/85 leading-relaxed text-base">{content.overview.text}</p>
            </motion.div>

            {/* Goal */}
            <motion.div {...fadeUp(0.2)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
                {content.goal.label}
              </p>
              <div className="premium-card rounded-xl p-6 border-l-2 border-[#0DACC9]/40">
                <p className="text-foreground/85 leading-relaxed">{content.goal.text}</p>
              </div>
            </motion.div>

            {/* Solution */}
            {content.solution && (
              <motion.div {...fadeUp(0.25)}>
                <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
                  {content.solution.label}
                </p>
                {content.solution.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className={`text-foreground/85 leading-relaxed${i < content.solution!.paragraphs.length - 1 ? ' mb-4' : ''}`}
                  >
                    {text}
                  </p>
                ))}
              </motion.div>
            )}

            {/* What We Built */}
            <motion.div {...fadeUp(0.3)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
                {content.built.label}
              </p>
              <ul className="space-y-3">
                {content.built.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                    <CheckCircle2 size={15} className="text-[#0DACC9] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Challenges (optional) */}
            {content.challenges && (
              <motion.div {...fadeUp(0.32)}>
                <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
                  {content.challenges.label}
                </p>
                <ul className="space-y-3">
                  {content.challenges.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span className="text-[#0DACC9] shrink-0 mt-0.5 font-bold">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Results */}
            <motion.div {...fadeUp(0.35)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
                {content.results.label}
              </p>
              <ul className="space-y-3">
                {content.results.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                    <span className="text-[#34D4F0] shrink-0 mt-0.5 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-6">
            {/* Tech Stack card */}
            <motion.div {...fadeUp(0.2)} className="premium-card rounded-2xl p-6">
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {content.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0DACC9]/10 border border-[#0DACC9]/25 text-[#0DACC9]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project details */}
            <motion.div {...fadeUp(0.25)} className="premium-card rounded-2xl p-6 space-y-4">
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-2">
                Project Details
              </p>
              {content.details.map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
                  <span className="text-sm text-foreground/80 font-medium text-right">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA card */}
            <motion.div {...fadeUp(0.3)} className="premium-card electric-border rounded-2xl p-6">
              <p className="text-foreground font-semibold mb-2">{content.cta.title}</p>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{content.cta.body}</p>
              <LiquidButton
                className="w-full"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.cta.button}
                <ExternalLink size={14} />
              </LiquidButton>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          {...fadeUp(0.4)}
          className="premium-card electric-border rounded-2xl px-8 py-10 text-center relative overflow-hidden"
        >
          <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3 relative">
            {content.banner.eyebrow}
          </p>
          <h2 className="font-bold text-foreground text-2xl md:text-3xl tracking-tight mb-3 relative">
            {content.banner.title}
          </h2>
          <p className="text-muted-foreground mb-7 max-w-md mx-auto relative">{content.banner.body}</p>
          <div className="flex flex-wrap justify-center gap-3 relative">
            <LiquidButton
              size="lg"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Discovery Call
              <ExternalLink size={14} />
            </LiquidButton>
            <LiquidButton variant="glass" size="lg" onClick={() => navigate('/#projects')}>
              View More Projects
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
