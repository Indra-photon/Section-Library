'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { Leaf, Flame } from 'lucide-react';
import Image from 'next/image';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
  vegetarian?: boolean;
  spicy?: boolean;
  popular?: boolean;
}

export interface MenuCategory {
  category: string;
  description?: string;
  items: MenuItem[];
}

export interface RestaurantMenuProps {
  title: string;
  subtitle?: string;
  categories: MenuCategory[];
}

export function RestaurantMenu({ title, subtitle, categories }: RestaurantMenuProps) {
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

          <div className="space-y-16">
            {categories.map((category, catIndex) => (
              <div key={catIndex} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
                  {category.description && (
                    <p className="text-muted-foreground">{category.description}</p>
                  )}
                  <Separator />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-lg">{item.name}</CardTitle>
                              {item.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <CardDescription className="line-clamp-2">
                              {item.description}
                            </CardDescription>
                          </div>
                          {item.image && (
                            <div className="relative size-20 shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold tabular-nums text-foreground">{item.price}</span>
                          <div className="flex gap-2">
                            {item.vegetarian && (
                              <Leaf className="size-5 text-green-600 dark:text-green-500" aria-label="Vegetarian" />
                            )}
                            {item.spicy && (
                              <Flame className="size-5 text-red-600 dark:text-red-500" aria-label="Spicy" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
