import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageAndText } from '@/components/content/image-and-text';
import { CaseStudyCard } from '@/components/content/case-study-card';
import { StructuredData } from '@/components/seo/structured-data';
import { generateProjectSchema } from '@/lib/structured-data';
import { ArrowLeft } from 'lucide-react';

// Helper function to truncate text to a specific word count
function truncateText(text: string, maxWords: number): string {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

// Helper function to get random projects excluding current
function getRandomProjects(currentSlug: string, count: number = 3) {
  const filtered = projects.filter(p => p.slug !== currentSlug && p.featuredImage);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

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
    description: project.summary,
    openGraph: {
      title: `${project.title} | Portfolio`,
      description: project.summary,
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
      description: project.summary,
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
    description: project.summary,
    slug: project.slug,
    featuredImage: project.featuredImage,
    tags: project.tags,
  });

  // Get random projects for "More Projects" section
  const moreProjects = getRandomProjects(project.slug, 3);

  return (
    <>
      <StructuredData data={projectSchema} />
      <div className="max-w-6xl mx-auto space-y-2 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
        <Link href="/portfolio">
          <Button variant="ghost" className="gap-2" data-cursor="link">
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Button>
        </Link>

      {/* Featured Video (if exists) */}
      {project.video && (
        <div className="rounded-lg overflow-hidden bg-black">
          <div className="relative w-full aspect-video">
            <video
              src={project.video}
              controls
              autoPlay
              muted
              loop
              className="w-full h-full object-contain"
              preload="auto"
              playsInline
            >
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Image and Text Component */}
      {project.featuredImage && (
        <ImageAndText
          card={false}
          imagePosition="left"
          gradientOverlay={false}
          imageFullscreen={true}
          image={project.featuredImage}
          title={project.title}
          content={project.summary}
        />
      )}

      {/* Case Study Sections */}
      {project.caseStudySections && (
        <div className="space-y-6">
          {/* Overview (2/3) + Tech (1/3) */}
          {(project.tech.length > 0) && (
            <div className="flex w-full">
              {project.tech.length > 0 && (
                <div className="flex flex-wrap justify-center items-center w-full gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="default" className="text-sm whitespace-nowrap flex-shrink-0">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Context (50%) + Solution (50%) */}
          {(project.caseStudySections.context || project.caseStudySections.solution) && (
            <div className="flex flex-col lg:flex-row gap-6">
              {project.caseStudySections.context && project.caseStudySections.contextSummary && (
                <div className="flex-1 lg:w-1/2">
                  <CaseStudyCard
                    title="Context"
                    summary={project.caseStudySections.contextSummary}
                    fullContent={project.caseStudySections.context} 
                  />
                </div>
              )}
              {project.caseStudySections.solution && project.caseStudySections.solutionSummary && (
                <div className="flex-1 lg:w-1/2">
                  <CaseStudyCard
                    title="Solution"
                    summary={project.caseStudySections.solutionSummary}
                    fullContent={project.caseStudySections.solution}
                  />
                </div>
              )}
            </div>
          )}

          {/* Architecture (50%) + UI/UX (50%) */}
          {(project.caseStudySections.architecture || project.caseStudySections.uiux) && (
            <div className="flex flex-col lg:flex-row gap-6">
              {project.caseStudySections.architecture && project.caseStudySections.architectureSummary && (
                <div className="flex-1 lg:w-1/2">
                  <CaseStudyCard
                    title="Architecture"
                    summary={project.caseStudySections.architectureSummary}
                    fullContent={project.caseStudySections.architecture}
                    isMonospace={true}
                  />
                </div>
              )}
              {project.caseStudySections.uiux && project.caseStudySections.uiuxSummary && (
                <div className="flex-1 lg:w-1/2">
                  <CaseStudyCard
                    title="UI/UX"
                    summary={project.caseStudySections.uiuxSummary}
                    fullContent={project.caseStudySections.uiux}
                  />
                </div>
              )}
            </div>
          )}

          {/* Challenges & Solutions (50%) + Impact (50%) */}
          {(project.caseStudySections.challenges || project.caseStudySections.impact) && (
            <div className="flex flex-col lg:flex-row gap-6">
              {project.caseStudySections.challenges && project.caseStudySections.challengesSummary && (
                <div className="flex-1 lg:w-1/2">
                  <CaseStudyCard
                    title="Challenges & Solutions"
                    summary={project.caseStudySections.challengesSummary}
                    fullContent={project.caseStudySections.challenges}
                  />
                </div>
              )}
              {project.caseStudySections.impact && project.caseStudySections.impactSummary && (
                <div className="flex-1 lg:w-1/2">
                  <CaseStudyCard
                    title="Impact"
                    summary={project.caseStudySections.impactSummary}
                    fullContent={project.caseStudySections.impact}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Project Tags */}
      {project.tags.length > 0 && (
        <div className="pt-8 border-t">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm whitespace-nowrap flex-shrink-0">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* More Projects Section */}
      {moreProjects.length > 0 && (
        <div className="space-y-6 pt-8 border-t">
          <h2 className="text-2xl sm:text-3xl font-bold">More Projects</h2>
          <div className="grid grid-cols-1 space-y-10">
            {moreProjects.map((moreProject) => (
              <ImageAndText
                key={moreProject.slug}
                card={true}
                wrapperLink={`/portfolio/${moreProject.slug}`}
                imagePosition="left"
                image={moreProject.featuredImage!}
                title={moreProject.title}
                content={truncateText(moreProject.summary, 30)}
                badges={moreProject.tags}
              />
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}

