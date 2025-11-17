import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, BookOpen } from 'lucide-react';

export function LabAndBlogSection() {
  return (
    <section
      id="lab"
      data-section="lab"
      data-component="LabAndBlogSection"
      data-file="components/home/lab-and-blog-section.tsx"
      className="py-24 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Lab & Writing</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card id="lab">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FlaskConical className="h-5 w-5" />
                <CardTitle>Lab</CardTitle>
              </div>
              <CardDescription>
                What I&apos;m currently experimenting with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• Amp sims / ML stuff</li>
                <li>• SoundVent features</li>
                <li>• UI experiments</li>
              </ul>
              <Button asChild>
                <Link href="/lab">Explore the Lab</Link>
              </Button>
            </CardContent>
          </Card>

          <Card id="blog">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5" />
                <CardTitle>From the Blog</CardTitle>
              </div>
              <CardDescription>
                Thoughts on development, design, and music.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">Coming Soon</h4>
                  <p className="text-xs text-muted-foreground">
                    Blog posts will appear here
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">View All Posts</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

