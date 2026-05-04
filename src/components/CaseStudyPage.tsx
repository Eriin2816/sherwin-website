import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, CheckCircle2, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import featuredVideoSrc from '../../brand_assets/Claude Final FB compressed FINAL.mp4'

const TECH = ['Remotion', 'TypeScript', 'Claude Code', 'FFmpeg', 'Brand Asset Kit']

const WHAT_WE_BUILT = [
  'Modular scene system: Intro, Problem, Solution, CTA — each independently editable',
  'Brand-locked design system: locked typography scale, color tokens, and spacing',
  'Transition library: smooth cuts, fade-to-black, zoom punches — all on-brand',
  'Audio-reactive accent overlays synced to music beats',
  'Automated export pipeline: renders multiple lengths (15s, 30s, 60s) in one command',
  'Variant system: swap hooks, offers, and CTAs by changing a single config file',
]

const RESULTS = [
  'Turnaround dropped from 3–5 days to under 2 hours per variant',
  'Client produced 12+ ad variations in the first month alone',
  'Consistent brand look across all formats — no freelancer guesswork',
  'Repeatable pipeline now handles seasonal campaign refreshes independently',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
})

function CaseVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <div className="relative premium-card rounded-2xl overflow-hidden">
      <div className="h-8 bg-[hsl(214_44%_8%)] border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="mx-auto text-[10px] text-muted-foreground/40">Case Study Demo — AI Remotion Ad</span>
      </div>
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={featuredVideoSrc}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          controls={playing}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label="Play case study demo"
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/25 transition-colors duration-200 group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#0DACC9] flex items-center justify-center shadow-electric group-hover:scale-105 transition-transform duration-200">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/75 text-sm font-medium">Play Demo</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default function CaseStudyPage() {
  const navigate = useNavigate()

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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0DACC9]/10 border border-[#0DACC9]/25 text-[#0DACC9] uppercase tracking-wide">
              Video Automation
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-muted-foreground uppercase tracking-wide">
              Client Project
            </span>
          </div>
          <h1
            className="font-bold text-foreground tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            AI-Driven Remotion YouTube
            <br />
            <span className="gradient-text">Ad Commercial</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            A fully automated video production pipeline built with Remotion, TypeScript, and Claude Code —
            delivering $100k-quality YouTube and Meta ads at a fraction of the time and cost.
          </p>
        </motion.div>

        {/* Demo Video */}
        <motion.div {...fadeUp(0.1)} className="mb-14">
          <CaseVideoPlayer />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.div {...fadeUp(0.15)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
                Overview
              </p>
              <p className="text-foreground/85 leading-relaxed text-base">
                This project delivers a fully automated, brand-locked video production system for a client running
                YouTube and Meta ad campaigns. Using Remotion (React-based video renderer), TypeScript, and Claude Code
                as the AI coding layer, we built a pipeline that generates polished 15s, 30s, and 60s video ads
                from a single configuration file — without a video editor or external agency.
              </p>
            </motion.div>

            {/* Goal */}
            <motion.div {...fadeUp(0.2)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
                Goal
              </p>
              <div className="premium-card rounded-xl p-6 border-l-2 border-[#0DACC9]/40">
                <p className="text-foreground/85 leading-relaxed">
                  The client needed a repeatable, brand-safe video production system that could produce multiple
                  ad variations per week — consistent in pacing, typography, and visual identity — without
                  relying on a full creative studio or per-project freelancer costs.
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div {...fadeUp(0.25)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
                Solution
              </p>
              <p className="text-foreground/85 leading-relaxed mb-4">
                Built a modular Remotion template system with a brand-locked design system.
                Claude Code accelerated the development of scene components, transition logic, and the
                export pipeline. All brand decisions (colors, fonts, spacing, motion timing) are encoded
                in a single design token file — making every output look like it came from the same studio.
              </p>
              <p className="text-foreground/85 leading-relaxed">
                New ad variants are created by modifying a config file: swap the hook, offer text, CTA,
                and background — Remotion handles the rest. The entire render-to-export cycle runs in minutes.
              </p>
            </motion.div>

            {/* What We Built */}
            <motion.div {...fadeUp(0.3)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
                What We Built
              </p>
              <ul className="space-y-3">
                {WHAT_WE_BUILT.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                    <CheckCircle2 size={15} className="text-[#0DACC9] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Results */}
            <motion.div {...fadeUp(0.35)}>
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
                Results / Outcomes
              </p>
              <ul className="space-y-3">
                {RESULTS.map((item, i) => (
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
                {TECH.map((t) => (
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
              {[
                { label: 'Category', value: 'Video Automation' },
                { label: 'Type', value: 'Client Project' },
                { label: 'Stack', value: 'Remotion + Claude Code' },
                { label: 'Deliverable', value: 'Automated Ad Pipeline' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
                  <span className="text-sm text-foreground/80 font-medium text-right">{value}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA card */}
            <motion.div {...fadeUp(0.3)} className="premium-card electric-border rounded-2xl p-6">
              <p className="text-foreground font-semibold mb-2">Want this for your brand?</p>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                Book a discovery call and I'll outline exactly how to build this for your ad workflow.
              </p>
              <Button
                variant="hero"
                className="w-full"
                onClick={() =>
                  window.open(
                    'https://calendly.com/marcelo-taweng/30minutes-call',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                Request Build
                <ExternalLink size={14} />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          {...fadeUp(0.4)}
          className="premium-card electric-border rounded-2xl px-8 py-10 text-center relative overflow-hidden"
        >
          <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3 relative">
            Ready to Build?
          </p>
          <h2 className="font-bold text-foreground text-2xl md:text-3xl tracking-tight mb-3 relative">
            Let's automate your ad production.
          </h2>
          <p className="text-muted-foreground mb-7 max-w-md mx-auto relative">
            Tell me what you're trying to build and I'll outline the fastest path to production.
          </p>
          <div className="flex flex-wrap justify-center gap-3 relative">
            <Button
              variant="hero"
              onClick={() =>
                window.open(
                  'https://calendly.com/marcelo-taweng/30minutes-call',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              Book a Discovery Call
              <ExternalLink size={14} />
            </Button>
            <Button variant="heroSecondary" onClick={() => navigate('/#projects')}>
              View More Projects
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
