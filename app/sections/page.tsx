import Link from 'next/link';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSectionsByDomain, getAllSectionsMetadata } from '@/lib/sections/registry';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SectionsPage() {
  const sectionsByDomain = getSectionsByDomain();
  const totalSections = getAllSectionsMetadata().length;

  return (
    <div className="min-h-screen bg-background py-20">
      <Container>
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <Heading className="text-balance">Sections Library</Heading>
            <Paragraph className="text-pretty max-w-2xl mx-auto text-muted-foreground">
              Beautiful, responsive section components ready to use in your projects.
              {totalSections} sections across {Object.keys(sectionsByDomain).length} domains.
            </Paragraph>
          </div>

          {/* Sections by Domain */}
          {Object.entries(sectionsByDomain).map(([domain, sections]) => (
            <div key={domain} className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground capitalize">
                  {domain.replace('-', ' ')}
                </h2>
                <Badge variant="secondary">{sections.length}</Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sections.map((section) => (
                  <Link
                    key={section.metadata.id}
                    href={`/sections/${section.metadata.id}`}
                  >
                    <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {section.metadata.name}
                          </CardTitle>
                          {section.metadata.tier === 'pro' && (
                            <Sparkles className="size-5 text-amber-500 shrink-0" />
                          )}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {section.metadata.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {section.metadata.category}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs capitalize"
                          >
                            {section.metadata.complexity}
                          </Badge>
                          {section.metadata.animations && (
                            <Badge variant="secondary" className="text-xs">
                              Animated
                            </Badge>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          View Details
                          <ArrowRight className="size-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
