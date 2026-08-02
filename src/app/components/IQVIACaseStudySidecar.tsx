'use client'

import { CaseStudyPanel } from './CaseStudyPanel'

interface IQVIACaseStudySidecarProps {
  isOpen: boolean
  onClose: () => void
}

export function IQVIACaseStudySidecar({ isOpen, onClose }: IQVIACaseStudySidecarProps) {
  return (
    <CaseStudyPanel
      isOpen={isOpen}
      onClose={onClose}
      index="03"
      company="IQVIA"
      title="Clinical Trial Payment & Financial Operations Platform"
      summary="Clinical trial finance teams were tracking multi-million-dollar budgets across spreadsheets, email, and disconnected systems, with regulatory audits riding on the accuracy of that data. I designed the B2B SaaS platform that replaced it — budget allocation, vendor payments, and compliance reporting in one system, across 100+ trials. Payment processing got 50% faster; financial errors dropped 65%."
      meta={[
        {
          label: 'Product',
          value: 'B2B SaaS platform for clinical trial payment tracking and financial management.',
        },
        {
          label: 'Goal',
          value:
            'Streamline payment tracking, improve financial transparency, and reduce administrative overhead across multi-site trials.',
        },
        { label: 'Role', value: 'Senior Product Designer, research through delivery' },
        {
          label: 'Deliverables',
          value: 'Process maps, user flows, dashboards, data visualizations, component library, style guide.',
        },
      ]}
      process={[
        {
          title: 'Research & Understanding',
          description:
            'Conducted stakeholder interviews with trial managers, finance teams, and site coordinators. Analyzed existing payment workflows and identified pain points.',
        },
        {
          title: 'Define & Map',
          description:
            'Created detailed process maps for budget allocation, payment approvals, and vendor management. Defined user roles, permissions, and data hierarchies.',
        },
        {
          title: 'Design & Visualize',
          description:
            'Designed dashboards with financial metrics and KPIs, and workflows for payment requests, approvals, and reporting with clear status indicators.',
        },
        {
          title: 'Test & Refine',
          description:
            'Conducted usability testing with finance teams and trial managers. Iterated on complex workflows based on feedback and edge cases.',
        },
        {
          title: 'Implement & Scale',
          description:
            'Worked with development teams on a phased rollout, monitored adoption metrics, and provided ongoing design support for enhancements.',
        },
      ]}
      research={{
        intro: 'A deep dive into clinical trial financial operations to understand complex workflows and stakeholder needs.',
        items: [
          {
            title: 'Stakeholder Interviews',
            description:
              '12+ interviews with trial managers, finance directors, and site coordinators to map current processes and identify inefficiencies.',
          },
          {
            title: 'Process Observation',
            description:
              'Shadowed finance teams during budget reviews and payment processing to understand real-world constraints and workarounds.',
          },
          {
            title: 'Compliance Review',
            description: 'Analyzed regulatory requirements for clinical trial financial management and audit trails.',
          },
          {
            title: 'Competitive Analysis',
            description:
              'Evaluated existing clinical trial management and financial software to identify best practices and gaps.',
          },
        ],
      }}
      stats={[
        { value: '50%', label: 'Faster payment processing' },
        { value: '65%', label: 'Fewer financial errors and discrepancies' },
        { value: '85%', label: 'User satisfaction, post-launch' },
        { value: '100+', label: 'Trials with real-time financial visibility' },
      ]}
      outcomes={[
        'Improved audit readiness and compliance tracking',
      ]}
    />
  )
}
