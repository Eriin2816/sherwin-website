import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoUrl from '../../brand_assets/taweng-logo.png'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { navItems } from '@/data/portfolio'
import { cn } from '@/lib/utils'

interface NavbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 } as const

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  // While transparent over the hero film, the bar borrows the hero's dark
  // stage so links stay legible in the light theme too.
  const overHero = !scrolled && !mobileOpen && pathname === '/'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500',
          overHero && 'dark-stage',
          scrolled || mobileOpen
            ? 'bg-[hsl(var(--background)/0.86)] backdrop-blur-xl border-b border-foreground/[0.07] shadow-[0_10px_30px_-14px_rgba(0,0,0,0.55)] light:shadow-[0_10px_30px_-16px_rgba(26,44,82,0.22)]'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="section-shell">
          <nav className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button
              onClick={() => scrollTo('#home')}
              aria-label="Back to top"
              className="flex items-center gap-2.5 rounded-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={logoUrl}
                alt="Sherwin Marcelo"
                className="w-auto object-contain"
                style={{ height: '60px' }}
              />
            </button>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map(({ label, href }) => {
                const active = activeSection === href.slice(1)
                return (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        active ? 'text-[#0DACC9]' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06]'
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          transition={PILL_SPRING}
                          className="absolute inset-0 -z-10 rounded-full bg-[#0DACC9]/10 ring-1 ring-inset ring-[#0DACC9]/20"
                        />
                      )}
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground border border-foreground/10 hover:text-foreground hover:bg-foreground/[0.06] active:scale-[0.94] transition-[color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex"
                  >
                    {theme === 'dark' ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M11.89 3.05l-1.06 1.06M3.05 11.89l-1.06 1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5 6 6 0 1 0 13.5 9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>

              <LiquidButton
                size="sm"
                className="hidden md:inline-flex px-5"
                onClick={() => scrollTo('#contact')}
              >
                Book a Call
              </LiquidButton>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] active:scale-[0.94] transition-[color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[hsl(var(--background)/0.97)] backdrop-blur-2xl border-b border-foreground/[0.07] md:hidden"
          >
            <div className="section-shell py-6">
              <ul className="flex flex-col gap-1">
                {navItems.map(({ label, href }) => (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        activeSection === href.slice(1)
                          ? 'text-[#0DACC9] bg-[#0DACC9]/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06]'
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-foreground/[0.07]">
                <LiquidButton className="w-full" onClick={() => scrollTo('#contact')}>
                  Book a Call
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
