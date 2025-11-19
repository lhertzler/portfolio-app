import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Palette, ArrowRight } from "lucide-react"

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <h1 className="text-5xl font-bold">Lab</h1>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Experiments, components, and dev toys.
        </p>
      </div>

      {/* Lab Projects */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Lab Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Neural Amp Modeler */}
          <Card className="group hover:border-primary/50 transition-colors">
            <Link href="/lab/amp-simulator">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        Neural Amp Modeler: Replicating Iconic Metal Tones
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Exploring Neural Amp Modeler (NAM) to create authentic metal guitar tone replicas. 
                        Free amp simulator available at Anchorhead Studio.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Design System Components */}
          <Card className="group hover:border-primary/50 transition-colors">
            <Link href="/lab/design-system-components">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        Component Gallery
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Experimenting with tailwind and design systems to create a component library. 
                        Explore various UI components built with shadcn/ui.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
