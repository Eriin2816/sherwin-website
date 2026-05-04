import { marqueeItems } from '@/data/portfolio'

export default function LogoMarquee() {
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <section className="py-12 border-y border-border/30 overflow-hidden">
      <div className="relative flex">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <ul
          className="flex items-center gap-6 animate-marquee whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {doubled.map((item, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/4 text-muted-foreground text-sm font-medium tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0DACC9]/50 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-muted-foreground/50 text-xs mt-6 uppercase tracking-widest">
        Tools & Platforms I Build With
      </p>
    </section>
  )
}
