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
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8" data-component="PortfolioPage" data-file="app/portfolio/page.tsx">
      <div data-component="PortfolioHeader" data-file="app/portfolio/page.tsx">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">Portfolio</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Selected projects and case studies</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group" data-component="ProjectCard" data-file="app/portfolio/page.tsx">
              {/* Mobile Image - Featured Image */}
              {project.featuredImage && (
                <div className="relative w-full aspect-video overflow-hidden flex-shrink-0 md:hidden">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="bg-black/30 object-cover transition-transform duration-300 group-hover:scale-110"
                    quality={90}
                  />
                  <div className={`absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-[0px] transition-all duration-500 z-10 ${project.showOverlay === false ? 'bg-transparent group-hover:bg-transparent' : 'bg-black/80 group-hover:bg-black/30'}`} />
                  <p className="w-full px-4 portfolio-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-white text-center text-2xl px-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-500">{project.title}</p>
                </div>
              )}
              {/* Desktop Image - Featured Grid Image */}
              {project.featuredGridImage && (
                <div className="hidden md:block relative w-full aspect-video overflow-hidden flex-shrink-0">
                  <Image
                    src={project.featuredGridImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    quality={90}
                  />
                  <div className={`absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-[0px] transition-all duration-500 z-10 ${project.showOverlay === false ? 'bg-transparent group-hover:bg-transparent' : 'bg-black/60 group-hover:bg-black/30'}`} />
                  <p className="w-full px-4 portfolio-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-white text-center text-2xl z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-500">{project.title}</p>
                </div>
              )}
              {/* Fallback if no grid image on desktop */}
              {!project.featuredGridImage && project.featuredImage && (
                <div className="hidden md:block relative w-full aspect-video overflow-hidden flex-shrink-0">
                  <Image
                    src={project.featuredImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    quality={90}
                  />
                  <div className={`absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-[0px] transition-all duration-300 z-10 ${project.showOverlay === false ? 'bg-transparent group-hover:bg-transparent' : 'bg-black/80 group-hover:bg-black/30'}`} />
                  <p className="portfolio-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-white text-center text-2xl px-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">{project.title}</p>
                </div>
              )}
              <CardContent className="flex flex-col flex-1 min-h-0 p-7 pt-6 pb-10 ">
                <p className="text-md mb-4 line-clamp-5 flex-shrink-0 leading-[1.8]">{truncateText(project.summary, 40)}</p>
                <div className="flex flex-wrap gap-2 mt-auto mt-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="default">
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

