'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Check } from 'lucide-react'
import { useState } from 'react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { StaticImageData } from 'next/image'

const EASE = [0.16, 1, 0.3, 1] as const

/** A screen/gallery image is either a locally imported asset (StaticImageData) or a plain URL string. */
type ImageSrc = string | StaticImageData

export interface MetaItem {
  label: string
  value: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface ResearchItem {
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}

export interface ScreenItem {
  image: ImageSrc
  title: string
  description: string
  /** Extra images to cycle through in the lightbox, in addition to `image`. */
  gallery?: ImageSrc[]
  /** If set, clicking opens this URL in a new tab instead of the lightbox. */
  href?: string
}

export interface CaseStudyPanelProps {
  isOpen: boolean
  onClose: () => void
  index: string
  title: string
  company: string
  summary: string
  meta: MetaItem[]
  process?: ProcessStep[]
  research?: { intro?: string; items: ResearchItem[] }
  stats?: StatItem[]
  outcomes?: string[]
  screens?: ScreenItem[]
}

export function CaseStudyPanel({
  isOpen,
  onClose,
  index,
  title,
  company,
  summary,
  meta,
  process,
  research,
  stats,
  outcomes,
  screens,
}: CaseStudyPanelProps) {
  const [lightbox, setLightbox] = useState<{ images: ImageSrc[]; i: number } | null>(null)

  const sectionOrder = [
    process && process.length > 0 && 'process',
    research && research.items.length > 0 && 'research',
    (stats && stats.length > 0) || (outcomes && outcomes.length > 0) ? 'outcome' : false,
    screens && screens.length > 0 && 'screens',
  ].filter(Boolean) as string[]
  const numberFor = (key: string) => String(sectionOrder.indexOf(key) + 1).padStart(2, '0')

  const openLightbox = (images: ImageSrc[], i = 0) => setLightbox({ images, i })
  const closeLightbox = () => setLightbox(null)
  const nextImage = () =>
    setLightbox((prev) => (prev ? { ...prev, i: (prev.i + 1) % prev.images.length } : prev))
  const prevImage = () =>
    setLightbox((prev) =>
      prev ? { ...prev, i: (prev.i - 1 + prev.images.length) % prev.images.length } : prev
    )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0b0c16]/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-1/2 bg-[var(--bg)] border-l border-[var(--line)] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[var(--bg)]/92 backdrop-blur-md border-b border-[var(--line)] z-10">
              <div className="px-6 sm:px-10 py-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm text-indigo-400 pt-1">{index}</span>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[var(--text-faint)] mb-1.5">
                      Case Study &middot; {company}
                    </p>
                    <h2 className="font-display font-semibold text-xl text-[var(--text)] leading-snug">
                      {title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--text-muted)] hover:bg-indigo-400 hover:text-white hover:border-indigo-400 transition-colors duration-300 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-10 py-10 space-y-16">
              {/* Summary */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-[var(--text-muted)] leading-relaxed text-[15px]"
              >
                {summary}
              </motion.p>

              {/* Meta */}
              <div className="rounded-2xl bg-[var(--bg-soft)] border border-[var(--line)] p-6 sm:p-8 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {meta.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs tracking-[0.15em] uppercase text-[var(--text-faint)] mb-1.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-[var(--text)] leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Process */}
              {process && process.length > 0 && (
                <div>
                  <SectionLabel n={numberFor('process')} title="Process" />
                  <div className="mt-6">
                    {process.map((step, i) => (
                      <div
                        key={step.title}
                        className={`flex items-start gap-6 py-6 ${i !== 0 ? 'border-t border-[var(--line)]' : ''}`}
                      >
                        <span className="font-display text-lg text-[var(--text-faint)] pt-0.5 w-8 flex-shrink-0">
                          0{i + 1}
                        </span>
                        <div>
                          <h5 className="text-[var(--text)] mb-1.5">{step.title}</h5>
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research */}
              {research && research.items.length > 0 && (
                <div>
                  <SectionLabel n={numberFor('research')} title="Research" />
                  {research.intro && (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-6 mb-6">{research.intro}</p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                    {research.items.map((item) => (
                      <div key={item.title}>
                        <h6 className="text-sm text-[var(--text)] mb-1.5">{item.title}</h6>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome */}
              {(stats?.length || outcomes?.length) && (
                <div>
                  <SectionLabel n={numberFor('outcome')} title="Outcome" />

                  {stats && stats.length > 0 && (
                    <div className="flex flex-wrap items-start gap-x-10 gap-y-6 mt-8 pb-8 border-b border-[var(--line)]">
                      {stats.map((stat, i) => (
                        <div key={stat.label} className={i > 0 ? 'pl-10 border-l border-[var(--line)]' : ''}>
                          <p className="font-display text-3xl text-[var(--text)]">{stat.value}</p>
                          <p className="text-xs text-[var(--text-faint)] uppercase tracking-wide mt-1 max-w-[9rem]">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {outcomes && outcomes.length > 0 && (
                    <ul className="space-y-3 mt-6">
                      {outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3 text-sm text-[var(--text-muted)] leading-relaxed">
                          <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Screens */}
              {screens && screens.length > 0 && (
                <div>
                  <SectionLabel n={numberFor('screens')} title="Screens" />
                  <div className="grid sm:grid-cols-2 gap-5 mt-6">
                    {screens.map((screen) => (
                      <ScreenCard key={screen.title} screen={screen} onOpen={openLightbox} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeLightbox}
                  className="fixed inset-0 bg-black/92 z-[60]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                  className="fixed inset-0 z-[70] flex items-center justify-center p-6 sm:p-12"
                >
                  <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
                    <button
                      onClick={closeLightbox}
                      className="absolute top-0 right-0 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300 z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {lightbox.images.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          prevImage()
                        }}
                        className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300 z-10"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}

                    <ImageWithFallback
                      src={lightbox.images[lightbox.i]}
                      alt=""
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />

                    {lightbox.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            nextImage()
                          }}
                          className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300 z-10"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/10 rounded-full px-4 py-1.5 text-white text-xs">
                          {lightbox.i + 1} / {lightbox.images.length}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm text-indigo-400">{n}</span>
      <span className="h-px w-10 bg-[var(--line-strong)]" />
      <h4 className="text-[var(--text)]">{title}</h4>
    </div>
  )
}

function ScreenCard({ screen, onOpen }: { screen: ScreenItem; onOpen: (images: ImageSrc[], i?: number) => void }) {
  const gallery = [screen.image, ...(screen.gallery ?? [])]
  const isExternal = Boolean(screen.href)

  const content = (
    <>
      <div className="relative overflow-hidden rounded-t-2xl">
        <ImageWithFallback
          src={screen.image}
          alt={screen.title}
          className="w-full h-56 object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--bg)]/80 backdrop-blur flex items-center justify-center text-[var(--text)] group-hover:bg-indigo-400 group-hover:text-white transition-colors duration-300">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
      <div className="p-5">
        <h5 className="text-sm text-[var(--text)] mb-1.5">{screen.title}</h5>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{screen.description}</p>
      </div>
    </>
  )

  const className =
    'group rounded-2xl bg-[var(--surface)] border border-[var(--line)] overflow-hidden shadow-[0_8px_24px_-16px_rgba(20,22,43,0.15)] hover:shadow-[0_16px_32px_-16px_rgba(79,70,229,0.25)] transition-shadow duration-500 cursor-pointer block text-left'

  if (isExternal) {
    return (
      <a href={screen.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={() => onOpen(gallery, 0)} className={className}>
      {content}
    </button>
  )
}
