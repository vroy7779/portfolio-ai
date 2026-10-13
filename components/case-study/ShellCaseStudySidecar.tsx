'use client'

import { CaseStudyPanel } from '@/components/case-study/CaseStudyPanel'
import shellGlobalImage from '@/assets/fb56d725582c371a9eb97280753d806bb335e578.png'
import shellCareersImage from '@/assets/63691069eeafbe99764b11553696c8bd10d5f0fd.png'
import shellFerrariImage from '@/assets/2e58fd0cf269e9b183936adb32def2ee94d954cd.png'
import shellBrandCentralImage from '@/assets/03c03299d7e8e67763f10a033c4401be74fc2273.png'
import shellClubSmartImage from '@/assets/a3904aafced5e1ceb8cbc690c627fa6350156cbf.png'

interface ShellCaseStudySidecarProps {
  isOpen: boolean
  onClose: () => void
}

export function ShellCaseStudySidecar({ isOpen, onClose }: ShellCaseStudySidecarProps) {
  return (
    <CaseStudyPanel
      isOpen={isOpen}
      onClose={onClose}
      index="05"
      company="Shell"
      title="Enterprise Operations Applications"
      summary="Shell needed a consistent design language across supply chain tracking, asset management, e-commerce, brand asset management, and a careers portal — spanning 50+ countries and 10,000+ users. I designed the enterprise application suite that unified them, cutting new-user onboarding time by 40% and improving operational efficiency by 30%."
      meta={[
        { label: 'Product', value: 'Enterprise business applications for Shell’s global operations.' },
        {
          label: 'Goal',
          value:
            'Support complex supply chain management, asset tracking, e-commerce, brand management, and career portals across a global organization.',
        },
        { label: 'Role', value: 'Product Designer, enterprise applications' },
        { label: 'Scale', value: '50+ countries, 10,000+ global users' },
      ]}
      stats={[
        { value: '30%', label: 'Improved operational efficiency' },
        { value: '40%', label: 'Faster onboarding for new users' },
        { value: '50+', label: 'Countries with unified brand management' },
        { value: '10K+', label: 'Global users supported' },
      ]}
      outcomes={[
        'Enhanced supply chain visibility for executive decision-making',
      ]}
      screens={[
        {
          image: shellGlobalImage,
          title: 'Shell business application',
          description:
            'Global brand asset management portal for marketing teams across 50+ countries — guidelines, asset distribution, and campaign management.',
          href: 'https://www.figma.com/proto/rhGOiVjF9XSXnx0F41NkYE/Shell-designs?page-id=0%3A1&node-id=205-15626&viewport=-48%2C625%2C0.11&t=xizG6HDmbMUMI5lk-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=205%3A15626&hide-ui=1',
        },
        {
          image: shellCareersImage,
          title: 'Shell Careers Portal',
          description:
            'Global careers website redesign for talent acquisition, with personalized job matching and application tracking.',
          href: 'https://www.figma.com/proto/rhGOiVjF9XSXnx0F41NkYE/Shell-designs?page-id=0%3A1&node-id=205-16288&viewport=-9913%2C1332%2C0.55&t=Fl5uxjzC0AJcIeuF-8&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=205%3A16288&hide-ui=1',
        },
        {
          image: shellFerrariImage,
          title: 'Motor race partnership',
          description:
            'B2B and B2C e-commerce platform for lubricants and fuel card products, with end-to-end purchase flows and order management.',
          href: 'https://www.figma.com/proto/rhGOiVjF9XSXnx0F41NkYE/Shell-designs?page-id=0%3A1&node-id=205-15591&viewport=-374%2C-113%2C0.15&t=Fp3hlmFjUVHspGw0-8&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=205%3A15591&show-proto-sidebar=1&hide-ui=1',
        },
        {
          image: shellBrandCentralImage,
          title: 'Shell Corp Design System',
          description:
            'Real-time supply chain tracking and logistics dashboard, improving visibility and decision-making for operational teams.',
          href: 'https://www.figma.com/proto/rhGOiVjF9XSXnx0F41NkYE/Shell-designs?page-id=0%3A1&node-id=790-24540&viewport=-9913%2C1332%2C0.55&t=Fl5uxjzC0AJcIeuF-8&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=790%3A24540&hide-ui=1',
        },
        {
          image: shellClubSmartImage,
          title: 'E-commerce app',
          description:
            'Enterprise asset tracking and maintenance management, enabling real-time monitoring of equipment and infrastructure.',
          href: 'https://www.figma.com/proto/rhGOiVjF9XSXnx0F41NkYE/Shell-designs?page-id=0%3A1&node-id=205-16590&viewport=-48%2C625%2C0.11&t=xizG6HDmbMUMI5lk-8&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=205%3A16590&hide-ui=1',
        },
      ]}
    />
  )
}
