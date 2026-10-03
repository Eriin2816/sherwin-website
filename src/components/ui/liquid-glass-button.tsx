import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Liquid glass button, adapted from the 21st.dev LiquidButton for this site:
 *
 * - Tailwind v3 classes (the original targets Tailwind v4) and no
 *   `transition-all`: only transform and opacity animate.
 * - Brand palette: an electric-cyan liquid for primary CTAs, clear glass for
 *   secondary actions, and a cyan-tinted glass for inline "request" actions.
 *   Rim highlights adapt to the light theme.
 * - The SVG displacement filter is rendered once per page by
 *   <LiquidGlassFilter /> instead of once per button (duplicate ids).
 * - Renders an <a> when `href` is passed so CTA links keep link semantics.
 *
 * The backdrop distortion (`distort`) relies on `backdrop-filter: url()`,
 * which only Chromium supports; other browsers keep the blur and rim.
 */

const liquidButtonVariants = cva(
  [
    'group/liquid relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'font-semibold select-none outline-none cursor-pointer',
    'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:scale-[1.035] active:scale-[0.97] active:duration-100',
    'focus-visible:ring-2 focus-visible:ring-[#34D4F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:shrink-0 [&_svg]:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: 'text-white [text-shadow:0_1px_1px_rgba(6,40,52,0.35)]',
        glass: 'text-foreground',
        electric: 'text-[#0DACC9]',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-12 px-7 text-[15px]',
        xl: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

type LiquidVariant = NonNullable<VariantProps<typeof liquidButtonVariants>['variant']>

/** The tinted "liquid" body behind the label, per variant. */
const BODY: Record<LiquidVariant, string> = {
  primary: [
    'bg-[linear-gradient(180deg,#3CD6F1_0%,#0DACC9_52%,#0A92AD_100%)]',
    'shadow-[0_12px_32px_-12px_rgba(13,172,201,0.75),0_3px_10px_-4px_rgba(13,172,201,0.55)]',
  ].join(' '),
  glass: [
    'bg-white/[0.04] backdrop-blur-md backdrop-saturate-150',
    'light:bg-white/60 light:shadow-[0_10px_28px_-14px_rgba(26,44,82,0.35)]',
  ].join(' '),
  electric: [
    'bg-[#0DACC9]/[0.12] backdrop-blur-sm',
    'shadow-[0_10px_26px_-14px_rgba(13,172,201,0.7)]',
    'light:bg-[#0DACC9]/[0.10]',
  ].join(' '),
}

/** Hover wash, faded in with opacity so nothing but opacity transitions. */
const WASH: Record<LiquidVariant, string> = {
  primary: 'bg-white/[0.14]',
  glass: 'bg-white/[0.07] light:bg-[#0DACC9]/[0.07]',
  electric: 'bg-[#0DACC9]/[0.12]',
}

export interface LiquidButtonProps
  extends VariantProps<typeof liquidButtonVariants> {
  className?: string
  children?: React.ReactNode
  /** Distort whatever sits behind the button (Chromium only). Best over imagery. */
  distort?: boolean
  /** Render as a link instead of a button. */
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
  'aria-label'?: string
}

const LiquidButton = React.forwardRef<HTMLElement, LiquidButtonProps>(
  (
    {
      className,
      variant,
      size,
      distort = false,
      href,
      target,
      rel,
      type = 'button',
      disabled,
      onClick,
      children,
      ...aria
    },
    ref
  ) => {
    const v: LiquidVariant = variant ?? 'primary'
    const classes = cn(liquidButtonVariants({ variant, size }), className)

    const layers = (
      <>
        {distort && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-20 overflow-hidden rounded-[inherit]"
            style={{ backdropFilter: 'url("#liquid-glass-filter")' }}
          />
        )}
        <span aria-hidden="true" className={cn('absolute inset-0 -z-10 rounded-[inherit]', BODY[v])} />
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/liquid:opacity-100',
            WASH[v]
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'liquid-rim pointer-events-none absolute inset-0 rounded-[inherit]',
            v !== 'primary' && 'liquid-rim-adaptive'
          )}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <span className="liquid-sheen" />
        </span>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className={classes}
          {...aria}
        >
          {layers}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={classes}
        {...aria}
      >
        {layers}
      </button>
    )
  }
)
LiquidButton.displayName = 'LiquidButton'

/**
 * The displacement filter the `distort` layer samples. Render once near the
 * root of the app. Kept out of layout (not `display:none`, which would stop
 * some engines from resolving the filter reference).
 */
function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          {/* Apply overall blur on the final result */}
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export { LiquidButton, LiquidGlassFilter, liquidButtonVariants }
