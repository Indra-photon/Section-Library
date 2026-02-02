import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/Container';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <SearchX className="size-24 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Section Not Found</h1>
            <p className="text-lg text-muted-foreground">
              The section you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/showcase">
              <Button>
                <ArrowLeft className="size-4 mr-2" />
                Back to Showcase
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
