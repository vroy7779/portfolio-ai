'use client'

import Link from 'next/link'
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
import bupaAppImage1 from '@/assets/181c4c09915a2e7608a2054ab708102fdbe08ea1.png'
import bupaAppImage2 from '@/assets/306434504d450ebf8d5657acb01d1c3fc129aaae.png'
import bupaAppImage3 from '@/assets/0328c6be63008c7217e7fb1d2338250b5d8cb8c9.png'
import bupaAppImage4 from '@/assets/e2725e89377fb732e03f1ef724cf8ded82a836e8.png'
import bupaAppImage5 from '@/assets/02cb72f304ab6519e9a0afd694dd54599969f90a.png'
import bupaAppImage6 from '@/assets/49457c837408c7f91596f77ecfb4d4c69e14fbb2.png'
import bupaCardImage from '@/assets/a65dc7b7fc93cd6c8b1234597cf34d7737ce7450.png'
import healthDashboardImage from '@/assets/3f43566ae36aa5da9153dad1c0eda9a59402ce77.png'

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
  { value: 35, suffix: '%', label: 'Increase in online insurance conversions' },
  { value: 28, suffix: '%', label: 'Fewer customer support calls' },
  { value: 45, suffix: '%', label: 'Increase in health service engagement' },
]

const JOBS = [
  {
    title: 'Sell',
    text: 'Help people compare plans and buy health insurance online, without a call to the center.',
  },
  {
    title: 'Serve',
    text: 'Give members easy access to their benefits, providers, appointments and personalised recommendations.',
  },
  {
    title: 'Comply',
    text: 'Meet healthcare regulations and data privacy requirements, in Arabic and in English.',
  },
]

const METHODS = [
  {
    title: 'User interviews and surveys',
    text: 'In-depth conversations with prospective buyers and existing members, to understand needs, motivations and pain points around insurance shopping and health service preferences.',
  },
  {
    title: 'Journey mapping',
    text: 'Mapped end-to-end customer journeys for insurance purchase and health management, identifying touchpoints, emotions and opportunities.',
  },
  {
    title: 'Behavioural analysis',
    text: 'Analysed user behaviour patterns and pain points in the current processes, to guide simplification.',
  },
  {
    title: 'Regulatory review',
    text: 'Reviewed healthcare regulations and data privacy requirements, so the design solutions would be compliant as well as high quality.',
  },
]

const DEFINE_ARTIFACTS = ['User personas', 'Journey maps', 'Service blueprints', 'Information architecture', 'Key flows']

const APP_GALLERY: ImageSrc[] = [
  bupaAppImage1,
  bupaAppImage2,
  bupaAppImage3,
  bupaAppImage4,
  bupaAppImage5,
  bupaAppImage6,
]

const INDEXED = [
  { label: 'Online insurance conversions', before: 100, after: 135 },
  { label: 'Customer support calls', before: 100, after: 72 },
  { label: 'Health service engagement', before: 100, after: 145 },
]

