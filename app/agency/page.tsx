'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUIStore } from '@/store/ui-store';
import { motion } from 'framer-motion';
import { Wrench, Rocket, Handshake, Zap, Palette, Trophy, Sparkles, CircleOff } from 'lucide-react';
import { useIsMobile } from '@/lib/use-is-mobile';
import { useState } from 'react';
import { FeaturedServiceCard, ServiceItem } from '@/components/services/featured-service-card';
import { SecondaryServiceRow } from '@/components/services/secondary-service-row';
import { ServiceGrid } from '@/components/services/service-grid';
import { ServiceDetailsModal } from '@/components/services/service-details-modal';
import { whatIDoBest, skillSetAboveAndBeyond } from '@/lib/agency-services';
import { ContentHero } from '@/components/main-content/hero';

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
    icon: Wrench,
    title: 'Over A Decade of Shopify Development Experience',
    description: 'Years of experience across custom themes, complex builds, and high-stakes launches — reliability your agency can count on.'
  },
  {
    icon: Rocket,
    title: 'Former Full-Time In-House Agency Shopify Engineer',
    description: 'I know the ins-and-outs of day-to-day agency life — having worked at top Shopify agencies Sleepless Media and eHouse Studios.'
  },
  {
    icon: Handshake,
    title: 'Clear & Collaborative Client Communication',
    description: 'I\'m comfortable working directly with clients and representing your agency professionally — clear, calm, and collaborative.',
  },
  {
    icon: Zap,
    title: 'Rapid Turnarounds And Flawless Code Quality',
    description: 'I build fast. Very fast — My workflow is proven to consistently deliver high-quality code at a pace you won\'t believe.',
  },
  {
    icon: Palette,
    title: 'Loved by Designers, QA Teams, and Clients',
    description: 'As a UI/UX designer myself, it bugs me until the code matches the designs exactly. I won\'t stop until it\'s pixel-perfect.'
  },
  {
    icon: Trophy,
    title: 'Recognized As A Top 0.2% Shopify Developer',
    description: 'Being selected as a Shopify Expert by Storetasker means my skillset was recognized as being among the top 0.2% of my peers.'
  },
];

export default function AgencyPage() {
  const openContactDialog = useUIStore((s) => s.openContactDialog);
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
      openContactDialog();
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
      <ContentHero
        size="small"
        title="Your agency's Senior Engineer— On demand"
        titleHighlight={['Senior Engineer']}
        content1="10+ years Shopify & Next.js expereience. I build pixel-perfect themes, complex apps, and full Next.js systems that ship on time — every time."
        content2="Minimal onboarding. With yeara of agency experience, I can seamlessly integrate with your team, handle client communication, and manage  multiple projects."
        content3="If you need a senior engineer who can step in, work independently, and strengthen your team's output, I'm a solid fit."
        buttonText1="Start a Project"
        buttonText2="Book a Call"
        image="/images/luke/luke-poly.jpg"
        imageAlt="Luke Hertzler"
        badgeLabels={heroBadges}
        onButton1Click={scrollToContact}
        onButton2Click={scrollToContact}
      />

      {/* What I Do Best Section */}
      <section className="" data-component="WhatIDoBest" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            {/* Terminal Window */}
            <div className="mx-auto max-w-5xl rounded-lg overflow-hidden border border-[#30363d] shadow-2xl bg-[#0d1117]">
              {/* Terminal Header Bar */}
              <div className="px-4 py-3 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="text-[#8b949e] text-xs ml-2 font-mono">terminal — luke@portfolio</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-2 items-start">
                    <span className="text-[#6e7681] shrink-0 font-mono text-sm">$</span>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#c9d1d9] mb-3 leading-tight">
                        Some of the Things I Do Best
                      </h2>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2 items-start">
                    <span className="text-[#6e7681] shrink-0 font-mono text-sm">$</span>
                    <div className="flex-1">
                      <p className="text-sm md:text-base text-[#8b949e] mb-3">Available services:</p>
                      <div className="space-y-1.5 pl-4">
                        {whatIDoBest.map((service, index) => (
                          <button
                            key={service.title}
                            onClick={() => scrollToService(service.title)}
                            className="block text-left text-sm md:text-base text-[#58a6ff] hover:text-[#79c0ff] hover:underline transition-colors font-mono group"
                            data-cursor="tap"
                          >
                            <span className="text-[#6e7681] group-hover:text-[#8b949e]">→</span>{' '}
                            {service.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terminal Prompt */}
                <div className="flex gap-2 items-center pt-2">
                  <span className="text-[#58a6ff] shrink-0 font-mono text-sm">luke@portfolio:~$</span>
                  <span className="text-[#6e7681] font-mono text-sm animate-pulse">▋</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Tier A - Featured */}
          <FeaturedServiceCard 
            service={whatIDoBestFeatured} 
            onOpen={openService}
            onStartProject={scrollToContact}
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
        onStartProject={scrollToContact}
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
            onStartProject={scrollToContact}
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
        onStartProject={scrollToContact}
      />

      {/* Why Agencies Partner With Me Section */}
      <section className="py-16" data-component="WhyAgenciesPartnerWithMe" data-file="app/agency/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Why Agencies Partner With Me</h2>
          </motion.div>
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
                    <CardHeader className="text-center">
                      <div className="flex flex-col items-center gap-3 mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


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
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">Elite Experience. Full-Stack Capability. Agency-Ready.</h2>
                    <p className="text-lg text-muted-foreground mb-4">
                      If you need a senior engineer you can trust with high-value client work — themes, apps, or full-stack systems — I can step in quickly and deliver.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Clear communication, steady execution, and reliable delivery from day one.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
                  <Button onClick={scrollToContact} size="lg" className="font-mono">
                    Start a Project
                  </Button>
                  <Button onClick={scrollToContact} variant="outline" size="lg" className="font-mono">
                    Book a Call
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
