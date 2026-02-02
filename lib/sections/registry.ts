import { SectionComponent, SectionRegistry } from './types';

// E-Commerce Sections
import * as EcommerceHero from './ecommerce/hero';

// Portfolio Sections
import * as PortfolioHero from './portfolio/hero';

// Restaurant Sections
import * as RestaurantMenu from './restaurant/menu';

// SaaS Sections
import * as SaasPricing from './saas/pricing';

/**
 * Central Section Registry
 *
 * To add a new section:
 * 1. Create a new folder: lib/sections/{domain}/{category}/
 * 2. Add component.tsx, metadata.ts, preview-data.ts, and index.ts
 * 3. Import and register it below
 */
export const sectionRegistry: SectionRegistry = {
  'ecommerce-hero': {
    metadata: EcommerceHero.metadata,
    component: EcommerceHero.EcommerceHero,
    previewData: EcommerceHero.previewData,
  },
  'portfolio-hero': {
    metadata: PortfolioHero.metadata,
    component: PortfolioHero.PortfolioHero,
    previewData: PortfolioHero.previewData,
  },
  'restaurant-menu': {
    metadata: RestaurantMenu.metadata,
    component: RestaurantMenu.RestaurantMenu,
    previewData: RestaurantMenu.previewData,
  },
  'saas-pricing': {
    metadata: SaasPricing.metadata,
    component: SaasPricing.SaasPricing,
    previewData: SaasPricing.previewData,
  },
};

/**
 * Get all sections organized by domain
 */
export function getSectionsByDomain() {
  const byDomain: Record<string, SectionComponent[]> = {};

  Object.entries(sectionRegistry).forEach(([id, section]) => {
    const domain = section.metadata.domain;
    if (!byDomain[domain]) {
      byDomain[domain] = [];
    }
    byDomain[domain].push(section);
  });

  return byDomain;
}

/**
 * Get all sections organized by category
 */
export function getSectionsByCategory() {
  const byCategory: Record<string, SectionComponent[]> = {};

  Object.entries(sectionRegistry).forEach(([id, section]) => {
    const category = section.metadata.category;
    if (!byCategory[category]) {
      byCategory[category] = [];
    }
    byCategory[category].push(section);
  });

  return byCategory;
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
 * Get section metadata only
 */
export function getAllSectionsMetadata() {
  return Object.entries(sectionRegistry).map(([id, section]) => ({
    id,
    ...section.metadata,
  }));
}
