// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import { Container } from '@/components/Container';
// import { Heading } from '@/components/Heading';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { getSection, getAllSectionIds } from '@/lib/sections/registry';
// import { ArrowLeft, Eye, Code2, Terminal } from 'lucide-react';

// interface PageProps {
//   params: Promise<{
//     section: string;
//     slug: string;
//   }>;
// }

// export async function generateStaticParams() {
//   const allIds = getAllSectionIds();
  
//   return allIds.map((id) => {
//     const [section, ...rest] = id.split('-');
//     return {
//       section,
//       slug: id,
//     };
//   });
// }

// export default async function SectionDetailPage({ params }: PageProps) {
//   const resolvedParams = await params;
//   const { section, slug } = resolvedParams;

//   const sectionData = getSection(slug);

//   if (!sectionData) {
//     notFound();
//   }

//   const { metadata, component: Component, previewData } = sectionData;

//   return (
//     <div className="py-12">
//       <Container>
//         {/* Header */}
//         <div className="mb-8">
//           <Link href={`/${section}`}>
//             <Button variant="ghost" size="sm" className="mb-4">
//               <ArrowLeft className="mr-2 size-4" />
//               Back to {section}
//             </Button>
//           </Link>

//           <div className="flex items-start justify-between gap-4 flex-wrap">
//             <div>
//               <Heading className="text-3xl md:text-4xl mb-2">
//                 {metadata.name}
//               </Heading>
//               <p className="text-lg text-muted-foreground">
//                 {metadata.description}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <Badge variant={metadata.tier === 'pro' ? 'default' : 'secondary'}>
//                 {metadata.tier}
//               </Badge>
//               <Badge variant="outline">{metadata.complexity}</Badge>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <Tabs defaultValue="preview" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 max-w-md">
//             <TabsTrigger value="preview">
//               <Eye className="mr-2 size-4" />
//               Preview
//             </TabsTrigger>
//             <TabsTrigger value="code">
//               <Code2 className="mr-2 size-4" />
//               Code
//             </TabsTrigger>
//             <TabsTrigger value="cli">
//               <Terminal className="mr-2 size-4" />
//               CLI
//             </TabsTrigger>
//           </TabsList>

