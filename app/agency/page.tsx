'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUIStore } from '@/store/ui-store';
import { motion } from 'framer-motion';
import { Wrench, Rocket, Handshake, Trophy, UserPlus, Zap, Palette, Sparkles, CircleOff, ArrowRightLeft, Code, Repeat, Plug, Layers, FileCode, PenTool, CogIcon } from 'lucide-react';
import { useIsMobile } from '@/lib/use-is-mobile';
import { useState } from 'react';
import { FeaturedServiceCard, ServiceItem } from '@/components/services/featured-service-card';
import { SecondaryServiceRow } from '@/components/services/secondary-service-row';
import { ServiceGrid } from '@/components/services/service-grid';
import { ServiceDetailsModal } from '@/components/services/service-details-modal';
import { allServices, whatIDoBest, skillSetAboveAndBeyond } from '@/lib/agency-services';
import { ContentHeroExtended } from '@/components/content/hero-extended';
import { QuickFactsSection } from '@/components/home/quick-facts-section';
import { ContentBlock } from '@/components/content/content-block';

const heroBadges = [
  '10+ Years Shopify',
  'Next.js Applications',
  'Custom Shopify Apps',
  'On-Demand Senior Dev',
  'Fast Turnarounds',
  'Polished Deliveries',
  'Minimal Onboarding',
  'Agency Experienced',
  'Loved by Designers',
  'Loved by Clients',
  'Zero Drama',
];

const serviceList = [
  { icon: Palette, text: 'Custom Shopify Themes' },
  { icon: CogIcon, text: 'Store Maintenance & Updates' },
  { icon: Wrench, text: 'Custom Shopify Features' },
  { icon: Rocket, text: 'Headless Shopify' },
  { icon: Code, text: 'Custom Shopify Apps' },
  { icon: Repeat, text: 'Recharge Subscription Systems' },
  { icon: Plug, text: 'Custom Shopify Integrations' },
  { icon: Layers, text: 'React Storefront Features' },
  { icon: FileCode, text: 'Next.js Applications' },
];

const quickFacts = [
  { highlight: '10+', label: 'Years Experience' },
  { highlight: 'Top 0.2%', label: 'Shopify Expert' },
  { highlight: 'Trusted', label: 'by Top Brands' },
  { highlight: 'Next.js', label: 'App Architect' },
  { highlight: 'UI/UX', label: 'Design Specialist' },
];

const whatIDontDo = [
  {
    title: 'Pre-Made Theme Setups',
    description: 'I don\'t set up stores or build pages with free pre-made themes or builder apps',
  },
  {
    title: 'Builds Without Approved Designs',
    description: 'I only take on custom builds when designs are provided and finalized.',
  },
  {
    title: 'Store Management Tasks',
    description: 'I\'m not a fit for small updates, tag tweaks, media uploads, or general store maintenance.',
  },
  {
    title: 'Audits, Strategy, or Growth Consulting',
    description: 'I don\'t provide SEO audits, UX strategy, CRO planning, or brand-growth recommendations.',
  },
];

const whyAgenciesPartnerWithMe = [
  {
    icon: Sparkles,
    title: 'A Decade of Experience',
    description: 'Years of experience across custom themes & complex builds.'
  },
  {
    icon: UserPlus,
    title: 'Former Agency Engineer',
    description: 'Real-world agency experience from Sleepless Media and eHouse Studios.'
  },
  {
    icon: Handshake,
    title: 'Clear Client Communication',
    description: 'Happy clients — leading calls, steady expecations, smooth delivery'
  },
  {
    icon: Zap,
    title: 'Rapid Turnarounds',
    description: 'Fast delivery backed by a workflow tuned for high-output velocity.'
  },
  {
    icon: Trophy,
    title: 'Flawless Code Quality',
    description: 'Clean, durable code done right — delivered with no surprises.'
  },
  {
    icon: PenTool,
    title: 'Loved by Designers',
    description: 'Code crafted with a designer\'s eye — every pixel placed just right.'
  },
];

const seamlessIntegrationWithYourTeam = [
  {
    icon: Sparkles,
    title: 'Minimal Onboarding',
    description: 'Fits into your tools, pace, and process instantly — zero ramp-up, zero friction.',
  },
  {
    icon: UserPlus,
    title: 'Client Communication',
    description: 'Reliable client-facing support — steady expectations, calm delivery, no surprises.',
  },
  {
    icon: Handshake,
    title: 'Senior-Level Support',
    description: 'Handles complex projects with ease — scalable, stable, and architected the right way.',
  },
];

