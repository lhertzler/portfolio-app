import { ServiceItem } from '@/components/services/featured-service-card';
import { 
  Palette, 
  ArrowRightLeft, 
  Wrench, 
  Users, 
  MessageSquare,
  Code,
  Repeat,
  Plug,
  Layers,
  Rocket,
  FileCode
} from 'lucide-react';

export const whatIDoBest: ServiceItem[] = [
    {
      title: 'Custom Shopify Themes',
      icon: Palette,
      priority: 'featured' as const,
      graphicType: 'shopify-theme',
      description: {
        full:
          'For more than a decade, I’ve built Shopify themes of every size — from lean startup builds to complex, branded storefronts. Clean, scalable, and launch-ready code delivered on schedule.',
        short:
          "With 10+ years of experience, I’ll deliver any Shopify theme, no matter the complexity.",
      },
      badgeLabels: [
        'Enterprise',
        'Pixel-perfect',
        'Fast Delivery',
        'Stable',
        'Clean Code',
        'Launch-Ready',
        'QA-Friendly',
        'Designer-Approved',
      ],
      benefits: [
        'Simple → enterprise-level builds',
        'Exact design implementation',
        'Clean Liquid + JS architecture',
        'Fast, reliable turnaround',
        'Launch-ready and stable',
        'QA-friendly development patterns',
      ],
      note: 'Pixel-perfect, high-quality builds delivered fast and reliably.',
    },
  
    {
      title: 'Migrations To Shopify',
      icon: ArrowRightLeft,
      priority: 'secondary' as const,
      graphicType: 'migration',
      description: {
        full:
          'Full-platform migrations from systems like WooCommerce, Magento, or custom platforms — rebuilt cleanly in Shopify with stable structure, preserved SEO, and zero downtime during transition.',
        short: 'Full migrations to Shopify from any ecommerce platform.',
      },
      badgeLabels: [
        'Audit',
        'Mapping',
        'Migration',
        'Rebuild',
        'SEO-Safe',
        'No Downtime',
        'Testing',
        'Training',
      ],
      benefits: [
        'WooCommerce → Shopify migrations',
        'Magento → Shopify migrations',
        'Custom system migrations',
        'Clean rebuilds with full fidelity',
        'Preserved SEO + URL mapping',
        'Risk-mitigated deployment plans',
      ],
      note: 'Stability-first migrations built to protect structure and SEO.',
    },
  
    {
      title: 'Custom Shopify Features',
      icon: Wrench,
      priority: 'secondary' as const,
      graphicType: 'custom-features',
      description: {
        full:
          'For features that go beyond standard Shopify sections — custom mini-carts, PDP modules, advanced navigation, interactive flows, and tailored UX components that elevate the entire storefront.',
        short: 'Custom features that go beyond standard sections.',
      },
      badgeLabels: [
        'Mini-carts',
        'PDP Modules',
        'Navigation',
        'UX',
        'Interactive',
        'Custom Logic',
        'Reusable',
        'Advanced',
      ],
      benefits: [
        'Custom mini-carts and slide-outs',
        'Advanced PDP modules',
        'Mega menus and advanced nav',
        'Interactive UX components',
        'Reusable section systems',
        'Features apps can’t provide',
      ],
      note: 'High-impact features without needing a full rebuild.',
    },
];

