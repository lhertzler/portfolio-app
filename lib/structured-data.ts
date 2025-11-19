/**
 * Structured Data (JSON-LD) Utilities
 * 
 * Provides functions to generate JSON-LD structured data for SEO
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lukehertzler.com';

export interface PersonSchema {
  '@context': string;
  '@type': 'Person';
  name: string;
  jobTitle: string;
  url: string;
  sameAs?: string[];
  description?: string;
  image?: string;
}

export interface OrganizationSchema {
  '@context': string;
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

export interface ProjectSchema {
  '@context': string;
  '@type': 'CreativeWork';
  name: string;
  description: string;
  url: string;
  creator: {
    '@type': 'Person';
    name: string;
  };
  dateCreated?: string;
  keywords?: string[];
  image?: string;
}

export interface ArticleSchema {
  '@context': string;
  '@type': 'Article';
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  image?: string;
  keywords?: string[];
}

/**
 * Generate Person schema for homepage
 */
export function generatePersonSchema(): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luke Hertzler',
    jobTitle: 'Full-Stack Engineer',
    url: siteUrl,
    description: 'Full-Stack Engineer, UI/UX Designer, Musician specializing in Shopify systems and modern web applications.',
    sameAs: [
      // Add social media profiles here if available
      // 'https://github.com/...',
      // 'https://linkedin.com/in/...',
      // 'https://twitter.com/...',
    ],
    image: `${siteUrl}/images/social-share.jpg`,
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luke Hertzler',
    url: siteUrl,
    description: 'Full-Stack Engineering and UI/UX Design Services',
    logo: `${siteUrl}/favicon-32x32.png`,
  };
}

/**
 * Generate Project schema for portfolio pages
 */
export function generateProjectSchema(data: {
  title: string;
  description: string;
  slug: string;
  featuredImage?: string;
  tags?: string[];
  dateCreated?: string;
}): ProjectSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.title,
    description: data.description,
    url: `${siteUrl}/portfolio/${data.slug}`,
    creator: {
      '@type': 'Person',
      name: 'Luke Hertzler',
    },
    dateCreated: data.dateCreated,
    keywords: data.tags,
    image: data.featuredImage ? `${siteUrl}${data.featuredImage}` : undefined,
  };
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(data: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  bannerImage?: string;
  tags?: string[];
}): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: `${siteUrl}/blog/${data.slug}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author || 'Luke Hertzler',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Luke Hertzler',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon-32x32.png`,
      },
    },
    image: data.bannerImage ? `${siteUrl}${data.bannerImage}` : undefined,
    keywords: data.tags,
  };
}

/**
 * Generate Website schema with search action
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Luke Hertzler Portfolio',
    url: siteUrl,
    description: 'Full-Stack Engineer, UI/UX Designer, Musician',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

