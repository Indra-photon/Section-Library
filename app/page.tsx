import Prism from '@/components/Prism';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/Container';
import { getSectionTypes } from '@/lib/sections/registry';
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
  hero: {
    icon: LayoutTemplate,
    title: 'Hero Sections',
    description: 'Eye-catching hero sections for landing pages',
  },
  navbar: {
    icon: Navigation,
    title: 'Navigation Bars',
    description: 'Header navigation components',
  },
  testimonials: {
    icon: MessageSquare,
    title: 'Testimonials',
    description: 'Customer reviews and testimonials',
  },
  pricing: {
    icon: DollarSign,
    title: 'Pricing Sections',
    description: 'Pricing tables and plans',
  },
  features: {
    icon: Sparkles,
    title: 'Features',
    description: 'Product features and benefits',
  },
  cta: {
    icon: Megaphone,
    title: 'Call to Action',
    description: 'Conversion-focused CTA sections',
  },
  faq: {
    icon: HelpCircle,
    title: 'FAQ Sections',
    description: 'Frequently asked questions',
  },
  footer: {
    icon: PanelBottom,
    title: 'Footer Sections',
    description: 'Page footers with links and info',
  },
};

export default function HomePage() {
  const sectionTypes = getSectionTypes();

  return (
    <>
      {/* Hero with Prism background */}
      <Prism />

      {/* Section Cards */}
      <div id="sections" className="py-20 bg-background">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(sectionTypeInfo).map(([type, info]) => {
              const Icon = info.icon;
              const count = sectionTypes[type] || 0;

              return (
                <Link key={type} href={`/${type}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <CardTitle>{info.title}</CardTitle>
                      <CardDescription>{info.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {count} {count === 1 ? 'variation' : 'variations'}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
    </>
  );
}