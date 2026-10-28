import { ArrowRight } from 'lucide-react'
import { toolRows } from '@/data/portfolio'
import { toolIcons } from '@/data/toolIcons'
import SectionBackground from '@/components/SectionBackground'
import IntegrationHero from '@/components/ui/integration-hero'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const rows = toolRows.map((row) =>
  row.map((tool) => ({ name: tool.name, path: tool.icon ? toolIcons[tool.icon] : undefined, monogram: tool.monogram })),
)

export default function TechStackSection() {
  return (
    <section className="py-20 border-y border-border/30 relative overflow-hidden">
      <SectionBackground variant="dual-soft" />
      <div className="section-shell relative z-10">
        <IntegrationHero
          eyebrow="The Tools Behind My Builds"
          title="Built with the right stack for every layer"
          description="The languages, platforms and services I use to ship web apps, APIs, AI workflows, stores and video, from first commit to deployment."
          rows={rows}
          action={
            <LiquidButton
              size="lg"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/liquid:translate-x-1" />
            </LiquidButton>
          }
        />
      </div>
    </section>
  )
}
