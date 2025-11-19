import { Card, CardContent } from '@/components/ui/card';

export function QuickFactsSection() {
  return (
    <section
      id="about"
      data-section="about"
      data-component="AboutSection"
      data-file="components/home/about-section.tsx"
      className="pb-6 sm:pb-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="w-full shadow-xl">
          <CardContent className="p-2 sm:p-3">
            <ul className="flex flex-wrap divide-y sm:divide-y-0 sm:divide-x divide-border">
              <li className="w-1/2 sm:flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2 py-3 sm:py-2">
                <span className="text-primary font-semibold text-base sm:text-lg mb-1">10+</span>
                <p className="font-medium text-sm sm:text-base">Years Experience</p>
              </li>
              <li className="w-1/2 sm:flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2 py-3 sm:py-2">
                <span className="text-primary font-semibold text-base sm:text-lg mb-1">Top 0.2%</span>
                <p className="font-medium text-sm sm:text-base">Shopify Expert</p>
              </li>
              <li className="w-1/2 sm:flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2 py-3 sm:py-2">
                <span className="text-primary font-semibold text-base sm:text-lg mb-1">Trusted</span>
                <p className="font-medium text-sm sm:text-base">by Top Brands</p>
              </li>
              <li className="w-1/2 sm:flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2 py-3 sm:py-2">
                <span className="text-primary font-semibold text-base sm:text-lg mb-1">Architect</span>
                <p className="font-medium text-sm sm:text-base">of SoundVent.com</p>
              </li>
              <li className="w-full sm:flex-1 min-w-0 flex flex-col items-center justify-center text-center px-2 py-3 sm:py-2">
                <span className="text-primary font-semibold text-base sm:text-lg mb-1">Born</span>
                <p className="font-medium text-sm sm:text-base">in England</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
