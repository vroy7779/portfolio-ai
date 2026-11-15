'use client'

import { ArrowUpRight } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { ScreenStack } from '@/components/motion/ScreenStack'
import { FadeUp } from '@/components/motion/FadeUp'
import { RiseText } from '@/components/motion/RiseText'
import {
  Bar,
  CaseStudyFooter,
  CaseStudyHeader,
  Chapter,
  CountUp,
  Lightbox,
  useLightbox,
  type ImageSrc,
} from '@/components/case-study/parts'
import liveNetworkImage from '@/assets/5a9b506683fc0fe225ca1546b754250ef41debf8.png'
import liveNetworkImage2 from '@/assets/260b5514384e3760924741d16c7f395f5e2cd588.png'
import sketchMapImage from '@/assets/ciena-sketch-map.png'
import sketchFiberHealthImage from '@/assets/ciena-sketch-fiber-health.png'
import aiWorkflowsImage from '@/assets/ciena-ai-workflows.png'
import aiAgentImage from '@/assets/ciena-ai-agent.png'
import aiNetworkMapImage from '@/assets/ciena-ai-network-map.webp'
import networkPlanningImage1 from '@/assets/66e5136a0f42899377f4646294b5029e6e238de0.png'
import networkPlanningImage2 from '@/assets/712b2f37f9ef1185b18343197c32c1a3175712c0.png'
import networkPlanningImage3 from '@/assets/a688e8d39910904569b341b5d8020436eb3eb006.png'
import networkPlanningImage4 from '@/assets/618ca1d6699d548f1d73ec1ec029a7c5761f26fe.png'

const DESIGN_SYSTEM_URL =
  'https://www.figma.com/design/oIjXrPXpqFGf4mX38wuRt1/Design-Systems?node-id=2-5412&t=dZbOtcO51wr7Gae5-4'

const CHAPTERS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'The problem' },
  { id: 'research', label: 'Research' },
  { id: 'define', label: 'Define' },
  { id: 'design', label: 'Design' },
  { id: 'testing', label: 'Testing' },
  { id: 'impact', label: 'Impact' },
]

const STATS = [
  { value: 85, suffix: '%', label: 'Reduction in network creation time' },
  { value: 92, suffix: '%', label: 'Fewer real-world network errors and outages' },
  { value: 46, suffix: '%', label: 'Increase in equipment and network capacity' },
  { value: 23, suffix: '%', label: 'Increase in equipment sales' },
]

const JOBS = [
  { title: 'Plan', text: 'Design and size a network before a single piece of equipment is bought.' },
  { title: 'Provision', text: 'Turn an approved plan into a network that is built and switched on.' },
  { title: 'Monitor', text: 'Watch the live network, catch problems early and decide where to expand.' },
]

const METHODS = [
  {
    title: 'In-depth interviews and contextual inquiries',
    text: 'With network engineers, planners and operators, to understand day-to-day tasks, goals and frustrations with existing tools and processes.',
  },
  {
    title: 'SME collaboration',
    text: 'Worked closely with Ciena subject matter experts and stakeholders to understand optical networking concepts, technical constraints and business objectives.',
  },
  {
    title: 'Competitive analysis',
    text: 'Analysed competitor tools and internal documentation to find gaps, opportunities and the mental models already established in the domain.',
  },
  {
    title: 'Task analysis and workflow mapping',
    text: 'Mapped how networks were created, managed and monitored today, to pinpoint where the process needed the most help.',
  },
]

const SKETCHES: { src: ImageSrc; caption: string }[] = [
  { src: sketchMapImage, caption: 'Low-fidelity sketch: map view with a panel on each side and a chart below' },
  { src: sketchFiberHealthImage, caption: 'Low-fidelity sketch: Fiber Health summary, problem types, OTDR and map' },
]

