import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section
      id="about"
      data-section="about"
      data-component="AboutSection"
      data-file="components/home/about-section.tsx"
      className="py-24 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About me</h2>
          <p className="text-lg text-muted-foreground">
            Get to know me better
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Who I Am</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Full-stack engineer, UI/UX designer, and musician based in Santa Cruz. I build
                modern web applications with a focus on user experience and clean architecture.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What I&apos;m Building Now</h3>
                  <p className="text-muted-foreground text-sm">
                    Currently working on SoundVent, a music collaboration platform that enables
                    artists to share work-in-progress tracks and collaborate in real-time.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How I Like to Work</h3>
                  <p className="text-muted-foreground text-sm">
                    I believe in building sustainable, ethical, user-centered products. Clean
                    code, thoughtful design, and real user feedback drive my process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold text-lg">10+</span>
                  <div>
                    <p className="font-medium">Years Experience</p>
                    <p className="text-sm text-muted-foreground">Building for Shopify & modern stacks</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold text-lg">Full-Stack</span>
                  <div>
                    <p className="font-medium">Technologies</p>
                    <p className="text-sm text-muted-foreground">React, Next.js, Supabase, PostgreSQL</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold text-lg">Design</span>
                  <div>
                    <p className="font-medium">Tools & Process</p>
                    <p className="text-sm text-muted-foreground">Figma, Design Systems, UX Process</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