export default function AgencyPage() {
  const openAgencyContactDialog = useUIStore((s) => s.openAgencyContactDialog);
  const isMobile = useIsMobile();
  
  // State for "What I Do Best" section
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  
  // State for "Advanced Capabilities" section
  const [activeAdvancedService, setActiveAdvancedService] = useState<ServiceItem | null>(null);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      openAgencyContactDialog();
    }
  };

  // Helper function to create slug from service title
  const createServiceSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Scroll to a service section
  const scrollToService = (serviceTitle: string) => {
    const slug = createServiceSlug(serviceTitle);
    const element = document.getElementById(`service-${slug}`);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const openService = (service: ServiceItem) => {
    setActiveService(service);
    setIsServiceModalOpen(true);
  };

  const openAdvancedService = (service: ServiceItem) => {
    setActiveAdvancedService(service);
    setIsAdvancedModalOpen(true);
  };

  // Split "What I Do Best" data using priority
  const whatIDoBestFeatured = whatIDoBest.find(s => s.priority === 'featured') || whatIDoBest[0];
  const whatIDoBestSecondary = whatIDoBest.filter(s => s.priority === 'secondary');
  const whatIDoBestRest = whatIDoBest.filter(s => s.priority === 'default' || !s.priority);

  // Split "Advanced Capabilities" data using priority
  const advancedFeatured = skillSetAboveAndBeyond.find(s => s.priority === 'featured') || skillSetAboveAndBeyond[0];
  const advancedSecondary = skillSetAboveAndBeyond.filter(s => s.priority === 'secondary');
  const advancedRest = skillSetAboveAndBeyond.filter(s => s.priority === 'default' || !s.priority);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContentHeroExtended
        className="!pt-0"
        size="small"
        title="Your agency's Senior Engineer. On demand."
        titleHighlight={['Senior Engineer', 'On demand']}
        content1="High-impact engineering for agencies that need extra support. Pixel-precise themes, powerful Shopify features, and full Next.js systems — delivered on time, every time."
        content2="Minimal onboarding. With yeara of agency experience, I can seamlessly integrate with your team, handle client communication, and manage  multiple projects."
        content3="If you need a senior engineer who can step in, work independently, and strengthen your team's output, I'm a solid fit."
        buttonText1="Add Senior Support to Your Pipeline"
        image="/images/luke/luke-poly.jpg"
        imageAlt="Luke Hertzler"
        badgeLabels={heroBadges}
        serviceList={serviceList}
        onButton1Click={openAgencyContactDialog}
        onButton2Click={openAgencyContactDialog}
      />

      <QuickFactsSection facts={quickFacts} />

      <ContentBlock 
        className="!pt-6 !pb-10"
        contentClassName="max-w-5xl"  
        title="Why Agencies Love Working With Me" 
        titleHighlight={['Agencies', 'Love']}
        textClassName="max-w-4xl"
        content={[{ text: 'I bring over a decade of Shopify expertise, agency experience, rapid turnarounds, and pixel-perfect execution to every partnership.' }]} 
      />

      <div className="flex flex-wrap justify-center gap-4 mb-20">
        <Button onClick={openAgencyContactDialog} size="lg" className="font-mono">
        Work With Me
        </Button>
      </div>

      {/* Why Agencies Partner With Me Section */}
      <section className="" data-component="WhyAgenciesPartnerWithMe" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
    
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAgenciesPartnerWithMe.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                  transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col" data-component="WhyAgenciesPartnerCard" data-file="app/agency/page.tsx">
                    <CardHeader className="pb-2">
                      <div className="flex gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="">
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      <ContentBlock 
        className="!pb-10"
        contentClassName="max-w-5xl"  
        title="Seamless Integration With Your Team" 
        titleHighlight={['Integration', 'Team']}
        textClassName="max-w-4xl"
        content={[{ text: 'I bring over a decade of Shopify expertise, agency experience, rapid turnarounds, and pixel-perfect execution to every partnership.' }]} 
      />

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <Button onClick={openAgencyContactDialog} size="lg" className="font-mono">
          Strengthen Your Team
        </Button>
      </div>

      {/* Why Agencies Partner With Me Section */}
      <section className="" data-component="WhyAgenciesPartnerWithMe" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
    
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seamlessIntegrationWithYourTeam.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                  transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col" data-component="WhyAgenciesPartnerCard" data-file="app/agency/page.tsx">
                    <CardHeader className="pb-2">
                      <div className="flex gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="">
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Pitch Section */}
      <section className="py-16" data-component="ThePitch" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="max-w-4xl w-full mx-auto"
          >
            <Card className="gradient-overlay" data-component="ThePitchCard" data-file="app/agency/page.tsx">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left Column - Image */}
                  <div className="w-full md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src="/images/luke/luke-techaron.jpg"
                      alt="Luke Hertzler"
                      fill
                      className="object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                    />
                  </div>
                  
                  {/* Right Column - Content */}
                  <div className="w-full md:w-2/3 p-8 md:p-12">
                    <p className="text-lg text-muted-foreground mb-2">Ready to chat?</p>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Elite Experience  & Agency-Ready.</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      If you need a senior engineer you can trust with high-value client work — theme builds, custom features, migrations, or full-stack systems — I slot in fast and deliver.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Clear communication, clean handoffs, and reliable execution every step of the way.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-6">
                      <Button onClick={openAgencyContactDialog} size="lg" className="font-mono">
                        Strengthen Your Team
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <ContentBlock 
        className="!py-0"
        contentClassName="max-w-5xl"  
        title="Learn More About My Services" 
        titleHighlight={['Services']}
        textClassName="max-w-4xl"
      />

      {/* Quick nav links to jump to each service section. Display each service section in a default badge and on click the window will scroll to that service section. */}
      <section className="py-8" data-component="ServiceQuickNav" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
          >
            {[...whatIDoBest, ...skillSetAboveAndBeyond].map((service, index) => (
              <button
                key={service.title}
                onClick={() => scrollToService(service.title)}
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:bg-primary/20 hover:scale-105 active:scale-95 cursor-pointer w-fit"
                data-cursor="tap"
              >
                {service.title}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What I Do Best Section */}
      <section className="py-16" data-component="WhatIDoBest" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          {/* Tier A - Featured */}
          <FeaturedServiceCard 
            service={whatIDoBestFeatured} 
            onOpen={openService}
            onStartProject={openAgencyContactDialog}
          />
          
          {/* Tier B - Secondary */}
          {whatIDoBestSecondary.length > 0 && (
            <SecondaryServiceRow 
              services={whatIDoBestSecondary} 
              onOpen={openService}
            />
          )}
          
          {/* Tier C - Grid */}
          {whatIDoBestRest.length > 0 && (
            <ServiceGrid 
              services={whatIDoBestRest} 
              onOpen={openService}
            />
          )}
        </div>
      </section>

      {/* Service Details Modal */}
      <ServiceDetailsModal
        open={isServiceModalOpen}
        onOpenChange={setIsServiceModalOpen}
        service={activeService}
        onStartProject={openAgencyContactDialog}
      />

      {/* Skill Set — Above And Beyond Section */}
      <section className="py-16" data-component="SkillSetAboveAndBeyond" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Extended Capabilities — Beyond Theme Work</h2>
          </motion.div>
          
          {/* Tier A - Featured */}
          <FeaturedServiceCard 
            service={advancedFeatured} 
            onOpen={openAdvancedService}
            onStartProject={openAgencyContactDialog}
          />
          
          {/* Tier B - Secondary */}
          {advancedSecondary.length > 0 && (
            <SecondaryServiceRow 
              services={advancedSecondary} 
              onOpen={openAdvancedService}
            />
          )}
          
          {/* Tier C - Grid */}
          {advancedRest.length > 0 && (
            <ServiceGrid 
              services={advancedRest} 
              onOpen={openAdvancedService}
            />
          )}
        </div>
      </section>

      {/* Advanced Capabilities Modal */}
      <ServiceDetailsModal
        open={isAdvancedModalOpen}
        onOpenChange={setIsAdvancedModalOpen}
        service={activeAdvancedService}
        onStartProject={openAgencyContactDialog}
      />


      {/* What I Don't Do Section */}
      <section className="py-16" data-component="WhatIDontDo" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Don't Do</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {whatIDontDo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col bg-destructive/10 border border-destructive/20" data-component="WhatIDontDoCard" data-file="app/agency/page.tsx">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl pb-4 flex items-center gap-2">
                      <CircleOff className="h-5 w-5" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 md:pt-12" data-component="FinalCTASection" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="text-center"
          >
            <Card className="gradient-overlay" data-component="FinalCTACard" data-file="app/agency/page.tsx">
              <CardContent className="p-12 md:p-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Let's talk about partnering.
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Get a reliable senior engineer your team can throw work at confidently.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Button onClick={openAgencyContactDialog} size="lg" className="font-mono">
                    Let's Talk
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
