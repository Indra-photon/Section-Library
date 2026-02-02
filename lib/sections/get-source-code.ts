import fs from 'fs';
import path from 'path';
import { sectionRegistry } from './registry';

export interface SectionFiles {
  component: string;
  metadata: string;
  previewData: string;
}

/**
 * Get source code for a section
 * This runs server-side only
 */
export function getSectionSourceCode(sectionId: string): SectionFiles | null {
  const section = sectionRegistry[sectionId];
  if (!section) return null;

  const { domain, category } = section.metadata;

  // Map section IDs to their folder names
  const folderMap: Record<string, string> = {
    'ecommerce-hero': 'hero',
    'portfolio-hero': 'hero',
    'restaurant-menu': 'menu',
    'saas-pricing': 'pricing',
  };

  const folder = folderMap[sectionId];
  if (!folder) return null;

  const basePath = path.join(process.cwd(), 'lib', 'sections', domain, folder);

  try {
    const component = fs.readFileSync(path.join(basePath, 'component.tsx'), 'utf-8');
    const metadata = fs.readFileSync(path.join(basePath, 'metadata.ts'), 'utf-8');
    const previewData = fs.readFileSync(path.join(basePath, 'preview-data.ts'), 'utf-8');

    return {
      component,
      metadata,
      previewData,
    };
  } catch (error) {
    console.error(`Failed to read source code for ${sectionId}:`, error);
    return null;
  }
}

/**
 * Get CLI installation command for a section
 */
export function getInstallCommand(sectionId: string): string {
  return `npx shadcn@latest add "https://your-domain.com/r/${sectionId}.json"`;
}

/**
 * Get manual installation steps
 */
export function getManualInstallSteps(sectionId: string): string[] {
  const section = sectionRegistry[sectionId];
  if (!section) return [];

  const steps: string[] = [];

  // NPM dependencies
  if (section.metadata.dependencies.npm?.length) {
    steps.push(`npm install ${section.metadata.dependencies.npm.join(' ')}`);
  }

  // Shadcn components
  if (section.metadata.dependencies.shadcn?.length) {
    steps.push(`npx shadcn@latest add ${section.metadata.dependencies.shadcn.join(' ')}`);
  }

  // Copy component
  steps.push(`Create lib/sections/${section.metadata.domain}/${sectionId}/component.tsx`);

  return steps;
}
