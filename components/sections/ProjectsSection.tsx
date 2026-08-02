'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, ExternalLink, Palette, Play } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import type { StaticImageData } from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { CienaCaseStudySidecar } from '@/components/case-study/CienaCaseStudySidecar'
import { BupaCaseStudySidecar } from '@/components/case-study/BupaCaseStudySidecar'
import { ShellCaseStudySidecar } from '@/components/case-study/ShellCaseStudySidecar'
import cienaImage from '@/assets/3163b42380ed0bf50edb19eae0d2592a4c6aeb2b.png'
import bupaImage from '@/assets/2ba33c085c98d8c0e6ba8d03d433fd4f6cea2c45.png'
import wealthManagementImage from '@/assets/34e612c38fefa484fe0ead49bed826b5c96d5fc6.png'
import cienaDesignSystemImage from '@/assets/85bdecb474ed5e0fe5da702b77e01ab98b34f80e.png'
import simplylifeDesignSystemImage from '@/assets/6dd04533e27478f2c5be34374efd8e8d9727127b.png'
import shellImage from '@/assets/b15d4a876e4af15635c381d5f3539461afef0a0f.png'
import greenwayHealthLogo from '@/assets/gw.png'
import { EASE } from '@/animations/easing'


type ProjectAction =
  | { type: 'sidecar'; key: 'ciena' | 'bupa' | 'shell' }
  | { type: 'dropdown'; links: { label: string; url: string }[] }
  | { type: 'none' }

type ImageSrc = string | StaticImageData

interface FeaturedProject {
  title: string
  description: { label: string; text: string }[]
  image: ImageSrc
  imagePosition?: 'left-top' | 'center'
  technologies: string[]
  action: ProjectAction
  logo?: ImageSrc
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'Ciena — Real-Time Optical Network Management',
    description: [
      {
        label: 'Problem',
        text: 'Network engineers were planning multi-million-dollar optical infrastructure manually — a fragmented workflow with no shared information architecture, reliant on tribal knowledge.'
      },
      {
        label: 'Approach',
        text: 'Owned 0-to-1 UX strategy and product design for the B2B SaaS platform that replaced it: user research and contextual inquiry, information architecture, workflow design, interactive prototyping, usability testing, and a scalable design system (50+ reusable components).'
      },
      {
        label: 'Impact',
        text: '85% faster network creation, 92% fewer real-world errors and outages, user satisfaction nearly doubled (4.8 → 8.7/10).'
      }
    ],
    image: cienaImage,
    technologies: ['B2B SaaS', 'AI Agent', 'Dashboard', 'UX/UI', 'Telecommunication'],
    action: { type: 'sidecar', key: 'ciena' }
  },
  {
    title: 'Bupa Arabia — Insurance Sales & Population Health Management',
    description: [
      {
        label: 'Problem',
        text: "Bupa Arabia's insurance-purchase journey and health-benefit access were two disconnected experiences, both routing customers to a call center instead of self-service — in a regulated, bilingual (Arabic/English) healthcare market."
      },
      {
        label: 'Approach',
        text: 'As Lead Product Designer, ran end-to-end UX research, journey mapping, service blueprinting, and usability testing across a B2C insurance sales website and a Population Health Management mobile app — translating regulatory constraints into a unified, bilingual information architecture.'
      },
      {
        label: 'Impact',
        text: '35% increase in online insurance conversions, 28% fewer support calls, 45% increase in health-service engagement.'
      }
    ],
    image: bupaImage,
    technologies: ['Healthcare', 'B2C', 'Mobile App', 'Insurance', 'UX/UI'],
    action: { type: 'sidecar', key: 'bupa' }
  },
  {
    title: 'Wealth and Investment management Mobile App',
    description: [
      {
        label: 'Problem',
        text: "Wealth management apps often bury the one thing users actually open them for — a clear answer to 'how am I doing?' — under dense financial data and disconnected account views."
      },
      {
        label: 'Approach',
        text: 'Designed a mobile experience around that single job-to-be-done: consolidated portfolio dashboards, data visualization, account aggregation, and a security-first authentication flow built to earn trust before a single transaction happens.'
      }
    ],
    image: wealthManagementImage,
    technologies: ['Fintech', 'Mobile App', 'Investment', 'UX/UI', 'Data Visualization'],
    action: {
      type: 'dropdown',
      links: [
        { label: 'Design', url: 'https://www.figma.com/board/Y6ZIR5jFe4QMYFdGRjTifg/Wealth-Management-App?node-id=1-2&t=Bi2ZPIg3LU7aVg6Z-4' },
        { label: 'Prototype', url: 'https://gift-wheel-54514939.figma.site/' }
      ]
    }
  },
  {
    title: 'Shell — Enterprise Operations Applications',
    description: [
      {
        label: 'Problem',
        text: "Shell's internal applications had evolved independently across business units and 50+ countries, forcing users who touched more than one system to re-learn interaction patterns every time — a scaling problem, not a visual one."
      },
      {
        label: 'Approach',
        text: 'As Product Designer for enterprise applications, unified supply chain tracking, asset management, e-commerce, brand asset management, and a global careers portal under one consistent design system and information architecture, spanning 10,000+ users.'
      },
      {
        label: 'Impact',
        text: '30% improvement in operational efficiency, 40% faster onboarding for new users, unified brand management across 50+ countries.'
      }
    ],
    image: shellImage,
    imagePosition: 'left-top',
    technologies: ['B2B', 'B2C', 'Oil & Gas', 'Enterprise', 'E-commerce', 'UX/UI'],
    action: { type: 'sidecar', key: 'shell' }
  },
  {
    title: 'Agentic AI EHR for Greenway Health',
    description: [
      {
        label: 'Problem',
        text: "Clinicians using Greenway Health's EHR were losing time to manual documentation and repetitive administrative work that pulled focus away from patient care."
      },
      {
        label: 'Approach',
        text: 'Designed agentic AI workflows into the EHR — automating documentation, surfacing clinical decision support at the point of care, and keeping a clinician in the loop on every AI-generated recommendation.'
      }
    ],
    image: 'https://images.unsplash.com/photo-1666886573531-48d2e3c2b684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    technologies: ['Healthcare', 'AI', 'Agentic AI', 'EHR', 'UX/UI'],
    action: { type: 'none' },
    logo: greenwayHealthLogo
  }
]

