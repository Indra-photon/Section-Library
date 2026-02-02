'use client';

import Link from 'next/link';
import { ShowcaseSidebar } from '@/components/showcase-sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { sectionRegistry } from '@/lib/sections/registry';
import { ExternalLink } from 'lucide-react';

export default function ShowcasePage() {
  // Get all sections from the registry
  const sections = Object.entries(sectionRegistry);

  return (
    <div className="flex min-h-screen">
      <ShowcaseSidebar />

      <main className="flex-1 overflow-y-auto">
        {sections.map(([id, section], index) => {
          const Component = section.component;
          const props = section.previewData;

          return (
            <div key={id}>
              {index > 0 && <Separator className="my-0" />}
              <div id={id} className="relative group">
                <Component {...props} />
                <Link href={`/sections/${id}`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <ExternalLink className="size-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
