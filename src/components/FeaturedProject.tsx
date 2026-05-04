import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, ArrowRight, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import SectionBackground from '@/components/SectionBackground'
// Place your MP4 at: brand_assets/Claude Final FB compressed FINAL.mp4
// Vite serves it as a static asset via the assetsInclude config
import featuredVideoSrc from '../../brand_assets/Claude Final FB compressed FINAL.mp4'

const TECH_STACK = ['Remotion', 'TypeScript', 'Claude Code', 'FFmpeg', 'Brand Asset Kit']

const WHO_ITS_FOR = [
  'Brands running YouTube/Meta ads that need premium creatives fast',
  'Agencies producing multiple ad variations per week',
  'Teams who want consistent brand-safe motion design without a full studio',
]

const IMPACT = [
  '$100k-commercial look with consistent pacing, typography, and polish',
  'Faster iteration: new scenes, hooks, and CTAs in minutes (not days)',
  'Repeatable pipeline for versioning (different offers, lengths, and formats)',
]

function VideoPlayer({ videoRef, playing, onPlay }: {
  videoRef: React.RefObject<HTMLVideoElement>
  playing: boolean
  onPlay: () => void
}) {
  return (
    <div className="relative bg-[hsl(214_44%_6%)] overflow-hidden">
      {/* Browser chrome */}
      <div className="h-8 bg-[hsl(214_44%_8%)] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="mx-auto text-[10px] text-muted-foreground/40 tracking-wide">
          AI-Driven YouTube Ad — Remotion Demo
        </div>
      </div>

      {/* Video container */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          src={featuredVideoSrc}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          controls={playing}
          onPause={() => {/* handled by parent */}}
          onEnded={() => {/* handled by parent */}}
          onClick={() => {
            if (playing && videoRef.current) {
              videoRef.current.pause()
            }
          }}
        />

        {/* Play overlay — visible when paused */}
        {!playing && (
          <button
            onClick={onPlay}
            aria-label="Play demo video"
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors duration-200 group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#0DACC9] flex items-center justify-center shadow-electric group-hover:scale-105 transition-transform duration-200">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/80 text-sm font-medium">Watch Demo</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [playing, setPlaying] = useState(false)
  const navigate = useNavigate()

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const handleWatchDemo = () => {
    handlePlay()
    videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Keep overlay in sync with native video state
  const handleVideoStateChange = () => {
    if (videoRef.current) {
      setPlaying(!videoRef.current.paused)
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <SectionBackground variant="blue-right" />
      <div className="absolute inset-0 animated-grid-bg opacity-25 pointer-events-none" />

      <div className="section-shell relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
            Featured Project
          </p>
          <h2
            className="font-bold text-foreground tracking-tight leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            AI-Driven Remotion YouTube Ad Commercial
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="premium-card rounded-2xl overflow-hidden"
        >
          {/* Video Player */}
          <div onPause={handleVideoStateChange} onPlay={handleVideoStateChange}>
            <VideoPlayer videoRef={videoRef} playing={playing} onPlay={handlePlay} />
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border/30">
            {/* Who It's For */}
            <div className="p-7">
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-wide mb-4">
                Who It's For
              </p>
              <ul className="space-y-3">
                {WHO_ITS_FOR.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-[#0DACC9] mt-0.5 shrink-0 font-bold">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact & Benefits */}
            <div className="p-7">
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-wide mb-4">
                Impact & Benefits
              </p>
              <ul className="space-y-3">
                {IMPACT.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-[#34D4F0] mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div className="p-7">
              <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-wide mb-4">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0DACC9]/10 border border-[#0DACC9]/25 text-[#0DACC9]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA row */}
          <div className="px-7 py-5 border-t border-border/30 flex flex-wrap gap-3 items-center">
            <Button
              variant="hero"
              size="sm"
              onClick={handleWatchDemo}
            >
              <Play size={13} fill="currentColor" />
              Watch Demo
            </Button>

            <Button
              variant="heroSecondary"
              size="sm"
              onClick={() => navigate('/case-study')}
            >
              View Case Study
              <ArrowRight size={14} />
            </Button>

            <Button
              variant="electric"
              size="sm"
              onClick={() =>
                window.open(
                  'https://calendly.com/marcelo-taweng/30minutes-call',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              Request Build
              <ExternalLink size={12} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
