import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionBackground from '@/components/SectionBackground'
import BorderBeam from '@/components/motion/BorderBeam'
import FlowField from '@/components/motion/FlowField'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-16 relative overflow-hidden">
      <SectionBackground variant="center-bloom" />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#0DACC9]/8 blur-[100px] pointer-events-none" />

      <div className="section-shell relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="premium-card electric-border rounded-3xl px-8 py-16 md:px-16 text-center relative overflow-hidden"
        >
          {/* Signal lines drifting behind the copy, and a light tracing the edge */}
          <FlowField className="opacity-80" />
          <BorderBeam />

          {/* Top icon */}
          <div className="relative flex justify-center mb-6">
            <div className="relative w-12 h-12 rounded-2xl bg-[#0DACC9]/15 border border-[#0DACC9]/30 flex items-center justify-center">
              <span className="status-ping absolute inset-0 rounded-2xl border border-[#0DACC9]/40" />
              <Sparkles size={22} className="text-[#0DACC9]" />
            </div>
          </div>

          <h2
            className="font-bold text-foreground tracking-tight leading-tight mb-4 relative"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Ready to stop managing chaos
            <br />
            and start running systems?
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed mb-10 relative">
            Let's build the automation infrastructure your business needs to grow without burning you out.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative">
            <LiquidButton
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book a Discovery Call
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/liquid:translate-x-1" />
            </LiquidButton>
            <LiquidButton
              variant="glass"
              size="lg"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </LiquidButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
