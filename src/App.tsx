import { useState, useEffect } from 'react'
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
import ParticleBackground from '@/components/ParticleBackground'

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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="min-h-screen bg-background bg-premium-base text-foreground overflow-x-hidden">
      <ParticleBackground />
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
