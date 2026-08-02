'use client'

import { CaseStudyPanel } from './CaseStudyPanel'
import liveNetworkImage from 'figma:asset/5a9b506683fc0fe225ca1546b754250ef41debf8.png'
import liveNetworkImage2 from 'figma:asset/260b5514384e3760924741d16c7f395f5e2cd588.png'
import capacityCostImage from 'figma:asset/16dd343d33d1deb4e851443bccbd0815e4121cd2.png'
import networkPlanningImage1 from 'figma:asset/66e5136a0f42899377f4646294b5029e6e238de0.png'
import networkPlanningImage2 from 'figma:asset/712b2f37f9ef1185b18343197c32c1a3175712c0.png'
import networkPlanningImage3 from 'figma:asset/a688e8d39910904569b341b5d8020436eb3eb006.png'
import networkPlanningImage4 from 'figma:asset/618ca1d6699d548f1d73ec1ec029a7c5761f26fe.png'

interface CienaCaseStudySidecarProps {
  isOpen: boolean
  onClose: () => void
}

export function CienaCaseStudySidecar({ isOpen, onClose }: CienaCaseStudySidecarProps) {
  return (
    <CaseStudyPanel
      isOpen={isOpen}
      onClose={onClose}
      index="01"
      company="Ciena"
      title="Real-Time Optical Network Management"
      summary="Network engineers were planning multi-million-dollar optical infrastructure manually — a fragmented workflow with no shared information architecture, reliant on tribal knowledge. I led UX end-to-end — research, information architecture, and a production design system — for the B2B SaaS platform that replaced it. Result: 85% faster network creation, 92% fewer real-world errors, and a satisfaction score that nearly doubled, 4.8 to 8.7 out of 10."
      meta={[
        { label: 'Product', value: 'B2B SaaS application for telecommunication providers.' },
        {
          label: 'Goal',
          value:
            'Enable efficient creation, management, and live monitoring of telecom/submarine optical networks, optimizing for capacity and cost.',
        },
        { label: 'Tools', value: 'Zoom, Miro, Lucidchart, Figma, Sketch' },
        { label: 'Role', value: 'UX Designer, 0→1 through iteration' },
      ]}
      process={[
        {
          title: 'Research',
          description: 'Conducted interviews and workflow analysis with network engineers.',
        },
        {
          title: 'Define',
          description:
            'Mapped complex user journeys for network planning, provisioning, and monitoring; defined information architecture.',
        },
        {
          title: 'Design',
          description:
            'Created wireframes and interactive prototypes focusing on network topology visualization, dashboard design, and data visualization for equipment comparison. Iterated based on feedback.',
        },
        {
          title: 'Testing',
          description: 'Performed usability testing on prototypes with target users.',
        },
      ]}
      research={{
        intro:
          'A total of 10 users were interviewed, with questions related to their day-to-day network planning process, which was quite manual. Their answers were added to the use cases in Jira to be considered during design.',
        items: [
          {
            title: 'In-depth Interviews & Contextual Inquiries',
            description:
              'Conducted in-depth interviews and contextual inquiries with target users (Network Engineers, Planners, Operators) to understand day-to-day tasks, goals, and frustrations with existing tools/processes.',
          },
          {
            title: 'SME Collaboration',
            description:
              'Collaborated closely with Ciena Subject Matter Experts and stakeholders to deeply understand optical networking concepts, technical constraints, and business objectives.',
          },
          {
            title: 'Competitive Analysis',
            description:
              'Analyzed existing competitor tools and internal documentation to identify gaps, opportunities, and established mental models within the domain.',
          },
          {
            title: 'Task Analysis & Workflow Mapping',
            description:
              'Performed task analysis and workflow mapping of current network creation, management, and monitoring processes to pinpoint key areas for improvement.',
          },
        ],
      }}
      stats={[
        { value: '85%', label: 'Reduction in network creation time' },
        { value: '92%', label: 'Fewer real-world network errors and outages' },
        { value: '46%', label: 'Increase in equipment and network capacity' },
        { value: '23%', label: 'Increase in equipment sales' },
      ]}
      outcomes={[
        'Improved user satisfaction score from 4.8 to 8.7 (out of 10)',
        'Created a scalable design system with 50+ reusable components',
      ]}
      screens={[
        {
          image: networkPlanningImage1,
          title: 'Network Planning',
          description:
            'Visual interface for designing and configuring optical network topologies, with drag-and-drop elements, real-time capacity calculations, and automated routing suggestions.',
          gallery: [networkPlanningImage2, networkPlanningImage3, networkPlanningImage4],
        },
        {
          image: liveNetworkImage,
          title: 'Live Network',
          description:
            'Real-time monitoring dashboard for network health, performance metrics, and operational status, with instant alerts and interactive network maps.',
          gallery: [liveNetworkImage2],
        },
        {
          image: capacityCostImage,
          title: 'Capacity and Cost Visualization',
          description:
            'Analytics dashboard for capacity planning and cost optimization — utilization, forecasts, and cost breakdowns for network expansion decisions.',
        },
      ]}
    />
  )
}
