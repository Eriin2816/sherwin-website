import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import GravityStars from '@/components/ui/gravity-stars'

/**
 * Brand-tuned starfield. Dark: ice-cyan stars drifting between the electric
 * cyan and the soft violet of the section orbs. Light: deeper teal and indigo
 * so stars read on the pale background without turning into grey smudges.
 */
const STARFIELD = {
  dark: {
    color: '#BDEFF8',
    tintCool: '#34D4F0',
    tintWarm: '#9A8CF6',
    glow: 4.6,
    linkOpacity: 0.16,
    count: 180,
  },
  light: {
    color: '#0B7F97',
    tintCool: '#0DACC9',
    tintWarm: '#5B4FD6',
    glow: 2.4,
    linkOpacity: 0.14,
    count: 160,
  },
} as const

/**
 * The hero keeps its own video background, so while it fills the viewport the
 * starfield is fully covered and its simulation is paused.
 */
function useHeroCoversViewport() {
  const { pathname } = useLocation()
  const [covers, setCovers] = useState(false)

  useEffect(() => {
    const check = () => {
      const hero = document.getElementById('home')
      if (!hero) {
        setCovers(false)
        return
      }
      const rect = hero.getBoundingClientRect()
      setCovers(rect.top <= 0 && rect.bottom >= window.innerHeight)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  return covers
}

export default function SiteBackground({ theme }: { theme: 'dark' | 'light' }) {
  const heroCovers = useHeroCoversViewport()
  const stars = STARFIELD[theme]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <GravityStars
        className="h-full w-full"
        pointerTarget="window"
        paused={heroCovers}
        connectDistance={120}
        starSize={1.35}
        tint={0.55}
        twinkle={0.5}
        {...stars}
      />
      <div className="site-grain absolute inset-0" />
    </div>
  )
}
