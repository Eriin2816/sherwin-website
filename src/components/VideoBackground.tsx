import { useRef, useEffect } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const FADE_DURATION = 0.5

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      video.play().catch(() => {})
    }

    const tick = () => {
      if (!video.duration || video.paused) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      const t = video.currentTime
      const d = video.duration
      // Fade in
      if (t < FADE_DURATION) {
        video.style.opacity = String(t / FADE_DURATION)
      }
      // Fade out
      else if (t > d - FADE_DURATION) {
        video.style.opacity = String((d - t) / FADE_DURATION)
      } else {
        video.style.opacity = '1'
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('ended', handleEnded)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('ended', handleEnded)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    // Solid navy behind the film keeps the site starfield out of the hero,
    // including while the video loads or crossfades at its loop point.
    <div className="absolute inset-0 overflow-hidden bg-[hsl(214_44%_5%)]">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transition: 'none' }}
      />
      {/* Layered overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(214_44%_5%/0.65)] via-[hsl(214_44%_5%/0.5)] to-[hsl(214_44%_5%/0.85)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(214_44%_5%/0.4)] via-transparent to-[hsl(214_44%_5%/0.2)]" />
    </div>
  )
}
