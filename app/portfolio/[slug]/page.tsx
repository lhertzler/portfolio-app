import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StructuredData } from '@/components/seo/structured-data';
import { generateProjectSchema } from '@/lib/structured-data';
import { ArrowLeft } from 'lucide-react';

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const resolvedParams = typeof params === 'object' && 'then' in params 
    ? await params 
    : params;
  
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lukehertzler.com';
  const imageUrl = project.featuredImage 
    ? `${siteUrl}${project.featuredImage}`
    : `${siteUrl}/images/social-share.jpg`;
  const projectUrl = `${siteUrl}/portfolio/${resolvedParams.slug}`;

  return {
    title: `${project.title} | Portfolio`,
    description: project.summary || project.description,
    openGraph: {
      title: `${project.title} | Portfolio`,
      description: project.summary || project.description,
      type: 'website',
      url: projectUrl,
      siteName: 'Luke Hertzler',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Portfolio`,
      description: project.summary || project.description,
      images: [imageUrl],
      creator: '@lukehertzler',
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Handle both async and sync params (Next.js 15 compatibility)
  const resolvedParams = typeof params === 'object' && 'then' in params 
    ? await params 
    : params;
  
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.summary || project.description,
    slug: project.slug,
    featuredImage: project.featuredImage,
    tags: project.tags,
  });

  return (
    <>
      <StructuredData data={projectSchema} />
      <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="pt-4">
        <Link href="/portfolio">
          <Button variant="ghost" className="gap-2" data-cursor="link">
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Button>
        </Link>
      </div>

      {/* Featured Image */}
      {project.featuredImage && (
        <div className="rounded-lg overflow-hidden">
          <div className="relative w-full aspect-video">
            <Image
              src={project.featuredImage}
              alt={project.title}
              fill
              className="object-contain"
              priority
              quality={90}
            />
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-muted-foreground mb-4">{project.role}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <p className="text-base sm:text-lg leading-relaxed text-foreground">
            {project.description}
          </p>
        </CardContent>
      </Card>

      {/* Case Study Sections */}
      {project.caseStudySections && (
        <div className="space-y-6">
          {project.caseStudySections.overview && (
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Overview</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base max-w-none">
                <div className="whitespace-pre-line text-foreground">{project.caseStudySections.overview}</div>
              </CardContent>
            </Card>
          )}
          
          {project.caseStudySections.architecture && (
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Architecture</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base max-w-none">
                <div className="whitespace-pre-line font-mono text-sm text-foreground">{project.caseStudySections.architecture}</div>
              </CardContent>
            </Card>
          )}

          {project.caseStudySections.uiux && (
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">UI/UX</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base max-w-none">
                <div className="whitespace-pre-line text-foreground">{project.caseStudySections.uiux}</div>
              </CardContent>
            </Card>
          )}

          {project.caseStudySections.challenges && (
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Challenges & Solutions</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base max-w-none">
                <div className="whitespace-pre-line text-foreground">{project.caseStudySections.challenges}</div>
              </CardContent>
            </Card>
          )}

          {project.caseStudySections.impact && (
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Impact</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm sm:prose-base max-w-none">
                <div className="whitespace-pre-line text-foreground">{project.caseStudySections.impact}</div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      </div>
    </>
  );
}

