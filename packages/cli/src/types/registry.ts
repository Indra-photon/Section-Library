export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tier: "free" | "pro";
  sectionCount: number;
  tags: string[];
}

export interface RegistryIndex {
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

export interface ProjectDependency {
  name: string;
  path: string;
  required: boolean;
}

export interface Font {
  name: string;
  path: string;
  required: boolean;
}

export interface SectionFile {
  name: string;
  content: string;
}

export interface SectionMeta {
  label: string;
  description: string;
  tags: string[];
  category: string;
  tier: "free" | "pro";
  complexity: "simple" | "moderate" | "advanced";
  responsive: boolean;
  darkMode: boolean;
  animations?: string;
  uiSkillsCompliant: boolean;
}

export interface Section {
  name: string;
  type: string;
  domain: string;
  registryDependencies: string[];
  dependencies: string[];
  devDependencies: string[];
  shadcnDependencies: string[];
  projectDependencies: ProjectDependency[];
  fonts: Font[];
  files: SectionFile[];
  meta: SectionMeta;
}

export interface Config {
  $schema?: string;
  style?: string;
  tsx?: boolean;
  tailwind?: {
    config?: string;
    css?: string;
  };
  aliases?: {
    components?: string;
    sections?: string;
    ui?: string;
    lib?: string;
    utils?: string;
  };
  installedSections?: InstalledSection[];
}

export interface InstalledSection {
  id: string;
  version: string;
  installedAt: string;
  path: string;
}
