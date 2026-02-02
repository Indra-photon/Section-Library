import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'ecommerce-hero',
  name: 'E-Commerce Hero',
  description: 'Full-width hero section for e-commerce landing pages with image showcase',
  domain: 'ecommerce',
  category: 'hero',
  tier: 'free',
  complexity: 'simple',
  tags: ['hero', 'landing', 'ecommerce', 'cta', 'featured'],
  dependencies: {
    npm: ['motion', 'lucide-react'],
    shadcn: ['button'],
    projectComponents: ['Heading', 'Paragraph', 'Container'],
    fonts: ['CalSans']
  },
  responsive: true,
  darkMode: true,
  animations: true,
};
