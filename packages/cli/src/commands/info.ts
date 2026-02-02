import ora from "ora";
import chalk from "chalk";
import { fetchSection } from "../utils/registry/fetch.js";
import { logger } from "../utils/logger.js";

export async function info(sectionName: string) {
  const spinner = ora(`Fetching section "${sectionName}"...`).start();

  const section = await fetchSection(sectionName);

  if (!section) {
    spinner.fail(`Section "${sectionName}" not found`);
    process.exit(1);
  }

  spinner.succeed("Section loaded");
  logger.break();

  // Header
  logger.info(chalk.bold(section.meta.label));
  logger.info(chalk.gray(section.meta.description));
  logger.break();

  // Meta information
  logger.info(chalk.bold("Details"));
  logger.info(`  • Domain: ${chalk.cyan(section.domain)}`);
  logger.info(`  • Category: ${section.meta.category}`);
  logger.info(`  • Complexity: ${section.meta.complexity}`);
  logger.info(`  • Tier: ${section.meta.tier === "free" ? chalk.green("Free") : chalk.yellow("Pro")}`);
  logger.info(`  • Responsive: ${section.meta.responsive ? "Yes" : "No"}`);
  logger.info(`  • Dark Mode: ${section.meta.darkMode ? "Yes" : "No"}`);
  if (section.meta.animations) {
    logger.info(`  • Animations: ${section.meta.animations}`);
  }
  logger.break();

  // Dependencies
  if (section.dependencies.length > 0 || section.shadcnDependencies.length > 0) {
    logger.info(chalk.bold("Dependencies"));

    if (section.dependencies.length > 0) {
      logger.info(`  ${chalk.gray("npm packages:")}`);
      section.dependencies.forEach((dep) => {
        logger.info(`    • ${dep}`);
      });
    }

    if (section.shadcnDependencies.length > 0) {
      logger.info(`  ${chalk.gray("shadcn/ui:")}`);
      section.shadcnDependencies.forEach((dep) => {
        logger.info(`    • ${dep}`);
      });
    }

    if (section.projectDependencies.length > 0) {
      logger.info(`  ${chalk.gray("project components:")}`);
      section.projectDependencies.forEach((dep) => {
        logger.info(`    • ${dep.name} (${dep.path})`);
      });
    }

    logger.break();
  }

  // Tags
  if (section.meta.tags.length > 0) {
    logger.info(chalk.bold("Tags"));
    logger.info(`  ${section.meta.tags.join(", ")}`);
    logger.break();
  }

  // Installation command
  logger.info(chalk.bold("Installation"));
  logger.info(chalk.cyan(`  framekit add ${sectionName}`));
  logger.break();

  // Files that will be created
  logger.info(chalk.bold("Files"));
  section.files.forEach((file) => {
    logger.info(`  • ${file.name}`);
  });
}
