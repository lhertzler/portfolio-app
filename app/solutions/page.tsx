'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useUIStore } from '@/store/ui-store';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useIsMobile } from '@/lib/use-is-mobile';

const solutions = [
  {
    title: 'Custom Shopify Themes',
    description: 'Beautiful, fast, and built with intention. Your storefront is designed and engineered from the ground up to reflect your brand and perform across all devices.',
    services: [
      'Full custom theme design & development',
      'Migrations to Online Store 2.0',
      'UX improvements & conversion refinements',
      'Accessibility & SEO enhancements',
      'Mobile-first architecture',
    ],
    cta: 'Start a Shopify Theme Project',
  },
  {
    title: 'Custom Shopify Apps & Commerce Systems',
    description: 'When your brand outgrows off-the-shelf plugins, bespoke apps unlock new capabilities. I build private, secure, scalable apps tailored to your operations and business logic.',
    services: [
      'Private Shopify app development',
      'Warehouse & inventory workflows',
      'Fulfillment & operations automation',
      'Shopify Functions development',
      'ERP, CRM, 3PL integrations',
      'Custom API development',
    ],
    cta: 'Start a Shopify App Project',
  },
  {
    title: 'Headless Shopify with Next.js',
    description: 'A modern decoupled commerce stack for unmatched speed, flexibility, and creative freedom. Fully custom storefronts engineered with Next.js, React, and Shopify\'s Storefront API.',
    services: [
      'Headless architecture & planning',
      'Custom carts, product pages, and experiences',
      'CMS and content modeling',
      'Middleware & API orchestration',
      'Performance optimization',
      'Vercel deployments',
    ],
    cta: 'Start a Headless Project',
  },
  {
    title: 'Next.js Applications & Internal Tools',
    description: 'Full-stack web applications designed for real business needs — customer portals, admin systems, dashboards, and tools that power your operations.',
    services: [
      'Next.js + Supabase applications',
      'Customer dashboards & portals',
      'Internal workflows and automation',
      'Database design & implementation',
      'Reporting & analytics systems',
      'Authentication & authorization',
    ],
    cta: 'Start an Application Project',
  },
];

const whyWorkWithMe = [
  {
    title: 'Precision Engineering',
    description: 'Every system is designed with intentional architecture, thoughtful UX, and clean, maintainable code.',
  },
  {
    title: 'End-to-End Ownership',
    description: 'From strategy and design to development and launch — one partner, one vision, no hand-offs.',
  },
  {
    title: 'Commerce-Native Expertise',
    description: 'Over a decade building for Shopify merchants, product teams, and brands who take growth seriously.',
  },
];

const processSteps = [
  {
    step: '1',
    title: 'Discovery & Strategy',
    description: 'We define goals, requirements, architecture, and timelines with complete clarity.',
  },
  {
    step: '2',
    title: 'Design & Planning',
    description: 'Flows, UI, system diagrams, database models, and technical specifications.',
  },
  {
    step: '3',
    title: 'Build & Integrate',
    description: 'Modern engineering using Next.js, Shopify, Supabase, and clean architectural patterns.',
  },
  {
    step: '4',
    title: 'Test & Launch',
    description: 'QA, performance checks, deployments, and final polish.',
  },
  {
    step: '5',
    title: 'Ongoing Support',
    description: 'Improvements, extensions, and long-term maintenance.',
  },
];

const caseStudies = [
  {
    title: 'SoundVent',
    summary: 'A full-scale social platform designed and built from scratch using Next.js, Supabase, real-time listeners, and custom UI systems.',
    built: [
      'Complete architecture',
      'Real-time messaging',
      'Follower system',
      'Media manager',
      'Social posting',
      'Spotify integration',
      'Analytics dashboards',
    ],
    result: 'A scalable platform blending social networking, streaming, and commerce.',
  },
  {
    title: 'Dwarven Forge Shopify Ecosystem',
    summary: 'Long-term engineering partner for a Shopify Plus brand with complex product logic, large catalogs, and demanding performance needs.',
    built: [
      'A custom Next.js + Algolia search application — a standalone micro-app integrated into Shopify with instant search results, advanced filtering, Tailwind UI, and a Supabase-powered syncing layer',
      'Theme rebuilds with refined UX',
      'Performance optimization across the storefront',
      'Advanced SKU and bundle logic',
    ],
    result: 'A faster, smarter, and more scalable shopping experience — with a modern search system that dramatically improves product discovery and conversion.',
  },
  {
    title: 'Custom Internal Tools',
    summary: 'A suite of custom internal tools built for operational teams needing workflow automation.',
    built: [
      'React dashboards',
      'Inventory & warehouse tools',
      'Database architecture',
      'API integrations',
    ],
    result: 'Major productivity gains and reduced manual workload.',
  },
];

