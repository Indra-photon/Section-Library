import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'saas-pricing',
  name: 'SaaS Pricing',
  description: 'Pricing table with tier cards, features list, and CTAs',
  domain: 'saas',
  category: 'pricing',
  tier: 'free',
  complexity: 'simple',
  tags: ['pricing', 'saas', 'subscription', 'plans', 'features'],
  dependencies: {
    npm: ['lucide-react'],
    shadcn: ['button', 'card', 'badge'],
    projectComponents: ['Heading', 'Paragraph', 'Container'],
    fonts: ['CalSans']
  },
  responsive: true,
  darkMode: true,
  animations: false,
};
