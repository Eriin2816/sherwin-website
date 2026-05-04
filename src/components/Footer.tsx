import { useRef } from 'react'
import { Linkedin, Github, Mail } from 'lucide-react'
import { socialLinks, footerNav, contactLinks } from '@/data/portfolio'
import logoUrl from '../../brand_assets/taweng-logo.png'
import SectionBackground from '@/components/SectionBackground'

const FOOTER_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4'

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-[9px] bg-[#0a0f1a] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black hover:-translate-y-0.5 transition-[background,color,transform] duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
    >
      {children}
    </a>
  )
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const emailInputRef = useRef<HTMLInputElement>(null)

  const scrollTo = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = href
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <footer className="relative overflow-hidden pb-0">
      <SectionBackground variant="footer-depth" />
      {/* Top divider */}
      <div className="section-divider mx-0 relative z-10" />

      <div className="max-w-[1150px] mx-auto px-6 md:px-10 pt-12 pb-0 relative z-10">
        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-4 items-stretch mb-0">

          {/* ── LEFT CARD: Video background ── */}
          <div className="relative min-h-[340px] rounded-[28px] p-8 overflow-hidden flex flex-col justify-between shadow-electric">
            {/* Video background */}
            <video
              src={FOOTER_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              aria-hidden="true"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70 z-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
              {/* Top: Logo + Name */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/80 flex items-center justify-center p-1 shrink-0">
                  <img src={logoUrl} alt="SM Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-bold tracking-tight text-sm leading-none">
                  Sherwin Marcelo
                </span>
              </div>

              {/* Middle: Tagline */}
              <div className="flex-1 flex items-center">
                <p className="text-white text-xl font-bold leading-snug tracking-tight">
                  Building smarter websites,
                  <br />
                  <span className="text-white/65">
                    funnels & AI automation systems.
                  </span>
                </p>
              </div>

              {/* Bottom: Social icons */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-white/50 text-sm italic">Stay in touch!</p>
                <div className="flex items-center gap-2">
                  <SocialIcon href={socialLinks.linkedin} label="LinkedIn">
                    <Linkedin size={14} />
                  </SocialIcon>
                  <SocialIcon href={socialLinks.github} label="GitHub">
                    <Github size={14} />
                  </SocialIcon>
                  <SocialIcon href={socialLinks.facebook} label="Facebook">
                    <FacebookIcon />
                  </SocialIcon>
                  <SocialIcon href={socialLinks.email} label="Email">
                    <Mail size={14} />
                  </SocialIcon>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT CARD: Nav + CTA ── */}
          <div className="relative">
            {/* Floating badge above the card */}
            <div className="absolute -top-10 right-8 z-20 flex flex-col items-start gap-1.5">
              <div
                className="w-24 h-24 rounded-[22px] flex items-center justify-center shadow-electric-lg"
                style={{
                  background: 'linear-gradient(135deg, #0DACC9 0%, #1A2C52 100%)',
                  transform: 'rotate(-10deg)',
                  boxShadow: '0 0 40px rgba(13,172,201,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                }}
              >
                <span className="text-white font-bold text-2xl tracking-tight" style={{ transform: 'rotate(10deg)' }}>
                  SM
                </span>
              </div>
              <div className="flex items-center gap-1 pl-1">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" className="text-muted-foreground/50 -rotate-12">
                  <path d="M2 2 C4 8, 10 10, 14 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M11 5 L14 8 L11 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-muted-foreground/60 text-xs italic">Let's build?</span>
              </div>
            </div>

            {/* Card */}
            <div className="liquid-glass rounded-[28px] p-8 md:p-10 flex flex-col justify-between h-full min-h-[340px] pt-16">
              {/* Nav columns */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Navigation column */}
                <div>
                  <h3 className="text-foreground/60 text-sm font-semibold italic mb-4">
                    Navigation
                  </h3>
                  <ul className="space-y-2.5">
                    {footerNav.navigation.map(({ label, href }) => (
                      <li key={label}>
                        <button
                          onClick={() => scrollTo(href)}
                          className="text-sm font-semibold text-foreground/75 hover:text-[#0DACC9] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-left"
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services column */}
                <div>
                  <h3 className="text-foreground/60 text-sm font-semibold italic mb-4">
                    Services
                  </h3>
                  <ul className="space-y-2.5">
                    {footerNav.services.map(({ label, href }) => (
                      <li key={label}>
                        <button
                          onClick={() => scrollTo(href)}
                          className="text-sm font-semibold text-foreground/75 hover:text-[#0DACC9] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm text-left"
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer bottom row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-white/8">
                {/* Copyright + tagline */}
                <div>
                  <p className="text-muted-foreground/60 text-xs mb-1">
                    © {year} Sherwin Marcelo. All rights reserved.
                  </p>
                  <p className="text-foreground/70 text-sm leading-snug">
                    AI moves fast.{' '}
                    <strong className="text-foreground font-semibold">Build systems that keep up.</strong>
                  </p>
                </div>

                {/* Mini CTA */}
                <div
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 p-1.5 shadow-sm w-full md:w-auto max-w-[280px]"
                >
                  <input
                    ref={emailInputRef}
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 px-3 py-2 outline-none min-w-0"
                    aria-label="Email for contact"
                  />
                  <a
                    href={contactLinks.email}
                    className="shrink-0 px-4 py-2 rounded-lg bg-[#0DACC9] text-white text-xs font-semibold hover:bg-[#0DACC9]/90 hover:-translate-y-0.5 transition-[background,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0DACC9]"
                    onClick={(e) => {
                      const val = emailInputRef.current?.value
                      if (val) {
                        window.location.href = `mailto:marcelo.taweng@gmail.com?subject=Portfolio Inquiry&body=Email: ${val}`
                        e.preventDefault()
                      }
                    }}
                  >
                    Send
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Watermark ── */}
      <div
        className="relative max-w-[1150px] mx-auto overflow-hidden pointer-events-none select-none"
        style={{ marginTop: '-24px', lineHeight: 0, zIndex: 0 }}
      >
        <p
          className="text-center font-bold text-white/[0.028] leading-none tracking-tight overflow-hidden whitespace-nowrap px-4"
          style={{ fontSize: 'clamp(5rem, 14vw, 11rem)' }}
          aria-hidden="true"
        >
          SHERWIN
        </p>
      </div>

      {/* Bottom micro strip */}
      <div className="section-divider mt-0" />
      <div className="max-w-[1150px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        <span className="text-muted-foreground/40 text-xs">
          Built with React + Vite + Tailwind
        </span>
        <a
          href={contactLinks.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0DACC9]/50 hover:text-[#0DACC9] text-xs transition-colors duration-200"
        >
          Book a call ↗
        </a>
      </div>
    </footer>
  )
}
