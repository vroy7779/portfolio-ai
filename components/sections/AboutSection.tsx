'use client'

import { motion } from 'motion/react'
import { NetworkGraphic } from '@/components/graphics/NetworkGraphic'

const EASE = [0.16, 1, 0.3, 1] as const

const TRAITS = [
  'Product Strategy',
  'Product Management',
  '0-to-1 Product Design',
  'AI-Native Product Development',
  'Agentic AI Workflows',
  'UX Architecture',
  'Design Systems',
  'Human-in-the-Loop Design',
  'Fintech UX',
  'Regulated Industries'
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-[var(--bg)] border-t border-[var(--line)] overflow-hidden">
      <NetworkGraphic className="absolute inset-0 w-full h-full" nodeCount={55} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-sm text-indigo-400">01</span>
          <span className="h-px w-10 bg-[var(--line-strong)]" />
          <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">Complexity Is the Job</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl space-y-6"
        >
          <h3 className="font-display text-2xl md:text-[28px] text-[var(--text)] leading-snug mb-2">
            <span className="text-indigo-400">AI-native</span> product design, UX strategy, and 0-to-1 execution.
          </h3>
          <p className="text-[var(--text-muted)] leading-relaxed">
            8+ years of end-to-end product design and UX strategy across fintech, B2B SaaS, healthcare, and telecom — spanning 0-to-1 product launches, design systems architecture, information architecture, and journey mapping for global enterprises and high-growth startups alike.
          </p>
          <p className="text-[var(--text-muted)] leading-relaxed">
            I operate at the intersection of product management and product design: problem framing, PRD-level requirement structuring, and outcome-driven roadmapping, backed by interaction design and usability testing. Increasingly, that means building the product myself — taking prototypes to production-ready software in AI-native IDEs, designing the agentic workflows underneath them, and engineering the prompts and context that drive them — so discovery, prototyping, and real UI happen in one loop instead of a sequential handoff.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-4">
            {TRAITS.map((trait) => (
              <span
                key={trait}
                className="px-3.5 py-1.5 text-xs text-[var(--text-muted)] rounded-full bg-[var(--bg-soft)] border border-[var(--line)] hover:bg-indigo-400/10 hover:text-indigo-400 hover:border-indigo-400/30 transition-colors duration-300"
              >
                {trait}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
