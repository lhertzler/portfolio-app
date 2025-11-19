/**
 * Blog Post Data Structure
 * 
 * To add a new blog post:
 * 1. Add a new object to the blogPosts array below
 * 2. Set published: true to make it visible
 * 3. Set featured: true to highlight it on the homepage (optional)
 * 4. Use HTML in the content field for formatting
 * 5. The slug will be used in the URL: /blog/[slug]
 * 
 * Example:
 * {
 *   slug: 'my-new-post',
 *   title: 'My New Post Title',
 *   description: 'A brief description of the post',
 *   date: '2024-01-15',
 *   readTime: '5 min',
 *   category: 'Development',
 *   published: true,
 *   featured: false,
 *   tags: ['nextjs', 'shopify'],
 *   author: 'Luke Hertzler',
 *   content: '<p>Your HTML content here...</p>'
 * }
 */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  published: boolean;
  content: string; // HTML content - use <p>, <h2>, <h3>, <ul>, <li>, <code>, <pre>, etc.
  tags?: string[];
  author?: string;
  featured?: boolean;
  bannerImage?: string; // Path to banner image (e.g., '/images/blogs/image.png')
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-i-built-10-apps-in-5-months-and-launched-soundvent',
    title: 'How I Built 10 Apps in 5 Months — And Launched SoundVent',
    description: 'The technical journey behind building SoundVent — a unified music platform that pushed me harder than anything I\'ve done in my career.',
    date: '2024-12-20',
    readTime: '12 min',
    category: 'Development',
    published: true,
    featured: true,
    tags: ['nextjs', 'supabase', 'react', 'soundvent', 'full-stack'],
    author: 'Luke Hertzler',
    bannerImage: '/images/blogs/SV-Laptop-Front.png',
    content: `<p>Today is a milestone I'll never forget:</p><p><strong>SoundVent Beta is officially LIVE.</strong></p><p>It's the most ambitious software project I've ever built — and the most meaningful.</p><p>A music platform built <em>by artists, for artists</em>, where music, video, social networking, messaging, merch, events, and community finally live together in one place.</p><p>But behind the polished UI and clean interface is a technical journey that pushed me harder than anything I've done in my career.</p><p>This is that story.</p><hr><h2><strong>A Vision 10 Years in the Making</strong></h2><p>Ten years ago, SoundVent started as an idea Anthony Garay brought to me — a vision for a unified music platform that didn't exist yet. I believed in the idea instantly, but the tools just weren't there.</p><p>Fast-forward a decade.</p><p>The tech had evolved.</p><p>And so had I.</p><p>I had spent years building large-scale Shopify ecosystems, solving performance problems, architecting backend systems, and designing UX for high-volume stores. But ironically, when it came time to build SoundVent again, I realized the stack I knew best — Shopify + apps + theme development — <strong>couldn't come close</strong> to supporting the scope of what we wanted.</p><p>SoundVent wasn't a store — It wasn't a blog — It wasn't a media player — It wasn't a social feed.</p><p>It was <strong>all of those things at once.</strong></p><p>So the only way forward… was starting over.</p><hr><h2><strong>The Honest Truth: When I Started, I Barely Knew React</strong></h2><p>This might surprise people.</p><p>Five months ago, I knew <strong>just enough React to get by</strong>.</p><p>Component basics. State. Props. Some hooks. Nothing too complex.</p><p>But I didn't know:</p><p></p><ul><li><p>Next.js deeply</p></li><li><p>Server components</p></li><li><p>Suspense</p></li><li><p>Complex client-side state patterns</p></li><li><p>Auth hydration</p></li><li><p>Supabase RLS</p></li><li><p>Media pipelines</p></li><li><p>Streaming</p></li><li><p>Real-time messaging</p></li><li><p>Advanced routing</p></li><li><p>Stripe Connect multi-vendor payouts</p></li><li><p>Large-scale database design</p></li><li><p>Product schema architecture</p></li><li><p>Messaging systems</p></li><li><p>Publishing workflows</p></li><li><p>Realtime feeds</p></li><li><p>File storage performance tuning</p></li></ul><p></p><p>SoundVent was going to require… all of that.</p><p>And so began the grind.</p><hr><h2><strong>5 Months. Thousands of Hours. Countless All-Nighters.</strong></h2><p>Every day was a marathon.</p><p>Most nights didn't end until 3am.</p><p>Console logs became my second monitor.</p><p>Supabase Studio basically lived in my bloodstream.</p><p>Next.js documentation became bedtime reading.</p><p></p><p>I wasn't just learning a framework.</p><p>I was building a full ecosystem.</p><p>Not one app — <strong>ten apps in one:</strong></p><p></p><ul><li><p>A music player</p></li><li><p>A video streaming platform</p></li><li><p>A social network</p></li><li><p>A real-time messaging system</p></li><li><p>A product creator (rivaling Shopify's)</p></li><li><p>A blog platform</p></li><li><p>A discovery engine</p></li><li><p>A profile system</p></li><li><p>An events/ticketing foundation</p></li><li><p>A commerce engine</p></li></ul><p></p><p>Each one is normally its own startup.</p><p>I had to build all of them — alone — in five months.</p><hr><h2><strong>The Tech Stack That Made It Possible</strong></h2><p>In the end, the modern web carried me:</p><h3><strong>React + Next.js (14)</strong></h3><p>This framework changed everything for me.</p><p>I went from "What even is a server component?" to "I never want to build without this again."</p><p>I genuinely fell in love with Next.js.</p><p>It feels like the framework I was always waiting for.</p><h3><strong>Supabase</strong></h3><p>Auth, Postgres, file storage, real-time, and RLS security — all in one place.</p><p>I pushed Supabase hard:</p><p></p><ul><li><p>multi-tenant profiles</p></li><li><p>secure media uploads</p></li><li><p>real-time feeds</p></li><li><p>messaging</p></li><li><p>notifications</p></li><li><p>relational tagging</p></li><li><p>product variants</p></li><li><p>categories</p></li><li><p>subgenres</p></li><li><p>analytics</p></li><li><p>ticketing groundwork</p></li></ul><p></p><p>Supabase handled it like a champ.</p><h3><strong>Mux</strong></h3><p>Video and audio streaming done right.</p><p>Reliable. Fast. Clean.</p><p>Exactly what SoundVent needed.</p><h3><strong>Stripe Connect</strong></h3><p>For multi-vendor commerce — the correct way to do payouts.</p><h3><strong>Tailwind + shadcn/ui</strong></h3><p>Designing an entire platform solo requires incredible efficiency.</p><p>Tailwind + shadcn let me move at lightning speed.</p><hr><h2><strong>There Were Walls. Lots of Walls.</strong></h2><p>I hit:</p><p></p><ul><li><p>SSR hydration issues</p></li><li><p>Auth race conditions</p></li><li><p>Middleware breaking at 2am</p></li><li><p>RLS policies that locked me out of my own tables</p></li><li><p>State management loops</p></li><li><p>Real-time listeners multiplying</p></li><li><p>Storage URLs breaking</p></li><li><p>"Why is this 500ing only in production?" moments</p></li><li><p>Stripe onboarding logic nightmares</p></li><li><p>React component hell</p></li><li><p>Media gallery staleness</p></li><li><p>Phantom re-renders</p></li><li><p>TypeScript gaslighting</p></li><li><p>Edge-case errors from libraries that never documented them</p></li></ul><p></p><p>But every wall came with a breakthrough.</p><p>Every bug made the architecture clearer.</p><p>Every failure made the product stronger.</p><p></p><p>I didn't want to just build SoundVent.</p><p>I wanted to build it <em>right.</em></p><hr><h2><strong>Built By Artists, For Artists</strong></h2><p>What made this grind worth it is simple:</p><p>We're <strong>musicians first.</strong></p><p>Anthony — an incredible drummer with visionary ideas.</p><p>Me — lead guitarist &amp; songwriter for Kavalkade.</p><p>Danny — a bassist with extensive touring experience.</p><p></p><p>We built SoundVent because we lived the problem.</p><p>Because we wanted a platform that respected the craft.</p><p>Because we wanted something better, more integrated, and more fair.</p><p>Music is at our core — and SoundVent reflects that.</p><hr><h2><strong>What SoundVent Is Today</strong></h2><p>SoundVent Beta includes:</p><p>🎵 <strong>Music &amp; Video Uploads</strong></p><p>🔥 <strong>Real-time social feed</strong></p><p>💬 <strong>Messaging &amp; notifications</strong></p><p>👥 <strong>Follow system</strong></p><p>🎸 <strong>Artist Profiles</strong></p><p>🛒 <strong>A full product creator (variants, digital, subscriptions, shipping, SEO, etc.)</strong></p><p>🎫 <strong>Events system foundation</strong></p><p>🌐 <strong>Discover page</strong></p><p>📱 <strong>Mobile-first UI</strong></p><p>⚡ <strong>Supabase real-time backend</strong></p><p>It's Instagram, Spotify, YouTube, Shopify, TikTok, and Ticketmaster — <strong>integrated thoughtfully into one coherent experience.</strong></p><p>This isn't a tool.</p><p>It's an ecosystem.</p><hr><h2><strong>The Roadmap</strong></h2><p>Coming next:</p><p></p><ul><li><p>Live streaming</p></li><li><p>Print-on-demand integration</p></li><li><p>Groups &amp; communities</p></li><li><p>Ticketing</p></li><li><p>Native mobile app</p></li><li><p>Advanced analytics</p></li><li><p>AI-assisted tools for artists</p></li><li><p>DSP ingestion pipeline (later phase)</p></li></ul><p></p><p>And much more.</p><hr><h2><strong>SoundVent is live.</strong></h2><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.soundvent.com"><strong>https://www.soundvent.com</strong></a></p><p>If you're an engineer, musician, or someone passionate about creator platforms, I'd love for you to check it out.</p><p>This project pushed me harder than anything I've ever built — and I couldn't be more proud of where it's going.</p><p>Thanks to everyone who supported this journey.</p><p>The next chapter of music starts now.</p>`,
  },
];

// Helper function to get a post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && post.published);
}

// Helper function to get all published posts
export function getAllPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.published);
}

// Helper function to get featured posts
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.published && post.featured);
}

// Helper function to get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.published && post.category === category);
}

