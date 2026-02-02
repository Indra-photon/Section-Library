import prompts from "prompts";
import ora from "ora";
import { logger } from "../utils/logger.js";
import {
  configExists,
  getDefaultConfig,
  writeConfig
} from "../utils/config.js";

export async function init() {
  logger.info("Welcome to Framekit! 🎨");
  logger.break();

  // Check if config already exists
  const hasConfig = await configExists();

  if (hasConfig) {
    const { overwrite } = await prompts({
      type: "confirm",
      name: "overwrite",
      message: "framekit.json already exists. Overwrite?",
      initial: false,
    });

    if (!overwrite) {
      logger.info("Initialization cancelled.");
      return;
    }
  }

  const spinner = ora("Creating configuration...").start();

  // Get default config
  const config = getDefaultConfig();

  // Prompt for customization
  spinner.stop();
  logger.break();

  const answers = await prompts([
    {
      type: "select",
      name: "style",
      message: "Which style would you like to use?",
      choices: [
        { title: "Default", value: "default" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: "Where is your tailwind.config file?",
      initial: config.tailwind?.config || "tailwind.config.ts",
    },
    {
      type: "text",
      name: "tailwindCss",
      message: "Where is your global CSS file?",
      initial: config.tailwind?.css || "app/globals.css",
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Are you using TypeScript?",
      initial: true,
    },
  ]);

  // Update config with answers
  config.style = answers.style;
  config.tsx = answers.typescript;
  if (config.tailwind) {
    config.tailwind.config = answers.tailwindConfig;
    config.tailwind.css = answers.tailwindCss;
  }

  spinner.start("Writing configuration file...");

  // Write config
  const success = await writeConfig(config);

  if (success) {
    spinner.succeed("Configuration file created!");
    logger.break();
    logger.success("✓ framekit.json created successfully");
    logger.break();
    logger.info("You can now add sections using:");
    logger.info("  framekit add <section-name>");
    logger.break();
    logger.info("Or list available sections:");
    logger.info("  framekit list");
  } else {
    spinner.fail("Failed to create configuration file");
    process.exit(1);
  }
}