interface AdditionalWorkItem {
  title: string
  description: string
  links?: { label: string; url: string }[]
}

const additionalWork: AdditionalWorkItem[] = [
  {
    title: 'Medicus.ai',
    description:
      'AI-native product design closing the health-literacy gap: using AI to translate clinical lab data into visualizations and plain-language explanations, designed for accessibility as much as clinical accuracy.'
  },
  {
    title: 'PayPal Business (Self-Directed Redesign)',
    description:
      'Restructured the information architecture around three core jobs-to-be-done — get paid, track sales, understand customers — through user research with merchants and a streamlined interaction model.',
    links: [{ label: 'Behance', url: 'https://www.behance.net/gallery/169523163/Paypal-Business-App' }]
  }
]

const designSystemProjects = [
  {
    title: "Ciena's SaaS Design System",
    description:
      "The component library and token system behind Ciena's platform — built once and reused across every workflow, so new features shipped consistent by default.",
    image: cienaDesignSystemImage,
    technologies: ['Design Tokens', 'Components', 'Accessibility', 'Documentation'],
    live: '#'
  },
  {
    title: 'Simplylife Mobile app design system',
    description: 'Component library and design patterns for healthcare applications, ensuring HIPAA compliance and accessibility standards.',
    image: simplylifeDesignSystemImage,
    technologies: ['Components', 'Healthcare', 'HIPAA', 'Patterns'],
    live: 'https://xd.adobe.com/view/e6dfd4da-8735-4b27-a2ff-582f6dab3570-b38c/screen/c35951e0-5c51-45ae-b34b-627e6fe1e6d0?fullscreen'
  }
]

function ProjectTag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 text-xs text-indigo-400 rounded-full bg-indigo-400/10">
      {label}
    </span>
  )
}

