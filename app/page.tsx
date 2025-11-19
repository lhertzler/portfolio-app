import { HeroSection } from '@/components/home/hero-section';
import { QuickFactsSection } from '@/components/home/quick-facts-section';
import { ValuePropositionSection } from '@/components/home/value-proposition-section';
import { ServicesSection } from '@/components/home/services-section';
import { TrustedByCarousel } from '@/components/home/trusted-by-carousel';
import { PortfolioPreviewSection } from '@/components/home/portfolio-preview-section';
import { WhyHireSection } from '@/components/home/why-hire-section';
import { ResumePreviewSection } from '@/components/home/resume-preview-section';
import { LabAndBlogSection } from '@/components/home/lab-and-blog-section';
import { ValuePropositionTwoSection } from '@/components/home/value-proposition-section-2';
import { ValuePropositionThreeSection } from '@/components/home/value-proposition-section-3';
import { AboutMeSection } from '@/components/home/about-me-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickFactsSection />
      <ValuePropositionSection />
      <ServicesSection />
      <ValuePropositionTwoSection />
      <WhyHireSection />
      <TrustedByCarousel />
      <PortfolioPreviewSection />
      <ValuePropositionThreeSection />  
      <LabAndBlogSection />
      <AboutMeSection />
    </>
  );
}
