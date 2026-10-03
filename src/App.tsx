import { useState, useEffect, useLayoutEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import LogoMarquee from '@/components/LogoMarquee'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import FeaturedProject from '@/components/FeaturedProject'
import AboutSection from '@/components/AboutSection'
import TechStackSection from '@/components/TechStackSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import CaseStudyPage from '@/components/CaseStudyPage'
import SiteBackground from '@/components/SiteBackground'
import { LiquidGlassFilter } from '@/components/ui/liquid-glass-button'

type Theme = 'dark' | 'light'
const THEME_KEY = 'sm-theme'

function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <main>
      <HeroSection />
      <LogoMarquee />
      <ServicesSection />
      <ProjectsSection />
      <FeaturedProject />
      <div className="section-divider mx-8 md:mx-16" />
      <AboutSection />
      <TechStackSection />
      <div className="section-divider mx-8 md:mx-16" />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </main>
  )
}

function AppShell() {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  // Layout effect so a stored light theme is applied before the first paint.
  useLayoutEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* storage blocked: the choice simply isn't remembered */
    }
  }, [theme])

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const doc = document as Document & { startViewTransition?: (update: () => void) => unknown }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Crossfade the whole page between themes where View Transitions exist.
    if (doc.startViewTransition && !reduceMotion) {
      doc.startViewTransition(() => {
        applyTheme(next)
        setTheme(next)
      })
    } else {
      setTheme(next)
    }
  }

  return (
    // `relative isolate` makes the shell its own stacking context, so the
    // fixed starfield at -z-10 sits above the shell background and below
    // every section, positioned or not.
    <div className="relative isolate min-h-screen bg-background bg-premium-base text-foreground overflow-x-hidden">
      <SiteBackground theme={theme} />
      <LiquidGlassFilter />
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study" element={<CaseStudyPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
