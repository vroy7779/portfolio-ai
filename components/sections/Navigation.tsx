'use client'

import { useEffect, useState } from 'react'
import e from '@/components/e/eui.module.css'
import { useScrollToSection } from '@/providers/LenisProvider'
import t from './Topbar.module.css'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Top bar, ported from the approved Direction E mockup: name at the left, sections in the middle,
 * "Available for work" at the right. A sheet replaces the links on small screens.
 */
export function Navigation() {
  const scrollToSection = useScrollToSection()
  const [current, setCurrent] = useState('home')
  const [open, setOpen] = useState(false)

  // The section being read is the one crossing the middle of the screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setCurrent(en.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header className={t.topbar}>
        <div className={`${e.container} ${t.inner}`}>
          <button type="button" className={t.name} onClick={() => go('home')}>
            Vaibhav Roy
          </button>
          <nav className={t.nav} aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${t.link} ${current === item.id ? t.current : ''}`}
                aria-current={current === item.id ? 'true' : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className={t.end}>
            <span className={t.status}>Available for work</span>
            <button
              type="button"
              className={`${e.btnIcon} ${t.menu}`}
              aria-expanded={open}
              aria-controls="mobile-sheet"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className={t.sheet} id="mobile-sheet">
          <nav aria-label="Primary, mobile">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${t.sheetLink} ${current === item.id ? t.currentLink : ''}`}
                aria-current={current === item.id ? 'true' : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <span className={`${t.status} ${t.sheetStatus}`}>Available for work</span>
        </div>
      )}
    </>
  )
}
