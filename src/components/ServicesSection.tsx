import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Workflow, Bot, Globe, Zap, LayoutDashboard, TrendingUp, type LucideIcon } from 'lucide-react'
import { services } from '@/data/portfolio'
import SectionBackground from '@/components/SectionBackground'
import AutomationFlow from '@/components/motion/AutomationFlow'
import ServiceGlyph from '@/components/motion/ServiceGlyph'
import { cn } from '@/lib/utils'
import { trackSpotlight, useInViewport } from '@/lib/motion'

const iconMap: Record<string, LucideIcon> = {
  Workflow,
  Bot,
  Globe,
  Zap,
  LayoutDashboard,
  TrendingUp,
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = iconMap[service.icon] ?? Zap

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={trackSpotlight}
      className="spotlight group relative premium-card rounded-2xl p-6 hover:border-[#0DACC9]/30 hover:bg-[#0DACC9]/3 transition-[border-color,background,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-electric cursor-default"
    >
      {/* Icon */}
      <div className="mb-5 w-11 h-11 rounded-xl bg-[#0DACC9]/10 border border-[#0DACC9]/20 flex items-center justify-center group-hover:bg-[#0DACC9]/15 transition-colors duration-300">
        <Icon size={20} className="text-[#0DACC9]" />
      </div>

      {/* Live mini-diagram of the service */}
      <ServiceGlyph
        kind={service.id}
        className="absolute right-6 top-[26px] opacity-55 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Title */}
      <h3 className="font-semibold text-foreground text-base mb-2 leading-snug">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-xs border border-white/8 bg-white/3 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Subtle corner glow on hover */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-2xl bg-[#0DACC9]/3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  )
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const [gridRef, gridVisible] = useInViewport<HTMLDivElement>()

  return (
    <section id="services" className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(180deg, transparent 0%, rgba(13,172,201,0.025) 50%, transparent 100%)'}}>
      <SectionBackground variant="violet-left" />
      <div className="section-shell relative">
        {/* Header, with the live workflow diagram alongside on wide screens */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 grid items-center gap-10 xl:grid-cols-[minmax(0,1fr)_520px]"
        >
          <div>
            <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
              What I Build
            </p>
            <h2
              className="font-bold text-foreground tracking-tight leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              The Skills Behind Results
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              End-to-end systems that remove friction, capture more leads, and let your business run on autopilot.
            </p>
          </div>
          <div className="hidden xl:flex justify-end">
            <AutomationFlow />
          </div>
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5', !gridVisible && 'motion-paused')}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