//           {/* Preview Tab */}
//           <TabsContent value="preview" className="mt-6 space-y-6">
//             <Card>
//               <CardContent className="p-0">
//                 <div className="border rounded-lg overflow-hidden bg-background">
//                   <Component {...previewData} />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Metadata */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Details</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Section Type</span>
//                     <span className="text-sm font-medium">{metadata.sectionType}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Complexity</span>
//                     <span className="text-sm font-medium capitalize">{metadata.complexity}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Responsive</span>
//                     <span className="text-sm font-medium">{metadata.responsive ? 'Yes' : 'No'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Dark Mode</span>
//                     <span className="text-sm font-medium">{metadata.darkMode ? 'Yes' : 'No'}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-muted-foreground">Animations</span>
//                     <span className="text-sm font-medium">{metadata.animations ? 'Yes' : 'No'}</span>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Dependencies</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {metadata.dependencies.npm.length > 0 && (
//                     <div>
//                       <p className="text-sm font-medium mb-2">NPM Packages</p>
//                       <div className="flex flex-wrap gap-2">
//                         {metadata.dependencies.npm.map((dep) => (
//                           <Badge key={dep} variant="secondary">{dep}</Badge>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                   {metadata.dependencies.shadcn.length > 0 && (
//                     <div>
//                       <p className="text-sm font-medium mb-2">Shadcn Components</p>
//                       <div className="flex flex-wrap gap-2">
//                         {metadata.dependencies.shadcn.map((dep) => (
//                           <Badge key={dep} variant="secondary">{dep}</Badge>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Tags */}
//             {metadata.tags.length > 0 && (
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Tags</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {metadata.tags.map((tag) => (
//                       <Badge key={tag} variant="outline">{tag}</Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>

//           {/* Code Tab */}
//           <TabsContent value="code" className="mt-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Component Code</CardTitle>
//                 <CardDescription>
//                   Copy the code below and paste it into your project
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="bg-muted p-4 rounded-lg">
//                   <p className="text-sm text-muted-foreground">
//                     Code display will be implemented in the next step
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* CLI Tab */}
//           <TabsContent value="cli" className="mt-6 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Install via CLI</CardTitle>
//                 <CardDescription>
//                   Run this command to install the component
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="bg-muted p-4 rounded-lg font-mono text-sm">
//                   npx shadcn@latest add https://itshover.com/r/{slug}.json
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Manual Installation</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <p className="font-medium mb-2">1. Install dependencies</p>
//                   <div className="bg-muted p-3 rounded-lg font-mono text-sm">
//                     npm install {metadata.dependencies.npm.join(' ')}
//                   </div>
//                 </div>

//                 {metadata.dependencies.shadcn.length > 0 && (
//                   <div>
//                     <p className="font-medium mb-2">2. Install shadcn components</p>
//                     <div className="bg-muted p-3 rounded-lg font-mono text-sm">
//                       npx shadcn@latest add {metadata.dependencies.shadcn.join(' ')}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <p className="font-medium mb-2">3. Copy the component code</p>
//                   <p className="text-sm text-muted-foreground">
//                     Copy the code from the Code tab and paste it into your project
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </Container>
//     </div>
//   );
// }


'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSection } from '@/lib/sections/registry';
import { ArrowLeft, Eye, Code2, Terminal } from 'lucide-react';

interface PageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

import { CodeBlock } from '@/components/code-block';
import { useEffect, useState } from 'react';

function CodeTabContent({ slug }: { slug: string }) {
  const [sourceFiles, setSourceFiles] = useState<Array<{ name: string; content: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/source/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setSourceFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Loading code...</p>
        </CardContent>
      </Card>
    );
  }

  if (sourceFiles.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Source code not available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {sourceFiles.map((file) => (
        <CodeBlock
          key={file.name}
          code={file.content}
          filename={file.name}
          language="typescript"
          showLineNumbers={true}
        />
      ))}
    </div>
  );
}


export default function SectionDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { section, slug } = resolvedParams;

  const sectionData = getSection(slug);

  if (!sectionData) {
    notFound();
  }

  const { metadata, component: Component, previewData } = sectionData;

  return (
    <div className="py-12">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${section}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              Back to {section}
            </Button>
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Heading className="text-3xl md:text-4xl mb-2">
                {metadata.name}
              </Heading>
              <p className="text-lg text-muted-foreground">
                {metadata.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant={metadata.tier === 'pro' ? 'default' : 'secondary'}>
                {metadata.tier}
              </Badge>
              <Badge variant="outline">{metadata.complexity}</Badge>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="preview">
              <Eye className="mr-2 size-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code2 className="mr-2 size-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="cli">
              <Terminal className="mr-2 size-4" />
              CLI
            </TabsTrigger>
          </TabsList>

          {/* Preview Tab */}
          <TabsContent value="preview" className="mt-6 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="border rounded-lg overflow-hidden bg-background">
                  <Component {...previewData} />
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Section Type</span>
                    <span className="text-sm font-medium">{metadata.sectionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Complexity</span>
                    <span className="text-sm font-medium capitalize">{metadata.complexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Responsive</span>
                    <span className="text-sm font-medium">{metadata.responsive ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dark Mode</span>
                    <span className="text-sm font-medium">{metadata.darkMode ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Animations</span>
                    <span className="text-sm font-medium">{metadata.animations ? 'Yes' : 'No'}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dependencies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {metadata.dependencies.npm.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">NPM Packages</p>
                      <div className="flex flex-wrap gap-2">
                        {metadata.dependencies.npm.map((dep: string) => (
                          <Badge key={dep} variant="secondary">{dep}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {metadata.dependencies.shadcn.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Shadcn Components</p>
                      <div className="flex flex-wrap gap-2">
                        {metadata.dependencies.shadcn.map((dep: string) => (
                          <Badge key={dep} variant="secondary">{dep}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            {metadata.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Code Tab */}
          {/* Code Tab */}
        <TabsContent value="code" className="mt-6">
            <CodeTabContent slug={slug} />
        </TabsContent>

          {/* CLI Tab */}
          <TabsContent value="cli" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Install via CLI</CardTitle>
                <CardDescription>
                  Run this command to install the component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    npx shadcn@latest add {process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/r/{slug}.json
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manual Installation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-2">1. Install dependencies</p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    npm install {metadata.dependencies.npm.join(' ')}
                  </div>
                </div>

                {metadata.dependencies.shadcn.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">2. Install shadcn components</p>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      npx shadcn@latest add {metadata.dependencies.shadcn.join(' ')}
                    </div>
                  </div>
                )}

                <div>
                  <p className="font-medium mb-2">3. Copy the component code</p>
                  <p className="text-sm text-muted-foreground">
                    Copy the code from the Code tab and paste it into your project
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
}