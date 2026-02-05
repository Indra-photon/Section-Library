import { ReactElement } from 'react';

/**
 * Section metadata
 */
export interface SectionMetadata {
  id: string; // e.g., "hero-batman", "footer-minimal"
  name: string; // Display name
  description: string;
  sectionType: 'hero' | 'footer' | 'navbar' | 'testimonials' | 'pricing' | 'features' | 'cta' | 'faq';
  tier: 'free' | 'pro';
  complexity: 'simple' | 'moderate' | 'complex';
  tags: string[];
  dependencies: {
    npm: string[];
    shadcn: string[];
    projectComponents: string[];
    fonts?: string[];
  };
  responsive: boolean;
  darkMode: boolean;
  animations: boolean;
}

/**
 * Section component with metadata and preview data
 */
export interface SectionComponent {
  metadata: SectionMetadata;
  component: React.ComponentType<any>;
  previewData: any;
}

/**
 * Section registry - organized by section type
 */
export type SectionRegistry = Record<string, SectionComponent>;