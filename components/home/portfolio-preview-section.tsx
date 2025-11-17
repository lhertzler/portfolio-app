import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PortfolioPreviewSection() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section
      id="portfolio"
      data-section="portfolio"
      data-component="PortfolioPreviewSection"
      data-file="components/home/portfolio-preview-section.tsx"
      className="py-24 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Selected Work</h2>
          <p className="text-lg text-muted-foreground">
            Projects showcasing modern web development and design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              data-cursor="view"
            >
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1" data-component="ProjectCard">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

