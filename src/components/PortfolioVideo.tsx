import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Loader2, Monitor, MonitorPlay, Pause, Play, RotateCcw, Smartphone, Volume2, VolumeX } from 'lucide-react'
import type { ProjectVideo } from '@/data/portfolio'

// Only one portfolio video plays at a time, across cards and the case-study modal.
let activeVideo: HTMLVideoElement | null = null

export function pauseAllPortfolioVideos() {
  activeVideo?.pause()
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const s = Math.floor(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function formatLabel(video: ProjectVideo) {
  if (video.orientation === 'portrait') return { icon: Smartphone, text: '9:16' }
  if (!video.hasAudio) return { icon: Monitor, text: 'Site Tour' }
  return { icon: MonitorPlay, text: '16:9' }
}

const SPRING = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const SEEK_STEP_S = 5

/**
 * Standardized 4:3 video frame. Portrait and landscape sources are both
 * contained in the frame, with a blurred copy of the poster filling the
 * letterbox so every card reads as the same size. Nothing is downloaded
 * until the viewer presses play (`preload="none"` + a lightweight poster).
 */
export default function PortfolioVideo({
  video,
  title,
  className = '',
}: {
  video: ProjectVideo
  title: string
  className?: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [playing, setPlaying] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [ended, setEnded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(video.duration)

  // Drive the progress bar with rAF + transform so it glides instead of
  // stepping at the ~4Hz cadence of `timeupdate`.
  useEffect(() => {
    if (!playing) return
    let raf = 0
    const tick = () => {
      const el = videoRef.current
      if (el && progressRef.current && el.duration) {
        progressRef.current.style.transform = `scaleX(${el.currentTime / el.duration})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  // Pause when scrolled out of view so off-screen videos never keep streaming.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) videoRef.current?.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(frame)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const el = videoRef.current
    return () => {
      if (activeVideo === el) activeVideo = null
    }
  }, [])

  const toggle = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (el.paused || el.ended) {
      setStarted(true)
      void el.play().catch(() => setBuffering(false))
    } else {
      el.pause()
    }
  }, [])

  const syncProgress = (el: HTMLVideoElement) => {
    if (progressRef.current && el.duration) {
      progressRef.current.style.transform = `scaleX(${el.currentTime / el.duration})`
    }
  }

  const seekTo = (fraction: number) => {
    const el = videoRef.current
    const total = el?.duration || duration
    if (!el || !total) return
    setStarted(true)
    el.currentTime = Math.min(Math.max(fraction, 0), 1) * total
    syncProgress(el)
  }

  const onTrackPointer = (e: PointerEvent<HTMLDivElement>) => {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    seekTo((e.clientX - rect.left) / rect.width)
  }

  const onTrackKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = videoRef.current
    const total = el?.duration || duration
    if (!el || !total) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const delta = e.key === 'ArrowRight' ? SEEK_STEP_S : -SEEK_STEP_S
      seekTo((el.currentTime + delta) / total)
    }
  }

  const toggleMute = () => {
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  const { icon: FormatIcon, text: formatText } = formatLabel(video)
  const CenterIcon = ended ? RotateCcw : playing ? Pause : Play
  const centerLabel = ended ? `Replay ${title}` : playing ? `Pause ${title}` : `Play ${title}`
  // While playing, chrome recedes until hover/focus; touch devices keep it visible.
  const chromeVisibility = playing
    ? 'opacity-0 group-hover/video:opacity-100 group-focus-within/video:opacity-100 [@media(hover:none)]:opacity-100'
    : 'opacity-100'

  return (
    <div
      ref={frameRef}
      className={`group/video relative w-full aspect-[4/3] overflow-hidden bg-[#050c13] isolate ${className}`}
    >
      {/* Ambient backdrop: blurred poster fills the letterbox */}
      <img
        src={video.poster}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl saturate-[1.4] opacity-90 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,12,19,0.05)_0%,rgba(5,12,19,0.55)_100%)] pointer-events-none" />

      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        preload="none"
        playsInline
        muted={muted}
        aria-label={`${title} video`}
        onClick={toggle}
        onPlay={(e) => {
          if (activeVideo && activeVideo !== e.currentTarget) activeVideo.pause()
          activeVideo = e.currentTarget
          setPlaying(true)
          setEnded(false)
        }}
        onPause={(e) => {
          if (activeVideo === e.currentTarget) activeVideo = null
          setPlaying(false)
          setBuffering(false)
        }}
        onEnded={() => {
          setEnded(true)
          setPlaying(false)
        }}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onSeeked={(e) => syncProgress(e.currentTarget)}
        className="relative z-[1] w-full h-full object-contain cursor-pointer drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
      />

      {/* Edge shading keeps chips and controls legible over bright footage */}
      <div
        className={`absolute inset-x-0 bottom-0 h-24 z-[2] bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none transition-opacity duration-500 ${SPRING} ${chromeVisibility}`}
      />
      <div className={`absolute inset-x-0 top-0 h-16 z-[2] bg-gradient-to-b from-black/40 to-transparent pointer-events-none transition-opacity duration-500 ${SPRING} ${chromeVisibility}`} />

      {/* Format chip */}
      <span className={`absolute top-3 left-3 z-[3] inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] text-white/85 bg-black/40 border border-white/12 backdrop-blur-md pointer-events-none transition-opacity duration-500 ${SPRING} ${chromeVisibility}`}>
        <FormatIcon size={11} className="text-[#34D4F0]" />
        {formatText}
      </span>

      {/* Center play / pause / replay */}
      <button
        type="button"
        onClick={toggle}
        aria-label={centerLabel}
        className={`absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-white bg-white/12 border border-white/25 backdrop-blur-md shadow-[0_10px_40px_-8px_rgba(13,172,201,0.55),0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition-[transform,opacity] duration-300 ${SPRING} hover:scale-[1.08] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D4F0] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
          playing ? 'opacity-0 scale-90 group-hover/video:opacity-100 group-hover/video:scale-100 focus-visible:opacity-100 focus-visible:scale-100' : 'opacity-100'
        }`}
      >
        {buffering ? (
          <Loader2 size={24} className="animate-spin" />
        ) : (
          <CenterIcon size={24} className={CenterIcon === Play ? 'translate-x-[2px]' : ''} fill={CenterIcon === RotateCcw ? 'none' : 'currentColor'} />
        )}
      </button>

      {/* Control bar */}
      <div
        className={`absolute inset-x-0 bottom-0 z-[3] flex items-center gap-3 px-3.5 pb-3 pt-6 transition-opacity duration-500 ${SPRING} ${chromeVisibility}`}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white bg-white/10 border border-white/15 backdrop-blur-md transition-[transform,opacity] duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D4F0]"
        >
          {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="translate-x-[1px]" />}
        </button>

        {/* Seekable progress track */}
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration || 0)}
          aria-valuenow={Math.round(current)}
          aria-valuetext={`${formatTime(current)} of ${formatTime(duration || 0)}`}
          onPointerDown={onTrackPointer}
          onKeyDown={onTrackKey}
          className="group/track relative flex-1 h-5 flex items-center cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D4F0]"
        >
          <div className="relative w-full h-[3px] rounded-full bg-white/20 overflow-hidden transition-transform duration-200 group-hover/track:scale-y-[1.6]">
            <div
              ref={progressRef}
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#0DACC9] to-[#34D4F0]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        <span className="shrink-0 text-[11px] font-medium tabular-nums text-white/80">
          {started ? `${formatTime(current)} / ` : ''}
          {formatTime(duration || 0)}
        </span>

        {video.hasAudio && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            aria-pressed={muted}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/85 hover:text-white bg-white/10 border border-white/15 backdrop-blur-md transition-[transform,opacity] duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D4F0]"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}
      </div>
    </div>
  )
}
