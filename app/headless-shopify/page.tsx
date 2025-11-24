'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUIStore } from '@/store/ui-store';
import { motion } from 'framer-motion';
import { Check, Zap, Palette, Search, Smartphone, Puzzle, Infinity } from 'lucide-react';
import { useIsMobile } from '@/lib/use-is-mobile';

const whyGoHeadless = [
  {
    icon: Zap,
    title: 'Stupid-fast page loads',
    description: 'Next.js + an optimized API layer means no more sluggish themes, liquid bottlenecks, or slow third-party scripts.',
  },
  {
    icon: Palette,
    title: '100% custom UI — no theme limitations',
    description: 'If you can dream it in Figma, I can build the real thing. No fighting Dawn, no hacking around Shopify\'s templating system.',
  },
  {
    icon: Search,
    title: 'Better SEO + crawl speeds',
    description: 'Next.js static rendering + server components means a cleaner structure that Google absolutely eats up.',
  },
  {
    icon: Smartphone,
    title: 'A seamless UX across devices',
    description: 'Headless lets you design for mobile exactly the way your users deserve — not whatever constraints the theme imposes.',
  },
  {
    icon: Puzzle,
    title: 'Integrations become effortless',
    description: 'Algolia search, personalized product feeds, dynamic bundles, real-time recommendations… headless turns "hard" into "straightforward."',
  },
  {
    icon: Infinity,
    title: 'Future-proof architecture',
    description: 'Once your data sits in Shopify and your UI layer sits in Next.js, you can evolve, test, and iterate without wrecking your live store.',
  },
];

const myApproach = [
  {
    title: 'Pixel-perfect execution',
    description: 'Layouts that match the design exactly. Interactions that feel intentional. Zero jank, zero bloat.',
  },
  {
    title: 'Smart architecture',
    description: 'A clean, scalable codebase that holds up as your catalog, traffic, and team grow.',
  },
  {
    title: 'Fully custom components',
    description: 'Reusable product cards, layouts, carousels, PDP modules, bundles, quick-add, checkout integrations — your store becomes a polished system, not a pile of ad-hoc changes.',
  },
  {
    title: 'Performance as a first-class citizen',
    description: 'I obsess over Core Web Vitals, API latency, render cost, and real-world metrics. Your store will feel f*cking fast.',
  },
  {
    title: 'A collaborative build process',
    description: 'Founders, designers, marketing teams — everyone gets what they need, without friction.',
  },
];

const whatIBuild = [
  {
    title: 'Custom Next.js Storefront',
    description: 'Fast, responsive, component-driven. This becomes the heart of your conversion engine.',
  },
  {
    title: 'Shopify Storefront API Integration',
    description: 'Carts, products, collections, customer accounts — wired into a clean data layer.',
  },
  {
    title: 'Custom UX Systems',
    description: 'Product discovery, filtering, quick add, bundles, variant logic, and all the polish your brand deserves.',
  },
  {
    title: 'Third-Party Integrations',
    description: 'Algolia, Klaviyo, reviews, subscriptions, loyalty, Shopify Functions, and anything else you rely on.',
  },
  {
    title: 'Infrastructure Setup',
    description: 'Vercel deployments, CI/CD, caching, environment management — the boring stuff done right.',
  },
  {
    title: 'Analytics + Performance Tuning',
    description: 'Track what matters. Improve continuously. Scale intentionally.',
  },
];

const whyBrandsWorkWithMe = [
  {
    title: 'I\'m not another "Shopify freelancer."',
    description: 'I architect, design, and build systems that are clean, fast, and maintainable — the kind of work that sets the stage for real growth.',
  },
  {
    title: 'Proven track record',
    description: 'I\'ve built stores for brands like Yale, August, Levi Strauss, and more. I\'ve worked inside teams that care deeply about craft, and I bring that same level of detail into every new build.',
  },
  {
    title: 'If your brand is leveling up — your tech should too.',
    description: 'A decade-plus of building custom Shopify experiences — storefronts, apps, backend tooling, advanced UX flows, and high-growth architectures.',
  },
];

