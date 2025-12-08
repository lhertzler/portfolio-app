'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BadgesCarousel } from '@/components/ui/badges-carousel';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type HeroSize = 'small' | 'medium' | 'large';

export interface ServiceListItem {
  icon: LucideIcon;
  text: string;
}

export interface HeroProps {
  size: HeroSize;
  title: string | ReactNode;
  subtitle?: string;
  content1?: string | ReactNode;
  content2?: string;
  content3?: string;
  buttonText1?: string;
  buttonLink1?: string;
  buttonText2?: string;
  buttonLink2?: string;
  image: string;
  imageAlt?: string;
  badgeLabels?: string[];
  serviceList?: ServiceListItem[];
  onButton1Click?: () => void;
  onButton2Click?: () => void;
  // Props for highlighting specific words/characters
  titleHighlight?: string[]; // Array of words/phrases to highlight in title (if title is string)
  content1Highlight?: string[]; // Array of words/phrases to highlight in content1 (if content1 is string)
  className?: string;
}

// Helper function to highlight words in a string
function highlightText(text: string, highlights: string[]): ReactNode {
  if (!highlights || highlights.length === 0) return text;
  
  let result: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  
  // Create a regex pattern from all highlight words
  const pattern = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const matches = Array.from(text.matchAll(pattern));
  
  matches.forEach((match) => {
    const matchIndex = match.index!;
    const matchText = match[0];
    
    // Add text before the match
    if (matchIndex > lastIndex) {
      result.push(<span key={key++}>{text.slice(lastIndex, matchIndex)}</span>);
    }
    
    // Add highlighted match
    result.push(
      <span key={key++} className="text-primary">
        {matchText}
      </span>
    );
    
    lastIndex = matchIndex + matchText.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    result.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  
  return result.length > 0 ? <>{result}</> : text;
}

export function ContentHeroExtended({
  size,
  title,
  subtitle,
  content1,
  content2,
  content3,
  buttonText1,
  buttonLink1,
  buttonText2,
  buttonLink2,
  image,
  imageAlt = 'Hero image',
  badgeLabels,
  serviceList,
  onButton1Click,
  onButton2Click,
  titleHighlight,
  content1Highlight,
  className,
}: HeroProps) {
  const handleButton1Click = () => {
    if (onButton1Click) {
      onButton1Click();
    } else if (buttonLink1) {
      window.location.href = buttonLink1;
    }
  };

  const handleButton2Click = () => {
    if (onButton2Click) {
      onButton2Click();
    } else if (buttonLink2) {
      window.location.href = buttonLink2;
    }
  };

  // Large size - matches current hero exactly
  if (size === 'large') {
    return (
      <section
        id="hero"
        data-section="hero"
        data-component="ContentHero"
        data-file="components/main-content/hero.tsx"
        className={cn("flex items-center justify-center scroll-mt-20 py-6 sm:py-8 transition-all duration-1000 ease-out", className)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Card className="bg-card rounded-2xl backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-1000 hover:shadow-md overflow-hidden">
            <CardContent className="p-6 sm:p-8 md:px-[60px] md:py-10 relative">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-center">
                {/* Content */}
                <div className="md:col-span-2 space-y-6 sm:space-y-8 md:space-y-10 md:border-r md:border-border/50 md:pr-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold !leading-tight sm:!leading-normal">
                    {typeof title === 'string' && titleHighlight ? highlightText(title, titleHighlight) : title}
                  </h1>
                  {content1 && (
                    <p className="text-base sm:text-lg text-foreground max-w-xl">
                      {typeof content1 === 'string' && content1Highlight ? highlightText(content1, content1Highlight) : content1}
                    </p>
                  )}
                  {content2 && (
                    <p className="text-base sm:text-lg text-foreground max-w-xl">
                      {content2}
                    </p>
                  )}
                  {content3 && (
                    <p className="text-base sm:text-lg text-foreground max-w-xl font-semibold">
                      {content3}
                    </p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                    {buttonText1 && (
                      <Button
                        variant="default"
                        onClick={handleButton1Click}
                        size="lg"
                        className="w-full sm:w-auto font-mono"
                        data-cursor="tap"
                      >
                        {buttonText1}
                      </Button>
                    )}
                    {buttonText2 && (
                      <Button
                        variant="outline"
                        onClick={handleButton2Click}
                        size="lg"
                        className="w-full sm:w-auto font-mono"
                        data-cursor="tap"
                      >
                        {buttonText2}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Image */}
                <div className="block relative md:order-3 flex flex-col items-center md:block">
                  <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto rounded-full overflow-hidden dark:mix-blend-difference opacity-90 border border-primary">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      priority
                      quality={90}
                    />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden mix-blend-darken">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      priority
                      quality={90}
                    />
                  </div>
                  {badgeLabels && badgeLabels.length > 0 && (
                    <div className="mt-6 w-full max-w-md md:max-w-xs">
                      <BadgesCarousel badges={badgeLabels} enableScaling={false} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Medium size - no content3, everything smaller
  if (size === 'medium') {
    return (
      <section
        id="hero"
        data-section="hero"
        data-component="ContentHero"
        data-file="components/main-content/hero.tsx"
        className="flex items-center justify-center scroll-mt-20 py-4 sm:py-6 transition-all duration-1000 ease-out"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Card className="bg-card rounded-xl backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-1000 hover:shadow-md overflow-hidden">
            <CardContent className="p-4 sm:p-6 md:px-8 md:py-6 relative">
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                {/* Left side - 3/4 width */}
                <div className="w-full md:w-3/4 space-y-3 sm:space-y-4">
                  <div>
                    {title && (
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold !leading-tight">
                        {typeof title === 'string' && titleHighlight ? highlightText(title, titleHighlight) : title}
                      </h1>
                    )}
                    {subtitle && (
                      <p className="text-sm sm:text-base text-muted-foreground mt-2">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  {content1 && (
                    <p className="text-sm sm:text-base text-foreground">
                      {typeof content1 === 'string' && content1Highlight ? highlightText(content1, content1Highlight) : content1}
                    </p>
                  )}
                  {content2 && (
                    <p className="text-sm sm:text-base text-foreground">
                      {content2}
                    </p>
                  )}
                </div>

                {/* Right side - 1/4 width, flex-col centered */}
                <div className="w-full md:w-1/4 flex flex-col items-center justify-center gap-4">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-primary">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      className="object-cover"
                      priority
                      quality={90}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full items-center">
                    {buttonText1 && (
                      <Button
                        variant="default"
                        onClick={handleButton1Click}
                        size="default"
                        className="w-full font-mono text-sm"
                        data-cursor="tap"
                      >
                        {buttonText1}
                      </Button>
                    )}
                    {buttonText2 && (
                      <Button
                        variant="outline"
                        onClick={handleButton2Click}
                        size="default"
                        className="w-full font-mono text-sm"
                        data-cursor="tap"
                      >
                        {buttonText2}
                      </Button>
                    )}
                  </div>
                  {badgeLabels && badgeLabels.length > 0 && (
                    <div className="w-full max-w-xs">
                      <BadgesCarousel badges={badgeLabels} enableScaling={false} />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Small size - title, subtitle, content1, buttons, image, badgeLabels
  return (
    <section
      id="hero"
      data-section="hero"
      data-component="ContentHero"
      data-file="components/main-content/hero.tsx"
      className="flex items-center justify-center scroll-mt-20 py-4 sm:py-6 transition-all duration-1000 ease-out"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Card className="bg-card rounded-xl backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-1000 hover:shadow-md overflow-hidden">
          <CardContent className="p-4 sm:p-6 md:px-8 md:py-6 relative">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              {/* Left side - 3/4 width */}
              <div className="w-full md:w-3/4 space-y-4">
                <div>
                  {title && (
                    <h1 className="text-2xl sm:text-3xl md:text-[45px] font-bold !leading-tight">
                      {typeof title === 'string' && titleHighlight ? highlightText(title, titleHighlight) : title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                {content1 && (
                  <p className="text-sm sm:text-base md:text-lg text-foreground">
                    {typeof content1 === 'string' && content1Highlight ? highlightText(content1, content1Highlight) : content1}
                  </p>
                )}
                
                {/* Buttons below content1 */}
                <div className="flex flex-col py-2 sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
                  {buttonText1 && (
                    <Button
                      variant="default"
                      onClick={handleButton1Click}
                      size="lg"
                      className="w-full sm:w-auto font-mono text-sm"
                      data-cursor="tap"
                    >
                      {buttonText1}
                    </Button>
                  )}
                  {buttonText2 && (
                    <Button
                      variant="outline"
                      onClick={handleButton2Click}
                      size="lg"
                      className="w-full sm:w-auto font-mono text-sm"
                      data-cursor="tap"
                    >
                      {buttonText2}
                    </Button>
                  )}
                </div>
              </div>

              {/* Right side - 1/4 width, flex-col centered */}
              <div className="w-full md:w-1/4 flex flex-col items-center justify-center gap-4">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-primary">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
                {badgeLabels && badgeLabels.length > 0 && (
                  <div className="w-full max-w-xs">
                    <BadgesCarousel badges={badgeLabels} enableScaling={false} />
                  </div>
                )}
              </div>
            </div>

            {/* Service List - 3 columns - Full width below content and image */}
            {serviceList && serviceList.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
                {serviceList.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4 text-primary shrink-0" />}
                      <span className="text-sm font-mono">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

