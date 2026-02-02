import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface EcommerceHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt?: string;
}

export function EcommerceHero({
  title,
  subtitle,
  ctaText = 'Shop Now',
  ctaLink,
  imageSrc,
  imageAlt = 'Hero image'
}: EcommerceHeroProps) {
  return (
    <section className="relative h-dvh bg-background">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-dvh py-20 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <Heading className="text-balance">{title}</Heading>
            {subtitle && (
              <Paragraph className="text-pretty max-w-2xl">
                {subtitle}
              </Paragraph>
            )}
            <div>
              <Button size="lg" asChild>
                <a href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 relative w-full max-w-lg aspect-square"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain dark:opacity-90"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
