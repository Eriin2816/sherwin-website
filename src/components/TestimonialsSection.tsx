import { useRef } from 'react'
import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '@/data/portfolio'
import SectionBackground from '@/components/SectionBackground'

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.blockquote
      ref={ref as React.RefObject<HTMLQuoteElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="premium-card rounded-2xl p-7 relative"
    >
      <Quote size={20} className="text-[#0DACC9]/30 mb-4" />
      <p className="text-foreground/80 text-base leading-relaxed mb-6 italic">
        "{testimonial.quote}"
      </p>
      <footer className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0DACC9]/15 border border-[#0DACC9]/25 flex items-center justify-center shrink-0">
          <span className="text-[#0DACC9] text-xs font-bold">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <span className="text-muted-foreground text-sm">— {testimonial.author}</span>
      </footer>
    </motion.blockquote>
  )
}

export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <SectionBackground variant="violet-left" />
      <div className="section-shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Header + hero statement */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
              Client Testimonials
            </p>
            <h2
              className="font-bold text-foreground tracking-tight leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Short feedback from teams
              <br />
              I've supported
            </h2>

            <div className="premium-card rounded-2xl p-8 electric-border">
              <p className="text-2xl font-bold text-foreground mb-3 leading-snug">
                Vision + Automation
                <br />
                <span className="gradient-text">= Growth.</span>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                These aren't just testimonials — they're proof of what happens when smart systems replace
                manual follow-up. From n8n workflows to GoHighLevel conversion-focused websites,
                the goal is always the same: predictable growth.
              </p>
            </div>
          </motion.div>

          {/* Right: Testimonial cards */}
          <div className="space-y-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
