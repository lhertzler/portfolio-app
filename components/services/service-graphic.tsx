'use client';

interface ServiceGraphicProps {
  graphicType?: string;
}

export function ServiceGraphic({ graphicType }: ServiceGraphicProps) {
  // Generate unique graphics based on graphicType
  const renderGraphic = () => {
    // Theme Modernization - Show upgrade/refactor visual
    if (graphicType === 'theme-modernization') {
      return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center gap-3">
            {/* Old version */}
            <div className="flex-1 h-full bg-background/60 rounded border border-border/50 p-2 flex flex-col gap-1 opacity-60">
              <div className="h-2 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-3/4" />
              <div className="flex-1 grid grid-cols-2 gap-1">
                <div className="bg-muted/50 rounded" />
                <div className="bg-muted/50 rounded" />
              </div>
            </div>
            {/* Arrow */}
            <div className="text-primary text-xl font-bold">→</div>
            {/* New version */}
            <div className="flex-1 h-full bg-background/90 rounded border border-primary/30 p-2 flex flex-col gap-1 shadow-lg">
              <div className="h-2 bg-primary/20 rounded w-full" />
              <div className="h-2 bg-primary/20 rounded w-5/6" />
              <div className="flex-1 grid grid-cols-2 gap-1">
                <div className="bg-primary/10 rounded" />
                <div className="bg-primary/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Migrations To Shopify - Show platform migration visual
    if (graphicType === 'migration') {
      return (
        <div className="relative w-full h-full gradient-overlay flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            {/* Source platform */}
            <div className="flex-1 h-full bg-background/60 rounded border border-border/50 p-2 flex flex-col items-center justify-center gap-1">
              <div className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center text-xs font-mono">WC</div>
              <div className="h-1 bg-muted rounded w-full" />
              <div className="h-1 bg-muted rounded w-3/4" />
            </div>
            {/* Arrow */}
            <div className="text-primary text-lg">→</div>
            {/* Shopify */}
            <div className="flex-1 h-full bg-background/90 rounded border border-primary/30 p-2 flex flex-col items-center justify-center gap-1 shadow-lg">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">S</div>
              <div className="h-1 bg-primary/20 rounded w-full" />
              <div className="h-1 bg-primary/20 rounded w-5/6" />
            </div>
          </div>
        </div>
      );
    }

    // Custom Shopify Features - Show mini-cart slide-out
    if (graphicType === 'custom-features') {
      return (
        <div className="relative w-full h-full gradient-overlay flex items-center justify-center">
          <div className="relative w-full h-full flex items-center">
            {/* Page Content - Left Side */}
            <div className="w-full h-full bg-background/90 rounded-lg border border-border/50 shadow-lg overflow-hidden">
              {/* Browser Bar */}
              <div className="h-5 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/30 flex items-center gap-1.5 px-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 h-2 bg-background/70 rounded text-[9px] font-mono text-muted-foreground px-1.5 flex items-center">
                  store.example.com
                </div>
              </div>
              
              {/* Page Content */}
              <div className="p-3 bg-gradient-to-br from-primary/5 to-primary/10 h-full flex items-center">
                {/* Product Layout - Image Left, Content Right */}
                <div className="flex gap-3 w-full">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-muted/30 rounded border border-border/40 flex-shrink-0" />
                  
                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-primary/20 rounded w-3/4" />
                    <div className="space-y-1">
                      <div className="h-1 bg-muted/40 rounded w-full" />
                      <div className="h-1 bg-muted/40 rounded w-5/6" />
                      <div className="h-1 bg-muted/40 rounded w-4/6" />
                    </div>
                    <div className="h-2 bg-primary/20 rounded w-16" />
                    <div className="h-4 bg-primary/30 rounded w-24 border border-primary/20" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mini-Cart Slide-Out - Right Side */}
            <div className="w-1/3 bg-background/90 rounded-lg border border-border/50 shadow-lg overflow-hidden">
              {/* Cart Header */}
              <div className="h-6 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/30 flex items-center px-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded border border-primary/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                  </div>
                  <div className="h-2 bg-primary/20 rounded w-12" />
                </div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              </div>
              
              {/* Cart Items */}
              <div className="p-2.5 bg-gradient-to-br from-primary/5 to-primary/10 space-y-2">
                {/* Cart Item 1 */}
                <div className="flex gap-2 bg-background/70 rounded border border-primary/30 p-1.5">
                  <div className="w-8 h-8 bg-muted/30 rounded border border-border/40 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1 bg-primary/20 rounded w-full" />
                    <div className="h-1 bg-muted/40 rounded w-2/3" />
                    <div className="flex items-center justify-between">
                      <div className="h-1 bg-primary/20 rounded w-8" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded border border-primary/30" />
                        <div className="w-2 h-2 rounded border border-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cart Item 2 */}
                <div className="flex gap-2 bg-background/70 rounded border border-primary/30 p-1.5">
                  <div className="w-8 h-8 bg-muted/30 rounded border border-border/40 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-1 bg-primary/20 rounded w-full" />
                    <div className="h-1 bg-muted/40 rounded w-2/3" />
                    <div className="flex items-center justify-between">
                      <div className="h-1 bg-primary/20 rounded w-8" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded border border-primary/30" />
                        <div className="w-2 h-2 rounded border border-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cart Footer   
              <div className="border-t border-primary/30 p-2 bg-background/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="h-1.5 bg-muted/40 rounded w-16" />
                  <div className="h-1.5 bg-primary/20 rounded w-12" />
                </div>
                <div className="h-5 bg-primary/30 rounded w-full border border-primary/20" />
              </div>
              */}
            </div>
          </div>
        </div>
      );
    }

    // Agency Integration - Show workflow/process
    if (graphicType === 'agency-integration') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            {/* Workflow steps */}
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 h-full bg-background/90 rounded border border-border/50 p-2 flex flex-col items-center justify-center gap-1">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                  {step}
                </div>
                <div className="h-1 bg-muted/50 rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Client Communication - Show communication/chat visual
    if (graphicType === 'client-communication') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            {/* Chat bubbles */}
            <div className="flex-1 h-full flex flex-col justify-end gap-1">
              <div className="h-4 bg-background/60 rounded-tl-lg rounded-tr-lg rounded-br-lg w-3/4 border border-border/50" />
              <div className="h-4 bg-background/60 rounded-tl-lg rounded-tr-lg rounded-br-lg w-2/3 border border-border/50" />
            </div>
            <div className="flex-1 h-full flex flex-col justify-start gap-1">
              <div className="h-4 bg-primary/20 rounded-tl-lg rounded-tr-lg rounded-bl-lg w-3/4 ml-auto border border-primary/30" />
              <div className="h-4 bg-primary/20 rounded-tl-lg rounded-tr-lg rounded-bl-lg w-2/3 ml-auto border border-primary/30" />
            </div>
          </div>
        </div>
      );
    }

    // Custom Shopify Apps - App Window with Sidebar and Grid
    if (graphicType === 'custom-apps') {
      return (
        <div className="relative w-full h-full gradient-overlay flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* App Window Container */}
            <div className="w-full bg-background/90 rounded-lg border border-border/50 shadow-lg overflow-hidden flex flex-col">
              {/* Top Bar - Browser/App Header */}
              <div className="h-6 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/30 flex items-center gap-2 px-2">
                {/* Window Controls */}
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-destructive/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                {/* Address Bar/Title Area */}
                <div className="flex-1 h-3 bg-background/70 rounded text-[10px] font-mono text-muted-foreground px-2 flex items-center">
                  app.example.com
                </div>
              </div>
              
              {/* Main Content Area with Sidebar */}
              <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-12 bg-muted/40 border-r border-border/50 flex flex-col items-center py-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 bg-background/60 rounded border border-border/40 flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded bg-primary/20" />
                    </div>
                  ))}
                </div>
                
                {/* Content Area */}
                <div className="flex-1 p-3 bg-gradient-to-br from-primary/5 to-primary/10 space-y-2">
                  {/* Hero Section */}
                  <div className="h-4 bg-primary/20 rounded w-full" />
                  
                  {/* Grid Items - 2 rows, 2 columns (removed bottom 2, expanded remaining) */}
                  <div className="grid grid-cols-2 gap-2 h-full">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="bg-background/60 rounded border border-primary/30 p-2 space-y-1.5 flex flex-col"
                      >
                        {/* Two thin horizontal lines */}
                        <div className="h-0.5 bg-primary/20 rounded w-full" />
                        <div className="h-0.5 bg-primary/20 rounded w-3/4" />
                        {/* Additional content area */}
                        <div className="flex-1 bg-muted/20 rounded border border-border/30" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Next.js Applications - Analytics Dashboard
    if (graphicType === 'nextjs-apps') {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-2">
            {/* Dashboard Container */}
            <div className="w-full bg-background/90 rounded-lg border border-primary/30 shadow-lg overflow-hidden">
              {/* Dashboard Header */}
              <div className="h-5 bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/20 flex items-center px-2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  <div className="w-1 h-1 rounded-full bg-primary/30" />
                </div>
                <div className="flex-1 h-2 bg-background/50 rounded mx-2" />
              </div>
              
              {/* Dashboard Content */}
              <div className="p-3 space-y-2">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-muted/30 rounded border border-border/30 p-1.5">
                      <div className="h-1 bg-primary/20 rounded w-2/3 mb-1" />
                      <div className="h-2 bg-muted/50 rounded w-full" />
                    </div>
                  ))}
                </div>
                
                {/* Chart Area */}
                <div className="bg-muted/20 rounded border border-border/30 p-2">
                  {/* Chart Bars */}
                  <div className="flex items-end justify-between gap-0.5 h-24">
                    {Array.from({ length: 18 }, (_, idx) => {
                      // Create varied heights with some randomness
                      const heights = [45, 52, 38, 68, 55, 42, 75, 48, 62, 35, 58, 70, 50, 65, 40, 72, 46, 60];
                      return (
                        <div 
                          key={idx} 
                          className="flex-1 bg-gradient-to-t from-primary/30 to-primary/20 rounded-t border border-primary/20"
                          style={{ height: `${heights[idx]}%` }}
                        />
                      );
                    })}
                  </div>
                  <div className="h-1 bg-muted/40 rounded w-full mt-2" />
                </div>
                
                {/* Bottom Metrics */}
                <div className="grid grid-cols-2 gap-1.5">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-background/60 rounded border border-border/30 p-1.5">
                      <div className="h-1 bg-primary/20 rounded w-1/2 mb-1" />
                      <div className="flex gap-1">
                        <div className="flex-1 h-3 bg-muted/40 rounded" />
                        <div className="w-3 h-3 bg-primary/20 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Advanced E-Commerce Systems - Show logic/workflow
    if (graphicType === 'ecommerce-systems') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Logic flow diagram */}
            <div className="relative w-full h-full flex items-center justify-center gap-1">
              <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30" />
              <div className="w-0.5 h-4 bg-primary/20" />
              <div className="w-6 h-6 rounded bg-primary/30 border border-primary/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary/50" />
              </div>
              <div className="w-0.5 h-4 bg-primary/20" />
              <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30" />
            </div>
          </div>
        </div>
      );
    }

    // Custom Shopify Integrations - Show integration connections
    if (graphicType === 'integrations') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            {/* Platform boxes */}
            {['Shopify', 'API'].map((label, idx) => (
              <div key={idx} className="flex-1 h-full bg-background/90 rounded border border-border/50 p-2 flex items-center justify-center">
                <div className="text-xs font-mono text-muted-foreground">{label}</div>
              </div>
            ))}
            {/* Connection */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-primary/30" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40 border border-primary/50" />
          </div>
        </div>
      );
    }

    // React Storefront Features - Show React components
    if (graphicType === 'react-storefront') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            {/* Component blocks */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-full bg-background/90 rounded border border-border/50 p-2 flex flex-col gap-1">
                <div className="h-1 bg-primary/20 rounded w-full" />
                <div className="flex-1 bg-muted/30 rounded" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Headless Shopify - Show headless architecture
    if (graphicType === 'headless') {
      return (
        <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center gap-2">
            {/* Frontend */}
            <div className="flex-1 h-full bg-background/90 rounded border border-primary/30 p-2 flex flex-col items-center justify-center gap-1 shadow-lg">
              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">FE</div>
              <div className="h-1 bg-primary/20 rounded w-full" />
            </div>
            {/* API */}
            <div className="w-0.5 h-full bg-primary/30" />
            {/* Backend */}
            <div className="flex-1 h-full bg-background/90 rounded border border-border/50 p-2 flex flex-col items-center justify-center gap-1">
              <div className="w-6 h-6 rounded bg-muted/50 flex items-center justify-center text-xs font-mono">API</div>
              <div className="h-1 bg-muted/50 rounded w-full" />
            </div>
          </div>
        </div>
      );
    }

    // Default fallback - Generic service visual
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 bg-background/90 rounded-lg border border-border/50 shadow-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 bg-primary/20 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[155px] overflow-hidden rounded-t-lg" data-component="ServiceGraphic" data-file="components/services/service-graphic.tsx">
      {renderGraphic()}
    </div>
  );
}

