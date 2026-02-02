# Sections System

A centralized, organized system for managing reusable section components.

## 📁 Directory Structure

```
lib/sections/
├── types.ts              # TypeScript types for sections
├── registry.ts           # Central registry of all sections
├── README.md            # This file
└── {domain}/            # Domain-specific folders
    └── {category}/      # Category/section name
        ├── component.tsx      # React component
        ├── metadata.ts        # Section metadata
        ├── preview-data.ts    # Sample/preview data
        └── index.ts          # Exports
```

## 🚀 Quick Start

### Creating a New Section

1. **Using the CLI (Recommended)**
   ```bash
   npm run create:section
   ```

   Follow the prompts to:
   - Enter section name (e.g., "hero", "pricing")
   - Select domain (ecommerce, portfolio, restaurant, saas, etc.)
   - Select category (hero, pricing, menu, features, etc.)
   - Provide display name and description
   - Specify component name (PascalCase)

2. **Manual Creation**

   Create the following structure:
   ```
   lib/sections/{domain}/{section-name}/
   ├── component.tsx
   ├── metadata.ts
   ├── preview-data.ts
   └── index.ts
   ```

### Registering a Section

After creating your section files, register it in `lib/sections/registry.ts`:

```typescript
// 1. Import your section
import * as YourSection from './{domain}/{section-name}';

// 2. Add to registry
export const sectionRegistry: SectionRegistry = {
  // ... existing sections
  'your-section-id': {
    metadata: YourSection.metadata,
    component: YourSection.YourComponent,
    previewData: YourSection.previewData,
  },
};
```

## 📝 File Templates

### component.tsx
```typescript
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';

export interface YourSectionProps {
  title: string;
  subtitle?: string;
  // Add your props here
}

export function YourSection({
  title,
  subtitle,
}: YourSectionProps) {
  return (
    <section className="py-20 bg-background">
      <Container>
        {/* Your section content */}
      </Container>
    </section>
  );
}
```

### metadata.ts
```typescript
import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'domain-section',
  name: 'Display Name',
  description: 'Brief description',
  domain: 'ecommerce', // or portfolio, restaurant, saas, etc.
  category: 'hero', // or pricing, menu, features, etc.
  tier: 'free', // or 'pro'
  complexity: 'simple', // or 'moderate', 'complex'
  tags: ['tag1', 'tag2'],
  dependencies: {
    npm: ['lucide-react'],
    shadcn: ['button', 'card'],
    projectComponents: ['Heading', 'Paragraph', 'Container'],
    fonts: ['CalSans']
  },
  responsive: true,
  darkMode: true,
  animations: false,
};
```

### preview-data.ts
```typescript
import { YourSectionProps } from './component';

export const previewData: YourSectionProps = {
  title: 'Preview Title',
  subtitle: 'Preview subtitle',
  // Add sample data for showcase
};
```

### index.ts
```typescript
export { YourSection } from './component';
export { metadata } from './metadata';
export { previewData } from './preview-data';
export type { YourSectionProps } from './component';
```

## 🏷️ Available Options

### Domains
- `ecommerce` - Online stores, product catalogs
- `portfolio` - Personal portfolios, project showcases
- `restaurant` - Dining, menus, reservations
- `saas` - Software products, pricing
- `real-estate` - Property listings
- `blog` - Articles, content
- `agency` - Services, team
- `education` - Courses, learning

### Categories
- `hero` - Hero sections
- `pricing` - Pricing tables
- `menu` - Menu/product listings
- `features` - Feature showcases
- `testimonials` - Customer reviews
- `cta` - Call-to-action sections
- `faq` - Frequently asked questions
- `footer` - Footer sections
- `contact` - Contact forms

### Complexity Levels
- `simple` - Basic component with minimal logic
- `moderate` - Medium complexity with some state
- `complex` - Advanced features and interactions

### Tiers
- `free` - Available to all users
- `pro` - Premium/paid sections

## 🎯 Best Practices

1. **Naming Conventions**
   - Component: PascalCase (e.g., `EcommerceHero`)
   - File/folder: kebab-case (e.g., `ecommerce-hero`)
   - ID: domain-name format (e.g., `ecommerce-hero`)

2. **Component Design**
   - Use project components (Heading, Paragraph, Container)
   - Follow UI_SKILLS constraints
   - Ensure responsive design
   - Support dark mode
   - Keep animations minimal (motion/react for entrance only)

3. **Props**
   - Make components flexible with props
   - Provide sensible defaults
   - Use TypeScript interfaces
   - Document prop purposes

4. **Preview Data**
   - Use realistic, production-quality data
   - Include all required props
   - Use placeholder images from Unsplash

5. **Metadata**
   - Write clear, concise descriptions
   - List all dependencies accurately
   - Tag appropriately for discoverability
   - Set correct complexity level

## 🔍 Using the Registry

### Import sections programmatically
```typescript
import { sectionRegistry, getSection, getSectionsByDomain } from '@/lib/sections/registry';

// Get a specific section
const section = getSection('ecommerce-hero');

// Get all sections by domain
const ecommerceSections = getSectionsByDomain()['ecommerce'];

// Render dynamically
const Component = section.component;
const props = section.previewData;
<Component {...props} />
```

### Showcase Page
The showcase page automatically displays all registered sections. No manual updates needed!

## 📦 Dependencies

Common dependencies used:
- `motion` (motion/react) - Animations
- `lucide-react` - Icons
- `@/components/ui/*` - Shadcn components
- `@/components/{Heading,Paragraph,Container}` - Project components

## 🎨 UI Guidelines

Follow the UI_SKILLS constraints:
- Use Tailwind CSS defaults
- Use `motion/react` for animations
- Use `cn` utility for class logic
- Use Shadcn UI components
- Text: `text-balance` for headings, `text-pretty` for paragraphs
- Heights: Use `h-dvh` instead of `h-screen`
- Spacing: Use Tailwind's spacing scale
- No gradients unless requested
- Minimal animations (entrance only, ease-out, max 200ms)

## 🚢 Deployment

Sections are automatically:
- Bundled with the application
- Displayed in the showcase at `/showcase`
- Available for import and use throughout the app
- Listed in the sidebar with metadata

## 📚 Examples

See existing sections for reference:
- `lib/sections/ecommerce/hero/` - Simple hero section
- `lib/sections/portfolio/hero/` - Hero with avatar and social links
- `lib/sections/restaurant/menu/` - Complex menu with categories
- `lib/sections/saas/pricing/` - Pricing table with tiers
