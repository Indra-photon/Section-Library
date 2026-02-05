'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface SectionPreviewGridProps {
  sections: Array<{
    id: string;
    metadata: any;
    component: React.ComponentType<any>;
    previewData: any;
  }>;
  sectionType: string;
}

export function SectionPreviewGrid({ sections, sectionType }: SectionPreviewGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map(({ id, metadata, component: Component, previewData }) => (
        <Card key={id} className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
          {/* Preview */}
          <div className="relative h-48 bg-muted overflow-hidden border-b">
            <div className="scale-[0.3] origin-top-left w-[333%] h-[333%]">
              <Component {...previewData} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg">{metadata.name}</CardTitle>
              <Badge variant={metadata.tier === 'pro' ? 'default' : 'secondary'}>
                {metadata.tier}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {metadata.description}
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <Link href={`/${sectionType}/${id}`} className="w-full">
              <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                View Details
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}