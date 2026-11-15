'use client'

import { Reveal } from '@/components/e/Reveal'
import e from '@/components/e/eui.module.css'
import { useScrollToSection } from '@/providers/LenisProvider'
import { SilkRibbons } from './SilkRibbons'
import h from './Hero.module.css'

const PRACTICE = ['Product Designer', 'Product Manager', 'Product Builder', 'Production ready components']

const STATS = [
  { value: '9+', label: 'Years in product design & management' },
  { value: '50+', label: 'Reusable components in a design system' },
  { value: '20k+', label: 'Enterprise users on the products I designed' },
]

/**
 * Hero, ported from the approved Direction E mockup: the words on white at the left, five translucent silk
 * ribbons sweeping down the right, then a strip with the practice and the three headline numbers.
 */
export function HeroSection() {
  const scrollToSection = useScrollToSection()

  return (
    <section id="home" className={h.hero} aria-labelledby="hero-title">
      <div className={h.main}>
        <div className={e.guides} />
        <SilkRibbons />
        <div className={`${e.container} ${e.cols} ${h.grid}`}>
          <div className={h.copy}>
            <Reveal as="h1" id="hero-title" className={`${e.display} ${h.headline}`}>
              I design and build digital experiences that matter, for{' '}
              <strong>Agentic AI, B2B SaaS, Fintech, Healthcare, Telecom, and B2C</strong> products
            </Reveal>
            <Reveal delay={120} className={h.actions}>
              <button type="button" className={`${e.btn} ${e.btnPrimary}`} onClick={() => scrollToSection('projects')}>
                View selected work
              </button>
              <button type="button" className={`${e.btn} ${e.btnSecondary}`} onClick={() => scrollToSection('contact')}>
                Get in touch
              </button>
            </Reveal>
          </div>
        </div>
      </div>

      <hr className={e.ruleX} />
      <div className={h.stripWrap}>
        <div className={e.guides} />
        <div className={`${e.container} ${e.cols} ${h.strip}`}>
          <ul className={h.practice} aria-label="Practice">
            {PRACTICE.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {STATS.map((stat) => (
            <div key={stat.label} className={e.stat}>
              <span className={e.statNum}>{stat.value}</span>
              <span className={e.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className={e.ruleX} />
    </section>
  )
}
