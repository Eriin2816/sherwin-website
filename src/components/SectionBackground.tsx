/**
 * SectionBackground — reusable premium background layer system.
 * Always pointer-events-none, z-0, absolute inset-0.
 * Parent section must have: relative overflow-hidden
 */

interface Props {
  variant?: 'violet-left' | 'blue-right' | 'dual-soft' | 'grid-fade' | 'footer-depth' | 'ambient' | 'center-bloom'
  className?: string
}

export default function SectionBackground({ variant = 'ambient', className = '' }: Props) {
  return (
    // Orbs fade out toward the section's top and bottom edges, so blurred glows
    // never end in a hard clip line where one section meets the next.
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)] ${className}`}
      aria-hidden="true"
    >

      {/* ── variant-specific orbs ── */}

      {variant === 'violet-left' && (
        <>
          <div className="bg-orb bg-orb-violet orb-a w-[520px] h-[420px] -top-16 -left-20 opacity-80" />
          <div className="bg-orb bg-orb-cyan orb-c w-[300px] h-[300px] bottom-0 right-10 opacity-50" />
        </>
      )}

      {variant === 'blue-right' && (
        <>
          <div className="bg-orb bg-orb-indigo orb-b w-[480px] h-[400px] -bottom-10 -right-16 opacity-80" />
          <div className="bg-orb bg-orb-cyan orb-a w-[260px] h-[260px] top-10 left-10 opacity-40" />
        </>
      )}

      {variant === 'dual-soft' && (
        <>
          <div className="bg-orb bg-orb-violet orb-a w-[500px] h-[380px] -top-10 -left-16 opacity-70" />
          <div className="bg-orb bg-orb-indigo orb-b w-[440px] h-[360px] -bottom-8 -right-12 opacity-65" />
          <div className="bg-orb bg-orb-cyan orb-c w-[200px] h-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        </>
      )}

      {variant === 'grid-fade' && (
        <>
          <div className="bg-orb bg-orb-cyan orb-c w-[600px] h-[300px] top-0 left-1/2 -translate-x-1/2 opacity-60" />
          <div className="bg-orb bg-orb-violet orb-b w-[320px] h-[280px] bottom-0 right-0 opacity-40" />
        </>
      )}

      {variant === 'center-bloom' && (
        <>
          <div className="bg-orb bg-orb-cyan orb-a w-[700px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70" />
          <div className="bg-orb bg-orb-violet orb-b w-[400px] h-[400px] top-0 left-0 opacity-45" />
          <div className="bg-orb bg-orb-indigo orb-c w-[350px] h-[350px] bottom-0 right-0 opacity-40" />
        </>
      )}

      {variant === 'footer-depth' && (
        <>
          <div className="bg-orb bg-orb-indigo orb-a w-[600px] h-[500px] -top-20 -left-24 opacity-55" />
          <div className="bg-orb bg-orb-violet orb-b w-[500px] h-[400px] -bottom-16 -right-20 opacity-50" />
          <div className="bg-orb bg-orb-cyan orb-c w-[280px] h-[280px] top-1/2 right-1/3 opacity-25" />
          {/* Deep layered gradient for footer depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsla(214,44%,3%,0.15)] to-[hsla(214,44%,2%,0.4)] light:hidden" />
        </>
      )}

      {variant === 'ambient' && (
        <>
          <div className="absolute inset-0 bg-ambient-layer" />
          <div className="bg-orb bg-orb-cyan orb-b w-[380px] h-[280px] top-0 right-0 opacity-40" />
          <div className="bg-orb bg-orb-violet orb-a w-[300px] h-[260px] bottom-0 left-0 opacity-35" />
        </>
      )}

    </div>
  )
}
