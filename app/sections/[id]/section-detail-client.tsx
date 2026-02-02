'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SectionMetadata } from '@/lib/sections/types';
import { SectionFiles } from '@/lib/sections/get-source-code';
import { CodeBlock } from '@/components/code-block';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Container } from '@/components/Container';
import { ArrowLeft, Code2, Eye, Terminal, Sparkles, Package } from 'lucide-react';

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

type Tab = 'preview' | 'code' | 'cli';

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
  const [activeTab, setActiveTab] = useState<Tab>('preview');

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
                  Back
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-bold text-foreground">{metadata.name}</h1>
                <p className="text-sm text-muted-foreground">{metadata.description}</p>
              </div>
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

      {/* Tabs */}
      <div className="border-b border-border">
        <Container>
          <div className="flex items-center gap-1 py-2">
            <Button
              variant={activeTab === 'preview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('preview')}
              className="gap-2"
            >
              <Eye className="size-4" />
              Preview
            </Button>
            <Button
              variant={activeTab === 'code' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('code')}
              className="gap-2"
            >
              <Code2 className="size-4" />
              Code
            </Button>
            <Button
              variant={activeTab === 'cli' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('cli')}
              className="gap-2"
            >
              <Terminal className="size-4" />
              CLI
            </Button>
          </div>
        </Container>
      </div>

      {/* Content */}
      <div className="py-8">
        {activeTab === 'preview' && (
          <div className="space-y-8">
            {/* Preview */}
            <div className="border border-border rounded-lg overflow-hidden bg-background">
              {children}
            </div>

            {/* Metadata */}
            <Container>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="size-5" />
                    Details
                  </h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Complexity:</dt>
                      <dd className="font-medium text-foreground capitalize">{metadata.complexity}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Responsive:</dt>
                      <dd className="font-medium text-foreground">{metadata.responsive ? 'Yes' : 'No'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Dark Mode:</dt>
                      <dd className="font-medium text-foreground">{metadata.darkMode ? 'Yes' : 'No'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Animations:</dt>
                      <dd className="font-medium text-foreground">{metadata.animations ? 'Yes' : 'No'}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Package className="size-5" />
                    Dependencies
                  </h3>
                  <div className="space-y-3">
                    {metadata.dependencies.npm && metadata.dependencies.npm.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">NPM Packages:</p>
                        <div className="flex flex-wrap gap-2">
                          {metadata.dependencies.npm.map((dep) => (
                            <Badge key={dep} variant="outline" className="font-mono text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {metadata.dependencies.shadcn && metadata.dependencies.shadcn.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Shadcn UI:</p>
                        <div className="flex flex-wrap gap-2">
                          {metadata.dependencies.shadcn.map((dep) => (
                            <Badge key={dep} variant="outline" className="font-mono text-xs">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {metadata.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </div>
        )}

        {activeTab === 'code' && (
          <Container>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Component Code</h3>
                <CodeBlock
                  code={sourceCode.component}
                  language="typescript"
                  fileName="component.tsx"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Metadata</h3>
                <CodeBlock
                  code={sourceCode.metadata}
                  language="typescript"
                  fileName="metadata.ts"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Preview Data</h3>
                <CodeBlock
                  code={sourceCode.previewData}
                  language="typescript"
                  fileName="preview-data.ts"
                />
              </div>
            </div>
          </Container>
        )}

        {activeTab === 'cli' && (
          <Container>
            <div className="space-y-8 max-w-3xl">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Terminal className="size-5" />
                  Quick Install
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use this command to quickly add the section to your project:
                </p>
                <CodeBlock
                  code={installCommand}
                  language="bash"
                  showLineNumbers={false}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  * Coming soon - This will install the section with all dependencies
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Manual Installation</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">1. Install dependencies</p>
                    {manualSteps.slice(0, 2).map((step, i) => (
                      <div key={i} className="mb-2">
                        <CodeBlock code={step} language="bash" showLineNumbers={false} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">2. Copy the component</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Create the file and paste the component code from the Code tab.
                    </p>
                    <CodeBlock
                      code={`lib/sections/${metadata.domain}/${sectionId}/component.tsx`}
                      language="bash"
                      showLineNumbers={false}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">3. Import and use</p>
                    <CodeBlock
                      code={`import { ${componentName} } from '@/lib/sections/${metadata.domain}/${sectionId}';

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
            </div>
          </Container>
        )}
      </div>
    </div>
  );
}
