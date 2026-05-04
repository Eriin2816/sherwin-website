import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Workflow, Bot, Globe, Zap, LayoutDashboard, TrendingUp, type LucideIcon } from 'lucide-react'
import { services } from '@/data/portfolio'
import SectionBackground from '@/components/SectionBackground'

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
      className="group relative premium-card rounded-2xl p-6 hover:border-[#0DACC9]/30 hover:bg-[#0DACC9]/3 transition-[border-color,background,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-electric cursor-default"
    >
      {/* Icon */}
      <div className="mb-5 w-11 h-11 rounded-xl bg-[#0DACC9]/10 border border-[#0DACC9]/20 flex items-center justify-center group-hover:bg-[#0DACC9]/15 transition-colors duration-300">
        <Icon size={20} className="text-[#0DACC9]" />
      </div>

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

  return (
    <section id="services" className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(180deg, transparent 0%, rgba(13,172,201,0.025) 50%, transparent 100%)'}}>
      <SectionBackground variant="violet-left" />
      <div className="section-shell relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
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
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
