// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { motion, AnimatePresence } from 'motion/react';
// import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
// import { getSectionsByType, getAllSectionIds } from '@/lib/sections/registry';
// import { cn } from '@/lib/utils';
// import { 
//   LayoutTemplate, 
//   Navigation, 
//   MessageSquare, 
//   DollarSign, 
//   Sparkles, 
//   Megaphone, 
//   HelpCircle,
//   PanelBottom
// } from 'lucide-react';

// const sectionTypeInfo = {
//   hero: { icon: LayoutTemplate, title: 'Hero Sections', color: 'text-blue-500' },
//   navbar: { icon: Navigation, title: 'Navigation Bars', color: 'text-green-500' },
//   testimonials: { icon: MessageSquare, title: 'Testimonials', color: 'text-purple-500' },
//   pricing: { icon: DollarSign, title: 'Pricing Sections', color: 'text-yellow-500' },
//   features: { icon: Sparkles, title: 'Features', color: 'text-pink-500' },
//   cta: { icon: Megaphone, title: 'Call to Action', color: 'text-orange-500' },
//   faq: { icon: HelpCircle, title: 'FAQ Sections', color: 'text-cyan-500' },
//   footer: { icon: PanelBottom, title: 'Footer Sections', color: 'text-indigo-500' },
// };

// export function SectionsSidebar() {
//   const pathname = usePathname();
//   const [expandedSections, setExpandedSections] = useState<string[]>([]);
//   const [activeSection, setActiveSection] = useState<string | null>(null);

//   // Auto-expand section based on current path
//   useEffect(() => {
//     const pathParts = pathname.split('/').filter(Boolean);
//     if (pathParts.length > 0 && pathParts[0] in sectionTypeInfo) {
//       setExpandedSections((prev) => 
//         prev.includes(pathParts[0]) ? prev : [...prev, pathParts[0]]
//       );
//       if (pathParts.length > 1) {
//         setActiveSection(pathParts[1]);
//       }
//     }
//   }, [pathname]);

//   const toggleSection = (sectionType: string) => {
//     setExpandedSections((prev) =>
//       prev.includes(sectionType)
//         ? prev.filter((id) => id !== sectionType)
//         : [...prev, sectionType]
//     );
//   };

//   const sectionTypes = Object.keys(sectionTypeInfo) as Array<keyof typeof sectionTypeInfo>;
  
//   // Get counts for each section type
//   const sectionCounts: Record<string, number> = {};
//   sectionTypes.forEach((type) => {
//     sectionCounts[type] = getSectionsByType(type).length;
//   });

//   const totalSections = Object.values(sectionCounts).reduce((a, b) => a + b, 0);

//   return (
//     <aside className="w-80 h-screen sticky top-0 border-r border-border bg-background overflow-hidden flex flex-col">
//       {/* Header */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-6 border-b border-border"
//       >
//         <h2 className="text-lg font-bold text-foreground">Section Library</h2>
//         <p className="text-sm text-muted-foreground mt-1">
//           Browse {totalSections} components
//         </p>
//       </motion.div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto p-4">
//         <div className="space-y-2">
//           {sectionTypes.map((sectionType, index) => {
//             const isExpanded = expandedSections.includes(sectionType);
//             const info = sectionTypeInfo[sectionType];
//             const Icon = info.icon;
//             const count = sectionCounts[sectionType];
//             const sections = getSectionsByType(sectionType);

//             return (
//               <motion.div
//                 key={sectionType}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 {/* Section Type Header */}
//                 <button
//                   onClick={() => toggleSection(sectionType)}
//                   className={cn(
//                     "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
//                     "hover:bg-muted group"
//                   )}
//                 >
//                   <motion.div
//                     animate={{ rotate: isExpanded ? 90 : 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <ChevronRight className="size-4 text-muted-foreground" />
//                   </motion.div>
                  
