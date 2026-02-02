# 📚 Sections System - Quick Reference

## ⚡ Quick Start: Add a New Section

### Option 1: Using CLI (Easiest)

```bash
npm run create:section
```

This will:
1. Ask you for section details
2. Generate all required files
3. Give you instructions for registration

### Option 2: Manual Steps

1. **Create folder structure:**
   ```
   lib/sections/{domain}/{section-name}/
   ```

2. **Add 4 files:**
   - `component.tsx` - Your React component
   - `metadata.ts` - Section information
   - `preview-data.ts` - Sample data for showcase
   - `index.ts` - Exports

3. **Register in `lib/sections/registry.ts`:**
   ```typescript
   import * as YourSection from './{domain}/{section-name}';

   export const sectionRegistry: SectionRegistry = {
     // ... existing
     'your-id': {
       metadata: YourSection.metadata,
       component: YourSection.YourComponent,
       previewData: YourSection.previewData,
     },
   };
   ```

## 📝 Minimal Templates

### component.tsx
```typescript
import React from 'react';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';

export interface YourProps {
  title: string;
}

export function YourSection({ title }: YourProps) {
  return (
    <section className="py-20">
      <Container>
        <Heading>{title}</Heading>
      </Container>
    </section>
  );
}
```

### metadata.ts
```typescript
import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: 'domain-name',
  name: 'Display Name',
  description: 'What this section does',
  domain: 'ecommerce',
  category: 'hero',
  tier: 'free',
  complexity: 'simple',
  tags: ['hero', 'ecommerce'],
  dependencies: {
    npm: ['lucide-react'],
    shadcn: ['button'],
    projectComponents: ['Container', 'Heading'],
  },
  responsive: true,
  darkMode: true,
  animations: false,
};
```

### preview-data.ts
```typescript
import { YourProps } from './component';

export const previewData: YourProps = {
  title: 'Preview Title',
};
```

### index.ts
```typescript
export { YourSection } from './component';
export { metadata } from './metadata';
export { previewData } from './preview-data';
export type { YourProps } from './component';
```

## 🎯 Where Things Go

```
lib/sections/
├── ecommerce/      # Shopping, products
├── portfolio/      # Personal, projects
├── restaurant/     # Food, menus
├── saas/          # Software, pricing
├── real-estate/   # Properties
├── blog/          # Articles
├── agency/        # Services
└── education/     # Courses
```

## 🏷️ Common Patterns

### Hero Section
```typescript
{
  domain: 'ecommerce',
  category: 'hero',
  tags: ['hero', 'landing', 'cta']
}
```

### Pricing Section
```typescript
{
  domain: 'saas',
  category: 'pricing',
  tags: ['pricing', 'subscription', 'plans']
}
```

### Menu Section
```typescript
{
  domain: 'restaurant',
  category: 'menu',
  tags: ['menu', 'food', 'categories']
}
```

## 🎨 Required Components

Always import these:
```typescript
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
```

Common Shadcn components:
```typescript
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
```

## ✅ Checklist Before Registration

- [ ] All 4 files created (component, metadata, preview-data, index)
- [ ] Component uses Container, Heading, Paragraph
- [ ] Metadata has correct domain and category
- [ ] Preview data includes all required props
- [ ] Component is responsive (test mobile/desktop)
- [ ] Dark mode works correctly
- [ ] Registered in `lib/sections/registry.ts`
- [ ] Test in showcase at `/showcase`

## 🚀 After Adding

1. Visit `/showcase` to see your section
2. It will automatically appear in the sidebar
3. Click to navigate and test scroll behavior
4. Check responsive design and dark mode

## 💡 Tips

- **Copy existing sections** for reference
- **Test in showcase** before finalizing
- **Use realistic preview data** for best results
- **Follow UI_SKILLS** constraints (see UI_SKILLS.md)
- **Keep it simple** - don't over-engineer

## 📖 Full Documentation

See `lib/sections/README.md` for:
- Detailed templates
- Best practices
- Advanced usage
- UI guidelines
- Deployment info

## 🆘 Troubleshooting

**Section not showing in showcase?**
- Check it's registered in `registry.ts`
- Verify import path is correct
- Restart dev server

**TypeScript errors?**
- Ensure all exports in `index.ts`
- Check metadata matches types
- Verify props interface

**Preview not rendering?**
- Check preview-data has all required props
- Verify component handles props correctly
- Look for console errors

## 🎓 Learn by Example

Best sections to study:
1. `ecommerce/hero` - Simple hero with image
2. `portfolio/hero` - Avatar + social links
3. `restaurant/menu` - Complex data structure
4. `saas/pricing` - Cards with loops
