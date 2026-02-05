import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export interface Hero1Props {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt?: string;
}

export function Hero1({
  title,
  subtitle,
  ctaText = 'Shop Now',
  ctaLink,
  imageSrc,
  imageAlt = 'Hero image',
}: Hero1Props) {
  return (
    <section className="relative min-h-[600px] flex items-center py-20 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Heading className="text-4xl md:text-5xl lg:text-6xl">
              {title}
            </Heading>
            {subtitle && (
              <Paragraph className="text-lg text-muted-foreground">
                {subtitle}
              </Paragraph>
            )}
            <Button size="lg" asChild>
              <a href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 size-5" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}