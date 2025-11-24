import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lukehertzler.com';
const defaultImage = `${siteUrl}/images/social-share.jpg`;

export const metadata: Metadata = {
  title: 'Headless Shopify with Next.js | Luke Hertzler',
  description: 'Turn your Shopify store into a fast, flexible, custom-engineered Next.js experience. High-performance headless commerce solutions built with intention, polish, and engineering discipline.',
  openGraph: {
    title: 'Headless Shopify with Next.js | Luke Hertzler',
    description: 'Turn your Shopify store into a fast, flexible, custom-engineered Next.js experience. High-performance headless commerce solutions built with intention, polish, and engineering discipline.',
    url: `${siteUrl}/headless-shopify`,
    siteName: 'Luke Hertzler',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'Luke Hertzler - Headless Shopify & Next.js Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Headless Shopify with Next.js | Luke Hertzler',
    description: 'Turn your Shopify store into a fast, flexible, custom-engineered Next.js experience. High-performance headless commerce solutions built with intention, polish, and engineering discipline.',
    images: [defaultImage],
    creator: '@lukehertzler',
  },
};

export default function HeadlessShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

