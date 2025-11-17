import { HeroSection } from '@/components/home/hero-section';
import { IdentitySliderSection } from '@/components/home/identity-slider-section';
import { AboutSection } from '@/components/home/about-section';
import { ServicesSection } from '@/components/home/services-section';
import { PortfolioPreviewSection } from '@/components/home/portfolio-preview-section';
import { ResumePreviewSection } from '@/components/home/resume-preview-section';
import { LabAndBlogSection } from '@/components/home/lab-and-blog-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <IdentitySliderSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioPreviewSection />
      <ResumePreviewSection />
      <LabAndBlogSection />
    </>
  );
}
