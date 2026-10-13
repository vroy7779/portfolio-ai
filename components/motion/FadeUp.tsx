'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE } from '@/animations/easing'

/** Small, slow rise-and-fade on scroll-in. Used for body copy blocks. */
export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
