import { notFound } from 'next/navigation';
import { sectionRegistry } from '@/lib/sections/registry';
import { getSectionSourceCode, getInstallCommand, getManualInstallSteps } from '@/lib/sections/get-source-code';
import { SectionDetailClient } from './section-detail-client';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(sectionRegistry).map((id) => ({
    id,
  }));
}

export default async function SectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const section = sectionRegistry[id];

  if (!section) {
    notFound();
  }

  const sourceCode = getSectionSourceCode(id);

  if (!sourceCode) {
    notFound();
  }

  const installCommand = getInstallCommand(id);
  const manualSteps = getManualInstallSteps(id);

  // Render the component on the server
  const Component = section.component;
  const props = section.previewData;
  const componentName = Component.name;

  return (
    <SectionDetailClient
      metadata={section.metadata}
      sectionId={id}
      sourceCode={sourceCode}
      installCommand={installCommand}
      manualSteps={manualSteps}
      componentName={componentName}
      previewProps={props}
    >
      <Component {...props} />
    </SectionDetailClient>
  );
}
