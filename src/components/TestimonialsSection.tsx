import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'
import { testimonials } from '@/data/portfolio'
import SectionBackground from '@/components/SectionBackground'

const testimonialVideo = '/videos/testimonial.mp4'
const pad2 = (n: number) => String(n).padStart(2, '0')

/** One band of the ledger: a hairline that draws in, the quote set large, who said it. */
function QuoteBand({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <blockquote className="scroll-rise relative m-0 grid gap-5 py-9">
      <span aria-hidden="true" className="ledger-rule absolute inset-x-0 top-0 h-px origin-left bg-foreground/15" />
      <p
        className="m-0 font-light leading-[1.32] tracking-[-0.02em] text-foreground/90"
        style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.75rem)' }}
      >
        “{testimonial.quote}”
      </p>
      <footer className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0DACC9]/25 bg-[#0DACC9]/15 text-xs font-bold tracking-normal text-[#0DACC9]">
          {testimonial.author.charAt(0)}
        </span>
        {testimonial.author}
      </footer>
    </blockquote>
  )
}

function TestimonialVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <div className="dark-stage premium-card overflow-hidden rounded-2xl">
      {/* Browser chrome bar */}
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-white/5 bg-[hsl(214_44%_8%)] px-4">
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="mx-auto text-[10px] text-muted-foreground/40">Client Testimonial</span>
      </div>

      {/* Video */}
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          src={testimonialVideo}
          className="h-full w-full object-cover"
          playsInline
          preload="metadata"
          controls={playing}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />

        {/* Play overlay */}
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label="Play testimonial video"
            className="group absolute inset-0 flex items-center justify-center bg-black/45 transition-colors duration-200 hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#34D4F0]"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0DACC9] shadow-electric transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                <Play size={22} className="ml-1 text-white" fill="white" />
              </div>
              <span className="text-sm font-medium text-white/75">Play Video</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Testimonials as a ledger: the label holds beside the record while the quotes scroll by as large,
 * quiet bands. The client video plays in place above them.
 */
export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" className="relative overflow-hidden py-20">
      <SectionBackground variant="violet-left" />
      <div className="section-shell relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(260px,0.78fr)_minmax(0,1.6fr)] lg:gap-16">
          {/* The held label */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 self-start lg:sticky lg:top-28"
          >
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#0DACC9]">
                Client Testimonials
              </p>
              <h2
                className="mb-4 font-bold leading-tight tracking-tight text-foreground"
                style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)' }}
              >
                Short feedback from teams I've supported.
              </h2>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground tabular-nums">
                {pad2(testimonials.length)} quotes · 01 video
              </p>
            </div>

            {/* Vision card */}
            <div className="premium-card electric-border rounded-2xl p-6">
              <p className="mb-3 text-lg font-bold leading-snug text-foreground">
                Vision + Automation{' '}<span className="gradient-text">= Growth.</span>
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                These aren't just testimonials — they're proof of what happens when smart systems replace
                manual follow-up. From n8n workflows to GoHighLevel automations and conversion-focused
                websites, the goal is always the same: predictable growth.
              </p>
            </div>
          </motion.div>

          {/* The record: the video, then the quotes */}
          <div className="min-w-0">
            <div className="scroll-rise">
              <TestimonialVideoPlayer />
            </div>
            <div className="mt-6">
              {testimonials.map((t) => (
                <QuoteBand key={t.id} testimonial={t} />
              ))}
              <span aria-hidden="true" className="ledger-rule block h-px origin-left bg-foreground/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
