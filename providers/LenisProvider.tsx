'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { lenisEasing } from '@/animations/easing'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Purpose: owns the single Lenis smooth-scroll instance for the whole app and
 * makes it available to any component that needs to scroll programmatically
 * (Navigation, the Hero's CTA) instead of the native `scrollIntoView`.
 *
 * Accessibility: this is the hard reduced-motion bypass required by the Design
 * System's accessibility standard — if the visitor has `prefers-reduced-motion`
 * set, Lenis is never constructed at all, and native browser scrolling (which
 * already respects that preference) takes over completely.
 *
 * Props: none besides `children` — this wraps the whole app once, in the root layout.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: lenisEasing,
      autoRaf: true,
    })
    setLenis(instance)

    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Returns the shared Lenis instance, or `null` if it isn't running (reduced motion, or not yet mounted). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}

/**
 * Scrolls to a section by id, using Lenis when it's active and falling back to
 * native smooth `scrollIntoView` when it isn't (reduced motion, or pre-mount) —
 * the one scroll-to-section helper every nav/CTA in the app should share.
 */
export function useScrollToSection() {
  const lenis = useLenis()

  return (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    if (lenis) {
      lenis.scrollTo(el)
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
