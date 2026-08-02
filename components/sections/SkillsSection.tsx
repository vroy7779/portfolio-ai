'use client'

import { motion } from 'motion/react'
import { Target, Palette, Code2, Sparkles, Grid3x3, FlaskConical } from 'lucide-react'
import { NetworkGraphic } from '@/components/graphics/NetworkGraphic'
import { EASE } from '@/animations/easing'


const SKILL_CATEGORIES = [
  {
    title: 'Product Strategy & Management',
    icon: Target,
    description:
      'I define the problem before I define the solution — sizing opportunities, writing PRDs, and setting the metrics that tell us whether a launch actually worked, not just whether it shipped.',
    skills: ['Roadmapping & prioritization', 'PRD & spec writing', 'Outcome-driven metrics & KPIs']
  },
  {
    title: 'Product & UX Design',
    icon: Palette,
    description:
      'End-to-end design across complex, multi-platform products — the information architecture that holds a system together, and the interaction details a user never consciously notices.',
    skills: ['Information architecture', 'Multi-platform journey mapping', 'Interaction design & micro-behaviors']
  },
  {
    title: 'AI-Native Product Building',
    icon: Code2,
    description:
      "I don't just design AI products — I build them. Prototypes go from idea to working software in AI-native IDEs, so decisions get tested against something real instead of a static mockup.",
    skills: ['Building with AI-native IDEs', 'Prototype-to-production handoff', 'Solo 0-to-1 shipping']
  },
  {
    title: 'Agentic AI & Workflows',
    icon: Sparkles,
    description:
      'Designing the handoff between a person and an autonomous system — deciding what the model should do on its own, and where a human needs to stay in the loop, and why.',
    skills: ['Agentic workflow design', 'Prompt & context engineering', 'Human-in-the-loop design']
  },
  {
    title: 'Design Systems & Visual Craft',
    icon: Grid3x3,
    description:
      'Design systems built once and reused everywhere — tokens, components, and interaction specs that keep fast-moving teams shipping consistent UI without redesigning the basics every sprint.',
    skills: ['Token-driven UI libraries', 'Component logic & interaction specs', 'Data visualization & dashboards']
  },
  {
    title: 'Research & Validation',
    icon: FlaskConical,
    description:
      'Every product decision gets tested against real users before it ships — through interviews, usability testing, and behavioral data, not assumptions.',
    skills: ['User interviews & contextual inquiry', 'Usability & A/B testing', 'Competitive & behavioral analysis']
  }
]

const TOOLS_ROW_1 = ['Figma', 'FigJam', 'Figma Make', 'Framer', 'Sketch', 'Adobe XD', 'Adobe Creative Suite', 'Maze', 'UserTesting']
const TOOLS_ROW_2 = ['Claude Code', 'Cursor', 'Lovable', 'Replit', 'v0', 'GitHub Copilot', 'Bolt.new', 'ChatGPT', 'Claude']
const TOOLS_ROW_3 = ['Jira', 'Linear', 'Notion', 'Confluence', 'Productboard', 'Miro', 'Lucidchart', 'Mixpanel', 'Amplitude']

function MarqueeRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={`flex w-max gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
      >
        {doubled.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="px-5 py-2.5 text-sm text-[var(--text-muted)] rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-[0_1px_2px_rgba(20,22,43,0.04)] whitespace-nowrap"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 md:py-36 bg-[var(--bg-soft)] border-t border-[var(--line)] overflow-hidden">
      <NetworkGraphic className="absolute inset-0 w-full h-full" nodeCount={55} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm text-indigo-400">02</span>
            <span className="h-px w-10 bg-[var(--line-strong)]" />
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">Skills &amp; Expertise</h2>
          </div>
          <p className="text-[var(--text-muted)] max-w-xl">
            An AI-native product toolkit — spanning strategy, design, and hands-on building, so ideas go from problem to shipped product without getting stuck in handoffs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ delay: categoryIndex * 0.08, duration: 0.6, ease: EASE }}
              viewport={{ once: true, margin: '-60px' }}
              className="group rounded-2xl bg-[var(--surface)] border border-[var(--line)] p-7 shadow-[0_8px_24px_-16px_rgba(20,22,43,0.15)] hover:shadow-[0_20px_40px_-16px_rgba(79,70,229,0.25)] transition-shadow duration-500"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-400/10 flex items-center justify-center mb-5">
                <category.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-[var(--text)] mb-2">{category.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{category.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs text-[var(--text-muted)] bg-[var(--bg-soft)] rounded-full border border-[var(--line)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h3 className="text-center text-[var(--text-muted)] text-xs uppercase tracking-[0.25em] mb-8">
            Tooling Snapshot
          </h3>
          <div className="space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <MarqueeRow items={TOOLS_ROW_1} direction="left" />
            <MarqueeRow items={TOOLS_ROW_2} direction="right" />
            <MarqueeRow items={TOOLS_ROW_3} direction="left" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
