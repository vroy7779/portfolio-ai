'use client'

import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { RiseText } from '@/components/motion/RiseText'
import { EASE } from '@/animations/easing'
import { useScrollToSection } from '@/providers/LenisProvider'

const ROLES = ['Product Designer', 'Product Manager', 'Product Builder']

const STATS = [
  { value: '9+', label: 'Years in product design & management' },
  { value: '5', label: 'Domains: Agentic AI, healthcare, fintech, oil & gas, B2B SaaS' },
  { value: '3', label: 'Disciplines: product design, product management, production-ready code' },
  { value: '50+', label: 'Reusable components in a design system' },
  { value: '20k+', label: 'Enterprise users on the products I designed' },
]

export function HeroSection() {
  const scrollToSection = useScrollToSection()

  return (
    <section id="home" className="bg-[var(--bg)] pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10">
        <div>
          <div>
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-sm text-[var(--text-muted)]"
            >
              {ROLES.map((role, i) => (
                <li key={role} className="flex items-center gap-5">
                  <span className={i === 0 ? 'text-[var(--ink)]' : ''}>{role}</span>
                  {i < ROLES.length - 1 && <span aria-hidden className="h-px w-6 bg-[var(--line-strong)]" />}
                </li>
              ))}
            </motion.ul>

            <h1 className="font-display font-light text-[clamp(2.4rem,5.2vw,5rem)] leading-[1.05] text-[var(--ink)] max-w-[24ch]">
              <RiseText onMount delay={0.15}>
                I design and build digital experiences that matter, for Agentic AI, B2B SaaS, Fintech, Healthcare, and
                B2C products.
              </RiseText>
            </h1>


            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-10"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="cursor-pointer group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[var(--ink)] text-white text-sm transition-colors duration-200 hover:bg-[#3a3a3a]"
              >
                View selected work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="cursor-pointer inline-flex items-center justify-center h-12 px-7 rounded-full border border-[var(--ink)] text-[var(--ink)] text-sm transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
              >
                Get in touch
              </button>
            </motion.div>
          </div>

        </div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-5 border-t border-[var(--line-strong)]"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-6 pr-6 ${i > 0 ? 'lg:pl-6 lg:border-l lg:border-[var(--line)]' : ''} ${
                i % 2 === 1 ? 'pl-6 border-l border-[var(--line)]' : ''
              } ${i === STATS.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display font-light text-4xl md:text-5xl text-[var(--ink)]">
                  {stat.value}
                </span>
                <span className="block mt-2 text-sm text-[var(--text-muted)] leading-snug">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