//                   <div className={cn(
//                     "size-8 rounded-md flex items-center justify-center",
//                     "bg-primary/10 group-hover:bg-primary/20 transition-colors"
//                   )}>
//                     <Icon className={cn("size-4", info.color)} />
//                   </div>
                  
//                   <div className="flex-1 text-left">
//                     <p className="text-sm font-medium text-foreground">
//                       {info.title}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {count} {count === 1 ? 'item' : 'items'}
//                     </p>
//                   </div>

//                   <Link
//                     href={`/${sectionType}`}
//                     onClick={(e) => e.stopPropagation()}
//                     className="opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <ExternalLink className="size-3.5 text-muted-foreground hover:text-primary" />
//                   </Link>
//                 </button>

//                 {/* Section Variations List */}
//                 <AnimatePresence>
//                   {isExpanded && sections.length > 0 && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: 'auto', opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="pl-12 pr-3 py-1 space-y-1">
//                         {sections.map(({ id, metadata }) => {
//                           const isActive = activeSection === id;
                          
//                           return (
//                             <motion.div
//                               key={id}
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ duration: 0.15 }}
//                             >
//                               <Link
//                                 href={`/${sectionType}/${id}`}
//                                 onClick={() => setActiveSection(id)}
//                                 className={cn(
//                                   "block px-3 py-2 rounded-md text-sm transition-all duration-200",
//                                   "hover:bg-muted group/item",
//                                   isActive && "bg-primary/10 text-primary font-medium"
//                                 )}
//                               >
//                                 <div className="flex items-center justify-between gap-2">
//                                   <span className={cn(
//                                     "transition-colors",
//                                     isActive 
//                                       ? "text-primary" 
//                                       : "text-foreground/70 group-hover/item:text-foreground"
//                                   )}>
//                                     {metadata.name}
//                                   </span>
                                  
//                                   {metadata.tier === 'pro' && (
//                                     <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
//                                       PRO
//                                     </span>
//                                   )}
//                                 </div>
//                               </Link>
//                             </motion.div>
//                           );
//                         })}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Empty state */}
//                 {isExpanded && sections.length === 0 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="pl-12 pr-3 py-2"
//                   >
//                     <p className="text-xs text-muted-foreground italic">
//                       No items yet
//                     </p>
//                   </motion.div>
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Footer Stats */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-4 border-t border-border mt-auto"
//       >
//         <div className="space-y-2">
//           <div className="flex items-center justify-between text-xs">
//             <span className="text-muted-foreground">Total Sections</span>
//             <span className="font-medium text-foreground">{totalSections}</span>
//           </div>
//           <div className="flex items-center justify-between text-xs">
//             <span className="text-muted-foreground">Categories</span>
//             <span className="font-medium text-foreground">{sectionTypes.length}</span>
//           </div>
//         </div>
//       </motion.div>
//     </aside>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, ExternalLink, ChevronLeft, Menu } from 'lucide-react';
import { getSectionsByType, getAllSectionIds } from '@/lib/sections/registry';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutTemplate, 
  Navigation, 
  MessageSquare, 
  DollarSign, 
  Sparkles, 
  Megaphone, 
  HelpCircle,
  PanelBottom
} from 'lucide-react';

const sectionTypeInfo = {
  hero: { icon: LayoutTemplate, title: 'Hero Sections', color: 'text-blue-500' },
  navbar: { icon: Navigation, title: 'Navigation Bars', color: 'text-green-500' },
  testimonials: { icon: MessageSquare, title: 'Testimonials', color: 'text-purple-500' },
  pricing: { icon: DollarSign, title: 'Pricing Sections', color: 'text-yellow-500' },
  features: { icon: Sparkles, title: 'Features', color: 'text-pink-500' },
  cta: { icon: Megaphone, title: 'Call to Action', color: 'text-orange-500' },
  faq: { icon: HelpCircle, title: 'FAQ Sections', color: 'text-cyan-500' },
  footer: { icon: PanelBottom, title: 'Footer Sections', color: 'text-indigo-500' },
};

