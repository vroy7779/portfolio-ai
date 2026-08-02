'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { NetworkGraphic } from '@/components/graphics/NetworkGraphic'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const NetworkScene = dynamic(() => import('@/components/three/NetworkScene').then((m) => m.NetworkScene), {
  ssr: false,
  // The 2D canvas doubles as the loading fallback — no empty flash while the
  // 3D scene's chunk downloads, and no CLS since both fill the same container.
  loading: () => <NetworkGraphic className="absolute inset-0 w-full h-full" />,
})

/**
 * Purpose: decides which background the Hero actually gets — the one deliberate
 * 3D moment (Creative Direction addendum) for most visitors, or the lightweight
 * 2D canvas for anyone who asked for reduced motion.
 *
 * Accessibility: `prefers-reduced-motion` visitors never load the 3D bundle at
 * all — this isn't 3D-with-animation-disabled, it's a genuinely different,
 * lighter component tree.
 *
 * Performance: pauses the 3D scene's render loop entirely once the Hero has
 * scrolled out of view, via IntersectionObserver — a canvas nobody can see
 * shouldn't spend a frame budget.
 */
export function HeroBackground({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {reducedMotion ? (
        <NetworkGraphic className="absolute inset-0 w-full h-full" />
      ) : (
        <NetworkScene paused={!isVisible} />
      )}
    </div>
  )
}
