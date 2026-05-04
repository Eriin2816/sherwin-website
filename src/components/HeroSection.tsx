import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import VideoBackground from './VideoBackground'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <VideoBackground />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0DACC9]/6 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0DACC9]/4 blur-[100px] pointer-events-none" style={{ animationDelay: '1.5s' }} />

      <div className="section-shell relative z-10 pt-32 pb-24 text-center">
        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border border-[#0DACC9]/30 bg-[#0DACC9]/8 text-[#0DACC9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0DACC9] animate-pulse" />
            AI Automation & Systems Developer
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-bold leading-[0.95] tracking-display text-hero-heading mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
        >
          Scaling doesn't happen
          <br />
          <span className="text-foreground/60">by accident.</span>
          <br />
          <span className="gradient-text">It's Automated Execution.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.35)}
          className="max-w-2xl mx-auto text-hero-sub text-lg leading-relaxed mb-10"
        >
          I build GoHighLevel systems, AI automations, and high-converting websites
          for service businesses ready to grow without growing their headcount.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button
            variant="hero"
            className="group"
            onClick={() => scrollTo('#projects')}
          >
            View My Work
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button
            variant="heroSecondary"
            onClick={() => scrollTo('#contact')}
          >
            <CalendarDays size={16} />
            Book a Call
          </Button>
        </motion.div>

        {/* Credential strip */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground text-xs"
        >
          {[
            'GoHighLevel Certified',
            'AI Automation Specialist',
            'React & TypeScript Developer',
            'Service Business Growth',
          ].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-[#0DACC9]/60" />
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#0DACC9]/60 to-transparent animate-bounce" />
      </motion.div>
    </section>
  )
}
