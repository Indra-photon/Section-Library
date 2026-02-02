import ora from "ora";
import chalk from "chalk";
import prompts from "prompts";
import { fetchSection } from "../utils/registry/fetch.js";
import { logger } from "../utils/logger.js";
import { configExists } from "../utils/config.js";

interface AddOptions {
  yes?: boolean;
  overwrite?: boolean;
  path?: string;
}

export async function add(sections: string[], options: AddOptions) {
  // Check if framekit is initialized
  const hasConfig = await configExists();

  if (!hasConfig) {
    logger.error("framekit.json not found.");
    logger.info("Run 'framekit init' to initialize your project first.");
    process.exit(1);
  }

  if (!sections || sections.length === 0) {
    logger.error("Please specify at least one section to add.");
    logger.info("Example: framekit add ecommerce-hero");
    process.exit(1);
  }

  logger.info(`Adding ${sections.length} section(s)...`);
  logger.break();

  for (const sectionName of sections) {
    await addSection(sectionName, options);
  }
}

async function addSection(sectionName: string, options: AddOptions) {
  const spinner = ora(`Fetching ${sectionName}...`).start();

  const section = await fetchSection(sectionName);

  if (!section) {
    spinner.fail(`Section "${sectionName}" not found`);
    return;
  }

  spinner.succeed(`Found ${section.meta.label}`);
  logger.break();

  // Display what will be installed
  logger.info(chalk.bold("The following will be installed:"));
  logger.break();

  logger.info(chalk.bold("Files:"));
  section.files.forEach((file) => {
    logger.info(`  • components/sections/${file.name}`);
  });
  logger.break();

  if (section.dependencies.length > 0) {
    logger.info(chalk.bold("npm dependencies:"));
    section.dependencies.forEach((dep) => {
      logger.info(`  • ${dep}`);
    });
    logger.break();
  }

  if (section.shadcnDependencies.length > 0) {
    logger.info(chalk.bold("shadcn/ui components:"));
    section.shadcnDependencies.forEach((dep) => {
      logger.info(`  • ${dep}`);
    });
    logger.break();
  }

  if (section.projectDependencies.length > 0) {
    logger.info(chalk.bold("Required project components:"));
    section.projectDependencies.forEach((dep) => {
      const status = dep.required ? chalk.red("required") : chalk.yellow("optional");
      logger.info(`  • ${dep.name} (${dep.path}) - ${status}`);
    });
    logger.break();
  }

  // Confirm installation
  if (!options.yes) {
    const { confirm } = await prompts({
      type: "confirm",
      name: "confirm",
      message: "Proceed with installation?",
      initial: true,
    });

    if (!confirm) {
      logger.info("Installation cancelled.");
      return;
    }
  }

  logger.break();
  logger.warn("⚠️  Installation not yet implemented");
  logger.info("Full installation coming in next phase!");
  logger.break();
  logger.info("For now, you can manually:");
  logger.info(`1. Create: components/sections/${section.files[0].name}`);
  logger.info(`2. Copy the component code from the registry`);
  logger.info(`3. Install dependencies: npm install ${section.dependencies.join(" ")}`);
}
