'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-posts';
import { formatDate } from '@/lib/utils';
import { useIsMobile } from '@/lib/use-is-mobile';

export default function BlogPage() {
  const isMobile = useIsMobile();
  const publishedPosts = getAllPosts().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={isMobile ? undefined : { duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts on development, design, and music.
          </p>
        </motion.div>

        {/* Blog Posts List */}
        {publishedPosts.length > 0 ? (
          <div className="space-y-6">
            {publishedPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={isMobile ? undefined : { delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl sm:text-2xl mb-2 md:mb-2 group-hover:text-primary transition-colors break-words">
                          <Link href={`/blog/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <Badge variant="secondary" className="mb-2 md:hidden shrink-0 w-fit">
                          {post.category}
                        </Badge>
                        <CardDescription className="text-sm sm:text-base break-words">{post.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="hidden md:flex shrink-0">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date, 'long')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="font-mono group/btn">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                No blog posts yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

