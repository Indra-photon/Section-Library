import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [sectionType] = slug.split('-');
  const basePath = path.join(process.cwd(), 'lib', 'sections', sectionType, slug);

  const files = [
    { name: 'component.tsx', path: path.join(basePath, 'component.tsx') },
    { name: 'metadata.ts', path: path.join(basePath, 'metadata.ts') },
    { name: 'preview-data.ts', path: path.join(basePath, 'preview-data.ts') },
  ];

  const sourceCode: Array<{ name: string; content: string }> = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file.path, 'utf-8');
      sourceCode.push({ name: file.name, content });
    } catch (error) {
      // File doesn't exist, skip it
      continue;
    }
  }

  if (sourceCode.length === 0) {
    return NextResponse.json(
      { error: 'Source files not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ files: sourceCode });
}