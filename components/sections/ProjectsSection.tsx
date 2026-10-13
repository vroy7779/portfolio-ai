'use client'

import { ArrowUpRight } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import { useState } from 'react'
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
import { ParallaxImage } from '@/components/motion/ParallaxImage'
import { RiseText } from '@/components/motion/RiseText'
import { FadeUp } from '@/components/motion/FadeUp'



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
    action: {
      type: 'dropdown',
      links: [
        {
          label: 'Design',
          url: 'https://www.figma.com/design/oIjXrPXpqFGf4mX38wuRt1/Design-Systems?node-id=348-58333&t=1zAWu8Fhw2s7sNtU-4'
        },
        { label: 'Prototype', url: 'https://horse-false-15368224.figma.site/' }
      ]
    },
    logo: greenwayHealthLogo
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
    live: 'https://www.figma.com/design/oIjXrPXpqFGf4mX38wuRt1/Design-Systems?node-id=2-5412&t=1zAWu8Fhw2s7sNtU-4'
  },
  {
    title: 'Simplylife Mobile app design system',
    description: 'Component library and design patterns for healthcare applications, ensuring HIPAA compliance and accessibility standards.',
    image: simplylifeDesignSystemImage,
    technologies: ['Components', 'Healthcare', 'HIPAA', 'Patterns'],
    live: 'https://xd.adobe.com/view/e6dfd4da-8735-4b27-a2ff-582f6dab3570-b38c/screen/c35951e0-5c51-45ae-b34b-627e6fe1e6d0?fullscreen'
  }
]

// Headline KPIs shown on a single line under a project's blurb, keyed by project title.
const KPIS: Record<string, string[]> = {
  'Ciena — Real-Time Optical Network Management': [
    '85% faster network creation',
    '92% fewer errors & outages',
    'Satisfaction 4.8 → 8.7 / 10',
  ],
}

// One short, plain blurb per featured project (same order as `featuredProjects`).
const BLURBS = [
  'Owned 0-to-1 UX strategy and product design for the platform that replaced manual optical network planning.',
  'Agentic AI workflows inside the EHR: automating documentation and surfacing decision support, with the clinician in the loop on every recommendation.',
  'Led UX across a bilingual insurance sales site and a health-management app, moving customers from the call center to self-service. Online conversions up 35%, support calls down 28%.',
  'A mobile experience built around one question: how am I doing? Consolidated portfolios, data visualization and a security-first sign-in flow.',
  "Unified supply chain, asset management, e-commerce and careers apps across 50+ countries under one design system. 30% more operational efficiency and 40% faster onboarding for 10,000+ users.",
]

