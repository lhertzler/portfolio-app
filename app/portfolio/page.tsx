import { projects } from '@/lib/projects';
import { PortfolioItem } from '@/components/portfolio/portfolio-item';

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" data-component="PortfolioPage" data-file="app/portfolio/page.tsx">
      <div className="mb-8 sm:mb-12" data-component="PortfolioHeader" data-file="app/portfolio/page.tsx">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">Portfolio</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Selected projects and case studies</p>
      </div>
      <div className="space-y-6 sm:space-y-8">
        {projects.map((project, index) => (
          <PortfolioItem key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

