// 'use client';

// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { Container } from '@/components/Container';
// import { Heading } from '@/components/Heading';
// import { Paragraph } from '@/components/Paragraph';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { getSectionsByType } from '@/lib/sections/registry';
// import { ArrowRight, Code2 } from 'lucide-react';

// const VALID_SECTION_TYPES = ['hero', 'navbar', 'testimonials', 'pricing', 'features', 'cta', 'faq', 'footer'];

// interface PageProps {
//   params: Promise<{
//     section: string;
//   }>;
// }

// export async function generateStaticParams() {
//   return VALID_SECTION_TYPES.map((section) => ({
//     section,
//   }));
// }

// export default async function SectionListPage({ params }: PageProps) {
//   const resolvedParams = await params;
//   const { section } = resolvedParams;

//   // Validate section type
//   if (!VALID_SECTION_TYPES.includes(section)) {
//     notFound();
//   }

//   const sections = getSectionsByType(section);

//   const sectionTitles: Record<string, string> = {
//     hero: 'Hero Sections',
//     navbar: 'Navigation Bars',
//     testimonials: 'Testimonials',
//     pricing: 'Pricing Sections',
//     features: 'Features',
//     cta: 'Call to Action',
//     faq: 'FAQ Sections',
//     footer: 'Footer Sections',
//   };

//   return (
//     <div className="py-20">
//       <Container>
//         {/* Header */}
//         <div className="mb-12">
//           <Heading className="text-4xl md:text-5xl mb-4">
//             {sectionTitles[section]}
//           </Heading>
//           <Paragraph className="text-lg text-muted-foreground">
//             {sections.length} {sections.length === 1 ? 'variation' : 'variations'} available
//           </Paragraph>
//         </div>

//         {/* Grid of variations */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sections.map(({ id, metadata, component: Component, previewData }) => (
//             <Link key={id} href={`/${section}/${id}`}>
//               <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden">
//                 {/* Preview */}
//                 <div className="relative h-48 bg-muted overflow-hidden border-b">
//                   <div className="scale-[0.3] origin-top-left w-[333%] h-[333%]">
//                     <Component {...previewData} />
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                 </div>

//                 <CardHeader>
//                   <div className="flex items-start justify-between gap-2">
//                     <CardTitle className="text-lg">{metadata.name}</CardTitle>
//                     <Badge variant={metadata.tier === 'pro' ? 'default' : 'secondary'}>
//                       {metadata.tier}
//                     </Badge>
//                   </div>
//                   <CardDescription className="line-clamp-2">
//                     {metadata.description}
//                   </CardDescription>
//                 </CardHeader>

//                 <CardFooter>
//                   <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                     View Details
//                     <ArrowRight className="ml-2 size-4" />
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </Link>
//           ))}
//         </div>

//         {/* Empty state */}
//         {sections.length === 0 && (
//           <div className="text-center py-12">
//             <Code2 className="size-12 mx-auto text-muted-foreground mb-4" />
//             <Heading className="text-2xl mb-2">No variations yet</Heading>
//             <Paragraph className="text-muted-foreground">
//               Check back soon for new {section} components!
//             </Paragraph>
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// }


'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSectionsByType } from '@/lib/sections/registry';
import { ArrowRight, Code2 } from 'lucide-react';
import { use } from 'react';

const VALID_SECTION_TYPES = ['hero', 'navbar', 'testimonials', 'pricing', 'features', 'cta', 'faq', 'footer'];

interface PageProps {
  params: Promise<{
    section: string;
  }>;
}

export default function SectionListPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { section } = resolvedParams;

  // Validate section type
  if (!VALID_SECTION_TYPES.includes(section)) {
    notFound();
  }

  const sections = getSectionsByType(section);

  const sectionTitles: Record<string, string> = {
    hero: 'Hero Sections',
    navbar: 'Navigation Bars',
    testimonials: 'Testimonials',
    pricing: 'Pricing Sections',
    features: 'Features',
    cta: 'Call to Action',
    faq: 'FAQ Sections',
    footer: 'Footer Sections',
  };

  return (
    <div className="py-20">
      <Container>
        {/* Header */}
        <div className="mb-12">
          <Heading className="text-4xl md:text-5xl mb-4">
            {sectionTitles[section]}
          </Heading>
          <Paragraph className="text-lg text-muted-foreground">
            {sections.length} {sections.length === 1 ? 'variation' : 'variations'} available
          </Paragraph>
        </div>

        {/* Grid of variations */}
        {sections.length > 0 ? (
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
                  <Link href={`/${section}/${id}`} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Details
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-12">
            <Code2 className="size-12 mx-auto text-muted-foreground mb-4" />
            <Heading className="text-2xl mb-2">No variations yet</Heading>
            <Paragraph className="text-muted-foreground">
              Check back soon for new {section} components!
            </Paragraph>
          </div>
        )}
      </Container>
    </div>
  );
}