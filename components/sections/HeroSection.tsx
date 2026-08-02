'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { HeroBackground } from '@/components/graphics/HeroBackground'
import { EASE } from '@/animations/easing'
import { useScrollToSection } from '@/providers/LenisProvider'

export function HeroSection() {
  const scrollToSection = useScrollToSection()

  return (
    <section
      id="home"
      className="relative bg-[var(--bg)] overflow-hidden pt-40 pb-24 md:pt-44 md:pb-28"
    >
      <HeroBackground className="absolute inset-0 w-full h-full" />

      <div className="w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs tracking-[0.15em] uppercase rounded-full bg-blue-50 border border-blue-700 text-blue-900">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600" />
                </span>
                Product Designer
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs tracking-[0.15em] uppercase rounded-full bg-purple-50 border border-purple-700 text-purple-900">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-600 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-600" />
                </span>
                Product Manager
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs tracking-[0.15em] uppercase rounded-full bg-green-50 border border-green-700 text-green-900">
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-600" />
                </span>
                Product Builder
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
            className="font-display font-semibold leading-[1.05] tracking-tight text-[clamp(2.4rem,5.4vw,4.75rem)] max-w-6xl"
          >
            <span className="text-black">Building digital experiences that matter</span>{' '}
            <span className="text-black">
              for <span className="bg-gradient-to-r from-violet-500 to-orange-400 bg-clip-text text-transparent">Agentic AI</span>,{' '}
              <span className="bg-gradient-to-r from-violet-500 to-orange-400 bg-clip-text text-transparent">B2B SaaS</span>,{' '}
              <span className="bg-gradient-to-r from-violet-500 to-orange-400 bg-clip-text text-transparent">Fintech</span>,{' '}
              <span className="bg-gradient-to-r from-violet-500 to-orange-400 bg-clip-text text-transparent">Healthcare</span> and{' '}
              <span className="bg-gradient-to-r from-violet-500 to-orange-400 bg-clip-text text-transparent">B2C</span> products.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
            className="text-[var(--text-muted)] text-lg max-w-2xl mt-8 leading-relaxed"
          >
            8+ years driving 0-to-1 product strategy, end-to-end UX design, and
            AI-native, agentic workflow design — turning ambiguous problem
            spaces into scalable design systems and outcome-driven roadmaps,
            shipped fast without sacrificing craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-12"
          >
            <motion.button
              whileHover={{ y: -3, boxShadow: '0 12px 24px -8px rgba(79,70,229,0.45)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2 bg-[var(--brand)] text-white px-7 py-3.5 rounded-full font-medium transition-colors hover:bg-indigo-700"
            >
              View My Work
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-[var(--line-strong)] text-[var(--text)] px-7 py-3.5 rounded-full font-medium transition-colors hover:border-indigo-400/50 hover:text-indigo-400"
            >
              My Resume
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
