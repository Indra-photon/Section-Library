'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShowcaseSidebar } from '@/components/showcase-sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { sectionRegistry } from '@/lib/sections/registry';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/Container';

export default function ShowcasePage() {
  const searchParams = useSearchParams();
  const domainFilter = searchParams.get('domain');

  // Get all sections from the registry and filter by domain if specified
  const allSections = Object.entries(sectionRegistry);
  const sections = domainFilter
    ? allSections.filter(([, section]) => section.metadata.domain === domainFilter)
    : allSections;

  return (
    <div className="flex min-h-screen">
      <ShowcaseSidebar activeDomain={domainFilter} />

      <Container className="flex-1 overflow-y-auto max-w-5xl mx-auto">
        {sections.length > 0 ? (
          sections.map(([id, section], index) => {
            const Component = section.component;
            const props = section.previewData;

            return (
              <div key={id}>
                {index > 0 && <Separator className="my-0" />}
                <div id={id} className="relative group">
                  <Component {...props} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">No sections found for this domain</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
