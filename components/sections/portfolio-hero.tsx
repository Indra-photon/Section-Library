import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

interface PortfolioHeroProps {
  name: string;
  tagline: string;
  description: string;
  avatarSrc: string;
  skills: string[];
  ctaText?: string;
  ctaLink: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export function PortfolioHero({
  name,
  tagline,
  description,
  avatarSrc,
  skills,
  ctaText = 'View Projects',
  ctaLink,
  socialLinks
}: PortfolioHeroProps) {
  return (
    <section className="relative min-h-dvh flex items-center py-20 bg-background">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative size-64 lg:size-80 shrink-0"
          >
            <div className="relative size-full rounded-full overflow-hidden border-4 border-border">
              <Image
                src={avatarSrc}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <div className="space-y-4">
              <Heading className="text-balance">{name}</Heading>
              <p className="text-xl text-muted-foreground">{tagline}</p>
              <Paragraph className="text-pretty max-w-2xl">
                {description}
              </Paragraph>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <a href={ctaLink}>
                  {ctaText}
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </a>
              </Button>

              {socialLinks && (
                <div className="flex gap-2">
                  {socialLinks.github && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={socialLinks.github} aria-label="GitHub Profile">
                        <Github className="size-5" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.linkedin && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={socialLinks.linkedin} aria-label="LinkedIn Profile">
                        <Linkedin className="size-5" />
                      </a>
                    </Button>
                  )}
                  {socialLinks.email && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={`mailto:${socialLinks.email}`} aria-label="Email Contact">
                        <Mail className="size-5" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
