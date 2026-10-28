import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, ArrowRight, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionBackground from '@/components/SectionBackground'
import { projects, type Project } from '@/data/portfolio'
import { ctaLabelFor } from '@/components/projects/shared'

// The featured project is the grid record marked `featured`, so its title, video, poster and
// stack can never drift from the portfolio card and case study.
const featured = projects.find((p) => p.featured && p.video)

const WHO_ITS_FOR = [
  'Artists developing concept-led music videos',
  'Creative teams combining generated footage with motion graphics',
  'Developers exploring code-driven media workflows',
]

const IMPACT = [
  'A completed, full-length music video',
  'Shot and lyric revisions driven by data instead of a manual re-edit',
  'Measured audio timing and visual occlusion checks',
]

function VideoPlayer({ project, videoRef, playing, onPlay }: {
  project: Project
  videoRef: React.RefObject<HTMLVideoElement>
  playing: boolean
  onPlay: () => void
}) {
  return (
    <div className="dark-stage relative bg-[hsl(214_44%_6%)] overflow-hidden">
      {/* Browser chrome */}
      <div className="h-8 bg-[hsl(214_44%_8%)] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="mx-auto text-[10px] text-muted-foreground/40 tracking-wide">
          {project.title.split(' — ')[0]} — Music Video
        </div>
      </div>

      {/* Video container */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          src={project.video?.src}
          poster={project.video?.poster}
          className="w-full h-full object-cover"
          playsInline
          preload="none"
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
            aria-label={`Play ${project.title}`}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors duration-200 group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#0DACC9] flex items-center justify-center shadow-electric group-hover:scale-105 transition-transform duration-200">
                <Play size={26} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/80 text-sm font-medium">Watch Video</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default function FeaturedProject() {
  if (!featured) return null
  return <FeaturedShowcase project={featured} />
}

function FeaturedShowcase({ project }: { project: Project }) {
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
            {project.title}
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
            <VideoPlayer project={project} videoRef={videoRef} playing={playing} onPlay={handlePlay} />
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
          </div>

          {/* CTA row */}
          <div className="px-7 py-5 border-t border-border/30 flex flex-wrap gap-3 items-center">
            <LiquidButton size="sm" className="px-5" onClick={handleWatchDemo}>
              <Play size={13} fill="currentColor" />
              Watch Video
            </LiquidButton>

            <LiquidButton variant="glass" size="sm" className="px-5" onClick={() => navigate(`/case-study/${project.id}`)}>
              View Case Study
              <ArrowRight size={14} className="transition-transform duration-300 group-hover/liquid:translate-x-0.5" />
            </LiquidButton>

            <LiquidButton
              variant="electric"
              size="sm"
              className="px-5"
              href="https://calendly.com/marcelo-taweng/30minutes-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaLabelFor(project)}
              <ExternalLink size={12} />
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
