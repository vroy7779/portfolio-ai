import type { Metadata } from 'next'
import { BupaCaseStudy } from '@/components/case-study/BupaCaseStudy'

export const metadata: Metadata = {
  title: 'Bupa Arabia: Insurance sales and population health management | Vaibhav Roy',
  description:
    'Case study: leading design for a bilingual B2C insurance sales website and a Population Health Management app for Bupa Arabia. 35% more online conversions, 28% fewer support calls, 45% more health-service engagement.',
}

export default function BupaCaseStudyPage() {
  return <BupaCaseStudy />
}
