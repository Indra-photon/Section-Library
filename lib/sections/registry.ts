import { SectionComponent, SectionRegistry } from './types';

// Hero Sections
import * as Hero1 from './hero/hero-1';

/**
 * Central Section Registry
 * 
 * Organized by section type (hero, footer, etc.) instead of domain
 * 
 * To add a new section:
 * 1. Create folder: lib/sections/{section-type}/{variation-name}/
 * 2. Add component.tsx, metadata.ts, preview-data.ts, and index.ts
 * 3. Import and register it below
 */
export const sectionRegistry: SectionRegistry = {
  'hero-1': {
    metadata: Hero1.metadata,
    component: Hero1.Hero1,
    previewData: Hero1.previewData,
  },
};

/**
 * Get all sections by section type
 */
export function getSectionsByType(type: string) {
  return Object.entries(sectionRegistry)
    .filter(([id, section]) => section.metadata.sectionType === type)
    .map(([id, section]) => ({ id, ...section }));
}

/**
 * Get a specific section by ID
 */
export function getSection(id: string): SectionComponent | undefined {
  return sectionRegistry[id];
}

/**
 * Get all section IDs
 */
export function getAllSectionIds(): string[] {
  return Object.keys(sectionRegistry);
}

/**
 * Get all section types with their counts
 */
export function getSectionTypes() {
  const types: Record<string, number> = {};
  
  Object.values(sectionRegistry).forEach((section) => {
    const type = section.metadata.sectionType;
    types[type] = (types[type] || 0) + 1;
  });
  
  return types;
}