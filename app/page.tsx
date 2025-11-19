import { HeroSection } from '@/components/home/hero-section';
import { QuickFactsSection } from '@/components/home/quick-facts-section';
import { ValuePropositionSection } from '@/components/home/value-proposition-section';
import { ServicesSection } from '@/components/home/services-section';
import { TrustedByCarousel } from '@/components/home/trusted-by-carousel';
import { PortfolioPreviewSection } from '@/components/home/portfolio-preview-section';
import { WhyHireSection } from '@/components/home/why-hire-section';
import { LabAndBlogSection } from '@/components/home/lab-and-blog-section';
import { ValuePropositionTwoSection } from '@/components/home/value-proposition-section-2';
import { ValuePropositionThreeSection } from '@/components/home/value-proposition-section-3';
import { AboutMeSection } from '@/components/home/about-me-section';
import { StructuredData } from '@/components/seo/structured-data';
import { generatePersonSchema, generateWebsiteSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lukehertzler.com';
const defaultImage = `${siteUrl}/images/luke/luke-techaron.jpg`;

export const metadata: Metadata = {
  title: 'Luke Hertzler – Portfolio | Shopify & Next.js Solutions Architect',
  description: 'Full-Stack Engineer, UI/UX Designer, Musician. I design, architect, and build custom Shopify themes, bespoke apps, and high-performance Next.js experiences that actually move the needle.',
  openGraph: {
    title: 'Luke Hertzler – Portfolio | Shopify & Next.js Solutions Architect',
    description: 'Full-Stack Engineer, UI/UX Designer, Musician. I design, architect, and build custom Shopify themes, bespoke apps, and high-performance Next.js experiences that actually move the needle.',
    url: siteUrl,
    siteName: 'Luke Hertzler',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'Luke Hertzler - Full-Stack Engineer & Shopify & Next.js Solutions Architect',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luke Hertzler – Portfolio | Shopify & Next.js Solutions Architect',
    description: 'Full-Stack Engineer, UI/UX Designer, Musician. I design, architect, and build custom Shopify themes, bespoke apps, and high-performance Next.js experiences that actually move the needle.',
    images: [defaultImage],
    creator: '@lukehertzler',
  },
};

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <StructuredData data={personSchema} />
      <StructuredData data={websiteSchema} />
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
