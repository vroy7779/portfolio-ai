import type { Metadata } from 'next'
import { CienaCaseStudy } from '@/components/case-study/CienaCaseStudy'

export const metadata: Metadata = {
  title: 'Ciena: Real-time optical network creation and management - Agentic AI | Vaibhav Roy',
  description:
    'Case study: leading UX for the B2B SaaS platform that replaced manual optical network planning at Ciena. 85% faster network creation, 92% fewer errors, satisfaction 4.8 to 8.7 out of 10.',
}

export default function CienaCaseStudyPage() {
  return <CienaCaseStudy />
}
