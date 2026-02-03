'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight, ShoppingCart, UtensilsCrossed, Laptop, Briefcase, Home, BookOpen, Users, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSectionsByDomainAndCategory } from '@/lib/sections/registry';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  ShoppingCart,
  UtensilsCrossed,
  Laptop,
  Briefcase,
  Home,
  BookOpen,
  Users,
  GraduationCap,
};

const domainInfo: Record<string, { name: string; icon: string; color: string }> = {
  ecommerce: { name: 'E-Commerce', icon: 'ShoppingCart', color: '#10b981' },
  portfolio: { name: 'Portfolio', icon: 'Briefcase', color: '#ec4899' },
  restaurant: { name: 'Restaurant', icon: 'UtensilsCrossed', color: '#f59e0b' },
  saas: { name: 'SaaS', icon: 'Laptop', color: '#8b5cf6' },
  'real-estate': { name: 'Real Estate', icon: 'Home', color: '#3b82f6' },
  blog: { name: 'Blog', icon: 'BookOpen', color: '#06b6d4' },
  agency: { name: 'Agency', icon: 'Users', color: '#14b8a6' },
  education: { name: 'Education', icon: 'GraduationCap', color: '#f97316' },
};

const categoryInfo: Record<string, { name: string }> = {
  hero: { name: 'Hero Sections' },
  pricing: { name: 'Pricing' },
  menu: { name: 'Menu' },
  features: { name: 'Features' },
  testimonials: { name: 'Testimonials' },
  cta: { name: 'Call to Action' },
  faq: { name: 'FAQ' },
  footer: { name: 'Footer' },
  contact: { name: 'Contact' },
};

interface ShowcaseSidebarProps {
  activeDomain?: string | null;
}

export function ShowcaseSidebar({ activeDomain }: ShowcaseSidebarProps) {
  const router = useRouter();
  const sectionsByDomainAndCategory = getSectionsByDomainAndCategory();
  const domainKeys = Object.keys(sectionsByDomainAndCategory);

  // Expand the active domain by default, or all if no filter
  const [expandedDomains, setExpandedDomains] = useState<string[]>(
    activeDomain ? [activeDomain] : domainKeys
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    );
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryKey)
        ? prev.filter((key) => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const handleDomainClick = (domainId: string) => {
    router.push(`/showcase?domain=${domainId}`);
  };

  const totalSections = Object.values(sectionsByDomainAndCategory).reduce(
    (acc, categories) =>
      acc + Object.values(categories).reduce((catAcc, sections) => catAcc + sections.length, 0),
    0
  );

  return (
    <aside className="w-64 h-screen sticky top-0 border-r border-border bg-neutral-900 overflow-y-auto">
      <div className="p-6 border-b border-border">
        {/* <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-foreground">Sections Library</h2>
          {activeDomain && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/showcase')}
              className="text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Browse and preview components
        </p> */}
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {Object.entries(sectionsByDomainAndCategory).map(([domainId, categories]) => {
            const isDomainExpanded = expandedDomains.includes(domainId);
            const isActiveDomain = activeDomain === domainId;
            const info = domainInfo[domainId];
            const Icon = iconMap[info.icon] || ShoppingCart;
            const domainSectionCount = Object.values(categories).reduce(
              (acc, sections) => acc + sections.length,
              0
            );

            return (
              <div key={domainId}>
                {/* Domain Level */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleDomain(domainId)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    {isDomainExpanded ? (
                      <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDomainClick(domainId)}
                    className={cn(
                      "flex-1 flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left group",
                      isActiveDomain
                        ? "bg-primary/10"
                        : "hover:bg-muted"
                    )}
                  >
                    {/* <Icon
                      className="size-4 shrink-0"
                      style={{ color: info.color }}
                    /> */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-lg font-bold font-sans truncate",
                            isActiveDomain ? "text-neutral-200" : "text-neutral-400"
                          )}
                        >
                          {info.name}
                        </span>
                        {/* <Badge variant={isActiveDomain ? "default" : "secondary"} className="text-xs">
                          {domainSectionCount}
                        </Badge> */}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Category Level */}
                {isDomainExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {Object.entries(categories).map(([categoryId, sections]) => {
                      const categoryKey = `${domainId}-${categoryId}`;
                      const isCategoryExpanded = expandedCategories.includes(categoryKey);
                      const categoryName = categoryInfo[categoryId]?.name || categoryId;

                      return (
                        <div key={categoryKey}>
                          {/* Category Button */}
                          <button
                            onClick={() => toggleCategory(categoryKey)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors text-left"
                          >
                            {isCategoryExpanded ? (
                              <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
                            )}
                            <span className="text-xs text-muted-foreground tracking-wide font-semibold font-sans">
                              {categoryName}
                            </span>
                            <Badge variant="outline" className="text-xs ml-auto">
                              {sections.length}
                            </Badge>
                          </button>

                          {/* Component Level */}
                          {isCategoryExpanded && (
                            <div className="ml-4 mt-1 space-y-1">
                              {sections.map((section) => (
                                <Link
                                  key={section.metadata.id}
                                  href={`/sections/${section.metadata.id}`}
                                  className="block px-3 py-2 rounded-lg transition-colors group/item hover:bg-muted"
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium transition-colors truncate text-foreground group-hover/item:text-primary">
                                        {section.metadata.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                        {section.metadata.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
