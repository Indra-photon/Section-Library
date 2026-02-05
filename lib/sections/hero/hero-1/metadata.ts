import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'hero-1',
  name: 'Hero 1',
  description: 'Full-width hero section with image and CTA button',
  sectionType: 'hero',
  tier: 'free',
  complexity: 'simple',
  tags: ['hero', 'landing', 'cta', 'image'],
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