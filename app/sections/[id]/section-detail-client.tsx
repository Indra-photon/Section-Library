'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionMetadata } from '@/lib/sections/types';
import { SectionFiles } from '@/lib/sections/get-source-code';
import { CodeBlock } from '@/components/code-block';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/Container';
import { ArrowLeft, Code2, Eye, Terminal } from 'lucide-react';

interface SectionDetailClientProps {
  metadata: SectionMetadata;
  sectionId: string;
  sourceCode: SectionFiles;
  installCommand: string;
  manualSteps: string[];
  componentName: string;
  previewProps: any;
  children: React.ReactNode;
}

export function SectionDetailClient({
  metadata,
  sectionId,
  sourceCode,
  installCommand,
  manualSteps,
  componentName,
  previewProps,
  children,
}: SectionDetailClientProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/showcase">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Showcase
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{metadata.domain}</Badge>
              <Badge variant="outline">{metadata.category}</Badge>
              <Badge variant={metadata.tier === 'free' ? 'default' : 'secondary'}>
                {metadata.tier}
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        {/* Title and Description */}
        <div className="mb-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">{metadata.name}</h1>
          <p className="text-lg text-muted-foreground">{metadata.description}</p>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Preview and Code Tabs */}
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="size-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2">
                <Code2 className="size-4" />
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-6">
              <div className="border border-border rounded-lg overflow-hidden bg-background">
                {children}
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Component</h3>
                <CodeBlock
                  code={sourceCode.component}
                  language="typescript"
                  fileName="component.tsx"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Metadata</h3>
                <CodeBlock
                  code={sourceCode.metadata}
                  language="typescript"
                  fileName="metadata.ts"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Preview Data</h3>
                <CodeBlock
                  code={sourceCode.previewData}
                  language="typescript"
                  fileName="preview-data.ts"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Installation Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Terminal className="size-6" />
                Installation
              </h2>
              <p className="text-muted-foreground">
                Follow these steps to add this component to your project
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>CLI Installation (Coming Soon)</CardTitle>
                <CardDescription>
                  Use our CLI tool to automatically install this component with all dependencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={installCommand}
                  language="bash"
                  showLineNumbers={false}
                />
                <p className="text-xs text-muted-foreground mt-3">
                  This command will be available soon and will handle all installation steps automatically
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manual Installation</CardTitle>
                <CardDescription>
                  Install the component manually by following these steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Install Dependencies */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Install Dependencies
                      </h4>
                      <div className="space-y-2">
                        {manualSteps.slice(0, 2).map((step, i) => (
                          <CodeBlock
                            key={i}
                            code={step}
                            language="bash"
                            showLineNumbers={false}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 2: Copy Component */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Copy the Component Code
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create the following file and paste the component code from the Code tab above
                      </p>
                      <CodeBlock
                        code={`lib/sections/${metadata.domain}/${metadata.category}/component.tsx`}
                        language="bash"
                        showLineNumbers={false}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Step 3: Import and Use */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Import and Use the Component
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Import the component in your page and use it with the required props
                      </p>
                      <CodeBlock
                        code={`import { ${componentName} } from '@/lib/sections/${metadata.domain}/${metadata.category}';

export default function Page() {
  return (
    <${componentName}
      ${Object.keys(previewProps)
        .slice(0, 3)
        .map((key) => {
          const value = previewProps[key];
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          }
          return `${key}={...}`;
        })
        .join('\n      ')}
    />
  );
}`}
                        language="typescript"
                        showLineNumbers={false}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
