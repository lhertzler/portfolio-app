import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/blog-posts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { StructuredData } from '@/components/seo/structured-data';
import { generateArticleSchema } from '@/lib/structured-data';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  // Handle both async and sync params (Next.js 15 compatibility)
  const slug = typeof params === 'object' && 'then' in params 
    ? await params.then(p => p.slug).catch(() => '') 
    : params.slug;
  
  const resolvedSlug = typeof slug === 'string' ? slug : '';
  const post = getPostBySlug(resolvedSlug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lukehertzler.com';
  const imageUrl = post.bannerImage 
    ? `${siteUrl}${post.bannerImage}`
    : `${siteUrl}/images/social-share.jpg`;
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: postUrl,
      siteName: 'Luke Hertzler',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author || 'Luke Hertzler'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@lukehertzler',
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Handle both async and sync params (Next.js 15 compatibility)
  const resolvedParams = typeof params === 'object' && 'then' in params 
    ? await params 
    : params;
  
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    slug: post.slug,
    datePublished: post.date,
    author: post.author,
    bannerImage: post.bannerImage,
    tags: post.tags,
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <article className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="font-mono">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Banner Image */}
        {post.bannerImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src={post.bannerImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </div>
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {post.description}
          </p>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {formatDate(post.date, 'long')}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} read</span>
            </div>
            {post.author && (
              <div>
                <span>By {post.author}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <Card>
          <CardContent className="p-8 md:p-12">
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild className="font-mono">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Posts
              </Link>
            </Button>
            <Button variant="outline" asChild className="font-mono">
              <Link href="/contact">
                Start a Project
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </article>
    </>
  );
}

