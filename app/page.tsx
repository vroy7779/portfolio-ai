import { Navigation } from '@/components/sections/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
