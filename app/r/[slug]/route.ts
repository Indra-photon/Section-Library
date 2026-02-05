import { NextRequest, NextResponse } from 'next/server';
import { getSection } from '@/lib/sections/registry';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Get section data
  const section = getSection(slug);

  if (!section) {
    return NextResponse.json(
      { error: 'Section not found' },
      { status: 404 }
    );
  }

  const { metadata } = section;

  // Read component source code
  const [sectionType] = slug.split('-');
  const componentPath = path.join(
    process.cwd(),
    'lib',
    'sections',
    sectionType,
    slug,
    'component.tsx'
  );

  let componentCode = '';
  try {
    componentCode = fs.readFileSync(componentPath, 'utf-8');
  } catch (error) {
    return NextResponse.json(
      { error: 'Component file not found' },
      { status: 404 }
    );
  }

  // Build shadcn-compatible JSON
  const registryJson = {
    name: slug,
    type: 'registry:ui',
    dependencies: metadata.dependencies.npm,
    devDependencies: [],
    registryDependencies: metadata.dependencies.shadcn,
    files: [
      {
        path: `components/${slug}.tsx`,
        content: componentCode,
        type: 'registry:ui',
      },
    ],
    tailwind: {
      config: {
        theme: {
          extend: {},
        },
      },
    },
  };

  return NextResponse.json(registryJson, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}