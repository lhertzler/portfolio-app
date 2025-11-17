export type Project = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  tags: string[];
  tech: string[];
  featured: boolean;
  description: string;
  caseStudySections?: {
    overview?: string;
    architecture?: string;
    uiux?: string;
    challenges?: string;
    impact?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'soundvent',
    title: 'SoundVent',
    role: 'Founder & Lead Engineer',
    summary: 'Music collaboration platform built with Next.js and Supabase',
    tags: ['SaaS', 'Music', 'Real-time'],
    tech: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL', 'RLS'],
    featured: true,
    description: 'A platform for musicians to collaborate, share tracks, and build communities.',
    caseStudySections: {
      overview: 'SoundVent is a music collaboration platform that enables artists to share work-in-progress tracks, get feedback, and collaborate in real-time.',
      architecture: 'Built with Next.js App Router, Supabase for backend, and Stripe for payments. Uses Row Level Security (RLS) for data isolation.',
      uiux: 'Clean, minimal interface focused on the music. Real-time updates using Supabase subscriptions.',
      challenges: 'Implementing secure file uploads, real-time synchronization, and payment processing.',
      impact: 'Enabled seamless collaboration for musicians worldwide.',
    },
  },
  {
    slug: 'dwarven-forge',
    title: 'Dwarven Forge',
    role: 'Full-Stack Developer',
    summary: 'E-commerce platform for tabletop gaming accessories',
    tags: ['E-commerce', 'Shopify'],
    tech: ['Shopify', 'Liquid', 'JavaScript', 'Printful'],
    featured: true,
    description: 'Custom Shopify theme and integrations for a tabletop gaming accessories store.',
    caseStudySections: {
      overview: 'Custom Shopify store with integrated print-on-demand fulfillment.',
      architecture: 'Shopify theme development with custom Liquid templates and Printful API integration.',
      uiux: 'Gaming-themed design with intuitive product browsing and checkout flow.',
      challenges: 'Integrating Printful API, managing inventory sync, and optimizing for mobile.',
      impact: 'Streamlined operations and improved conversion rates.',
    },
  },
  {
    slug: 'portfolio-site',
    title: 'Portfolio Site',
    role: 'Solo Developer',
    summary: 'This very portfolio site showcasing modern React/Next.js skills',
    tags: ['Portfolio', 'Next.js'],
    tech: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Zustand'],
    featured: false,
    description: 'A modern portfolio site built with Next.js App Router, featuring persistent audio player, dev tools, and smooth animations.',
  },
];

