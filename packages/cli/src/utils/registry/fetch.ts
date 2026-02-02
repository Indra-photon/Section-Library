import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import { RegistryIndex, Section } from "../../types/registry.js";
import { logger } from "../logger.js";

// For local development, use local registry files
// In production, this would be the deployed registry URL
const REGISTRY_URL = process.env.FRAMEKIT_REGISTRY_URL || "http://localhost:3000/registry";
const USE_LOCAL = process.env.FRAMEKIT_USE_LOCAL !== "false";

// Get the registry path (go up from packages/cli to root)
function getLocalRegistryPath(): string {
  // From packages/cli/dist or packages/cli/src, go up to project root
  const cliDir = path.resolve(process.cwd());
  const projectRoot = path.resolve(cliDir, "../..");
  return path.join(projectRoot, "registry");
}

export async function fetchRegistryIndex(): Promise<RegistryIndex | null> {
  // Try local first for development
  if (USE_LOCAL) {
    try {
      const registryPath = getLocalRegistryPath();
      const indexPath = path.join(registryPath, "index.json");

      if (await fs.pathExists(indexPath)) {
        const content = await fs.readFile(indexPath, "utf-8");
        return JSON.parse(content) as RegistryIndex;
      }
    } catch (error) {
      // Fall through to HTTP fetch
    }
  }

  // Fallback to HTTP fetch
  try {
    const response = await fetch(`${REGISTRY_URL}/index.json`);

    if (!response.ok) {
      logger.error(`Failed to fetch registry: ${response.statusText}`);
      return null;
    }

    const data = await response.json() as RegistryIndex;
    return data;
  } catch (error) {
    logger.error("Failed to fetch registry index:");
    logger.error(error instanceof Error ? error.message : String(error));
    return null;
  }
}

export async function fetchSection(sectionName: string): Promise<Section | null> {
  // Try local first for development
  if (USE_LOCAL) {
    try {
      const registryPath = getLocalRegistryPath();
      const sectionPath = path.join(registryPath, "sections", `${sectionName}.json`);

      if (await fs.pathExists(sectionPath)) {
        const content = await fs.readFile(sectionPath, "utf-8");
        return JSON.parse(content) as Section;
      }
    } catch (error) {
      // Fall through to HTTP fetch
    }
  }

  // Fallback to HTTP fetch
  try {
    const response = await fetch(`${REGISTRY_URL}/sections/${sectionName}.json`);

    if (!response.ok) {
      if (response.status === 404) {
        logger.error(`Section "${sectionName}" not found in registry.`);
      } else {
        logger.error(`Failed to fetch section: ${response.statusText}`);
      }
      return null;
    }

    const data = await response.json() as Section;
    return data;
  } catch (error) {
    logger.error(`Failed to fetch section "${sectionName}":`);
    logger.error(error instanceof Error ? error.message : String(error));
    return null;
  }
}

export function getRegistryUrl(): string {
  return REGISTRY_URL;
}
