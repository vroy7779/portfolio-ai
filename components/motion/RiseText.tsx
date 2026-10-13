'use client'

import { motion } from 'motion/react'
import { EASE } from '@/animations/easing'

/**
 * Words rise out of a mask, one after another. The site's signature headline
 * reveal. Plain string children only; words are inline-block so wrapping stays
 * natural. `onMount` plays on load (hero); otherwise on scroll-in.
 */
export function RiseText({
  children,
  delay = 0,
  stagger = 0.045,
  onMount = false,
  className,
}: {
  children: string
  delay?: number
  stagger?: number
  onMount?: boolean
  className?: string
}) {
  const words = children.split(' ')
  const trigger = onMount
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '-60px' } }

  return (
    <motion.span
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      initial="hidden"
      aria-label={children}
      {...trigger}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className="inline-block will-change-transform"
            variants={{ hidden: { y: '115%' }, show: { y: '0%', transition: { duration: 0.9, ease: EASE } } }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
