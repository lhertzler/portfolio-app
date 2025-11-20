import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Music, Zap, Cpu, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Neural Amp Modeler - Custom Metal Tone Replication | Luke Hertzler",
  description: "Exploring Neural Amp Modeler (NAM) to create authentic metal guitar tone replicas. Free amp simulator available at Anchorhead Studio.",
}

export default function AmpSimulatorLabPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Back Button */}
      <div>
        <Button variant="ghost" asChild>
          <Link href="/lab" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Lab
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">Lab Project</Badge>
          <Badge variant="secondary" className="text-xs">Music Technology</Badge>
        </div>
        <h1 className="text-5xl font-bold leading-tight">
          Neural Amp Modeler: Replicating Iconic Metal Tones
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Diving deep into Neural Amp Modeler (NAM) to capture and package some of the most legendary metal guitar tones into a free, accessible amp simulator.
        </p>
      </header>

      {/* Hero Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
            <Image
              src="/images/lab/anchorhead-amp-sim-sample.png"
              alt="Anchorhead Amp Simulator UI Mockup"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
              quality={90}
            />
        </CardContent>
      </Card>

      {/* Introduction */}
      <section className="space-y-4 prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          As a musician and engineer, I've always been fascinated by the pursuit of the perfect guitar tone. 
          The world of metal guitar has produced some of the most iconic, instantly recognizable sounds in music history—from 
          the crushing low-end of Meshuggah to the searing leads of Metallica, the scooped mids of early Pantera, 
          and the modern high-gain brutality of bands like Periphery and Architects.
        </p>
        <p className="text-lg leading-relaxed">
          Traditional amp modeling has come a long way, but Neural Amp Modeler (NAM) represents a paradigm shift. 
          Instead of trying to recreate circuits through simulation, NAM uses deep learning to capture the actual 
          sonic character of real amplifiers by learning from audio examples. The results are nothing short of remarkable.
        </p>
      </section>

      {/* What is NAM */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Cpu className="h-8 w-8 text-primary" />
          What is Neural Amp Modeler?
        </h2>
        <div className="space-y-4 prose prose-invert max-w-none">
          <p className="leading-relaxed">
            Neural Amp Modeler is an open-source project that uses neural networks to create highly accurate 
            digital recreations of guitar amplifiers, pedals, and other audio equipment. Unlike traditional 
            modeling approaches that attempt to simulate the electrical behavior of circuits, NAM works by 
            training a neural network on input/output audio pairs.
          </p>
          <p className="leading-relaxed">
            Here's the process: You feed a reference amplifier a series of test tones (sweeps, noise, and 
            musical content), record both the input and output, and NAM's neural network learns the complex 
            non-linear transformations that occur. The result is a model file that can replicate the amplifier's 
            behavior with stunning accuracy—often indistinguishable from the original hardware.
          </p>
        </div>
      </section>

      {/* Why NAM is Revolutionary */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          Why NAM is Revolutionary for Tone Emulation
        </h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">Unprecedented Accuracy</h3>
              <p className="text-muted-foreground leading-relaxed">
                NAM models capture the subtle nuances that make each amplifier unique—the way it responds to 
                pick attack, how it breaks up at different gain stages, the complex interactions between 
                preamp and power amp sections, and even the character imparted by specific tubes and transformers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                What once required thousands of dollars in hardware can now be captured and shared as a 
                relatively small model file. This democratizes access to legendary tones, making it possible 
                for musicians at any level to experiment with sounds that were previously out of reach.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">Preservation</h3>
              <p className="text-muted-foreground leading-relaxed">
                As vintage amplifiers age and become increasingly rare and expensive, NAM provides a way to 
                preserve their sonic character. A well-captured model can serve as a digital archive of 
                irreplaceable gear, ensuring these tones remain accessible to future generations of musicians.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Project */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Music className="h-8 w-8 text-primary" />
          The Project: Iconic Metal Tones
        </h2>
        <div className="space-y-4 prose prose-invert max-w-none">
          <p className="leading-relaxed">
            My goal with this project is ambitious: to capture and replicate some of the most famous metal 
            guitar tones in history. I'm talking about the tones that defined entire subgenres and influenced 
            countless musicians.
          </p>
          <p className="leading-relaxed">
            The process involves meticulous research into the gear used on classic albums, acquiring or 
            accessing the same amplifiers (when possible), and then carefully capturing them using NAM's 
            training process. Each model requires hours of careful setup, recording, and training to ensure 
            maximum accuracy.
          </p>
          <p className="leading-relaxed">
            But accuracy is just the beginning. The real challenge is understanding the full signal chain—not 
            just the amp, but the guitars, pickups, cabinets, microphones, and even the room acoustics that 
            contributed to those iconic sounds. Some of the most recognizable tones are the result of specific 
            combinations that go far beyond just the amplifier.
          </p>
        </div>
      </section>

      {/* Technical Nuances */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">The Nuances: What Makes NAM So Effective</h2>
        <div className="space-y-4 prose prose-invert max-w-none">
          <h3 className="text-xl font-semibold">Non-Linear Modeling</h3>
          <p className="leading-relaxed">
            Traditional digital models often struggle with non-linear behaviors like tube saturation, transformer 
            saturation, and speaker breakup. Neural networks excel at learning these complex, non-linear 
            relationships because they're not constrained by simplified mathematical models.
          </p>
          <h3 className="text-xl font-semibold">Dynamic Response</h3>
          <p className="leading-relaxed">
            One of NAM's greatest strengths is its ability to capture how an amplifier responds dynamically. 
            The way an amp compresses when you dig in with your pick, how it cleans up when you roll back 
            the volume, and how it responds to different playing styles—these are all captured in the model.
          </p>
          <h3 className="text-xl font-semibold">Frequency-Dependent Behavior</h3>
          <p className="leading-relaxed">
            Real amplifiers don't respond uniformly across the frequency spectrum. NAM models learn these 
            frequency-dependent behaviors, capturing how different frequencies interact with the amplifier's 
            various stages. This is crucial for achieving authentic tone, especially in the complex frequency 
            interactions found in high-gain metal tones.
          </p>
        </div>
      </section>

      {/* Packaging and Distribution */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Packaging for Accessibility</h2>
        <div className="space-y-4 prose prose-invert max-w-none">
          <p className="leading-relaxed">
            Creating accurate models is only half the battle. To make these tones truly accessible, I'm 
            developing a custom amp simulator interface that packages these models in an intuitive, 
            user-friendly format. The goal is to make it as easy as possible for musicians to access and 
            use these iconic tones in their own work.
          </p>
          <p className="leading-relaxed">
            The interface you see in the mockup above represents my vision: clean, modern, and focused on 
            the music rather than overwhelming technical options. Each model will include presets that 
            replicate specific album tones, but also provide enough flexibility for users to dial in 
            their own variations.
          </p>
        </div>
      </section>

      {/* Anchorhead Studio */}
      <section className="space-y-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Music className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Available at Anchorhead Studio</h2>
            </div>
            <div className="space-y-4 prose prose-invert max-w-none">
              <p className="leading-relaxed text-lg">
                This amp simulator will be available as a free download at{" "}
                <Link 
                  href="https://www.anchorheadstudio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  www.anchorheadstudio.com
                  <ExternalLink className="h-4 w-4" />
                </Link>
                {" "}— my music studio site where I house all my musical experiments and projects.
              </p>
              <p className="leading-relaxed">
                Anchorhead Studio is more than just a place to download amp sims. It's where I share my 
                ongoing work in music technology, including:
              </p>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Almost 1:1 exact album drum tone replicas using Superior Drummer 3</li>
                <li>Mixing and mastering services for artists</li>
                <li>Various audio production tools and presets</li>
                <li>Documentation of my process and techniques</li>
              </ul>
              <p className="leading-relaxed">
                The goal is to create a resource for musicians and producers who, like me, are passionate 
                about achieving authentic, professional tones without breaking the bank on vintage gear.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link 
                  href="https://www.anchorheadstudio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Anchorhead Studio
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Conclusion */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">The Pursuit Continues</h2>
        <div className="space-y-4 prose prose-invert max-w-none">
          <p className="leading-relaxed">
            This project represents a convergence of my interests in music, technology, and engineering. 
            Neural Amp Modeler has opened up possibilities that simply didn't exist a few years ago, and 
            I'm excited to contribute to this growing ecosystem of accessible, high-quality tone modeling.
          </p>
          <p className="leading-relaxed">
            The work is ongoing. Each new model requires careful attention to detail, and the process of 
            capturing and refining these tones is as much art as it is science. But the end goal is 
            clear: making legendary metal tones accessible to anyone with a computer and a passion for 
            creating heavy music.
          </p>
          <p className="leading-relaxed text-muted-foreground italic">
            Stay tuned for updates as I continue to add more models and refine the interface. The first 
            release will include a curated selection of iconic metal tones, with more to follow based 
            on community feedback and requests.
          </p>
        </div>
      </section>

    </article>
  )
}

