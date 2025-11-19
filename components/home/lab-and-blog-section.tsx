'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, BookOpen, Calendar, Clock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { getFeaturedPosts } from '@/lib/blog-posts';

export function LabAndBlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredPosts = getFeaturedPosts().slice(0, 1); // Get the latest featured post
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Cards start far apart, come together when centered, then stay together
  const labX = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, 0]);
  const blogX = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id="lab"
      data-section="lab"
      data-component="LabAndBlogSection"
      data-file="components/home/lab-and-blog-section.tsx"
      className="py-8 sm:py-12 md:pb-16 md:pt-16 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <motion.div
            style={{ x: labX, opacity }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="md:col-span-1"
          >
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
          </motion.div>

          <motion.div
            style={{ x: blogX, opacity }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="md:col-span-2"
          >
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
              {featuredPosts.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    {featuredPosts.map((post) => (
                      <Link 
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block p-4 border rounded-lg hover:border-primary/50 transition-colors group"
                      >
                        <h4 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(post.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/blog">View All Posts</Link>
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </CardContent>
          </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

