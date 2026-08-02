'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Calendar, Mail, MapPin, Phone } from 'lucide-react'
import { EASE } from '@/animations/easing'


const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'vroyui@gmail.com', href: 'mailto:vroyui@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9611907521', href: 'tel:+919611907521' },
  { icon: Calendar, label: 'Schedule a Meeting', value: 'Book time on Calendly', href: 'https://calendly.com/vaibhavroy', external: true },
  { icon: MapPin, label: 'Location', value: 'India', href: undefined }
]

export function ContactSection() {
  return (
    <section id="contact" className="py-28 md:py-36 bg-[var(--bg)] border-t border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-100px' }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-sm text-indigo-400">04</span>
          <span className="h-px w-10 bg-[var(--line-strong)]" />
          <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">Contact</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-7"
          >
            <h3 className="font-display font-semibold tracking-tight text-[clamp(2rem,4.5vw,3.5rem)] text-[var(--text)] leading-[1.1] mb-6">
              Let's build something <span className="text-indigo-400">worth talking about.</span>
            </h3>
            <p className="text-[var(--text-muted)] leading-relaxed max-w-lg mb-10">
              I'm open to full-time roles and select freelance engagements — particularly where AI-native product strategy and UX systems design need to sit with the same person, not two.
            </p>
            <motion.a
              href="mailto:vroyui@gmail.com"
              whileHover={{ y: -3, boxShadow: '0 12px 24px -8px rgba(79,70,229,0.45)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[var(--brand)] text-white px-7 py-3.5 rounded-full font-medium transition-colors hover:bg-indigo-700"
            >
              Say Hello
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-5"
          >
            {CONTACT_INFO.map((info, index) => {
              const Wrapper = info.href ? motion.a : motion.div
              return (
                <Wrapper
                  key={info.label}
                  {...(info.href ? { href: info.href, target: info.external ? '_blank' : undefined, rel: info.external ? 'noopener noreferrer' : undefined } : {})}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
                  viewport={{ once: true, margin: '-40px' }}
                  className={`group flex items-center justify-between py-5 ${index !== 0 ? 'border-t border-[var(--line)]' : ''} ${info.href ? 'cursor-pointer' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-indigo-400 group-hover:border-indigo-400/50 transition-colors duration-300 flex-shrink-0">
                      <info.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-faint)] uppercase tracking-wide">{info.label}</p>
                      <p className="text-[var(--text)] text-sm mt-0.5">{info.value}</p>
                    </div>
                  </div>
                  {info.href && (
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-faint)] group-hover:text-indigo-400 transition-colors duration-300" />
                  )}
                </Wrapper>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-24 pt-8 border-t border-[var(--line)]"
        >
          <p className="text-[var(--text-faint)] text-sm">&copy; 2025 Vaibhav Roy</p>
          <button
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[var(--text-muted)] hover:text-indigo-400 text-sm transition-colors duration-300"
          >
            Back to top
          </button>
        </motion.div>
      </div>
    </section>
  )
}
