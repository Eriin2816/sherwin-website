import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import profileUrl from '../../brand_assets/profile.jpg'
import { CheckCircle2 } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionBackground from '@/components/SectionBackground'
import CountUp from '@/components/motion/CountUp'

const strengths = [
  'React, Next.js & TypeScript applications',
  'APIs, databases & authenticated workflows',
  'n8n, GoHighLevel & AI integrations',
  'Shopify Liquid & WordPress development',
  'Git-based releases & production troubleshooting',
  'Creative coding & automated video composition',
]

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <SectionBackground variant="blue-right" />
      <div className="section-shell relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo + card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden premium-card">
              <img
                src={profileUrl}
                alt="Sherwin Marcelo"
                loading="lazy"
                className="w-full object-cover"
                style={{ maxHeight: '520px', objectPosition: 'top center' }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1620]/70 via-transparent to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    // Verifiable figures as of October 2026: finished music videos, freelance
                    // years since August 2024, and the work arrangement (not a performance result).
                    { value: 4, suffix: '', label: 'Completed Music Videos' },
                    { value: 2, suffix: '+', label: 'Years Freelancing' },
                    { value: 100, suffix: '%', label: 'Remote-First' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <CountUp
                        value={stat.value}
                        suffix={stat.suffix}
                        className="block text-xl font-bold text-white tabular-nums"
                      />
                      <div className="text-xs text-white/60 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-[#0DACC9]/8 border border-[#0DACC9]/20 blur-sm pointer-events-none" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
              About the Developer
            </p>
            <h2
              className="font-bold text-foreground tracking-tight leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
            >
              I build systems that make
              <br />
              <span className="gradient-text">growth predictable.</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-base leading-relaxed mb-8">
              <p>
                I'm Sherwin Marcelo, a full-stack developer and AI automation engineer based in Baliwag, Bulacan.
                My Information Technology education at Baliuag University (2010–2015) gives me a foundation for
                building and troubleshooting the systems businesses use every day.
              </p>
              <p>
                Since 2024, I've worked with remote clients on web applications, WordPress and Shopify platforms,
                CRM workflows, and AI-assisted operations. My work connects interfaces with APIs, databases,
                reporting, and deployment—not just the page visitors see.
              </p>
              <p>
                I use AI-assisted engineering to develop and refine working software, then validate the code,
                integrations, and user experience. From business systems to programmatic music videos, I focus on
                clear workflows and maintainable implementation.
              </p>
            </div>

            {/* Strengths list */}
            <ul className="space-y-2.5 mb-8">
              {strengths.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-foreground/80">
                  <CheckCircle2 size={15} className="text-[#0DACC9] shrink-0" />
                  {s}
                </li>
              ))}
            </ul>

            <LiquidButton size="lg" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Let's Work Together
            </LiquidButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
