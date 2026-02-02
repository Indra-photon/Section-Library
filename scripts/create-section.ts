#!/usr/bin/env tsx

/**
 * Section Generator CLI
 *
 * Usage: npm run create:section
 *
 * This script helps you create a new section with all required files
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

const domains = ['ecommerce', 'portfolio', 'restaurant', 'saas', 'real-estate', 'blog', 'agency', 'education'];
const categories = ['hero', 'pricing', 'menu', 'features', 'testimonials', 'cta', 'faq', 'footer', 'contact'];

async function main() {
  console.log('\n🎨 Section Generator\n');
  console.log('This will create a new section with all required files.\n');

  // Get section details
  const sectionName = await question('Section name (e.g., "hero", "pricing"): ');

  console.log('\nAvailable domains:');
  domains.forEach((d, i) => console.log(`  ${i + 1}. ${d}`));
  const domainIndex = parseInt(await question('\nSelect domain (1-8): ')) - 1;
  const domain = domains[domainIndex];

  console.log('\nAvailable categories:');
  categories.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));
  const categoryIndex = parseInt(await question('\nSelect category (1-9): ')) - 1;
  const category = categories[categoryIndex];

  const displayName = await question('\nDisplay name (e.g., "E-Commerce Hero"): ');
  const description = await question('Description: ');
  const componentName = await question('Component name (PascalCase, e.g., "EcommerceHero"): ');

  // Generate ID
  const sectionId = `${domain}-${sectionName}`;

  // Create directory
  const sectionDir = path.join(process.cwd(), 'lib', 'sections', domain, sectionName);

  if (fs.existsSync(sectionDir)) {
    console.error(`\n❌ Section already exists at ${sectionDir}`);
    rl.close();
    return;
  }

  fs.mkdirSync(sectionDir, { recursive: true });

  // Generate component.tsx
  const componentContent = `import React from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';

export interface ${componentName}Props {
  title: string;
  subtitle?: string;
  // Add your props here
}

export function ${componentName}({
  title,
  subtitle,
}: ${componentName}Props) {
  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading className="text-balance">{title}</Heading>
            {subtitle && (
              <Paragraph className="text-pretty max-w-2xl mx-auto text-muted-foreground">
                {subtitle}
              </Paragraph>
            )}
          </div>

          {/* Add your section content here */}
          <div className="text-center text-muted-foreground">
            Section content goes here
          </div>
        </div>
      </Container>
    </section>
  );
}
`;

  // Generate metadata.ts
  const metadataContent = `import { SectionMetadata } from '../../types';

export const metadata: SectionMetadata = {
  id: '${sectionId}',
  name: '${displayName}',
  description: '${description}',
  domain: '${domain}',
  category: '${category}',
  tier: 'free',
  complexity: 'simple',
  tags: ['${category}', '${domain}'],
  dependencies: {
    npm: ['lucide-react'],
    shadcn: ['button'],
    projectComponents: ['Heading', 'Paragraph', 'Container'],
    fonts: ['CalSans']
  },
  responsive: true,
  darkMode: true,
  animations: false,
};
`;

  // Generate preview-data.ts
  const previewDataContent = `import { ${componentName}Props } from './component';

export const previewData: ${componentName}Props = {
  title: '${displayName}',
  subtitle: 'Add your preview data here',
  // Add more preview props
};
`;

  // Generate index.ts
  const indexContent = `export { ${componentName} } from './component';
export { metadata } from './metadata';
export { previewData } from './preview-data';
export type { ${componentName}Props } from './component';
`;

  // Write files
  fs.writeFileSync(path.join(sectionDir, 'component.tsx'), componentContent);
  fs.writeFileSync(path.join(sectionDir, 'metadata.ts'), metadataContent);
  fs.writeFileSync(path.join(sectionDir, 'preview-data.ts'), previewDataContent);
  fs.writeFileSync(path.join(sectionDir, 'index.ts'), indexContent);

  console.log(`\n✅ Section created successfully!\n`);
  console.log(`📁 Location: ${sectionDir}\n`);
  console.log('Next steps:');
  console.log(`1. Edit the component at: lib/sections/${domain}/${sectionName}/component.tsx`);
  console.log(`2. Update preview data at: lib/sections/${domain}/${sectionName}/preview-data.ts`);
  console.log(`3. Register in registry: lib/sections/registry.ts`);
  console.log(`   Add these lines:\n`);
  console.log(`   import * as ${componentName} from './${domain}/${sectionName}';`);
  console.log(`   \n   '${sectionId}': {`);
  console.log(`     metadata: ${componentName}.metadata,`);
  console.log(`     component: ${componentName}.${componentName},`);
  console.log(`     previewData: ${componentName}.previewData,`);
  console.log(`   },\n`);

  rl.close();
}

main().catch(console.error);
