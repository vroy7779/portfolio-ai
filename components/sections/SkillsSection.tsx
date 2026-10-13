'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { SquareTerminal } from 'lucide-react'
import {
  siClaude,
  siCursor,
  siFigma,
  siFramer,
  siGithub,
  siJira,
  siMaze,
  siMiro,
  siNotion,
  siSketch,
  siStorybook,
  siV0,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FadeUp } from '@/components/motion/FadeUp'

interface Tool {
  name: string
  role: string
  /** Official mark; without one, `terminal` shows a glyph, otherwise initials. */
  icon?: SimpleIcon
  terminal?: boolean
}

interface Part {
  title: string
  description: string
  skills: string[]
  tools: Tool[]
}

const PARTS: Part[] = [
  {
    title: 'Product Strategy, Management and Design',
    description: 'Frame the problem, set the metrics, own the roadmap, then design it end to end.',
    skills: [
      'Roadmapping & prioritization',
      'PRDs, outcome metrics & KPIs',
      'Information architecture & journey mapping',
      'Interaction design & prototyping',
    ],
    tools: [
      { name: 'Notion', role: 'Docs & specs', icon: siNotion },
      { name: 'Jira', role: 'Delivery', icon: siJira },
      { name: 'Miro', role: 'Workshops', icon: siMiro },
      { name: 'Figma', role: 'Interface design', icon: siFigma },
      { name: 'Framer', role: 'Prototyping', icon: siFramer },
      { name: 'Sketch', role: 'Interface design', icon: siSketch },
    ],
  },
  {
    title: 'AI-Native Building',
    description: 'Ideas become working software, fast.',
    skills: ['AI-native IDEs', 'Prototype to production', 'Solo 0-to-1 shipping'],
    tools: [
      { name: 'Claude Code', role: 'Agentic coding', icon: siClaude },
      { name: 'Cursor', role: 'AI-native IDE', icon: siCursor },
      { name: 'v0', role: 'UI generation', icon: siV0 },
      { name: 'GitHub', role: 'Source control', icon: siGithub },
      { name: 'Vercel', role: 'Deploy & host', icon: siVercel },
    ],
  },
  {
    title: 'Agentic AI & Workflows',
    description: 'Decide what AI does alone and where people stay in the loop.',
    skills: ['Agentic workflow design', 'Prompt & context engineering', 'Human-in-the-loop'],
    tools: [
      { name: 'Claude', role: 'AI assistant', icon: siClaude },
      { name: 'Cursor', role: 'AI-native IDE', icon: siCursor },
      { name: 'Codex', role: 'Coding agent', terminal: true },
    ],
  },
  {
    title: 'Design Systems',
    description: 'Tokens and components that keep teams consistent, shipped as production-ready UI.',
    skills: ['Token-driven UI', 'Component specs', 'Production-ready UI components in code', 'Data visualization'],
    tools: [
      { name: 'Storybook', role: 'Component docs', icon: siStorybook },
      { name: 'Figma', role: 'Libraries & tokens', icon: siFigma },
      { name: 'Claude Code', role: 'Component builds', icon: siClaude },
      { name: 'Notion', role: 'Guidelines', icon: siNotion },
    ],
  },
  {
    title: 'Research & Validation',
    description: 'Every decision tested with real users.',
    skills: ['User interviews', 'Usability & A/B testing', 'Behavioral analysis'],
    tools: [
      { name: 'Maze', role: 'Usability testing', icon: siMaze },
      { name: 'UserTesting', role: 'Moderated research' },
      { name: 'Miro', role: 'Synthesis', icon: siMiro },
    ],
  },
]

const N = PARTS.length

const EDGE = 0.14 // share of each part's scroll used to fade in / out, inside its own segment

/**
 * Each part owns an exclusive slice of the scroll, so two parts are never
 * visible at once: it fades in over the start of its slice and out over the
 * end. `hidden` / `shown` let the same window drive opacity or position.
 */
function usePartWindow(p: MotionValue<number>, i: number, hidden: number, shown: number) {
  const s = i / N
  const e = (i + 1) / N
  const f = EDGE / N
  const input = i === 0 ? [0, e - f, e] : i === N - 1 ? [s, s + f, 1] : [s, s + f, e - f, e]
  const output = i === 0 ? [shown, shown, hidden] : i === N - 1 ? [hidden, shown, shown] : [hidden, shown, shown, hidden]
  return useTransform(p, input, output)
}

/** Linear drift across the part's slice, so layers can move at different speeds. */
function usePartDrift(p: MotionValue<number>, i: number, amount: number) {
  return useTransform(p, [i / N, (i + 1) / N], [amount, -amount])
}

function ToolGlyph({ tool }: { tool: Tool }) {
  if (tool.icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill={`#${tool.icon.hex}`}>
        <path d={tool.icon.path} />
      </svg>
    )
  }
  if (tool.terminal) return <SquareTerminal aria-hidden className="h-5 w-5 text-[var(--ink)]" />
  return (
    <span aria-hidden className="text-[11px] font-medium text-[var(--ink)]">
      {tool.name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
    </span>
  )
}

function ToolChip({ tool }: { tool: Tool }) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-[var(--line-strong)] bg-white px-3 py-2.5">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--bg-soft)]">
        <ToolGlyph tool={tool} />
      </span>
      <span className="leading-tight min-w-0">
        <span className="block text-sm text-[var(--ink)]">{tool.name}</span>
        <span className="block text-xs text-[var(--text-muted)] truncate">{tool.role}</span>
      </span>
    </li>
  )
}

/**
 * One part: copy and its tools side by side. Three layers drift at different
 * speeds (ghost numeral slowest, copy, then tools) for depth, without any
 * element leaving its grid cell.
 */
