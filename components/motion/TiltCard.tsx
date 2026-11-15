'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Wraps an image so it leans toward the pointer in real perspective, with the
 * picture itself shifting slightly against the frame. Quiet at rest, tactile on
 * hover. No effect for touch input or reduced motion.
 */
export function TiltCard({
  children,
  className = '',
  parallax = true,
}: {
  children: ReactNode
  className?: string
  /** Shift and slightly zoom the picture inside its frame. Turn off when the image has branding near its edges. */
  parallax?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 160, damping: 22, mass: 0.4 })
  const sy = useSpring(py, { stiffness: 160, damping: 22, mass: 0.4 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5])
  const shiftX = useTransform(sx, [-0.5, 0.5], [10, -10])
  const shiftY = useTransform(sy, [-0.5, 0.5], [8, -8])

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType === 'touch') return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={className} style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden bg-[var(--bg-soft)]"
      >
        <motion.div style={{ x: reduced || !parallax ? 0 : shiftX, y: reduced || !parallax ? 0 : shiftY, scale: parallax ? 1.06 : 1 }} className="h-full w-full">
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