function ProjectBlock({
  project,
  index,
  blurb,
  onOpenSidecar,
}: {
  project: FeaturedProject
  index: number
  blurb: string
  onOpenSidecar: (key: 'ciena' | 'bupa' | 'shell') => void
}) {
  const flipped = index % 2 === 1
  const action = project.action

  return (
    <article className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end py-16 md:py-28">
      <div className={`lg:col-span-4 ${flipped ? 'lg:col-start-9 lg:order-2' : 'lg:col-start-1'}`}>
        <FadeUp>
          <p className="font-mono text-xs text-[var(--text-faint)] mb-6">{String(index + 1).padStart(2, '0')}</p>
        </FadeUp>
        <h2 className="font-display font-light text-[clamp(1.9rem,3vw,2.75rem)] leading-[1.08] text-[var(--ink)]">
          <RiseText>{project.title}</RiseText>
        </h2>
        <FadeUp delay={0.15}>
          <p className="text-base text-[var(--text-muted)] leading-relaxed mt-6 max-w-[44ch]">{blurb}</p>
          {KPIS[project.title] && (
            <ul className="mt-5 flex flex-wrap lg:flex-nowrap gap-x-4 gap-y-1 text-[13px] text-[var(--ink)] lg:whitespace-nowrap">
              {KPIS[project.title].map((kpi, i) => (
                <li key={kpi} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden className="h-3 w-px bg-[var(--line-strong)]" />}
                  {kpi}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-[var(--text-faint)] mt-5">{project.technologies.join(' · ')}</p>

          {action.type === 'sidecar' && (
            <button
              onClick={() => onOpenSidecar(action.key)}
              className="cursor-pointer group mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[var(--ink)] text-white text-sm transition-colors duration-200 hover:bg-[#3a3a3a]"
            >
              See case study
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}

          {action.type === 'dropdown' && (
            <div className="mt-8 flex flex-wrap gap-3">
              {action.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer group inline-flex items-center gap-2 h-11 px-6 rounded-full border border-[var(--ink)] text-[var(--ink)] text-sm transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </FadeUp>
      </div>

      <div className={`lg:col-span-7 ${flipped ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-6'}`}>
        <div className="relative">
          <ParallaxImage
            src={project.image}
            alt={project.title}
            position={project.imagePosition === 'left-top' ? 'object-left-top' : 'object-center'}
            className="aspect-[16/10]"
          />
          {project.logo && (
            <div className="absolute bottom-0 left-0 bg-white px-6 py-4">
              <img
                src={typeof project.logo === 'string' ? project.logo : project.logo.src}
                alt={`${project.title} logo`}
                className="h-10 w-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

function ArchiveList({ title, items }: { title: string; items: { name: string; text: string; href?: string; linkLabel?: string }[] }) {
  return (
    <div>
      <FadeUp>
        <h3 className="font-display font-light text-3xl md:text-4xl text-[var(--ink)] mb-10">{title}</h3>
      </FadeUp>
      <ul className="border-t border-[var(--line-strong)]">
        {items.map((item) => {
          const inner = (
            <>
              <div className="min-w-0">
                <p className="text-lg text-[var(--ink)]">{item.name}</p>
                <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mt-2 max-w-[52ch]">{item.text}</p>
              </div>
              {item.href && (
                <span className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-[var(--ink)] text-sm text-[var(--ink)] whitespace-nowrap transition-colors duration-200 group-hover:bg-[var(--ink)] group-hover:text-white">
                  {item.linkLabel ?? 'View'}
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              )}
            </>
          )
          const cls = 'group flex items-start justify-between gap-8 py-7 border-b border-[var(--line)]'
          return (
            <li key={item.name}>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${cls} cursor-pointer`}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ProjectsSection() {
  const [openSidecar, setOpenSidecar] = useState<'ciena' | 'bupa' | 'shell' | null>(null)

  return (
    <section id="projects" className="bg-[var(--bg)]">
      <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10">
        <div className="pt-10 pb-2 border-t border-[var(--line-strong)]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-faint)] pt-5">Selected work</p>
        </div>

        <div>
          {featuredProjects.map((project, i) => (
            <ProjectBlock
              key={project.title}
              project={project}
              index={i}
              blurb={BLURBS[i] ?? ''}
              onOpenSidecar={setOpenSidecar}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-20 pt-16 md:pt-24 pb-24 md:pb-36 border-t border-[var(--line-strong)]">
          <ArchiveList
            title="Design systems"
            items={designSystemProjects.map((d) => ({
              name: d.title,
              text: d.description,
              href: d.live !== '#' ? d.live : undefined,
              linkLabel: 'View',
            }))}
          />
          <ArchiveList
            title="Additional work"
            items={additionalWork.map((w) => ({
              name: w.title,
              text: w.description,
              href: w.links?.[0]?.url,
              linkLabel: w.links?.[0]?.label,
            }))}
          />
        </div>
      </div>

      <CienaCaseStudySidecar isOpen={openSidecar === 'ciena'} onClose={() => setOpenSidecar(null)} />
      <BupaCaseStudySidecar isOpen={openSidecar === 'bupa'} onClose={() => setOpenSidecar(null)} />
      <ShellCaseStudySidecar isOpen={openSidecar === 'shell'} onClose={() => setOpenSidecar(null)} />
    </section>
  )
}
