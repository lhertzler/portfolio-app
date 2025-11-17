import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-muted-foreground">Selected projects and case studies</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow" data-component="ProjectCard" data-file="app/portfolio/page.tsx">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{project.summary}</p>
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
  );
}

