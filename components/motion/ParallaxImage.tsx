'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import type { StaticImageData } from 'next/image'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { EASE } from '@/animations/easing'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ImageSrc = string | StaticImageData

/**
 * A project banner that opens with a clip reveal and drifts a few percent
 * against the scroll. Parallax is skipped entirely for reduced-motion visitors.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  position = 'object-center',
}: {
  src: ImageSrc
  alt: string
  className?: string
  position?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    // Outer wrapper is never clipped, so the in-view observer always sees it.
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={`relative ${className}`}
    >
      <motion.div
        variants={{
          hidden: { clipPath: 'inset(0 0 100% 0)' },
          show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease: EASE } },
        }}
        className="absolute inset-0 overflow-hidden bg-[var(--bg-soft)]"
      >
        <motion.div style={reduced ? undefined : { y }} className="absolute inset-x-0 -top-[5%] h-[110%]">
          <ImageWithFallback src={src} alt={alt} className={`w-full h-full object-cover ${position}`} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
