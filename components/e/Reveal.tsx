'use client'

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'
import e from './eui.module.css'

/** Fades and lifts its content once, the first time it scrolls into view. Static for reduced motion (see CSS). */
export function Reveal({
  as = 'div',
  delay = 0,
  className = '',
  id,
  children,
}: {
  as?: 'div' | 'h1' | 'h2' | 'p' | 'ul'
  delay?: number
  className?: string
  id?: string
  children: ReactNode
}) {
  const Tag = as as ElementType
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${e.reveal} ${shown ? e.revealIn : ''} ${className}`}
      style={{ '--e-reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
