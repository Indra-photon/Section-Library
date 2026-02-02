export interface SectionMetadata {
  id: string;
  name: string;
  description: string;
  domain: 'ecommerce' | 'portfolio' | 'restaurant' | 'saas' | 'real-estate' | 'blog' | 'agency' | 'education';
  category: 'hero' | 'pricing' | 'menu' | 'features' | 'testimonials' | 'cta' | 'faq' | 'footer' | 'contact';
  tier: 'free' | 'pro';
  complexity: 'simple' | 'moderate' | 'complex';
  tags: string[];
  dependencies: {
    npm?: string[];
    shadcn?: string[];
    projectComponents?: string[];
    fonts?: string[];
  };
  responsive: boolean;
  darkMode: boolean;
  animations: boolean;
  previewData?: any;
}

export interface SectionComponent {
  metadata: SectionMetadata;
  component: React.ComponentType<any>;
  previewData: any;
}

export interface SectionRegistry {
  [key: string]: SectionComponent;
}
