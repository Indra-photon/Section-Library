import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sections Showcase',
  description: 'Browse and preview all available sections',
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen overflow-hidden">{children}</div>;
}