const SCREENS: { title: string; text: string; image: ImageSrc; gallery?: ImageSrc[] }[] = [
  {
    title: 'Network planning',
    text: 'A visual interface for designing and configuring optical network topologies, with drag-and-drop elements, real-time capacity calculations and automated routing suggestions.',
    image: networkPlanningImage1,
    gallery: [networkPlanningImage2, networkPlanningImage3, networkPlanningImage4],
  },
  {
    title: 'Live network',
    text: 'A real-time monitoring dashboard for network health, performance metrics and operational status, with instant alerts and interactive network maps.',
    image: liveNetworkImage,
    gallery: [liveNetworkImage2],
  },
  {
    title: 'AI Planning',
    text: 'Network planning and management with an AI agent. Planners start from a guided workflow, such as accommodating a traffic matrix or running defragmentation, then work with the agent: it analyses the intent, proposes options with the routes they affect, and shows the result on the network map and in a routes table. The planner reviews every option and stays in control of the decision.',
    image: aiAgentImage,
    gallery: [aiWorkflowsImage, aiNetworkMapImage],
  },
]

export function CienaCaseStudy() {
  const lightbox = useLightbox()
  const open = lightbox.open

  return (
    <>
      <CaseStudyHeader company="Ciena" chapters={CHAPTERS} />

      <main id="main">
        {/* Overview */}
        <section id="overview" className="pt-32 md:pt-40 pb-16 md:pb-24 bg-[var(--bg)]">
          <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14 items-center">
              <div className="lg:col-span-6">
                <p className="font-mono text-xs text-[var(--text-faint)]">Case study 01 · Ciena · B2B SaaS</p>
                <h1 className="font-display tracking-display-lg text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.04] text-[var(--ink)] mt-6">
                  <RiseText onMount delay={0.1}>
                    Real-time optical network creation and management - Agentic AI
                  </RiseText>
                </h1>
                <FadeUp delay={0.2}>
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed mt-8 max-w-[52ch]">
                    Network engineers were planning multi-million-dollar optical infrastructure by hand, in a fragmented
                    workflow with no shared information architecture. I led UX end to end for the B2B SaaS platform that
                    replaced it: research, information architecture and a production design system.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-6 border-t border-[var(--line-strong)] pt-6 max-w-[620px]">
                    {[
                      ['Role', 'UX Designer, 0→1 through iteration'],
                      ['Product', 'B2B SaaS application for telecommunication providers'],
                      ['Tools', 'Miro, Figma, Figma Make, Claude Code, MCP, React JS'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-[var(--text-faint)] mb-1">{k}</dt>
                        <dd className="text-[15px] text-[var(--ink)]">{v}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="text-xs text-[var(--text-faint)] mb-1">Timeline</dt>
                      <dd className="text-[15px] text-[var(--ink)]">2022 – 2026</dd>
                    </div>
                  </dl>
                </FadeUp>
              </div>

              <div className="lg:col-span-6 lg:pl-10">
                <ScreenStack
                  screens={[
                    { src: liveNetworkImage, alt: 'Live network monitoring screen', label: 'Live network' },
                    { src: networkPlanningImage1, alt: 'Network planning topology screen', label: 'Network planning' },
                    { src: aiAgentImage, alt: 'AI planning agent proposing network options', label: 'AI Planning' },
                    { src: aiNetworkMapImage, alt: 'Planned IP network on a map with services table', label: 'Network map' },
                  ]}
                />
              </div>
            </div>

            <dl className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--line-strong)]">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-6 pr-6 ${i > 0 ? 'lg:pl-6 lg:border-l lg:border-[var(--line)]' : ''} ${
                    i % 2 === 1 ? 'pl-6 border-l border-[var(--line)]' : ''
                  }`}
                >
                  <dd className="font-display tracking-display-md text-5xl md:text-6xl text-[var(--ink)]">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="text-sm text-[var(--text-muted)] mt-3 leading-snug max-w-[24ch]">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 01 Problem */}
        <Chapter id="problem" index="01" title="The problem">
          <FadeUp>
            <p className="font-display tracking-display-md text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.15] text-[var(--ink)] max-w-[28ch]">
              Planning a network meant spreadsheets, tribal knowledge and a lot of manual checking
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-6 text-base text-[var(--text-muted)] leading-relaxed">
              <p>
                Network engineers were planning multi-million-dollar optical infrastructure manually. The workflow was
                fragmented, nothing shared an information architecture, and a lot of what people needed to know lived in
                other people&rsquo;s heads.
              </p>
              <p>
                It is a highly technical domain. Users deal with network topology, capacity, traffic demand,
                infrastructure constraints and performance requirements, all at once. The goal was to make that
                manageable without oversimplifying the work.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs text-[var(--text-faint)] mt-16">The platform had to support three jobs</p>
            <ul className="mt-4 border-t border-[var(--line-strong)]">
              {JOBS.map((job, i) => (
                <li
                  key={job.title}
                  className="grid grid-cols-[auto_1fr] md:grid-cols-[64px_220px_1fr] gap-x-6 gap-y-1 py-6 border-b border-[var(--line)] items-baseline"
                >
                  <span className="font-mono text-xs text-[var(--text-faint)]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display tracking-display-md text-2xl text-[var(--ink)]">{job.title}</span>
                  <span className="col-span-2 md:col-span-1 text-[15px] text-[var(--text-muted)]">{job.text}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-10 text-base text-[var(--text-muted)] max-w-[60ch] leading-relaxed">
              <span className="text-[var(--ink)]">Goal.</span> Enable efficient creation, management and live monitoring
              of telecom and submarine optical networks, optimising for capacity and cost.
            </p>
          </FadeUp>
        </Chapter>

        {/* 02 Research */}
        <Chapter id="research" index="02" title="Research">
          <div className="grid md:grid-cols-[auto_1fr] gap-x-14 gap-y-6 items-end">
            <FadeUp>
              <p className="font-display tracking-display-lg text-[clamp(5rem,12vw,9rem)] leading-[0.85] text-[var(--ink)]">
                <CountUp value={10} />
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-3">Users interviewed</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[58ch]">
                Questions covered their day-to-day network planning process, which was largely manual. Their answers
                were added to the use cases in Jira, so they stayed in front of the team throughout design.
              </p>
            </FadeUp>
          </div>

          <ul className="mt-16 border-t border-[var(--line-strong)]">
            {METHODS.map((m, i) => (
              <li key={m.title}>
                <FadeUp delay={i * 0.05}>
                  <div className="grid md:grid-cols-[64px_minmax(0,320px)_1fr] gap-x-8 gap-y-2 py-7 border-b border-[var(--line)]">
                    <span className="font-mono text-xs text-[var(--text-faint)] pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display tracking-display-md text-xl text-[var(--ink)]">{m.title}</h3>
                    <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">{m.text}</p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ul>
        </Chapter>

        {/* 03 Define */}
        <Chapter id="define" index="03" title="Define">
          <FadeUp>
            <p className="font-display tracking-display-md text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.15] text-[var(--ink)] max-w-[30ch]">
              One map of how people plan, provision and monitor, and an information architecture to hold it
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-8 text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">
              I mapped the complex user journeys for network planning, provisioning and monitoring, then defined the
              information architecture that connects them, so engineers could move from one job to the next without
              re-learning the product.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs text-[var(--text-faint)] mt-16">Early sketches. Select one to view it larger.</p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-6">
              {SKETCHES.map((sk, i) => (
                <li key={sk.caption}>
                  <button
                    onClick={() => open(SKETCHES.map((x) => x.src), i)}
                    aria-label={`View sketch ${i + 1} larger`}
                    className="cursor-pointer block w-full overflow-hidden rounded-[8px] border border-[var(--line-strong)] bg-white transition-opacity duration-200 hover:opacity-80"
                  >
                    <ImageWithFallback src={sk.src} alt={sk.caption} className="block w-full h-auto" />
                  </button>
                  <p className="text-[13px] text-[var(--text-muted)] mt-3 max-w-[44ch]">{sk.caption}</p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </Chapter>

        {/* 04 Design */}
        <Chapter id="design" index="04" title="Design">
          <FadeUp>
            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">
              Wireframes and interactive prototypes focused on network topology visualisation, dashboard design and data
              visualisation for equipment comparison, iterated on with feedback. Select any screen to view it larger.
            </p>
            <a
              href={DESIGN_SYSTEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer group mt-8 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[var(--ink)] text-white text-sm transition-colors duration-200 hover:bg-[#3a3a3a]"
            >
              Design system
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </FadeUp>

          <div className="mt-16 space-y-24">
            {SCREENS.map((screen, i) => {
              const all = [screen.image, ...(screen.gallery ?? [])]
              return (
                <div key={screen.title} className="grid lg:grid-cols-12 gap-x-10 gap-y-8">
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-28">
                      <p className="font-mono text-xs text-[var(--text-faint)]">
                        {String(i + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')}
                      </p>
                      <h3 className="font-display tracking-display-md text-2xl md:text-3xl text-[var(--ink)] mt-4">
                        {screen.title}
                      </h3>
                      <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mt-4 max-w-[40ch]">
                        {screen.text}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <FadeUp>
                      <button
                        onClick={() => open(all, 0)}
                        aria-label={`View ${screen.title} larger`}
                        className="cursor-pointer block w-full overflow-hidden rounded-[12px] border border-[var(--line-strong)] bg-white transition-transform duration-300 hover:-translate-y-1"
                        style={{ boxShadow: '0 20px 48px rgba(10,10,10,0.08)' }}
                      >
                        <ImageWithFallback src={screen.image} alt={screen.title} className="block w-full h-auto" />
                      </button>
                    </FadeUp>
                    {screen.gallery && (
                      <ul className="mt-4 grid gap-4" style={{ gridTemplateColumns: `repeat(${screen.gallery.length}, minmax(0, 1fr))` }}>
                        {screen.gallery.map((img, gi) => (
                          <li key={gi}>
                            <button
                              onClick={() => open(all, gi + 1)}
                              aria-label={`View ${screen.title} image ${gi + 2} larger`}
                              className="cursor-pointer block w-full overflow-hidden rounded-[8px] border border-[var(--line-strong)] bg-white transition-opacity duration-200 hover:opacity-80"
                            >
                              <ImageWithFallback src={img} alt={`${screen.title}, view ${gi + 2}`} className="block w-full h-auto" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Chapter>

        {/* 05 Testing */}
        <Chapter id="testing" index="05" title="Testing">
          <FadeUp>
            <p className="font-display tracking-display-md text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.15] text-[var(--ink)] max-w-[28ch]">
              Prototypes went in front of the people who would use them
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-8 text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">
              I ran usability testing on the prototypes with target users, and carried what I learned back into the
              design.
            </p>
          </FadeUp>
        </Chapter>

        {/* 06 Impact */}
        <Chapter id="impact" index="06" title="Impact">
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-12">
            {STATS.map((s) => (
              <li key={s.label} className="border-t border-[var(--ink)] pt-5">
                <p className="font-display tracking-display-lg text-6xl md:text-7xl text-[var(--ink)]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[15px] text-[var(--text-muted)] mt-3 max-w-[30ch] leading-snug">{s.label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-[var(--line-strong)] pt-10 max-w-[620px]">
            <h3 className="font-display tracking-display-md text-2xl text-[var(--ink)]">User satisfaction nearly doubled</h3>
            <div className="mt-8 space-y-6">
              <Bar value={4.8} max={10} label="Before" display="4.8 / 10" />
              <Bar value={8.7} max={10} label="After" display="8.7 / 10" strong />
            </div>
          </div>

          <ul className="mt-16 border-t border-[var(--line-strong)]">
            {[
              'Improved user satisfaction score from 4.8 to 8.7 out of 10',
            ].map((o) => (
              <li key={o} className="py-5 border-b border-[var(--line)] text-[15px] text-[var(--ink)]">
                {o}
              </li>
            ))}
          </ul>
          <FadeUp>
            <p className="mt-10 text-base text-[var(--text-muted)] max-w-[62ch] leading-relaxed">
              <span className="text-[var(--ink)]">How satisfaction was measured.</span> The accounts team reviewed user
              satisfaction with AT&amp;T and Airtel, two of the companies using the product.
            </p>
          </FadeUp>
        </Chapter>
      </main>

      <CaseStudyFooter />

      <Lightbox state={lightbox.state} onClose={lightbox.close} onStep={lightbox.step} />
    </>
  )
}
