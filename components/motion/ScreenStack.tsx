'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { StaticImageData } from 'next/image'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { EASE } from '@/animations/easing'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface StackScreen {
  src: string | StaticImageData
  alt: string
  label: string
}

// Back to front. Each layer sits further out on the z axis and further down-left,
// so the stack reads as real screens hovering in space.
const LAYERS = [
  { left: '28%', top: '0%', z: 0 },
  { left: '19%', top: '7%', z: 45 },
  { left: '10%', top: '14%', z: 90 },
  { left: '1%', top: '21%', z: 135 },
]

/**
 * Real product screens as layered planes in true 3D perspective. The whole stack
 * tilts toward the pointer, and the layers separate in depth so the parallax
 * between them is physical, not faked. Reduced motion: flat and still.
 */
export function ScreenStack({ screens, className = '' }: { screens: StackScreen[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.5 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-24, -4])
  const rotateX = useTransform(sy, [-0.5, 0.5], [14, 2])

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === 'touch') return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  const layers = screens.slice(0, LAYERS.length)

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative w-full aspect-[16/12] ${className}`}
      style={{ perspective: 1800 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: reduced ? 8 : rotateX, rotateY: reduced ? -14 : rotateY, transformStyle: 'preserve-3d' }}
      >
        {layers.map((screen, i) => {
          const pos = LAYERS[i]
          return (
            <motion.figure
              key={screen.label}
              initial={reduced ? false : { opacity: 0, y: 48, z: pos.z - 120 }}
              animate={{ opacity: 1, y: 0, z: pos.z }}
              transition={{ duration: 1, delay: 0.25 + i * 0.14, ease: EASE }}
              className="absolute w-[72%] overflow-hidden rounded-[12px] border border-[var(--line-strong)] bg-white"
              style={{
                left: pos.left,
                top: pos.top,
                transformStyle: 'preserve-3d',
                boxShadow: '0 28px 60px rgba(10,10,10,0.14), 0 2px 6px rgba(10,10,10,0.06)',
              }}
            >
              <ImageWithFallback src={screen.src} alt={screen.alt} className="block w-full h-auto" />
              <figcaption className="absolute left-3 bottom-3 rounded-[6px] bg-[var(--ink)] px-2.5 py-1 font-mono text-[11px] text-white">
                {screen.label}
              </figcaption>
            </motion.figure>
          )
        })}
      </motion.div>
    </div>
  )
}