export function SectionsSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  // Auto-expand section based on current path
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && pathParts[0] in sectionTypeInfo) {
      setExpandedSections((prev) => 
        prev.includes(pathParts[0]) ? prev : [...prev, pathParts[0]]
      );
      if (pathParts.length > 1) {
        setActiveSection(pathParts[1]);
      }
    }
  }, [pathname]);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-open');
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebar-open', JSON.stringify(newState));
  };

  const toggleSection = (sectionType: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionType)
        ? prev.filter((id) => id !== sectionType)
        : [...prev, sectionType]
    );
  };

  const sectionTypes = Object.keys(sectionTypeInfo) as Array<keyof typeof sectionTypeInfo>;
  
  // Get counts for each section type
  const sectionCounts: Record<string, number> = {};
  sectionTypes.forEach((type) => {
    sectionCounts[type] = getSectionsByType(type).length;
  });

  const totalSections = Object.values(sectionCounts).reduce((a, b) => a + b, 0);

  return (
    <>
      {/* Toggle Button (when sidebar is closed) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-4 top-4 z-50"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="shadow-lg"
            >
              <Menu className="size-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-80 h-screen sticky top-0 border-r border-border bg-background overflow-hidden flex flex-col z-40"
          >
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border-b border-border flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground">Section Library</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse {totalSections} components
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="shrink-0"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {sectionTypes.map((sectionType, index) => {
                  const isExpanded = expandedSections.includes(sectionType);
                  const info = sectionTypeInfo[sectionType];
                  const Icon = info.icon;
                  const count = sectionCounts[sectionType];
                  const sections = getSectionsByType(sectionType);

                  return (
                    <motion.div
                      key={sectionType}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Section Type Header */}
                      <button
                        onClick={() => toggleSection(sectionType)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                          "hover:bg-muted group"
                        )}
                      >
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </motion.div>
                        
                        <div className={cn(
                          "size-8 rounded-md flex items-center justify-center",
                          "bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        )}>
                          <Icon className={cn("size-4", info.color)} />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-foreground">
                            {info.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {count} {count === 1 ? 'item' : 'items'}
                          </p>
                        </div>

                        <Link
                          href={`/${sectionType}`}
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="size-3.5 text-muted-foreground hover:text-primary" />
                        </Link>
                      </button>

                      {/* Section Variations List */}
                      <AnimatePresence>
                        {isExpanded && sections.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-12 pr-3 py-1 space-y-1">
                              {sections.map(({ id, metadata }) => {
                                const isActive = activeSection === id;
                                
                                return (
                                  <motion.div
                                    key={id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.15 }}
                                  >
                                    <Link
                                      href={`/${sectionType}/${id}`}
                                      onClick={() => setActiveSection(id)}
                                      className={cn(
                                        "block px-3 py-2 rounded-md text-sm transition-all duration-200",
                                        "hover:bg-muted group/item",
                                        isActive && "bg-primary/10 text-primary font-medium"
                                      )}
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span className={cn(
                                          "transition-colors",
                                          isActive 
                                            ? "text-primary" 
                                            : "text-foreground/70 group-hover/item:text-foreground"
                                        )}>
                                          {metadata.name}
                                        </span>
                                        
                                        {metadata.tier === 'pro' && (
                                          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-medium">
                                            PRO
                                          </span>
                                        )}
                                      </div>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Empty state */}
                      {isExpanded && sections.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pl-12 pr-3 py-2"
                        >
                          <p className="text-xs text-muted-foreground italic">
                            No items yet
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </nav>

            {/* Footer Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-t border-border mt-auto"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Total Sections</span>
                  <span className="font-medium text-foreground">{totalSections}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Categories</span>
                  <span className="font-medium text-foreground">{sectionTypes.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}