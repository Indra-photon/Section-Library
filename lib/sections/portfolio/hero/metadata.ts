import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'portfolio-hero',
  name: 'Portfolio Hero',
  description: 'Personal portfolio hero with avatar, bio, skills, and social links',
  domain: 'portfolio',
  category: 'hero',
  tier: 'free',
  complexity: 'simple',
  tags: ['hero', 'portfolio', 'personal', 'about', 'introduction'],
  dependencies: {
    npm: ['motion', 'lucide-react'],
    shadcn: ['button', 'badge'],
    projectComponents: ['Heading', 'Paragraph', 'Container'],
    fonts: ['CalSans']
  },
  responsive: true,
  darkMode: true,
  animations: true,
};