export function BupaCaseStudy() {
  const lightbox = useLightbox()
  const open = lightbox.open

  return (
    <>
      <CaseStudyHeader company="Bupa Arabia" chapters={CHAPTERS} />

      <main id="main">
        {/* Overview */}
        <section id="overview" className="pt-32 md:pt-40 pb-16 md:pb-24 bg-[var(--bg)]">
          <div className="max-w-[1480px] mx-auto px-5 md:px-8 lg:px-10">
            <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14 items-center">
              <div className="lg:col-span-6">
                <p className="font-mono text-xs text-[var(--text-faint)]">Case study 03 · Bupa Arabia · Healthcare, B2C</p>
                <h1 className="font-display tracking-display-lg text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.04] text-[var(--ink)] mt-6">
                  <RiseText onMount delay={0.1}>
                    Insurance sales and population health management
                  </RiseText>
                </h1>
                <FadeUp delay={0.2}>
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed mt-8 max-w-[52ch]">
                    Bupa Arabia needed two products doing fundamentally different jobs: sell health insurance online, and
                    help existing members use their benefits day to day. I led end-to-end design for both, a B2C
                    insurance sales website and a Population Health Management mobile app, in Arabic and English.
                  </p>
                </FadeUp>
                <FadeUp delay={0.3}>
                  <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-6 border-t border-[var(--line-strong)] pt-6 max-w-[620px]">
                    {[
                      ['Role', 'Lead Product Designer, web and mobile'],
                      ['Product', 'B2C insurance sales website and a Population Health Management mobile app'],
                      ['Key goals', 'Simplify purchase, improve engagement, ensure compliance, support Arabic and English'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-[var(--text-faint)] mb-1">{k}</dt>
                        <dd className="text-[15px] text-[var(--ink)]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </FadeUp>
              </div>

              <div className="lg:col-span-6 lg:pl-10">
                <ScreenStack
                  screens={[
                    { src: bupaCardImage, alt: 'Bupa Arabia mobile app', label: 'Mobile app' },
                    { src: healthDashboardImage, alt: 'Bupa Arabia health services dashboard', label: 'Health services' },
                    { src: bupaAppImage1, alt: 'Bupa Arabia app home screens', label: 'App home' },
                  ]}
                />
              </div>
            </div>

            <dl className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--line-strong)]">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-6 pr-6 ${i > 0 ? 'sm:pl-6 sm:border-l sm:border-[var(--line)]' : ''}`}
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
              Buying insurance and using it were two disconnected experiences, and both ended in a phone call
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-6 text-base text-[var(--text-muted)] leading-relaxed">
              <p>
                Bupa Arabia&rsquo;s insurance-purchase journey and its health-benefit access were separate experiences.
                Both routed customers to a call center instead of letting them help themselves.
              </p>
              <p>
                It is a regulated healthcare market, and a bilingual one, with Arabic and English users expecting the
                same quality. The design had to turn regulatory constraints into a single, unified information
                architecture.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs text-[var(--text-faint)] mt-16">The products had to do three jobs</p>
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
              <span className="text-[var(--ink)]">Goal.</span> Simplify the insurance purchase journey and enable easy
              access to health services and benefits.
            </p>
          </FadeUp>
        </Chapter>

        {/* 02 Research */}
        <Chapter id="research" index="02" title="Research">
          <div className="grid md:grid-cols-[auto_1fr] gap-x-14 gap-y-6 items-end">
            <FadeUp>
              <p className="font-display tracking-display-lg text-[clamp(5rem,12vw,9rem)] leading-[0.85] text-[var(--ink)]">
                <CountUp value={20} suffix="+" />
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-3">Participants interviewed</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[58ch]">
                Research into customer needs across insurance purchase and health management, with interviews alongside
                quantitative data from 200+ users.
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
              One picture of the customer, from first quote to everyday care
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-8 text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">
              I turned the research into the artefacts the team could build from, and defined the information
              architecture and key flows that tie the website and the app together.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {DEFINE_ARTIFACTS.map((a) => (
                <li
                  key={a}
                  className="rounded-[8px] border border-[var(--line-strong)] px-4 py-2 text-sm text-[var(--ink)]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </FadeUp>
        </Chapter>

        {/* 04 Design */}
        <Chapter id="design" index="04" title="Design">
          <FadeUp>
            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">
              Wireframes and high-fidelity mockups, then interactive prototypes for web and mobile with bilingual
              support. Select any screen to view it larger.
            </p>
          </FadeUp>

          <div className="mt-16 space-y-24">
            <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono text-xs text-[var(--text-faint)]">01 / 02</p>
                  <h3 className="font-display tracking-display-md text-2xl md:text-3xl text-[var(--ink)] mt-4">
                    Mobile app
                  </h3>
                  <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mt-4 max-w-[40ch]">
                    An interface for comparing and selecting insurance plans: side-by-side comparison, clear benefit
                    breakdowns and a simplified purchase flow.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-8">
                <FadeUp>
                  <button
                    onClick={() => open([bupaCardImage, ...APP_GALLERY], 0)}
                    aria-label="View the mobile app larger"
                    className="cursor-pointer block w-full overflow-hidden rounded-[12px] border border-[var(--line-strong)] bg-white transition-transform duration-300 hover:-translate-y-1"
                    style={{ boxShadow: '0 20px 48px rgba(10,10,10,0.08)' }}
                  >
                    <ImageWithFallback src={bupaCardImage} alt="Bupa Arabia mobile app" className="block w-full h-auto" />
                  </button>
                </FadeUp>
                <ul className="mt-4 grid grid-cols-3 gap-4">
                  {APP_GALLERY.map((img, gi) => (
                    <li key={gi}>
                      <button
                        onClick={() => open([bupaCardImage, ...APP_GALLERY], gi + 1)}
                        aria-label={`View app screens ${gi + 1} larger`}
                        className="cursor-pointer block w-full overflow-hidden rounded-[8px] border border-[var(--line-strong)] bg-white transition-opacity duration-200 hover:opacity-80"
                      >
                        <ImageWithFallback src={img} alt={`Bupa Arabia app screens, set ${gi + 1}`} className="block w-full h-auto" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono text-xs text-[var(--text-faint)]">02 / 02</p>
                  <h3 className="font-display tracking-display-md text-2xl md:text-3xl text-[var(--ink)] mt-4">
                    Health services dashboard
                  </h3>
                  <p className="text-[15px] text-[var(--text-muted)] leading-relaxed mt-4 max-w-[40ch]">
                    A dashboard giving members access to their health benefits, service providers, appointment booking
                    and personalised recommendations, in Arabic and English.
                  </p>
                  <a
                    href="https://www.figma.com/proto/HePfxN9rnLzxlk2Ut7iFoG/Bupa_B2C_Final?page-id=13982%3A87292&node-id=13982-91703&viewport=5667%2C707%2C0.25&t=tEWACqcisaHU2kZ7-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=13982%3A91703&hide-ui=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer group mt-6 inline-flex items-center gap-2 h-12 px-8 rounded-full border border-[var(--ink)] text-[var(--ink)] text-sm transition-colors duration-200 hover:bg-[var(--ink)] hover:text-white"
                  >
                    View the prototype
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="lg:col-span-8">
                <FadeUp>
                  <button
                    onClick={() => open([healthDashboardImage], 0)}
                    aria-label="View the health services dashboard larger"
                    className="cursor-pointer block w-full overflow-hidden rounded-[12px] border border-[var(--line-strong)] bg-white transition-transform duration-300 hover:-translate-y-1"
                    style={{ boxShadow: '0 20px 48px rgba(10,10,10,0.08)' }}
                  >
                    <ImageWithFallback
                      src={healthDashboardImage}
                      alt="Bupa Arabia health services dashboard"
                      className="block w-full h-auto"
                    />
                  </button>
                </FadeUp>
              </div>
            </div>
          </div>
        </Chapter>

        {/* 05 Testing */}
        <Chapter id="testing" index="05" title="Testing">
          <FadeUp>
            <p className="font-display tracking-display-md text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.15] text-[var(--ink)] max-w-[28ch]">
              The critical flows were tested, then tested again
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="mt-8 text-base text-[var(--text-muted)] leading-relaxed max-w-[62ch]">
              I ran usability and A/B testing on the critical flows, and refined the design based on what I saw.
            </p>
          </FadeUp>
        </Chapter>

        {/* 06 Impact */}
        <Chapter id="impact" index="06" title="Impact">
          <ul className="grid sm:grid-cols-3 gap-x-10 gap-y-12">
            {STATS.map((s) => (
              <li key={s.label} className="border-t border-[var(--ink)] pt-5">
                <p className="font-display tracking-display-lg text-6xl md:text-7xl text-[var(--ink)]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[15px] text-[var(--text-muted)] mt-3 max-w-[26ch] leading-snug">{s.label}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 border-t border-[var(--line-strong)] pt-10 max-w-[620px]">
            <h3 className="font-display tracking-display-md text-2xl text-[var(--ink)]">Before and after</h3>
            <p className="text-sm text-[var(--text-muted)] mt-2">Indexed, with the starting point as 100</p>
            <div className="mt-8 space-y-10">
              {INDEXED.map((row) => (
                <div key={row.label} className="space-y-3">
                  <Bar value={row.before} max={150} label={`${row.label}, before`} display={String(row.before)} />
                  <Bar value={row.after} max={150} label="After" display={String(row.after)} strong />
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-16 border-t border-[var(--line-strong)]">
            <li className="py-5 border-b border-[var(--line)] text-[15px] text-[var(--ink)]">
              Successfully launched a bilingual (Arabic and English) experience
            </li>
          </ul>

          <FadeUp delay={0.1}>
            <Link
              href="/#projects"
              className="cursor-pointer group mt-20 inline-flex items-center gap-3 h-12 px-8 rounded-full bg-[var(--ink)] text-white text-sm transition-colors duration-200 hover:bg-[#3a3a3a]"
            >
              See more work
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeUp>
        </Chapter>
      </main>

      <CaseStudyFooter />

      <Lightbox state={lightbox.state} onClose={lightbox.close} onStep={lightbox.step} />
    </>
  )
}
