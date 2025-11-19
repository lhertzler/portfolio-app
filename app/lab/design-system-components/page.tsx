"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu"
import { toast } from "sonner"
import Link from "next/link"
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Github, 
  Twitter, 
  Linkedin,
  Mail,
  User,
  Music,
  ArrowRight,
  ArrowLeft
} from "lucide-react"

const components = [
  { id: "card", label: "Card" },
  { id: "accordion", label: "Accordion" },
  { id: "alert", label: "Alert" },
  { id: "switch", label: "Switch" },
  { id: "table", label: "Table" },
  { id: "carousel", label: "Carousel" },
  { id: "skeletons", label: "Skeletons" },
  { id: "sonner", label: "Sonner" },
  { id: "context-menu", label: "Context Menu" },
  { id: "hero", label: "Hero" },
  { id: "profile-card", label: "Profile Card" },
]

export default function LabPage() {
  const [switchChecked, setSwitchChecked] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Back Button */}
      <div>
        <Button variant="ghost" asChild>
          <Link href="/lab" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Lab
          </Link>
        </Button>
      </div>

      {/* Component Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <h2 className="text-3xl font-bold">Component Gallery</h2>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          Experimenting with tailwind and design systems to create a component library...
        </p>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="card" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2 h-auto p-2">
          {components.map((component) => (
            <TabsTrigger 
              key={component.id} 
              value={component.id}
              className="text-xs md:text-sm"
            >
              {component.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Card Component */}
        <TabsContent value="card" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Card</h2>
      <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the card content area where you can place any content.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Another Card</CardTitle>
                  <CardDescription>With different content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Cards are versatile components for displaying grouped information.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Accordion Component */}
        <TabsContent value="accordion" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Accordion</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <Card>
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="px-6">What is an accordion?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    An accordion is a vertically stacked set of interactive headings that each reveal a section of content.
                  </AccordionContent>
                </AccordionItem>
              </Card>
              <Card>
                <AccordionItem value="item-2" className="border-0">
                  <AccordionTrigger className="px-6">How does it work?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    Clicking on an accordion header expands or collapses the associated content section.
                  </AccordionContent>
                </AccordionItem>
              </Card>
              <Card>
                <AccordionItem value="item-3" className="border-0">
                  <AccordionTrigger className="px-6">When to use accordions?</AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    Use accordions when you want to organize content into collapsible sections, especially for FAQs or feature lists.
                  </AccordionContent>
                </AccordionItem>
              </Card>
            </Accordion>
          </div>
        </TabsContent>

        {/* Alert Component */}
        <TabsContent value="alert" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Alert</h2>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Info Alert</AlertTitle>
                <AlertDescription>
                  This is an informational alert message.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  This is a destructive alert for errors or warnings.
                </AlertDescription>
              </Alert>
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  This is a success message alert.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>

        {/* Switch Component */}
        <TabsContent value="switch" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Switch</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Enable notifications</label>
                    <p className="text-xs text-muted-foreground">Receive alerts about your account activity</p>
                  </div>
                  <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Dark mode</label>
                    <p className="text-xs text-muted-foreground">Toggle dark theme</p>
                  </div>
                  <Switch />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Auto-save</label>
                    <p className="text-xs text-muted-foreground">Automatically save your work</p>
                  </div>
                  <Switch defaultChecked />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Table Component */}
        <TabsContent value="table" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Table</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>Developer</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pending</Badge>
                    </TableCell>
                    <TableCell>Designer</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bob Johnson</TableCell>
                    <TableCell>
                      <Badge variant="outline">Inactive</Badge>
                    </TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Carousel Component */}
        <TabsContent value="carousel" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Carousel</h2>
            <div>
              <Carousel className="w-full">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-video items-center justify-center p-6">
                            <span className="text-4xl font-semibold">Slide {index + 1}</span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </TabsContent>

        {/* Skeletons Component */}
        <TabsContent value="skeletons" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Skeletons</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Sonner Component */}
        <TabsContent value="sonner" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Sonner (Toast)</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => toast("Hello from Sonner!")}
                  variant="default"
                >
                  Default Toast
                </Button>
                <Button
                  onClick={() => toast.success("Success!")}
                  variant="default"
                >
                  Success Toast
                </Button>
                <Button
                  onClick={() => toast.error("Error occurred!")}
                  variant="destructive"
                >
                  Error Toast
                </Button>
                <Button
                  onClick={() => toast.info("Here's some info")}
                  variant="outline"
                >
                  Info Toast
                </Button>
                <Button
                  onClick={() => toast.warning("Warning message")}
                  variant="outline"
                >
                  Warning Toast
                </Button>
                <Button
                  onClick={() => toast("Custom toast", {
                    description: "This is a longer description",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  })}
                  variant="secondary"
                >
                  Action Toast
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Context Menu Component */}
        <TabsContent value="context-menu" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Context Menu</h2>
            <div>
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[150px] w-full items-center justify-center rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground">
                    Right click here to open context menu
                  </p>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Back</ContextMenuItem>
                  <ContextMenuItem disabled>Forward</ContextMenuItem>
                  <ContextMenuItem>Reload</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Save As...</ContextMenuItem>
                  <ContextMenuItem>Print</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>View Source</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          </div>
        </TabsContent>

        {/* Hero Component */}
        <TabsContent value="hero" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Hero</h2>
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <h3 className="text-4xl font-bold">Welcome to the Hero Section</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      This is a hero component built with card, image area, heading, subtext, and button.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button>Get Started</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Card Component */}
        <TabsContent value="profile-card" className="mt-8">
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Profile Card</h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">
                        Full-Stack Developer
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Building beautiful and functional web experiences with modern technologies.
                    </p>
                    <div className="flex gap-4 pt-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
        </div>
      </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
