#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

// Types
interface Section {
  name: string;
  domain: string;
  meta: {
    tier: 'free' | 'pro';
  };
}

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tier: string;
  sectionCount: number;
  tags: string[];
}

interface Registry {
  version: string;
  lastUpdated: string;
  totalDomains: number;
  totalSections: number;
  domains: Domain[];
  sections: string[];
  stats: {
    freeSections: number;
    proSections: number;
    totalDownloads: number;
    contributors: number;
  };
}

// Paths
const REGISTRY_DIR = path.join(process.cwd(), 'registry');
const SECTIONS_DIR = path.join(REGISTRY_DIR, 'sections');
const INDEX_PATH = path.join(REGISTRY_DIR, 'index.json');
const SCHEMA_PATH = path.join(REGISTRY_DIR, 'schema', 'section.schema.json');

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Read all section files
function getSectionFiles(): string[] {
  if (!fs.existsSync(SECTIONS_DIR)) {
    log('⚠️  Sections directory not found. Creating...', 'yellow');
    fs.mkdirSync(SECTIONS_DIR, { recursive: true });
    return [];
  }

  return fs.readdirSync(SECTIONS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(SECTIONS_DIR, file));
}

// Validate section structure
function validateSection(sectionPath: string): Section | null {
  try {
    const content = fs.readFileSync(sectionPath, 'utf-8');
    const section: Section = JSON.parse(content);

    // Basic validation
    if (!section.name || !section.domain || !section.meta) {
      log(`❌ Invalid section structure: ${path.basename(sectionPath)}`, 'red');
      return null;
    }

    return section;
  } catch (error) {
    log(`❌ Error parsing ${path.basename(sectionPath)}: ${error}`, 'red');
    return null;
  }
}

// Build registry index
function buildRegistry() {
  log('\n🚀 Building Framekit Registry...', 'bright');
  log('━'.repeat(50), 'cyan');

  // Read existing registry
  let registry: Registry;
  try {
    const content = fs.readFileSync(INDEX_PATH, 'utf-8');
    registry = JSON.parse(content);
    log('✓ Found existing registry index', 'green');
  } catch {
    log('⚠️  Registry index not found, will create new one', 'yellow');
    return;
  }

  // Get all section files
  const sectionFiles = getSectionFiles();
  log(`\n📂 Found ${sectionFiles.length} section files`, 'blue');

  if (sectionFiles.length === 0) {
    log('⚠️  No sections to process', 'yellow');
    return;
  }

  // Parse and validate sections
  const sections: Section[] = [];
  const sectionNames: string[] = [];
  const domainCounts: Record<string, number> = {};

  log('\n🔍 Validating sections...', 'bright');
  for (const sectionPath of sectionFiles) {
    const fileName = path.basename(sectionPath);
    process.stdout.write(`   • ${fileName}... `);

    const section = validateSection(sectionPath);
    if (section) {
      sections.push(section);
      sectionNames.push(section.name);
      domainCounts[section.domain] = (domainCounts[section.domain] || 0) + 1;
      log('✓', 'green');
    } else {
      log('✗', 'red');
    }
  }

  // Update domain counts
  log('\n📊 Updating domain counts...', 'bright');
  for (const domain of registry.domains) {
    const oldCount = domain.sectionCount;
    const newCount = domainCounts[domain.id] || 0;
    domain.sectionCount = newCount;

    if (oldCount !== newCount) {
      log(`   • ${domain.name}: ${oldCount} → ${newCount}`, 'cyan');
    }
  }

  // Calculate stats
  const freeSections = sections.filter(s => s.meta.tier === 'free').length;
  const proSections = sections.filter(s => s.meta.tier === 'pro').length;

  // Update registry
  registry.totalSections = sections.length;
  registry.sections = sectionNames.sort();
  registry.lastUpdated = new Date().toISOString();
  registry.stats.freeSections = freeSections;
  registry.stats.proSections = proSections;

  // Write updated registry
  log('\n💾 Writing registry index...', 'bright');
  fs.writeFileSync(INDEX_PATH, JSON.stringify(registry, null, 2));

  // Summary
  log('\n━'.repeat(50), 'cyan');
  log('✅ Registry built successfully!', 'green');
  log(`\n📈 Summary:`, 'bright');
  log(`   • Total Domains: ${registry.totalDomains}`, 'cyan');
  log(`   • Total Sections: ${registry.totalSections}`, 'cyan');
  log(`   • Free Sections: ${freeSections}`, 'green');
  log(`   • Pro Sections: ${proSections}`, 'yellow');
  log(`   • Last Updated: ${new Date(registry.lastUpdated).toLocaleString()}`, 'cyan');
  log('\n');
}

// Run
try {
  buildRegistry();
} catch (error) {
  log(`\n❌ Build failed: ${error}`, 'red');
  process.exit(1);
}
