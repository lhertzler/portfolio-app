import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ResumePreviewSection() {
  return (
    <section
      id="resume"
      data-section="resume"
      data-component="ResumePreviewSection"
      data-file="components/home/resume-preview-section.tsx"
      className="py-24 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Resume</h2>
          <p className="text-lg text-muted-foreground">
            +12 years of passion for programming techniques
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">10+ Years Building</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Building for Shopify & modern stacks
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Key Roles & Companies</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground mt-1">
                      <li>• Full-Stack Engineer (Various clients)</li>
                      <li>• Shopify Theme Developer</li>
                      <li>• UI/UX Designer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Core Technologies</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      React, Next.js, TypeScript, Supabase, PostgreSQL, Shopify, TailwindCSS
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Full-Stack Engineer</h4>
                  <p className="text-sm text-muted-foreground">Various clients</p>
                  <p className="text-sm mt-2">Building modern web applications with Next.js and Supabase</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Founder & Lead Engineer</h4>
                  <p className="text-sm text-muted-foreground">SoundVent</p>
                  <p className="text-sm mt-2">Music collaboration platform</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <Button asChild className="flex-1">
                  <Link href="/resume">View Full Resume</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/resume.pdf" target="_blank">Download PDF</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
