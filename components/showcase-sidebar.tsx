'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, ShoppingCart, UtensilsCrossed, Laptop, Briefcase, Home, BookOpen, Users, GraduationCap, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getSectionsByDomain } from '@/lib/sections/registry';

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

export function ShowcaseSidebar() {
  const sectionsByDomain = getSectionsByDomain();
  const domainKeys = Object.keys(sectionsByDomain);

  const [expandedDomains, setExpandedDomains] = useState<string[]>(domainKeys);
  const [activeSection, setActiveSection] = useState<string>('');

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const allSectionIds = Object.values(sectionsByDomain)
        .flat()
        .map((section) => section.metadata.id);

      for (const sectionId of allSectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const mainContent = document.querySelector('main');
    mainContent?.addEventListener('scroll', handleScroll);

    return () => {
      mainContent?.removeEventListener('scroll', handleScroll);
    };
  }, [sectionsByDomain]);

  const totalSections = Object.values(sectionsByDomain).reduce(
    (acc, sections) => acc + sections.length,
    0
  );

  return (
    <aside className="w-80 h-screen sticky top-0 border-r border-border bg-background overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">Sections Library</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and preview components
        </p>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {Object.entries(sectionsByDomain).map(([domainId, sections]) => {
            const isExpanded = expandedDomains.includes(domainId);
            const info = domainInfo[domainId];
            const Icon = iconMap[info.icon] || ShoppingCart;

            return (
              <div key={domainId}>
                <button
                  onClick={() => toggleDomain(domainId)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                >
                  {isExpanded ? (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <Icon
                    className="size-4 shrink-0"
                    style={{ color: info.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {info.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {sections.length}
                      </Badge>
                    </div>
                  </div>
                </button>

                {isExpanded && sections.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {sections.map((section) => (
                      <div key={section.metadata.id} className="relative group/item">
                        <button
                          onClick={() => scrollToSection(section.metadata.id)}
                          className={cn(
                            "w-full flex flex-col gap-1 px-3 py-2 rounded-lg transition-colors text-left",
                            activeSection === section.metadata.id
                              ? "bg-primary/10 border-l-2 border-primary"
                              : "hover:bg-muted"
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={cn(
                                "text-sm font-medium transition-colors",
                                activeSection === section.metadata.id
                                  ? "text-primary"
                                  : "text-foreground group-hover/item:text-primary"
                              )}
                            >
                              {section.metadata.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <Link
                                href={`/sections/${section.metadata.id}`}
                                className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="size-3 text-muted-foreground hover:text-primary" />
                              </Link>
                              <Badge variant="outline" className="text-xs">
                                {section.metadata.category}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {section.metadata.description}
                          </p>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total Sections:</span>
            <span className="font-medium text-foreground">{totalSections}</span>
          </div>
          <div className="flex justify-between">
            <span>Domains:</span>
            <span className="font-medium text-foreground">{domainKeys.length}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