function PartPanel({ part, i, p, travel }: { part: Part; i: number; p: MotionValue<number>; travel: number }) {
  const opacity = usePartWindow(p, i, 0, 1)
  const ghostY = usePartDrift(p, i, travel * 0.35)
  const copyY = usePartDrift(p, i, travel * 0.55)
  const toolsY = usePartDrift(p, i, travel)

  return (
    <motion.div
      style={{ opacity }}
      className="relative grid lg:grid-cols-9 gap-x-12 gap-y-8 items-start lg:items-center"
    >
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="hidden lg:block pointer-events-none absolute -top-10 right-0 font-display font-light text-[18rem] leading-none text-[var(--text-ghost)] select-none"
      >
        {String(i + 1).padStart(2, '0')}
      </motion.span>

      <motion.div style={{ y: copyY }} className="lg:col-span-5 relative">
        <p className="font-mono text-xs text-[var(--text-faint)]">
          {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </p>
        <h3 className="font-display font-light text-[clamp(1.9rem,3.3vw,3.25rem)] leading-[1.06] text-[var(--ink)] mt-5">
          {part.title}
        </h3>
        <p className="text-base text-[var(--text-muted)] leading-snug mt-4 max-w-[40ch]">{part.description}</p>
        <ul className="mt-7 max-w-[44ch]">
          {part.skills.map((skill) => (
            <li
              key={skill}
              className="flex items-baseline gap-3 py-2.5 text-[15px] text-[var(--ink)] border-b border-[var(--line)]"
            >
              <span aria-hidden className="font-mono text-[var(--text-faint)]">
                /
              </span>
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div style={{ y: toolsY }} className="lg:col-span-4 relative">
        <ul aria-label={`${part.title} tools`} className="grid grid-cols-2 gap-3">
          {part.tools.map((tool) => (
            <ToolChip key={tool.name} tool={tool} />
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

function PartNav({ title, i, p }: { title: string; i: number; p: MotionValue<number> }) {
  const opacity = usePartWindow(p, i, 0.35, 1)
  const x = usePartWindow(p, i, 0, 10)
  return (
    <motion.li style={{ opacity, x }} className="flex items-baseline gap-4 py-2">
      <span className="font-mono text-xs text-[var(--text-faint)] w-6">{String(i + 1).padStart(2, '0')}</span>
      <span className="text-[15px] text-[var(--ink)] leading-snug">{title}</span>
    </motion.li>
  )
}

function PinnedSkills() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // One smoothed value drives every layer, so nothing jitters independently.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4, restDelta: 0.0005 })
  const bar = useTransform(p, [0, 1], [0, 1])

  // Drift distance in px: modest on desktop, shallower on small screens.
  const [travel, setTravel] = useState(24)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setTravel(query.matches ? 56 : 18)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section
      id="skills"
      ref={ref}
      style={{ height: `${N * 100}vh` }}
      className="relative bg-[var(--bg)] border-t border-[var(--line-strong)]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="max-w-[1480px] mx-auto h-full px-5 md:px-8 lg:px-10 pt-24 pb-10 grid lg:grid-cols-12 gap-x-12 gap-y-6 content-start lg:content-stretch">
          {/* Index */}
          <div className="lg:col-span-3 flex flex-col">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-faint)]">Skills</p>
            <h2 className="font-display font-light text-2xl lg:text-[1.75rem] leading-tight text-[var(--ink)] mt-4 max-w-[16ch]">
              Strategy, design and building. One loop.
            </h2>
            <div className="hidden lg:flex mt-10 gap-5">
              <div className="relative w-px bg-[var(--line-strong)]">
                <motion.div style={{ scaleY: bar }} className="absolute inset-x-0 top-0 h-full bg-[var(--ink)] origin-top" />
              </div>
              <ol>
                {PARTS.map((part, i) => (
                  <PartNav key={part.title} title={part.title} i={i} p={p} />
                ))}
              </ol>
            </div>
          </div>

          {/* Parts share one grid cell, so they can never stack on top of each other's layout */}
          <div className="lg:col-span-9 grid items-center [&>*]:col-start-1 [&>*]:row-start-1">
            {PARTS.map((part, i) => (
              <PartPanel key={part.title} part={part} i={i} p={p} travel={travel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Reduced motion: no pinning, no parallax. Every part and its tools, stacked. */
function StaticSkills() {
  return (
    <section id="skills" className="bg-[var(--bg)] border-t border-[var(--line-strong)]">
      <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10 py-20 md:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-faint)] mb-8">Skills</p>
        <h2 className="font-display font-light text-[clamp(1.9rem,3.6vw,3.5rem)] leading-[1.08] text-[var(--ink)] max-w-[22ch]">
          Strategy, design and building. One loop.
        </h2>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {PARTS.map((part, i) => (
            <FadeUp key={part.title}>
              <article className="border-t border-[var(--ink)] pt-5">
                <p className="font-mono text-xs text-[var(--text-faint)] mb-5">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-2xl text-[var(--ink)]">{part.title}</h3>
                <p className="text-base text-[var(--text-muted)] mt-3">{part.description}</p>
                <ul className="mt-5">
                  {part.skills.map((skill) => (
                    <li key={skill} className="py-2 text-[15px] text-[var(--ink)] border-b border-[var(--line)]">
                      {skill}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {part.tools.map((tool) => (
                    <li
                      key={tool.name}
                      className="flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-2.5 py-1.5 text-xs text-[var(--ink)]"
                    >
                      <ToolGlyph tool={tool} />
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SkillsSection() {
  const reduced = useReducedMotion()
  return reduced ? <StaticSkills /> : <PinnedSkills />
}
