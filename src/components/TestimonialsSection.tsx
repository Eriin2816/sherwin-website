import { useRef, useState } from 'react'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, Play } from 'lucide-react'
import { testimonials } from '@/data/portfolio'
import SectionBackground from '@/components/SectionBackground'
import { trackSpotlight } from '@/lib/motion'

const testimonialVideo = '/videos/testimonial.mp4'

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.blockquote
      ref={ref as React.RefObject<HTMLQuoteElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={trackSpotlight}
      className="spotlight premium-card rounded-2xl p-6 relative"
    >
      <Quote size={18} className="text-[#0DACC9]/30 mb-3" />
      <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">
        "{testimonial.quote}"
      </p>
      <footer className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#0DACC9]/15 border border-[#0DACC9]/25 flex items-center justify-center shrink-0">
          <span className="text-[#0DACC9] text-xs font-bold">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <span className="text-muted-foreground text-xs">— {testimonial.author}</span>
      </footer>
    </motion.blockquote>
  )
}

function TestimonialVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    videoRef.current?.play().then(() => setPlaying(true)).catch(() => {})
  }

  return (
    <div className="dark-stage premium-card rounded-2xl overflow-hidden">
      {/* Browser chrome bar */}
      <div className="h-8 bg-[hsl(214_44%_8%)] border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <span className="mx-auto text-[10px] text-muted-foreground/40">Client Testimonial</span>
      </div>

      {/* Video */}
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          src={testimonialVideo}
          className="w-full h-full object-cover"
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
            className="absolute inset-0 flex items-center justify-center bg-black/45 hover:bg-black/30 transition-colors duration-200 group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#0DACC9] flex items-center justify-center shadow-electric group-hover:scale-105 transition-transform duration-200">
                <Play size={22} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/75 text-sm font-medium">Play Video</span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <SectionBackground variant="violet-left" />
      <div className="section-shell relative z-10">

        {/* Section label + heading (centered above the grid) */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
            Client Testimonials
          </p>
          <h2
            className="font-bold text-foreground tracking-tight leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Short feedback from teams I've supported.
          </h2>
        </motion.div>

        {/* Two-column: video left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — video player + vision card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <TestimonialVideoPlayer />

            {/* Vision card below video */}
            <div className="premium-card rounded-2xl p-7 electric-border">
              <p className="text-xl font-bold text-foreground mb-3 leading-snug">
                Vision + Automation
                {' '}<span className="gradient-text">= Growth.</span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These aren't just testimonials — they're proof of what happens when smart systems replace
                manual follow-up. From n8n workflows to GoHighLevel automations and conversion-focused
                websites, the goal is always the same: predictable growth.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — testimonial cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
