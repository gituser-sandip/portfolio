import { ContactSection } from '@/components/sections/contact-section';
import { CertificationsSection } from '@/components/sections/certifications-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { GithubSection } from '@/components/sections/github-section';
import { HeroSection } from '@/components/sections/hero-section';
import { PerformanceSection } from '@/components/sections/performance-section';
import { SelectedWorkSection } from '@/components/sections/selected-work-section';
import { SiteFooter } from '@/components/sections/site-footer';
import { SiteHeader } from '@/components/sections/site-header';
import { SkillsSection } from '@/components/sections/skills-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { SandeepAi } from '@/components/sections/sandeep-ai';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function HomePage() {
  return (
    <div className='relative overflow-x-clip'>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <HeroSection />
        <div className='portfolio-atmosphere'>
          <SelectedWorkSection />
          <SkillsSection />
          <ExperienceSection />
          <CertificationsSection />
          <GithubSection />
          <PerformanceSection />
          <TestimonialsSection />
          <ContactSection />
        </div>
      </main>
      <SiteFooter />
      <SandeepAi />
    </div>
  );
}
