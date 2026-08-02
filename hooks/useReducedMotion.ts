'use client'

import { useEffect, useState } from 'react'

/**
 * Purpose: reports whether the visitor has requested reduced motion at the OS level,
 * and keeps that value live if they change the setting mid-session.
 *
 * Returns `false` on the server and on first client render (matches the actual
 * media query once mounted), so callers should treat the first render as a safe
 * default rather than a flash of the wrong state — every consumer in this app
 * (Lenis, the Hero's 3D scene) already renders its reduced-motion-safe fallback
 * as the default and only upgrades to full motion once this returns `false`
 * for certain, which avoids ever animating something a user asked us not to.
 */
export function useReducedMotion(): boolean {
  // Always starts `false` — matching what the server rendered — and corrects
  // immediately post-mount. Reading matchMedia in a lazy initializer instead would
  // make the client's first render diverge from the server's, which is a real
  // hydration mismatch, not just a cosmetic one-frame delay.
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)

    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return reduced
}
