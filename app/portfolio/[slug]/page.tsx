import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
        <p className="text-muted-foreground mb-4">{project.role}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
      <Card data-component="CaseStudy" data-file="app/portfolio/[slug]/page.tsx">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>{project.description}</p>
          {project.caseStudySections && (
            <div className="mt-6 space-y-6">
              {project.caseStudySections.overview && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p>{project.caseStudySections.overview}</p>
                </div>
              )}
              {project.caseStudySections.architecture && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Architecture</h3>
                  <p>{project.caseStudySections.architecture}</p>
                </div>
              )}
              {project.caseStudySections.challenges && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Challenges & Solutions</h3>
                  <p>{project.caseStudySections.challenges}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