const faqs = [
  {
    question: 'How soon can we start?',
    answer: 'Typically within 1–2 weeks depending on schedule.',
  },
  {
    question: 'What does a typical project cost?',
    answer: 'Most projects begin at $15k, with advanced themes, apps, and headless builds ranging $20k–$70k+.',
  },
  {
    question: 'Do you work with early-stage founders?',
    answer: 'Yes — as long as there is clear direction and appropriate budget.',
  },
  {
    question: 'Do you handle design as well as development?',
    answer: 'Yes. I design and build everything end-to-end.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes. Retainers and maintenance options are available.',
  },
];

export default function SolutionsPage() {
  const openContactDialog = useUIStore((s) => s.openContactDialog);
  const isMobile = useIsMobile();

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24" data-component="SolutionsHero" data-file="app/solutions/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Practical, scalable solutions for teams who want <span className="text-primary">world-class engineering</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Custom Shopify systems, private apps, and modern web applications — crafted with precision, clarity, and long-term reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={scrollToContact} size="lg" className="font-mono">
                Start a Project
              </Button>
              <Button onClick={scrollToContact} variant="outline" size="lg" className="font-mono">
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16" data-component="SolutionsGrid" data-file="app/solutions/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
                className="min-w-0 w-full"
              >
                <Card className="h-full flex flex-col min-w-0 overflow-hidden" data-component="SolutionCard" data-file="app/solutions/page.tsx">
                  <CardHeader className="min-w-0">
                    <CardTitle className="text-xl sm:text-2xl mb-3 break-words">{solution.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col min-w-0">
                    <ul className="space-y-2 mb-6 flex-1 min-w-0">
                      {solution.services.map((service) => (
                        <li key={service} className="flex items-start gap-2 min-w-0">
                          <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground break-words">{service}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={scrollToContact}
                      variant="outline"
                      className="w-full justify-between group"
                    >
                      {solution.cta}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-16" data-component="WhyWorkWithMe" data-file="app/solutions/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <Card className="gradient-overlay" data-component="WhyWorkWithMeCard" data-file="app/solutions/page.tsx">
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {whyWorkWithMe.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex flex-col ${
                    index < whyWorkWithMe.length - 1
                      ? 'md:after:content-[""] md:after:absolute md:after:right-[-1rem] md:after:top-6 md:after:bottom-6 md:after:w-px md:after:bg-border'
                      : ''
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-3 text-primary font-mono">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16" data-component="ProcessSection" data-file="app/solutions/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Process</h2>
            <p className="text-muted-foreground text-lg">A clear, structured approach to building exceptional systems.</p>
          </motion.div>
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: '-50px' }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
              >
                <Card data-component="ProcessStepCard" data-file="app/solutions/page.tsx">
                  <CardContent className="p-6">
                    <div className="flex gap-6 items-start">
                      <Badge variant="default" className="text-lg font-mono px-4 py-2 shrink-0">
                        {step.step}
                      </Badge>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-16" data-component="CaseStudiesSection" data-file="app/solutions/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
            <p className="text-muted-foreground text-lg">Real projects, real results.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col" data-component="CaseStudyCard" data-file="app/solutions/page.tsx">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{study.title}</CardTitle>
                    <CardDescription>{study.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2 text-primary">What I Built:</p>
                      <ul className="space-y-1">
                        {study.built.map((item) => (
                          <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto pt-4 border-t border-border">
                      <p className="text-sm font-semibold mb-1">Result:</p>
                      <p className="text-sm text-muted-foreground">{study.result}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" data-component="FAQSection" data-file="app/solutions/page.tsx">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQ</h2>
            <p className="text-muted-foreground text-lg">Common questions about working together.</p>
          </motion.div>
          <Accordion type="single" collapsible className="w-full" data-component="FAQAccordion" data-file="app/solutions/page.tsx">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24" data-component="FinalCTASection" data-file="app/solutions/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="text-center"
          >
            <Card className="gradient-overlay" data-component="FinalCTACard" data-file="app/solutions/page.tsx">
              <CardContent className="p-12 md:p-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to build something exceptional?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  If you're looking for premium Shopify or Next.js development with a focus on clarity, performance, and long-term reliability — let's talk.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Button onClick={scrollToContact} size="lg" className="font-mono">
                    Start a Project
                  </Button>
                  <Button onClick={scrollToContact} variant="outline" size="lg" className="font-mono">
                    Book a Consultation
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Typical engagements begin at $15k.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

