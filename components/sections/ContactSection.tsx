'use client'

import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/motion/FadeUp'
import { RiseText } from '@/components/motion/RiseText'

const DETAILS = [
  { label: 'Phone', value: '+91 9611907521', href: 'tel:+919611907521' },
  { label: 'Book a call', value: 'calendly.com/vaibhavroy', href: 'https://calendly.com/vaibhavroy', external: true },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--bg)] border-t border-[var(--line-strong)]">
      <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10 pt-20 md:pt-32 pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-faint)] mb-10">Contact</p>

        <h2 className="font-display font-light text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.1] text-[var(--ink)] max-w-[22ch]">
          <RiseText>Open to full-time roles and select freelance work.</RiseText>
        </h2>

        <FadeUp delay={0.1}>
          <a
            href="mailto:vroyui@gmail.com"
            className="cursor-pointer group inline-block mt-12 md:mt-16 font-display font-light text-[clamp(1.75rem,6.4vw,6rem)] leading-none text-[var(--ink)] break-all"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
              vroyui@gmail.com
            </span>
            <ArrowUpRight className="inline-block ml-3 w-[0.5em] h-[0.5em] align-top transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </FadeUp>

        <dl className="mt-20 md:mt-28 grid sm:grid-cols-2 gap-x-12 gap-y-8 border-t border-[var(--line-strong)] pt-8">
          {DETAILS.map((d) => (
            <div key={d.label}>
              <dt className="text-xs text-[var(--text-faint)] mb-2">{d.label}</dt>
              <dd className="text-base text-[var(--ink)]">
                {d.href ? (
                  <a
                    href={d.href}
                    target={d.external ? '_blank' : undefined}
                    rel={d.external ? 'noopener noreferrer' : undefined}
                    className="cursor-pointer hover:underline underline-offset-4"
                  >
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-24 flex items-center justify-between text-sm text-[var(--text-faint)]">
          <p>&copy; 2025 Vaibhav Roy</p>
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer hover:text-[var(--ink)] transition-colors duration-200"
          >
            Back to top
          </button>
        </div>
      </div>
    </section>
  )
}
