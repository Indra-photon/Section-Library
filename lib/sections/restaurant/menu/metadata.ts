import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'restaurant-menu',
  name: 'Restaurant Menu',
  description: 'Menu section with categories, items, prices, and dietary indicators',
  domain: 'restaurant',
  category: 'menu',
  tier: 'free',
  complexity: 'moderate',
  tags: ['menu', 'restaurant', 'food', 'dining', 'categories'],
  dependencies: {
    npm: ['lucide-react'],
    shadcn: ['card', 'badge', 'separator'],
    projectComponents: ['Heading', 'Paragraph', 'Container'],
    fonts: ['CalSans']
  },
  responsive: true,
  darkMode: true,
  animations: false,
};
