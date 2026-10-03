import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Mail, ArrowRight, CalendarDays } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import SectionBackground from '@/components/SectionBackground'
import { trackSpotlight } from '@/lib/motion'

const CALENDLY_URL = 'https://calendly.com/marcelo-taweng/30minutes-call'

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <SectionBackground variant="footer-depth" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#0DACC9]/5 blur-[100px] pointer-events-none" />

      <div className="section-shell relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#0DACC9] text-xs font-semibold uppercase tracking-widest mb-4">
            Book a Discovery Call
          </p>
          <h2
            className="font-bold text-foreground tracking-tight leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Tell me what you're trying
            <br />
            to automate.
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            I'll outline the build plan and the fastest path to launch.
          </p>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto mb-10"
        >
          <div className="premium-card rounded-2xl p-10 flex flex-col items-center text-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#0DACC9]/15 border border-[#0DACC9]/25 flex items-center justify-center">
              <CalendarDays size={26} className="text-[#0DACC9]" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg mb-1">30-Minute Discovery Call</p>
              <p className="text-muted-foreground text-sm">Free. No commitment. Just clarity on your build.</p>
            </div>
            <LiquidButton
              size="lg"
              className="w-full max-w-xs"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarDays size={16} />
              Book a Call
            </LiquidButton>
          </div>
        </motion.div>

        {/* Alternate contact options */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto"
        >
          <a
            href="https://wa.me/639386916747"
            target="_blank"
            rel="noopener noreferrer"
            onPointerMove={trackSpotlight}
            className="spotlight relative premium-card rounded-2xl p-6 flex items-center justify-between group active:scale-[0.99] hover:border-[#25D366]/30 hover:bg-[#25D366]/3 transition-[background-color,border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-[#25D366]" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">WhatsApp</p>
                <p className="text-muted-foreground text-xs">Quick questions or urgent requests</p>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-transform duration-200 shrink-0"
            />
          </a>

          <a
            href="mailto:marcelo.taweng@gmail.com"
            onPointerMove={trackSpotlight}
            className="spotlight relative premium-card rounded-2xl p-6 flex items-center justify-between group active:scale-[0.99] hover:border-[#0DACC9]/30 hover:bg-[#0DACC9]/3 transition-[background-color,border-color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#0DACC9]/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-[#0DACC9]" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Email</p>
                <p className="text-muted-foreground text-xs">Detailed project inquiries</p>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-transform duration-200 shrink-0"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
