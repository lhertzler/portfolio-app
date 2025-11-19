import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Helper function to truncate text to a specific word count
function truncateText(text: string, maxWords: number): string {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
}

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8" data-component="PortfolioPage" data-file="app/portfolio/page.tsx">
      <div data-component="PortfolioHeader" data-file="app/portfolio/page.tsx">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Portfolio</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Selected projects and case studies</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-component="ProjectCard" data-file="app/portfolio/page.tsx">
              {/* Featured Image */}
              {project.featuredImage && (
                <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
              )}
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-primary group-hover:text-primary/80 transition-colors">{project.title}</CardTitle>
                <CardDescription>{project.role}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 min-h-0">
                <p className="text-sm mb-4 line-clamp-3 flex-shrink-0">{truncateText(project.summary, 20)}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

