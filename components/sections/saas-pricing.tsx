import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
}

interface SaasPricingProps {
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export function SaasPricing({ title, subtitle, tiers }: SaasPricingProps) {
  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading className="text-balance">{title}</Heading>
            {subtitle && (
              <Paragraph className="text-pretty max-w-2xl mx-auto text-muted-foreground">
                {subtitle}
              </Paragraph>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <Card
                key={index}
                className={cn(
                  'relative flex flex-col',
                  tier.popular && 'border-primary shadow-lg dark:shadow-primary/20'
                )}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-6">
                  <div>
                    <span className="text-4xl font-bold tabular-nums">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3">
                        <Check className="size-5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <a href={tier.ctaLink}>{tier.cta}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
