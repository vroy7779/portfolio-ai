'use client'

import { CaseStudyPanel } from '@/components/case-study/CaseStudyPanel'
import bupaAppImage1 from '@/assets/181c4c09915a2e7608a2054ab708102fdbe08ea1.png'
import bupaAppImage2 from '@/assets/306434504d450ebf8d5657acb01d1c3fc129aaae.png'
import bupaAppImage3 from '@/assets/0328c6be63008c7217e7fb1d2338250b5d8cb8c9.png'
import bupaAppImage4 from '@/assets/e2725e89377fb732e03f1ef724cf8ded82a836e8.png'
import bupaAppImage5 from '@/assets/02cb72f304ab6519e9a0afd694dd54599969f90a.png'
import bupaAppImage6 from '@/assets/49457c837408c7f91596f77ecfb4d4c69e14fbb2.png'
import bupaCardImage from '@/assets/a65dc7b7fc93cd6c8b1234597cf34d7737ce7450.png'
import healthDashboardImage from '@/assets/3f43566ae36aa5da9153dad1c0eda9a59402ce77.png'

interface BupaCaseStudySidecarProps {
  isOpen: boolean
  onClose: () => void
}

export function BupaCaseStudySidecar({ isOpen, onClose }: BupaCaseStudySidecarProps) {
  return (
    <CaseStudyPanel
      isOpen={isOpen}
      onClose={onClose}
      index="03"
      company="Bupa Arabia"
      title="Insurance Sales & Population Health Management"
      summary="Bupa Arabia needed two products doing fundamentally different jobs: sell health insurance online, and help existing members actually use their benefits day to day. I led end-to-end design for both — a B2C insurance sales website and a Population Health Management mobile app — across research, journey mapping, bilingual (Arabic/English) UI, and usability testing. Online insurance conversions rose 35%; support call volume dropped 28% as self-service replaced the phone."
      meta={[
        {
          label: 'Product',
          value:
            'B2C insurance sales website and Population Health Management (PHM) mobile app for Bupa Arabia healthcare members.',
        },
        {
          label: 'Goal',
          value:
            'Simplify the insurance purchase journey and enable easy access to health services and benefits.',
        },
        {
          label: 'Key goals',
          value: 'Simplify purchase, improve engagement, ensure compliance, support Arabic and English.',
        },
        { label: 'Role', value: 'Lead Product Designer, web + mobile' },
      ]}
      process={[
        {
          title: 'Research',
          description:
            'Conducted user interviews and surveys with insurance customers and members; analyzed behavior patterns and pain points.',
        },
        {
          title: 'Define',
          description:
            'Created user personas, journey maps, and service blueprints; defined information architecture and key flows.',
        },
        {
          title: 'Design',
          description:
            'Designed wireframes and high-fidelity mockups; built interactive prototypes for web and mobile with bilingual support.',
        },
        {
          title: 'Testing',
          description: 'Conducted usability and A/B testing on critical flows; iteratively refined based on feedback.',
        },
      ]}
      research={{
        intro:
          'Comprehensive research into customer needs across insurance purchase and health management, engaging 20+ participants through interviews and quantitative data from 200+ users.',
        items: [
          {
            title: 'User Interviews & Surveys',
            description:
              'In-depth conversations with prospective buyers and existing members to understand needs, motivations, and pain points around insurance shopping and health service preferences.',
          },
          {
            title: 'Journey Mapping',
            description:
              'Mapped end-to-end customer journeys for insurance purchase and health management, identifying touchpoints, emotions, and opportunities.',
          },
          {
            title: 'Behavioral Analysis',
            description: 'Analyzed user behavior patterns and pain points in current processes to guide simplification.',
          },
          {
            title: 'Regulatory Review',
            description:
              'Reviewed healthcare regulations and data privacy requirements to ensure compliant, high-quality design solutions.',
          },
        ],
      }}
      stats={[
        { value: '35%', label: 'Increase in online insurance conversions' },
        { value: '28%', label: 'Fewer customer support calls' },
        { value: '45%', label: 'Increase in health service engagement' },
      ]}
      outcomes={[
        'Successfully launched a bilingual (Arabic/English) experience',
      ]}
      screens={[
        {
          image: bupaCardImage,
          title: 'Bupa Arabia Mobile App',
          description:
            'Interface for comparing and selecting insurance plans — side-by-side comparison, clear benefit breakdowns, and a simplified purchase flow.',
          gallery: [bupaAppImage1, bupaAppImage2, bupaAppImage3, bupaAppImage4, bupaAppImage5, bupaAppImage6],
        },
        {
          image: healthDashboardImage,
          title: 'Health Services Dashboard',
          description:
            'Mobile dashboard giving members access to health benefits, service providers, appointment booking, and personalized recommendations in Arabic and English.',
          href: 'https://www.figma.com/proto/HePfxN9rnLzxlk2Ut7iFoG/Bupa_B2C_Final?page-id=13982%3A87292&node-id=13982-91703&viewport=5667%2C707%2C0.25&t=tEWACqcisaHU2kZ7-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=13982%3A91703&hide-ui=1',
        },
      ]}
    />
  )
}
