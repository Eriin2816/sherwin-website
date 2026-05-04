import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { techStack } from '@/data/portfolio'
import SectionBackground from '@/components/SectionBackground'

export default function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 border-y border-border/30 relative overflow-hidden">
      <SectionBackground variant="dual-soft" />
      <div className="section-shell relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-3">
            The Tools Behind My Builds
          </p>
          <h2 className="font-bold text-foreground text-2xl tracking-tight">
            Built with the right stack for every layer
          </h2>
        </motion.div>

        {/* Compact grid of all tech pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {techStack.map((item, i) => (
            <motion.span
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium premium-card border border-white/8 text-foreground/75 hover:text-[#0DACC9] hover:border-[#0DACC9]/30 hover:bg-[#0DACC9]/5 transition-[color,border-color,background] duration-200 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0DACC9]/30 group-hover:bg-[#0DACC9] transition-colors duration-200 shrink-0" />
              {item.name}
              <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider font-normal">
                {item.category}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