export const skillSetAboveAndBeyond: ServiceItem[] = [
    {
      title: 'Custom Shopify Apps',
      icon: Code,
      priority: 'secondary' as const,
      graphicType: 'custom-apps',
      description: {
        full:
          'Private apps, dashboards, and automation layers that extend Shopify beyond its limits — built with clean architecture, secure APIs, and long-term stability.',
        short: 'Custom Shopify apps for advanced store logic.',
      },
      badgeLabels: [
        'Apps',
        'APIs',
        'Automation',
        'Backend',
        'Secure',
        'Scalable',
        'Full-Stack',
        'Reliable',
      ],
      benefits: [
        'Private & custom app development',
        'Storefront/Admin API integration',
        'Automated workflows & jobs',
        'Custom data models & storage',
        'Scalable, dependable architecture',
        'Production-ready deployments',
      ],
      note: 'End-to-end app development that safely extends Shopify.',
    },
  
    {
      title: 'Recharge Subscription Systems',
      icon: Repeat,
      priority: 'default' as const,
      graphicType: 'recharge',
      description: {
        full:
          'Recharge-powered subscription setups, theme integration, custom UX, and recurring logic built cleanly and aligned with Shopify best practices.',
        short: 'Recharge subscription setup and theme integration.',
      },
      badgeLabels: [
        'Recharge',
        'Subscriptions',
        'Recurring',
        'Custom UX',
        'API-Ready',
        'Stable',
        'Scalable',
        'Shopify',
      ],
      benefits: [
        'Recharge theme integration',
        'Subscription product setup',
        'Custom subscription UX & modals',
        'Recharge API + portal enhancements',
        'Recurring billing logic done right',
        'Upgrade-safe implementation',
      ],
      note: 'Reliable subscription builds backed by real-world Recharge experience.',
    },
  
    {
      title: 'Custom Shopify Integrations',
      icon: Plug,
      priority: 'default' as const,
      graphicType: 'integrations',
      description: {
        full:
          'Seamless integrations with Recharge, Klaviyo, ERPs, CRMs, and third-party APIs — connecting Shopify cleanly to the rest of a brand’s operational stack.',
        short: 'Recharge, Klaviyo, ERP, CRM & API integrations.',
      },
      badgeLabels: [
        'Integrations',
        'APIs',
        'Recharge',
        'Klaviyo',
        'ERP',
        'CRM',
        'Syncing',
        'Stable',
      ],
      benefits: [
        'Recharge subscription integration',
        'Klaviyo flows & event syncing',
        'ERP/CRM data sync pipelines',
        'Custom API connections',
        'Webhook-driven processes',
        'Reliable, upgrade-safe setups',
      ],
      note: 'Clean, stable connections between Shopify and other platforms.',
    },
  
    {
      title: 'React Storefront Features',
      icon: Layers,
      priority: 'default' as const,
      graphicType: 'react-storefront',
      description: {
        full:
          'Rich, interactive React experiences — mini-carts, builders, quizzes, configurators — built with clean state logic and smooth Shopify data flow.',
        short: 'React-driven storefront experiences.',
      },
      badgeLabels: [
        'React',
        'Interactive',
        'Components',
        'Stateful',
        'Modern',
        'Fast',
        'UX',
        'Extensible',
      ],
      benefits: [
        'Dynamic mini-carts & slideouts',
        'Product builders & configurators',
        'Guided quizzes & recommendation flows',
        'Real-time API/data sync',
        'Reusable component systems',
        'High-performance interactions',
      ],
      note: 'Responsive, stable UX built with clean state architecture.',
    },
  
    {
      title: 'Headless Shopify',
      icon: Rocket,
      priority: 'featured' as const,
      graphicType: 'headless',
      description: {
        full:
          'Next.js-powered headless storefronts for premium brands needing performance, flexibility, and full control over the customer experience.',
        short: 'High-performance headless Shopify builds.',
      },
      badgeLabels: [
        'Headless',
        'Next.js',
        'Performance',
        'Custom',
        'Flexible',
        'Modern',
        'Scalable',
        'Premium',
      ],
      benefits: [
        'Ultra-fast storefronts',
        'Reusable design systems',
        'Custom user journeys',
        'Full layout & UX freedom',
        'Production API integration',
        'Stable, scalable architecture',
      ],
      note: 'The best option for high-budget, performance-focused brands.',
    },
  
    {
      title: 'Next.js Applications',
      icon: FileCode,
      priority: 'secondary' as const,
      graphicType: 'nextjs-apps',
      description: {
        full:
          'Dashboards, portals, tools, and internal systems — built with secure auth, polished UX, scalable APIs, and maintainable architecture.',
        short: 'Full-stack Next.js tools, dashboards & apps.',
      },
      badgeLabels: [
        'Next.js',
        'Full-Stack',
        'Auth',
        'Dashboards',
        'Portals',
        'Secure',
        'Polished',
        'APIs',
      ],
      benefits: [
        'Admin dashboards & portals',
        'Secure role-based auth',
        'Multi-step workflows',
        'Internal tools & automation',
        'Data syncing & API integration',
        'Built for long-term maintainability',
      ],
      note: 'You provide the goals — I deliver the complete system.',
    },
];

export const allServices: ServiceItem[] = [
  ...whatIDoBest,
  ...skillSetAboveAndBeyond,
];

