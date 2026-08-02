'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return { id, top: Infinity }
        return { id, top: Math.abs(el.getBoundingClientRect().top - 120) }
      })
      offsets.sort((a, b) => a.top - b.top)
      setActive(offsets[0].id)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--surface)]/85 backdrop-blur-md border-b border-[var(--line)] shadow-[0_1px_2px_rgba(20,22,43,0.04)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <button
            onClick={() => scrollToSection('home')}
            className="font-display text-[22px] text-[var(--text)] tracking-tight"
          >
            Vaibhav Roy
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative px-4 py-2 flex items-center gap-2 text-sm transition-colors duration-300"
              >
                <span
                  className={`font-mono text-[10px] transition-colors duration-300 ${
                    active === item.id ? 'text-indigo-400' : 'text-[var(--text-faint)] group-hover:text-indigo-400/70'
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`tracking-wide transition-colors duration-300 ${
                    active === item.id ? 'text-[var(--text)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text)]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-4 pr-1 py-1 rounded-full border border-[var(--line)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
            </span>
            <span className="text-xs text-[var(--text-muted)] pr-2">Available for work</span>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
