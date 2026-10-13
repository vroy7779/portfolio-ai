'use client'

import { motion } from 'motion/react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollToSection } from '@/providers/LenisProvider'
import { EASE } from '@/animations/easing'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

/** Floating top bar: name left, section links centre, availability right. Flat, hairline, no shadow. */
export function Navigation() {
  const { active, scrolled } = useActiveSection(SECTION_IDS)
  const scrollToSection = useScrollToSection()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
    >
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex items-center justify-between gap-2 w-full max-w-5xl h-14 rounded-full pl-5 pr-2 border transition-colors duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-[var(--line-strong)]'
            : 'bg-white/70 backdrop-blur-sm border-[var(--line)]'
        }`}
      >
        <button
          onClick={() => scrollToSection('home')}
          className="cursor-pointer font-display text-[17px] text-[var(--ink)] min-h-[44px] flex items-center gap-2"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
          Vaibhav Roy
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  active === item.id
                    ? 'bg-[var(--ink)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="mailto:vroyui@gmail.com"
          className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[var(--ink)] text-[var(--ink)] text-sm px-5 h-10 transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
        >
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          <span className="hidden sm:inline">Available for work</span>
          <span className="sm:hidden">Hire me</span>
        </a>
      </nav>
    </motion.header>
  )
}
