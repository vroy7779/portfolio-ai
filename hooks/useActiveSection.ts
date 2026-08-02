'use client'

import { useEffect, useState } from 'react'

interface UseActiveSectionResult {
  /** id of the section currently closest to the "active" reading line. */
  active: string
  /** whether the page has scrolled past `scrolledThreshold` — for nav chrome to react to. */
  scrolled: boolean
}

/**
 * Purpose: drives the Navigation component's "quiet wayfinding" behavior (Creative
 * Direction: the nav should know where the reader is without announcing it loudly).
 * Tracks which of the given section ids is nearest an anchor line 120px from the
 * viewport top, and whether the page has scrolled past a threshold (for the nav
 * bar's transparent-to-solid transition).
 *
 * Props: `sectionIds` — ordered list of section element ids to track.
 * `scrolledThreshold` — px scrolled before `scrolled` flips true (default 40, matching
 * the original implementation).
 *
 * Accessibility: purely visual state, doesn't affect focus order or semantics —
 * the nav's actual link targets remain real anchors regardless of this value.
 */
export function useActiveSection(sectionIds: string[], scrolledThreshold = 40): UseActiveSectionResult {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > scrolledThreshold)

      const offsets = sectionIds.map((id) => {
        const el = document.getElementById(id)
        if (!el) return { id, top: Infinity }
        return { id, top: Math.abs(el.getBoundingClientRect().top - 120) }
      })
      offsets.sort((a, b) => a.top - b.top)
      if (offsets[0]) setActive(offsets[0].id)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolledThreshold])

  return { active, scrolled }
}
