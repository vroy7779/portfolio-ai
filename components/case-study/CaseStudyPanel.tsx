'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Check } from 'lucide-react'
import { useState } from 'react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { StaticImageData } from 'next/image'
import { EASE, SURFACE_SPRING } from '@/animations/easing'


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
            className="fixed inset-0 bg-black/40 z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SURFACE_SPRING}
            data-lenis-prevent
            className="fixed right-0 top-0 h-full w-full md:w-[min(720px,55vw)] bg-[var(--bg)] border-l border-[var(--line)] shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header — index, title and close share one baseline */}
            <div className="sticky top-0 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] z-10">
              <div className="px-6 sm:px-10 h-[88px] flex items-center justify-between gap-6">
                <div className="flex items-center gap-5 min-w-0">
                  <span className="font-mono text-sm text-[var(--text-faint)] w-8 flex-shrink-0">{index}</span>
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[var(--text-faint)] mb-1">
                      Case study &middot; {company}
                    </p>
                    <h2 className="font-display text-xl text-[var(--text)] leading-tight truncate">{title}</h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close case study"
                  className="cursor-pointer w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content — one left edge, one rhythm */}
            <div className="px-6 sm:px-10 py-12 space-y-14">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-[var(--text)] text-lg leading-relaxed max-w-[60ch]"
              >
                {summary}
              </motion.p>

              {/* Meta as aligned label / value rows */}
              <dl className="border-t border-[var(--line-strong)]">
                {meta.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-x-6 py-4 border-b border-[var(--line)]"
                  >
                    <dt className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-faint)] pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-[var(--text)] leading-relaxed">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Process */}
              {process && process.length > 0 && (
                <section>
                  <SectionLabel n={numberFor('process')} title="Process" />
                  <ol className="mt-6 border-t border-[var(--line-strong)]">
                    {process.map((step, i) => (
                      <li
                        key={step.title}
                        className="grid grid-cols-[40px_1fr] gap-x-4 py-5 border-b border-[var(--line)]"
                      >
                        <span className="font-mono text-sm text-[var(--text-faint)] pt-0.5">0{i + 1}</span>
                        <div>
                          <h5 className="text-[var(--text)] mb-1.5 leading-snug">{step.title}</h5>
                          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* Research */}
              {research && research.items.length > 0 && (
                <section>
                  <SectionLabel n={numberFor('research')} title="Research" />
                  {research.intro && (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-6 max-w-[60ch]">
                      {research.intro}
                    </p>
                  )}
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7 mt-6 pt-6 border-t border-[var(--line-strong)]">
                    {research.items.map((item) => (
                      <div key={item.title}>
                        <h6 className="text-sm text-[var(--text)] mb-1.5 leading-snug">{item.title}</h6>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Outcome */}
              {(stats?.length || outcomes?.length) && (
                <section>
                  <SectionLabel n={numberFor('outcome')} title="Outcome" />

                  {stats && stats.length > 0 && (
                    <dl
                      className="mt-6 grid border-t border-[var(--line-strong)]"
                      style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, minmax(0, 1fr))` }}
                    >
                      {stats.map((stat, i) => (
                        <div
                          key={stat.label}
                          className={`py-6 pr-4 ${i % 3 !== 0 ? 'pl-5 border-l border-[var(--line)]' : ''} ${
                            i >= 3 ? 'border-t border-[var(--line)]' : ''
                          }`}
                        >
                          <dd className="font-display text-3xl text-[var(--text)] leading-none">{stat.value}</dd>
                          <dt className="text-xs text-[var(--text-muted)] mt-2.5 leading-snug">{stat.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}

                  {outcomes && outcomes.length > 0 && (
                    <ul className="mt-2 border-t border-[var(--line-strong)]">
                      {outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="grid grid-cols-[40px_1fr] gap-x-4 py-4 border-b border-[var(--line)] text-sm text-[var(--text-muted)] leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-[var(--text)] mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {/* Screens */}
              {screens && screens.length > 0 && (
                <section>
                  <SectionLabel n={numberFor('screens')} title="Screens" />
                  <div className="grid sm:grid-cols-2 gap-6 mt-6">
                    {screens.map((screen) => (
                      <ScreenCard key={screen.title} screen={screen} onOpen={openLightbox} />
                    ))}
                  </div>
                </section>
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
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm text-[var(--text-faint)] w-8">{n}</span>
      <h4 className="font-display text-2xl text-[var(--text)] leading-none">{title}</h4>
    </div>
  )
}

function ScreenCard({ screen, onOpen }: { screen: ScreenItem; onOpen: (images: ImageSrc[], i?: number) => void }) {
  const gallery = [screen.image, ...(screen.gallery ?? [])]
  const isExternal = Boolean(screen.href)

  const content = (
    <>
      <div className="relative overflow-hidden bg-[var(--bg-soft)] aspect-[4/3]">
        <ImageWithFallback
          src={screen.image}
          alt={screen.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[var(--ink)] transition-colors duration-200 group-hover:bg-[var(--ink)] group-hover:text-white">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
      <div className="pt-3.5 flex-1">
        <h5 className="text-sm text-[var(--text)] mb-1 leading-snug">{screen.title}</h5>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{screen.description}</p>
      </div>
    </>
  )

  const className = 'group flex flex-col h-full cursor-pointer text-left'

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
