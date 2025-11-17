export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Resume</h1>
        <p className="text-muted-foreground mb-6">
          10+ years building for Shopify & modern stacks
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>React, Next.js, TypeScript</li>
            <li>Supabase, PostgreSQL</li>
            <li>Shopify, Liquid</li>
            <li>TailwindCSS, shadcn/ui</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Full-Stack Engineer</h3>
              <p className="text-sm text-muted-foreground">Various clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

