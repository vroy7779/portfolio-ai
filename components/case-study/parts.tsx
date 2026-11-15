'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { AnimatePresence, animate, motion, useInView, useScroll } from 'motion/react'
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { EASE } from '@/animations/easing'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Building blocks shared by every case-study page (Ciena, Bupa Arabia, ...), so each
 * new page keeps the same header, chapter rhythm, counters and image viewer.
 */

export type ImageSrc = string | StaticImageData

export interface ChapterDef {
  id: string
  label: string
}

/** A spot where the story still needs a detail from the author. Search the repo for "FILL IN" to find them all. */
export function Gap({ children }: { children: string }) {
  return (
    <mark className="rounded-[4px] bg-[#fff1b8] px-1.5 py-0.5 font-mono text-[13px] text-[var(--ink)]">
      [FILL IN: {children}]
    </mark>
  )
}

/** Counts up once when scrolled into view. Static for reduced motion. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(value)
      return
    }
    const controls = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span ref={ref} className="tabular-nums">
      {inView || reduced ? n : 0}
      {suffix}
    </span>
  )
}

/** A horizontal bar that grows once when scrolled into view. `value` out of `max`. */
export function Bar({
  value,
  max,
  label,
  display,
  strong,
}: {
  value: number
  max: number
  label: string
  display: string
  strong?: boolean
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm text-[var(--text-muted)]">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-[var(--ink)]">{display}</span>
      </div>
      <div className="mt-2 h-3 rounded-[4px] bg-[var(--bg-soft)] overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: value / max }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: strong ? 0.3 : 0, ease: EASE }}
          className={`h-full origin-left rounded-[4px] ${strong ? 'bg-[var(--ink)]' : 'bg-[#b9b9b4]'}`}
        />
      </div>
    </div>
  )
}

/** One chapter: a sticky numbered label on the left, the story on the right. */
export function Chapter({
  id,
  index,
  title,
  children,
}: {
  id: string
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="border-t border-[var(--line-strong)] py-20 md:py-32">
      <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10 grid lg:grid-cols-12 gap-x-12 gap-y-10">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs text-[var(--text-faint)]">{index}</p>
            <h2 className="font-display tracking-display-md text-3xl md:text-4xl text-[var(--ink)] mt-4">{title}</h2>
          </div>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}

/** Fixed header: back link, the chapter being read, a scroll-progress line. */
export function CaseStudyHeader({ company, chapters }: { company: string; chapters: ChapterDef[] }) {
  const { scrollYProgress } = useScroll()
  const [active, setActive] = useState(chapters[0].id)

  useEffect(() => {
    // The chapter being read is the last one whose top edge has passed the header.
    const update = () => {
      let current = chapters[0].id
      for (const c of chapters) {
        const el = document.getElementById(c.id)
        if (el && el.getBoundingClientRect().top <= 140) current = c.id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [chapters])

  const activeLabel = chapters.find((c) => c.id === active)?.label ?? ''

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-[1480px] mx-auto h-16 px-5 md:px-8 lg:px-10 flex items-center justify-between gap-6">
        <Link
          href="/#projects"
          className="cursor-pointer group inline-flex items-center gap-2 text-sm text-[var(--ink)] min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="font-display">Vaibhav Roy</span>
        </Link>
        <p className="hidden sm:block font-mono text-xs text-[var(--text-faint)]">
          Case study · {company} · {activeLabel}
        </p>
        <a
          href="mailto:vroyui@gmail.com"
          className="cursor-pointer inline-flex items-center h-10 px-5 rounded-full border border-[var(--ink)] text-[var(--ink)] text-sm transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
        >
          Get in touch
        </a>
      </div>
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-[var(--ink)]"
      />
    </header>
  )
}

export function CaseStudyFooter() {
  return (
    <footer className="border-t border-[var(--line-strong)] py-10">
      <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10 flex items-center justify-between text-sm text-[var(--text-faint)]">
        <p>&copy; {new Date().getFullYear()} Vaibhav Roy</p>
        <Link href="/" className="cursor-pointer hover:text-[var(--ink)] transition-colors duration-200">
          Back to home
        </Link>
      </div>
    </footer>
  )
}

interface LightboxState {
  images: ImageSrc[]
  i: number
}

/** State for the image viewer: open a set of images at an index, step through, close. */
export function useLightbox() {
  const [state, setState] = useState<LightboxState | null>(null)
  const open = useCallback((images: ImageSrc[], i = 0) => setState({ images, i }), [])
  const close = useCallback(() => setState(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setState((prev) => (prev ? { ...prev, i: (prev.i + dir + prev.images.length) % prev.images.length } : prev)),
    []
  )
  return { state, open, close, step }
}

export function Lightbox({
  state,
  onClose,
  onStep,
}: {
  state: LightboxState | null
  onClose: () => void
  onStep: (dir: 1 | -1) => void
}) {
  useEffect(() => {
    if (!state) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, onClose, onStep])

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Screen preview"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 md:p-10"
        >
          <button
            onClick={onClose}
            aria-label="Close preview"
            className="cursor-pointer absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
          {state.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onStep(-1)
                }}
                aria-label="Previous image"
                className="cursor-pointer absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onStep(1)
                }}
                aria-label="Next image"
                className="cursor-pointer absolute right-4 bottom-4 md:bottom-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <ImageWithFallback
            src={state.images[state.i]}
            alt="Case study screen"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-[10px] object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