export default function HeadlessShopifyPage() {
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
      <section className="py-16 md:py-24 md:pt-12" data-component="HeadlessShopifyHero" data-file="app/headless-shopify/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Turn your Shopify store into a fast, flexible, <span className="text-primary">custom-engineered Next.js experience</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              You've outgrown "theme tweaks." You're ready for something faster, more powerful, and built exactly around how your customers shop. A fully headless Shopify setup gives you the speed, freedom, and creative control that standard Shopify themes just can't compete with — and that's where I come in.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl">
              I build high-performance, custom Next.js storefronts that plug directly into Shopify, designed with the same level of intention, polish, and engineering discipline you'd expect from a top-tier product team.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={scrollToContact} size="lg" className="font-mono">
                Start a Headless Build
              </Button>
              <Button onClick={scrollToContact} variant="outline" size="lg" className="font-mono">
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Go Headless Section */}
      <section className="py-16" data-component="WhyGoHeadless" data-file="app/headless-shopify/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Go Headless?</h2>
            <p className="text-muted-foreground text-lg">A better storefront, engineered from the ground up.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyGoHeadless.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                  transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="h-full flex flex-col" data-component="WhyGoHeadlessCard" data-file="app/headless-shopify/page.tsx">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Approach Section */}
      <section className="py-16" data-component="MyApproach" data-file="app/headless-shopify/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Approach</h2>
            <p className="text-muted-foreground text-lg">This isn't a "theme rebuild." It's craftsmanship.</p>
            <p className="text-muted-foreground text-base mt-2 max-w-2xl">
              I've spent more than a decade building custom Shopify experiences — storefronts, apps, backend tooling, advanced UX flows, and high-growth architectures. With headless, the entire toolbox opens up.
            </p>
            <p className="text-muted-foreground text-base mt-2 max-w-2xl font-semibold">
              What you get with me:
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {myApproach.map((item, index) => (
              <motion.div
                key={item.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col" data-component="MyApproachCard" data-file="app/headless-shopify/page.tsx">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
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

      {/* What I Build Section */}
      <section className="py-16" data-component="WhatIBuild" data-file="app/headless-shopify/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Build</h2>
            <p className="text-muted-foreground text-lg">A modern commerce engine, crafted for growth.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIBuild.map((item, index) => (
              <motion.div
                key={item.title}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={isMobile ? undefined : { once: true, margin: '-100px' }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full flex flex-col" data-component="WhatIBuildCard" data-file="app/headless-shopify/page.tsx">
                  <CardHeader>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
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

      {/* Why Brands Work With Me Section */}
      <section className="py-16" data-component="WhyBrandsWorkWithMe" data-file="app/headless-shopify/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Brands Work With Me</h2>
            <p className="text-muted-foreground text-lg">Because you need someone who can think like a full team.</p>
          </motion.div>
          <Card className="gradient-overlay" data-component="WhyBrandsWorkWithMeCard" data-file="app/headless-shopify/page.tsx">
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {whyBrandsWorkWithMe.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative flex flex-col ${
                    index < whyBrandsWorkWithMe.length - 1
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

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 md:pt-12" data-component="FinalCTASection" data-file="app/headless-shopify/page.tsx">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={isMobile ? undefined : { once: true }}
            transition={isMobile ? undefined : { duration: 0.6 }}
            className="text-center"
          >
            <Card className="gradient-overlay" data-component="FinalCTACard" data-file="app/headless-shopify/page.tsx">
              <CardContent className="p-12 md:p-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Let's Build Your Headless Store
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you're migrating from an existing theme or starting fresh, I can help you turn your Shopify store into a modern, high-performing Next.js application.
                </p>
                <div className="mb-8 max-w-2xl mx-auto">
                  <p className="text-base text-muted-foreground mb-4">You'll get:</p>
                  <ul className="text-left space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>A storefront that feels premium, not templated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>A UI that matches your brand identity, exactly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>A system you can grow with for years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>Code built with the same discipline as a real product team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span>A partner who actually gives a shit about details</span>
                    </li>
                  </ul>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's build something that feels modern, powerful, and actually worth showing off.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <Button onClick={scrollToContact} size="lg" className="font-mono">
                    Start a Headless Build
                  </Button>
                  <Button onClick={scrollToContact} variant="outline" size="lg" className="font-mono">
                    Book a Consultation
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Ready to explore a headless build? Let's start the conversation.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
