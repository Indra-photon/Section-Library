import fs from "fs-extra";
import path from "path";
import { Config } from "../types/registry.js";
import { logger } from "./logger.js";

const CONFIG_FILE = "framekit.json";

export async function getConfig(cwd: string = process.cwd()): Promise<Config | null> {
  try {
    const configPath = path.join(cwd, CONFIG_FILE);

    if (!await fs.pathExists(configPath)) {
      return null;
    }

    const configContent = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configContent) as Config;

    return config;
  } catch (error) {
    logger.error("Error reading config file:");
    logger.error(error instanceof Error ? error.message : String(error));
    return null;
  }
}

export async function writeConfig(config: Config, cwd: string = process.cwd()): Promise<boolean> {
  try {
    const configPath = path.join(cwd, CONFIG_FILE);
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    logger.error("Error writing config file:");
    logger.error(error instanceof Error ? error.message : String(error));
    return false;
  }
}

export function getDefaultConfig(): Config {
  return {
    $schema: "https://framekit.dev/schema.json",
    style: "default",
    tsx: true,
    tailwind: {
      config: "tailwind.config.ts",
      css: "app/globals.css",
    },
    aliases: {
      components: "@/components",
      sections: "@/components/sections",
      ui: "@/components/ui",
      lib: "@/lib",
      utils: "@/lib/utils",
    },
    installedSections: [],
  };
}

export async function configExists(cwd: string = process.cwd()): Promise<boolean> {
  const configPath = path.join(cwd, CONFIG_FILE);
  return await fs.pathExists(configPath);
}