export function ProjectsSection() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isCienaSidecarOpen, setIsCienaSidecarOpen] = useState(false)
  const [isBupaSidecarOpen, setIsBupaSidecarOpen] = useState(false)
  const [isShellSidecarOpen, setIsShellSidecarOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sidecarOpeners: Record<'ciena' | 'bupa' | 'shell', () => void> = {
    ciena: () => setIsCienaSidecarOpen(true),
    bupa: () => setIsBupaSidecarOpen(true),
    shell: () => setIsShellSidecarOpen(true)
  }

  return (
    <section id="projects" className="py-28 md:py-36 bg-[var(--bg)] border-t border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-indigo-400">03</span>
            <span className="h-px w-10 bg-[var(--line-strong)]" />
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">Selected Work</h2>
          </div>
          <p className="text-[var(--text-muted)] max-w-xl">
            A selection of recent case studies across fintech, healthcare, B2B SaaS and telecom.
          </p>
        </motion.div>

        {/* Featured case studies — alternating editorial rows */}
        <div className="border-t border-[var(--line)]">
          {featuredProjects.map((project, index) => {
            const isReversed = index % 2 === 1
            const isDropdownOpen = openDropdown === project.title

            const imageBlock = (
              <div className={`relative lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="absolute -top-8 -left-1 md:-left-4 font-display text-[110px] md:text-[150px] leading-none text-[var(--text-ghost)] select-none pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="relative overflow-hidden rounded-3xl bg-[var(--bg-soft)] border border-[var(--line)] shadow-[0_20px_50px_-24px_rgba(20,22,43,0.25)] transition-shadow duration-500 group-hover:shadow-[0_24px_60px_-20px_rgba(79,70,229,0.3)]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-[340px] md:h-[420px] object-cover ${
                      project.imagePosition === 'left-top' ? 'object-left-top' : 'object-top'
                    } transition-transform duration-700 group-hover:scale-[1.03]`}
                  />
                  {project.logo && (
                    <div className="absolute bottom-4 left-4 h-[110px] px-[30px] rounded-2xl bg-white/95 shadow-[0_4px_12px_rgba(20,22,43,0.15)] flex items-center backdrop-blur-sm">
                      <img
                        src={typeof project.logo === 'string' ? project.logo : project.logo.src}
                        alt={`${project.title} logo`}
                        className="h-[60px] w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            )

            const textBlock = (
              <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <ProjectTag key={tech} label={tech} />
                  ))}
                </div>
                <h3 className="font-display text-2xl md:text-[28px] text-[var(--text)] mb-4 leading-snug group-hover:text-indigo-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <ul className="space-y-3.5 mb-6">
                  {project.description.map((item) => (
                    <li key={item.label} className="text-sm text-[var(--text-muted)] leading-relaxed">
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-indigo-400 mb-1">
                        {item.label}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                {project.action.type !== 'none' && (
                  <div className="relative" ref={isDropdownOpen ? dropdownRef : null}>
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--text)] group-hover:text-indigo-400 transition-colors duration-300">
                      {project.action.type === 'dropdown' ? 'View Links' : 'View Case Study'}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>

                    {project.action.type === 'dropdown' && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute top-8 left-0 rounded-lg overflow-hidden z-20 min-w-[150px] border border-[var(--line-strong)] bg-[var(--surface)] shadow-xl"
                      >
                        {project.action.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--text)] hover:bg-indigo-400/10 hover:text-indigo-400 transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {link.label === 'Design' ? <Palette className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            )

            const rowContent = (
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {imageBlock}
                {textBlock}
              </div>
            )

            const rowClasses = 'group py-14 md:py-20 border-b border-[var(--line)] transition-colors duration-300'

            const handleRowClick = () => {
              if (project.action.type === 'sidecar') sidecarOpeners[project.action.key]()
              if (project.action.type === 'dropdown') setOpenDropdown(isDropdownOpen ? null : project.title)
            }

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true, margin: '-80px' }}
              >
                {project.action.type === 'none' ? (
                  <div className={rowClasses}>{rowContent}</div>
                ) : (
                  <div onClick={handleRowClick} className={`${rowClasses} cursor-pointer`}>
                    {rowContent}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Design Systems */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-80px' }}
          className="mt-28 md:mt-32 mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-sm text-indigo-400">03.1</span>
            <span className="h-px w-10 bg-[var(--line-strong)]" />
            <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">Design Systems</h3>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-28">
          {designSystemProjects.map((project, index) => {
            const clickable = project.live !== '#'
            const Wrapper = clickable ? motion.a : motion.div
            return (
              <Wrapper
                key={project.title}
                {...(clickable ? { href: project.live, target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: EASE }}
                viewport={{ once: true, margin: '-60px' }}
                className={`group relative rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-6 flex flex-col shadow-[0_8px_24px_-16px_rgba(20,22,43,0.15)] hover:shadow-[0_20px_40px_-16px_rgba(79,70,229,0.25)] transition-shadow duration-500 ${clickable ? 'cursor-pointer' : ''}`}
              >
                <div className="relative overflow-hidden rounded-xl mb-5">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {clickable && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white group-hover:bg-indigo-400 group-hover:text-black transition-all duration-300">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
                <h4 className="text-[var(--text)] mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <ProjectTag key={tech} label={tech} />
                  ))}
                </div>
              </Wrapper>
            )
          })}
        </div>

        {/* Additional Work */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-sm text-indigo-400">03.2</span>
            <span className="h-px w-10 bg-[var(--line-strong)]" />
            <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">Additional Work</h3>
          </div>
          <p className="text-[var(--text-muted)] max-w-xl">
            Real work worth mentioning, without a full case study behind it.
          </p>
        </motion.div>

        <div className="border-t border-[var(--line)]">
          {additionalWork.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
              viewport={{ once: true, margin: '-40px' }}
              className="py-6 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8"
            >
              <h4 className="text-[var(--text)] sm:w-64 flex-shrink-0">{item.title}</h4>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                {item.links && (
                  <div className="flex flex-wrap gap-5 mt-3">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-500 transition-colors duration-200"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CienaCaseStudySidecar isOpen={isCienaSidecarOpen} onClose={() => setIsCienaSidecarOpen(false)} />
      <BupaCaseStudySidecar isOpen={isBupaSidecarOpen} onClose={() => setIsBupaSidecarOpen(false)} />
      <ShellCaseStudySidecar isOpen={isShellSidecarOpen} onClose={() => setIsShellSidecarOpen(false)} />
    </section>
  )
}
